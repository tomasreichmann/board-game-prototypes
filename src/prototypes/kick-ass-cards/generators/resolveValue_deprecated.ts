export type WeightedRange<T> = {
    values: T[];
    weights: number[];
};
export type ValueOrRangeOrWeightedRange<T> = T | T[] | WeightedRange<T>;

export const randomNumber = (min: number, max: number, precision = 1) => {
    const preciseValue = Math.random() * (max - min) + min;
    if (precision === 0) {
        return preciseValue;
    }
    return Math.max(Math.min(Math.floor(preciseValue / precision) * precision, max), min);
};

export const randomValue = <T>(values: T[]) => {
    return values[Math.floor(Math.random() * values.length)];
};

export const weightedRandom = <T>(values: T[], weights: number[]) => {
    let normalizedWeights = weights;
    if (values.length !== normalizedWeights.length || weights.some((weight) => weight < 0)) {
        normalizedWeights = values.map((_, index) => {
            const originalWeight = weights[index];
            if (originalWeight < 0) {
                return 0;
            }
            if (typeof originalWeight !== "number" || isNaN(originalWeight)) {
                return 0;
            }
            return originalWeight;
        });
        console.warn(
            "Invalid weights. Values (" +
                values.length +
                "): " +
                values +
                ", Weights (" +
                weights.length +
                ") : " +
                weights.length +
                " Normalized Weights (" +
                normalizedWeights.length +
                "): " +
                normalizedWeights
        );
    }
    const totalWeights = normalizedWeights.reduce((a, b) => a + b);
    if (totalWeights === 0) {
        console.warn("Total weights are zero.");
        return null;
    }
    const rand = Math.random() * totalWeights;
    let sum = 0;
    for (let i = 0; i < normalizedWeights.length; i++) {
        sum += normalizedWeights[i];
        if (sum > rand) {
            return values[i] as T;
        }
    }
    return null;
};

export const resolveValueOrConditionList = <T>(
    randomization: ValueOrRangeOrWeightedRange<T> | { max: number; value: ValueOrRangeOrWeightedRange<T> }[],
    value?: number,
    resolveValueOptions?: ResolveValueOptionsType
) => {
    if (
        Array.isArray(randomization) &&
        value !== undefined &&
        Object.hasOwn(randomization[0] as object, "max") &&
        Object.hasOwn(randomization[0] as object, "value")
    ) {
        const conditionList = randomization as { max: number; value: ValueOrRangeOrWeightedRange<T> }[];
        const match = conditionList.find((conditionItem) => value <= conditionItem.max);
        if (match) {
            return resolveValue(match.value, resolveValueOptions) as T;
        }
        return null;
    }
    return resolveValue(randomization as ValueOrRangeOrWeightedRange<T>, resolveValueOptions) as T;
};

export const resolveValueOrMap = <T, Key extends string | number | symbol>(
    randomization: ValueOrRangeOrWeightedRange<T> | { [key in Key]: ValueOrRangeOrWeightedRange<T> },
    value?: Key,
    resolveValueOptions?: ResolveValueOptionsType
) => {
    if (typeof randomization === "object" && value !== undefined && Object.hasOwn(randomization as object, value)) {
        return resolveValue(
            (randomization as { [key in Key]: ValueOrRangeOrWeightedRange<T> })[
                value
            ] as ValueOrRangeOrWeightedRange<T>,
            resolveValueOptions
        ) as T;
    }
    return resolveValue(randomization as ValueOrRangeOrWeightedRange<T>, resolveValueOptions) as T;
};

export type ResolveValueOptionsType = {
    rangePrecision?: number;
};

/**
 * @deprecated This function is deprecated. Use resolveRandom instead.
 * Resolves a value from a given randomization.
 *
 * @param {ValueOrRangeOrWeightedRange<T,>} randomization - The randomization to resolve a value from.
 * @param {ResolveValueOptionsType} [options] - Optional options object.
 * @param {number} [options.rangePrecision=1] - The precision to use when resolving a value from a range.
 * @return {T} - The resolved value.
 */
const resolveValue = <T>(
    randomization: ValueOrRangeOrWeightedRange<T>,
    { rangePrecision = 1 }: ResolveValueOptionsType = {}
) => {
    if (Array.isArray(randomization)) {
        if (
            typeof randomization[0] === "number" &&
            typeof randomization[1] === "number" &&
            randomization.length === 2
        ) {
            // range
            const [min, max] = randomization as unknown as [number, number];
            return randomNumber(min, max, rangePrecision) as T;
        }
        return randomValue(randomization) as T;
    }
    if (
        randomization !== null &&
        typeof randomization === "object" &&
        "values" in randomization &&
        "weights" in randomization
    ) {
        const weightedRandomization = weightedRandom(randomization.values, randomization.weights);
        if (weightedRandomization !== null) {
            return weightedRandomization as T;
        }
    }
    return randomization as T;
};

export default resolveValue;
