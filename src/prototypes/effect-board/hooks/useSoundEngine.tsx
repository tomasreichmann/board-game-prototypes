import { useMemo, useEffect } from "react";
import { SoundEngine, PlayOptions } from "../services/soundEngine";

export function useSoundEngine() {
    const engine = useMemo(() => new SoundEngine(), []);

    // Optional: auto-unlock on first user interaction
    useEffect(() => {
        const handler = () => engine.unlock();
        window.addEventListener("pointerdown", handler, { once: true });
        window.addEventListener("keydown", handler, { once: true });
        return () => {
            window.removeEventListener("pointerdown", handler);
            window.removeEventListener("keydown", handler);
        };
    }, [engine]);

    return {
        engine,
        play: (opts: PlayOptions) => engine.play(opts),
        stopChannel: (ch: string, fadeOutMs?: number) => engine.stopChannel(ch, fadeOutMs),
        stopAll: (fadeOutMs?: number) => engine.stopAll(fadeOutMs),
        setMasterVolume: (v: number) => engine.setMasterVolume(v),
    };
}
