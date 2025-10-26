import { useEffect, useRef } from "react";

type Easing = (t: number) => number;

/** Default easing: easeOutCubic */
const easeOutCubic: Easing = (t) => 1 - Math.pow(1 - t, 3);
const linear: Easing = (t) => t;

/**
 * Interpolates between numeric props of an object over time.
 * Skips any keys whose current or target value is null/undefined.
 */
export function useInterpolatedObject<T extends Record<string, number | null | undefined>>(
    target: T,
    durationMs: number,
    onUpdate: (v: T) => void,
    easing: Easing = linear
) {
    const rafRef = useRef<number | null>(null);
    const currentRef = useRef<T>(target);
    const updateRef = useRef(onUpdate);
    const easingRef = useRef(easing);

    // keep latest refs
    useEffect(() => {
        updateRef.current = onUpdate;
    }, [onUpdate]);
    useEffect(() => {
        easingRef.current = easing;
    }, [easing]);

    useEffect(() => {
        // cancel previous animation but keep the current value
        if (rafRef.current != null) {
            cancelAnimationFrame(rafRef.current);
        }

        const startObj = currentRef.current || ({} as T);
        const allKeys = new Set([...Object.keys(startObj), ...Object.keys(target)]);

        // Only interpolate valid numeric keys (skip null/undefined)
        const keys = Array.from(allKeys).filter((k) => {
            const startVal = (startObj as any)[k];
            const targetVal = (target as any)[k];
            return (
                typeof startVal === "number" && typeof targetVal === "number" && startVal !== null && targetVal !== null
            );
        });

        const startVals: Record<string, number> = {};
        const endVals: Record<string, number> = {};
        let allEqual = true;

        for (const k of keys) {
            const s = (startObj as any)[k] ?? 0;
            const e = (target as any)[k] ?? 0;
            startVals[k] = s;
            endVals[k] = e;
            if (s !== e) allEqual = false;
        }

        // If nothing to animate, update once and exit
        if (allEqual || durationMs <= 0) {
            const out = { ...startObj, ...target } as T;
            currentRef.current = out;
            updateRef.current(out);
            return;
        }

        const startTime = performance.now();

        const tick = (now: number) => {
            const t = Math.min((now - startTime) / durationMs, 1);
            const eased = easingRef.current(t);

            const next: Record<string, number> = {};
            for (const k of keys) {
                const s = startVals[k];
                const e = endVals[k];
                next[k] = s + (e - s) * eased;
            }

            const out = { ...(currentRef.current as any), ...next } as T;
            currentRef.current = out;
            updateRef.current(out);

            if (t < 1) rafRef.current = requestAnimationFrame(tick);
            else rafRef.current = null;
        };

        // Start the animation on the next frame, not on the current one
        rafRef.current = requestAnimationFrame((t) => tick(t + 1));
        return () => {
            if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
        };
    }, [target, durationMs]);
}
