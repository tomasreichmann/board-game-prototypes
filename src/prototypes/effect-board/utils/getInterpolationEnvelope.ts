export const getInterpolationEnvelope = (
    elapsedMs: number,
    durationMs: number,
    attackMs: number,
    decayMs: number
): number => {
    const normalizedElapsedMs = (elapsedMs + durationMs) % durationMs;
    if (elapsedMs < attackMs) {
        return normalizedElapsedMs / attackMs;
    } else if (elapsedMs < durationMs - decayMs) {
        return 1;
    }
    const decayStartMs = durationMs - decayMs;
    return 1 - (normalizedElapsedMs - decayStartMs) / decayMs;
};
