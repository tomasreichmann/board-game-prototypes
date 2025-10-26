/**
 * Create a deterministic noise-modulated envelope ease:
 *  - Attack: 0 → 1 over `attack` (fraction of duration)
 *  - Decay: exponential fall to 0 after the attack
 *  - Chaos: band-limited noise that fades out over time
 *
 * t ∈ [0,1]  →  value ∈ [0,1]
 */
export function createNoiseEnvelopeEase(
    seed = 1,
    {
        attack = 0.08, // fraction of duration for the rise (0..1)
        attackExp = 0.35, // <1 = snappier rise, >1 = slower rise
        decay = 6, // larger = faster post-attack fade
        chaos0 = 0.7, // initial flicker strength (0..1)
        chaosFalloff = 2, // how quickly flicker vanishes (power on 1 - t)
    } = {}
) {
    // Tiny seeded PRNG for stable phases
    const rand = (() => {
        let s = seed >>> 0 || 1;
        return () => (s = (s * 1664525 + 1013904223) >>> 0) / 0xffffffff;
    })();

    // Fixed random phases for repeatable "chaos"
    const φ1 = rand() * Math.PI * 2;
    const φ2 = rand() * Math.PI * 2;
    const φ3 = rand() * Math.PI * 2;

    // Clamp helper
    const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);

    const a = clamp01(attack);
    const invA = a > 0 ? 1 / a : 0; // avoid div by zero
    const decayNorm = 1 - a > 0 ? 1 - a : 1; // normalize decay span

    return (tIn: number) => {
        let t = clamp01(tIn);

        // Envelope: piecewise attack→decay, continuous at t = a
        let envelope: number;
        if (t <= a && a > 0) {
            // Attack: 0→1 with adjustable curvature
            const u = t * invA; // 0..1 within attack
            envelope = Math.pow(u, attackExp);
        } else {
            // Decay: exponential fall from 1 to ~0 over (a..1]
            const u = (t - a) / decayNorm; // 0..1 after attack
            envelope = Math.exp(-decay * u);
        }

        // Chaos amplitude shrinks over time
        const chaosAmp = chaos0 * Math.pow(1 - t, chaosFalloff);

        // Smooth “crackly” noise in [-1, 1]
        const noise = 0.6 * Math.sin(90 * t + φ1) + 0.3 * Math.sin(180 * t + φ2) + 0.1 * Math.sin(450 * t + φ3);

        // Modulate around 1.0 so peak brightness stays high in early phase
        const value = envelope * (1 + chaosAmp * noise);

        return clamp01(value);
    };
}

export const lightningEase = createNoiseEnvelopeEase(1, {
    attack: 0.04, // very snappy rise
    attackExp: 0.5, // fast curve
    decay: 9, // quick falloff
    chaos0: 0.8, // strong early flicker
    chaosFalloff: 2, // flicker dies fairly fast
});

export function linear(t: number): number {
    return t;
}

export function quadratic(t: number): number {
    return t * t;
}

export function cubic(t: number): number {
    return t * t * t;
}

export function bounce(t: number): number {
    if (t < 0.5) {
        return 4 * t * t;
    }
    return 1 - 2 * Math.pow(1 - t, 2);
}

// Fireplace flicker: continuous intensity generator in [0,1].
// Call with t = seconds since start (monotonic).
export function createFireFlicker(
    seed = 1,
    opts?: {
        /** Baseline brightness (never goes below this). 0..1 */
        base?: number; // default 0.35
        /** Max added amplitude above base. 0..(1-base) */
        amp?: number; // default 0.55
        /** Ranges for low/mid/high bands (Hz) */
        lowHz?: [number, number]; // default [1.0, 2.2]
        midHz?: [number, number]; // default [6, 10]
        highHz?: [number, number]; // default [25, 40]
        /** Slow drift (envelope) Hz and depth */
        driftHz?: number; // default 0.18
        driftDepth?: number; // default 0.35  (0..1)
        /** Occasional soft pops: rate (Hz), strength, sharpness power */
        popHz?: number; // default 0.6
        popStrength?: number; // default 0.12
        popSharpness?: number; // default 7
    }
) {
    const p = {
        base: 0.35,
        amp: 0.55,
        lowHz: [1.0, 2.2] as [number, number],
        midHz: [6, 10] as [number, number],
        highHz: [25, 40] as [number, number],
        driftHz: 0.18,
        driftDepth: 0.35,
        popHz: 0.6,
        popStrength: 0.12,
        popSharpness: 7,
        ...opts,
    };

    // Simple seeded RNG (Mulberry32)
    function mulberry32(a: number) {
        return function () {
            let t = (a += 0x6d2b79f5) | 0;
            t = Math.imul(t ^ (t >>> 15), t | 1);
            t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    }
    const rnd = mulberry32(seed >>> 0 || 1);
    const TAU = Math.PI * 2;

    // Random pick helpers
    const pick = (min: number, max: number) => min + (max - min) * rnd();
    const φ = () => rnd() * TAU;

    // Freeze band params (deterministic)
    const fL = pick(p.lowHz[0], p.lowHz[1]),
        phL = φ();
    const fM = pick(p.midHz[0], p.midHz[1]),
        phM = φ();
    const fH = pick(p.highHz[0], p.highHz[1]),
        phH = φ();

    // Slight, slow modulation of mid/high band gains for organic feel
    const fMod1 = 0.11 + 0.04 * rnd();
    const fMod2 = 0.07 + 0.03 * rnd();
    const phMod1 = φ();
    const phMod2 = φ();

    // Pop phase
    const phPop = φ();

    const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);

    return (tSec: number) => {
        const t = Math.max(0, tSec);

        // Slow “breathing” envelope (0..1): biases overall amplitude
        const drift = 1 - p.driftDepth + p.driftDepth * (0.5 + 0.5 * Math.sin(TAU * p.driftHz * t));

        // Band weights gently drift over time
        const wM = 0.7 + 0.3 * (0.5 + 0.5 * Math.sin(TAU * fMod1 * t + phMod1));
        const wH = 0.5 + 0.5 * (0.5 + 0.5 * Math.sin(TAU * fMod2 * t + phMod2));
        const wL = 1.0; // low band stable

        // Band-limited “noise”
        const low = Math.sin(TAU * fL * t + phL);
        const mid = Math.sin(TAU * fM * t + phM);
        const high = Math.sin(TAU * fH * t + phH);

        // Rectify & mix (keep energy positive; fireplace doesn’t black out)
        const rect = (x: number) => Math.abs(x); // half-wave style energy
        let noise = 0.55 * wL * rect(low) + 0.35 * wM * rect(mid) + 0.2 * wH * rect(high);

        // Normalize mixed noise to ~[0,1]
        noise = clamp01(noise);

        // Occasional soft pops (brief flares)
        // A sharp, rectified sinus that spikes quickly then vanishes
        const pop = p.popStrength * Math.pow(Math.max(0, Math.sin(TAU * p.popHz * t + phPop)), p.popSharpness);

        // Combine: base + amplitude * (drifted noise + pops)
        const value = p.base + p.amp * clamp01(drift * noise + pop);

        return clamp01(value);
    };
}

export const flicker = createFireFlicker(1337, {
    base: 0.38,
    amp: 0.55,
    popStrength: 0.1,
    popHz: 0.5,
});
