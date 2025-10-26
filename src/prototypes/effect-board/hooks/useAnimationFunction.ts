import { useEffect, useRef } from "react";

/**
 * Calls the given callback every animation frame for `durationMs` milliseconds.
 * - Cancels automatically when duration or callback changes, or on unmount.
 * - Does nothing if callback is falsy.
 * - Passes `(elapsedMs, durationMs)` to the callback each frame.
 */
export function useAnimationFunction(durationMs: number, callback?: (elapsedMs: number, durationMs: number) => void) {
    const cbRef = useRef(callback);
    cbRef.current = callback;

    useEffect(() => {
        if (!cbRef.current || durationMs <= 0) return;

        const start = performance.now();
        let raf: number;

        const tick = (now: number) => {
            const elapsed = now - start;
            if (elapsed <= durationMs && cbRef.current) {
                cbRef.current(elapsed, durationMs);
                raf = requestAnimationFrame(tick);
            }
        };

        raf = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(raf);
    }, [durationMs, callback]);
}
