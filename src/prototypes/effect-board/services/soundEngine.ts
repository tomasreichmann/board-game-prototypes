// soundEngine.ts
export type PlayOptions = {
    url: string;
    channel: string; // logical channel name
    volume?: number; // 0..1 (default 1)
    offsetMs?: number; // ms into the buffer to start (default 0)
    durationMs?: number; // ms to play (optional)
    fadeInMs?: number; // default 80
    fadeOutMs?: number; // default 120
    previousFadeOutMs?: number; // default 80; used for crossfade
};

type PlayingNode = {
    source: AudioBufferSourceNode;
    gain: GainNode;
    stopAt?: number; // audioContext time when it will stop
};

export class SoundEngine {
    private ctx: AudioContext;
    private master: GainNode;
    private bufferCache = new Map<string, AudioBuffer>();
    // Track the *current* playing node per channel (for fade-out on replace)
    private channelNow = new Map<string, PlayingNode>();
    private unlocked = false;

    constructor({ masterVolume = 1 }: { masterVolume?: number } = {}) {
        this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.master = this.ctx.createGain();
        this.master.gain.value = masterVolume;
        this.master.connect(this.ctx.destination);
    }

    private async ensureUnlocked() {
        if (this.ctx.state !== "running") {
            try {
                await this.ctx.resume();
            } catch {}
        }
    }

    /**
     * Must be called on a user gesture before first playback on some browsers.
     * e.g., call in a click handler.
     */
    async unlock() {
        if (this.unlocked) return;
        await this.ctx.resume();
        this.unlocked = true;
    }

    setMasterVolume(v: number) {
        this.master.gain.value = Math.max(0, Math.min(1, v));
    }

    async loadBuffer(url: string): Promise<AudioBuffer> {
        const cached = this.bufferCache.get(url);
        if (cached) return cached;
        const res = await fetch(url);
        const arr = await res.arrayBuffer();
        const buf = await this.ctx.decodeAudioData(arr);
        this.bufferCache.set(url, buf);
        return buf;
    }

    /**
     * Play a sound with crossfade behavior on the same channel.
     * Returns a small handle to stop early (with fadeOut).
     */
    async play(opts: PlayOptions) {
        const {
            url,
            channel,
            volume = 1,
            offsetMs: offset = 0,
            durationMs,
            fadeInMs = 80,
            fadeOutMs = 120,
            previousFadeOutMs = 80,
        } = opts;
        console.log("play", { url, channel, volume, offset, durationMs, fadeInMs, fadeOutMs });
        await this.ensureUnlocked();
        const buf = await this.loadBuffer(url);
        const clampedOffsetSec = Math.max(0, Math.min(offset / 1000, buf.duration));
        const maxDurSec = Math.max(0, buf.duration - clampedOffsetSec);
        const clampedDurationSec = durationMs ? Math.min(durationMs / 1000, maxDurSec) : maxDurSec;

        // Create per-play gain -> master
        const gain = this.ctx.createGain();
        gain.connect(this.master);

        // Start new sound at 0 gain (for fade-in)
        gain.gain.setValueAtTime(0, this.ctx.currentTime);

        const src = this.ctx.createBufferSource();
        src.buffer = buf;
        src.connect(gain);

        // Prepare fade-in
        const now = this.ctx.currentTime;
        const targetVol = Math.max(0, Math.min(1, volume));
        const fadeInSec = Math.max(0, fadeInMs) / 1000;
        const fadeOutSec = Math.max(0, fadeOutMs) / 1000;
        const previousFadeOutSec = Math.max(0, previousFadeOutMs) / 1000;

        // Fade-out any currently playing sound on the same channel
        const prev = this.channelNow.get(channel);
        if (prev) {
            // schedule previous fade-out from its *current* value to 0
            const prevNow = this.ctx.currentTime;

            const currentVal = prev.gain.gain.value;
            prev.gain.gain.setValueAtTime(currentVal, prevNow);
            prev.gain.gain.linearRampToValueAtTime(0, prevNow + previousFadeOutSec);

            // Stop the previous node after fade
            try {
                prev.source.stop(prevNow + previousFadeOutSec);
            } catch {
                /* already stopped */
            }
        }

        // Start and schedule fade-in
        src.start(now, clampedOffsetSec, clampedDurationSec);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(targetVol, now + fadeInSec);

        // Schedule stop at the end with a short safety fade to avoid clicks
        const endAt = now + clampedDurationSec;
        const clickGuard = 0.01;
        gain.gain.setValueAtTime(targetVol, endAt - clickGuard - fadeOutSec);
        gain.gain.linearRampToValueAtTime(0, endAt - clickGuard); // tiny ramp to zero
        src.stop(endAt);

        // Track as current for this channel
        const node: PlayingNode = { source: src, gain, stopAt: endAt };
        this.channelNow.set(channel, node);

        // Cleanup when naturally ended
        src.onended = () => {
            const cur = this.channelNow.get(channel);
            if (cur && cur.source === src) {
                this.channelNow.delete(channel);
            }
            try {
                src.disconnect();
            } catch {}
            try {
                gain.disconnect();
            } catch {}
        };

        // Return a handle for manual stop (with fade-out)
        return {
            stop: (fadeOutOverrideMs?: number) => {
                const fadeSec = (fadeOutOverrideMs ?? fadeOutMs) / 1000;
                const t0 = this.ctx.currentTime;
                const cur = gain.gain.value;
                gain.gain.setValueAtTime(cur, t0);
                gain.gain.linearRampToValueAtTime(0, t0 + fadeSec);
                try {
                    src.stop(t0 + fadeSec);
                } catch {}
            },
            node,
        };
    }

    /** Fade out and stop whatever is on a given channel (if any). */
    stopChannel(channel: string, fadeOutMs = 120) {
        const cur = this.channelNow.get(channel);
        if (!cur) return;
        const t0 = this.ctx.currentTime;
        const fadeSec = Math.max(0, fadeOutMs) / 1000;
        const val = cur.gain.gain.value;
        cur.gain.gain.setValueAtTime(val, t0);
        cur.gain.gain.linearRampToValueAtTime(0, t0 + fadeSec);
        try {
            cur.source.stop(t0 + fadeSec);
        } catch {}
    }

    /** Stop all channels with fade-out. */
    stopAll(fadeOutMs = 120) {
        for (const ch of this.channelNow.keys()) {
            this.stopChannel(ch, fadeOutMs);
        }
    }
}
