type DeepRandomType<T> =
    | T
    | ((DeepRandomValueType<T> | DeepRandomArrayType<T> | DeepRandomWeightedType<T>) & ReferenceConditionType);
type ReferenceConditionType = {
    _referenceConditionProp?: string;
    _min?: number;
    _max?: number;
    _equals?: any;
};
type DeepRandomValueType<T> = { _randomValue: DeepRandomType<T> };
type DeepRandomArrayType<T> = { _randomArray: DeepRandomType<T>[] };
type DeepRandomWeightedType<T> = { _randomWeighted: [DeepRandomType<T>, number][] };

export const randomValue = <T extends any>(values: T[]) => {
    return values[Math.floor(Math.random() * values.length)];
};

export const weightedRandom = <T extends any>(weightedValues: DeepRandomWeightedType<T>["_randomWeighted"]) => {
    let sum = 0;
    const totalWeights = weightedValues.reduce((total, weightedItem) => total + weightedItem[1], 0);
    const rand = Math.random() * totalWeights;
    for (let i = 0; i < weightedValues.length; i++) {
        sum += weightedValues[i][1];
        if (sum > rand) {
            return weightedValues[i][0] as T;
        }
    }
    const values = weightedValues.map((value) => value[0]);
    const weights = weightedValues.map((value) => value[1]);
    console.warn(
        "weightedRandom did not resolve. Values (" +
            values.length +
            "): " +
            values +
            ", Weights (" +
            weights.length +
            ") : " +
            weights.length
    );
    return null;
};

const isRandomValueType = <T>(random: any): random is DeepRandomValueType<T> => {
    return typeof random === "object" && "_randomValue" in random;
};

const isRandomArrayType = <T>(random: any): random is DeepRandomArrayType<T> => {
    return typeof random === "object" && "_randomArray" in random;
};

const isRandomWeightedType = <T>(random: any): random is DeepRandomWeightedType<T> => {
    return typeof random === "object" && "_randomWeighted" in random;
};

const isReferenceConditionType = <T>(random: any): random is ReferenceConditionType => {
    return typeof random === "object" && "_referenceConditionProp" in random;
};

const resolveReferenceValue = <R>(reference: R, path: string) => {
    const pathFragments = path.split(".");
    let pointer: unknown = reference;
    for (let i = 0; i < pathFragments.length; i++) {
        const fragment = pathFragments[i];
        if (pointer === null) {
            console.warn(
                `Could not resolve path "${path}". Invalid fragment ${fragment} in ${JSON.stringify(pointer)}`
            );
            return null;
        }
        if (typeof pointer === "object" && fragment in pointer) {
            pointer = pointer[fragment as keyof typeof pointer];
            continue;
        }
        const numberFragment = Number(fragment);
        if (Array.isArray(pointer) && !isNaN(numberFragment)) {
            pointer = pointer[numberFragment];
            continue;
        }
        console.warn(`Could not resolve path "${path}". Invalid fragment ${fragment} in ${JSON.stringify(pointer)}`);

        return null;
    }
    return pointer;
};

const checkReferenceCondition = <T, R>(item: ReferenceConditionType, reference: R) => {
    if (item._referenceConditionProp) {
        const referenceValue = resolveReferenceValue(reference, item._referenceConditionProp);
        console.log(referenceValue);
        if ("_equals" in item && referenceValue !== item._equals) {
            return false;
        }
        if ("_min" in item && item._min !== undefined && Number(referenceValue) < item._min) {
            return false;
        }
        if ("_max" in item && item._max !== undefined && Number(referenceValue) > item._max) {
            return false;
        }
    }
    return true;
};

const deepFilterRandom = <T, R>(random: DeepRandomType<T>, reference: R): DeepRandomType<T> | null => {
    if (isRandomWeightedType(random)) {
        return {
            ...random,
            _randomWeighted: random._randomWeighted.filter(([_, weight]) => {
                if (weight <= 0) {
                    return false;
                }
                return checkReferenceCondition(random, reference);
            }),
        };
    }
    if (isRandomArrayType(random)) {
    }
    if (isRandomValueType(random)) {
    }
    return random;
};

const resolveRandom = <T, R>(random: DeepRandomType<T>, reference?: R, skipFiltering?: boolean): T | null => {
    // deep filter weights and conditions
    if (!skipFiltering && isReferenceConditionType(random)) {
        if (!checkReferenceCondition(random, reference)) {
            return null;
        }
    }

    if (isRandomWeightedType(random)) {
        const weightedResult = weightedRandom(random._randomWeighted);
        if (weightedResult !== null) {
            return resolveRandom(weightedResult, reference, true);
        }
        return null;
    }
    if (isRandomArrayType(random)) {
        return resolveRandom(randomValue(random._randomArray), reference, true);
    }
    if (isRandomValueType(random)) {
        return resolveRandom(random._randomValue, reference, true);
    }
    return random;
};
const value = resolveRandom(123);
// assert(value === 123);
console.log(value);

const array = resolveRandom({ _randomArray: [1, 2, 3] });
console.log(array);
// assert([1, 2, 3].includes(array as number));

const deepArray = resolveRandom({ _randomArray: [1, { _randomArray: [2, 3, 4, 5, 6, 7] }] });
console.log(deepArray);
// assert([1, 2, 3, 4, 5, 6, 7].includes(deepArray as number));

const valueConditionTrue = resolveRandom({ _randomValue: 123, _referenceConditionProp: "a", _equals: 1 }, { a: 1 });
// assert(valueConditionTrue === 123);
console.log(valueConditionTrue);
const valueConditionFalse = resolveRandom({ _randomValue: 123, _referenceConditionProp: "a", _equals: 0 }, { a: 1 });
// assert(valueConditionFalse === null);
console.log(valueConditionFalse);

const arrayCondition = resolveRandom({ _randomArray: [1, 2, 3] });
console.log(arrayCondition);
// assert([1, 2, 3].includes(arrayCondition as number));

const deepArrayCondition = resolveRandom({ _randomArray: [1, { _randomArray: [2, 3, 4, 5, 6, 7] }] });
console.log(deepArrayCondition);
// assert([1, 2, 3, 4, 5, 6, 7].includes(deepArrayCondition as number));
