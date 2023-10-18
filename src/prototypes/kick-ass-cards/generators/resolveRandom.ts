import { range } from "lodash";
import generateWord, { GenerateWordOptionsType } from "./generateWord";
import ArrayItem from "../../../utils/ArrayItemType";

export type DeepRandomUnresolvedType<T> =
    | DeepRandomValueType<T>
    | DeepRandomWordType
    | DeepRandomArrayType<T>
    | DeepRandomMultipleType<T[]>
    | DeepRandomRangeType
    | DeepRandomObjectType<T>
    | DeepRandomWeightedType<T>
    | DeepRandomTemplateType;

export type DeepRandomType<T> = T | (DeepRandomUnresolvedType<T> & ReferenceConditionType);

export type ReferenceConditionType = {
    _prop?: string;
    _lessThan?: number;
    _lessThanEquals?: number;
    _greaterThan?: number;
    _greaterThanEquals?: number;
    _equals?: any;
    _notEquals?: any;
};

// type that maps values of properties to DeepRandomType
export type DeepRandomObjectKeysType<T> = {
    [P in keyof T]: DeepRandomType<T[P]>;
};

export type ResolveObjectResultType<T> = {
    [P in keyof T]: T[P] extends DeepRandomUnresolvedType<T> ? never : T[P] | null;
};

export type UnwrapDeepRandomType<T> = T extends DeepRandomType<infer U> ? UnwrapDeepRandomType<U> : T;
export type DeepRandomValueType<T> = { _rValue: DeepRandomType<T> };
export type DeepRandomWordType = { _rWord: GenerateWordOptionsType };
export type DeepRandomMultipleType<T> = {
    _rMultiple: DeepRandomType<T>;
    _count: DeepRandomType<number>;
    _filterOutDuplicates?: boolean;
};
export type DeepRandomRangeType = { _rRange: { from?: number; to: number; precision?: number } };
export type DeepRandomObjectType<T> = { _rObject: DeepRandomObjectKeysType<T> };
export type DeepRandomArrayType<T> = { _rArray: DeepRandomType<T>[] };
export type DeepRandomWeightedItemType<T> =
    | [DeepRandomType<T>, number]
    | [DeepRandomType<T>, number, ReferenceConditionType];
export type DeepRandomWeightedType<T> = { _rWeighted: DeepRandomWeightedItemType<T>[] };
export type DeepRandomTemplateType = {
    _rTemplate: string;
    _variables: { [key: string]: DeepRandomType<string | number> };
};

export type Resolver<T, R> = (
    random: DeepRandomType<T>,
    reference?: R,
    resolver?: Resolver<T, R>
) => ResolveResultType<DeepRandomType<T>> | T;

export const randomNumber = (min: number = 0, max: number = 0, precision: number = 1) => {
    const preciseValue = Math.random() * (max - min + precision) + min;
    if (precision === 0) {
        return preciseValue;
    }
    return Math.max(Math.min(Math.floor(preciseValue / precision) * precision, max), min);
};

export const randomValue = <T extends any>(values: T[]) => {
    if (values.length === 0) {
        return null;
    }
    return values[Math.floor(Math.random() * values.length)];
};

export const weightedRandom = <T extends any>(weightedValues: DeepRandomWeightedType<T>["_rWeighted"]) => {
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

export const isRandomValueType = <T>(random: any): random is DeepRandomValueType<T> => {
    return random !== null && typeof random === "object" && "_rValue" in random;
};

export const isRandomWordType = <T extends string>(random: any): random is DeepRandomWordType => {
    return random !== null && typeof random === "object" && "_rWord" in random;
};

export const isRandomObjectType = <T>(random: any): random is DeepRandomObjectType<T> => {
    return random !== null && typeof random === "object" && "_rObject" in random;
};

export const isRandomArrayType = <T>(random: any): random is DeepRandomArrayType<T> => {
    return random !== null && typeof random === "object" && "_rArray" in random;
};

export const isRandomWeightedType = <T>(random: any): random is DeepRandomWeightedType<T> => {
    return random !== null && typeof random === "object" && "_rWeighted" in random;
};

export const isReferenceConditionType = <T>(random: any): random is ReferenceConditionType => {
    return random !== null && typeof random === "object" && "_prop" in random;
};

export const isRandomMultipleType = <T>(random: any): random is DeepRandomMultipleType<T> => {
    return random !== null && typeof random === "object" && "_rMultiple" in random;
};

export const isRandomRangeType = <T>(random: any): random is DeepRandomRangeType => {
    return random !== null && typeof random === "object" && "_rRange" in random;
};

export const isRandomTemplateType = <T>(random: any): random is DeepRandomTemplateType => {
    return random !== null && typeof random === "object" && "_rTemplate" in random;
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
            return undefined;
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

        return undefined;
    }
    return pointer;
};

const checkReferenceCondition = <R>(item: ReferenceConditionType, reference: R) => {
    if (item._prop) {
        const referenceValue = resolveReferenceValue(reference, item._prop);
        if (referenceValue === undefined) {
            return false;
        }
        if ("_equals" in item && referenceValue !== item._equals) {
            return false;
        }
        if ("_notEquals" in item && referenceValue === item._notEquals) {
            return false;
        }
        if ("_lessThan" in item && item._lessThan !== undefined && Number(referenceValue) >= item._lessThan) {
            return false;
        }
        if (
            "_lessThanEquals" in item &&
            item._lessThanEquals !== undefined &&
            Number(referenceValue) > item._lessThanEquals
        ) {
            return false;
        }
        if ("_greaterThan" in item && item._greaterThan !== undefined && Number(referenceValue) <= item._greaterThan) {
            return false;
        }
        if (
            "_greaterThanEquals" in item &&
            item._greaterThanEquals !== undefined &&
            Number(referenceValue) < item._greaterThanEquals
        ) {
            return false;
        }
        return true;
    }
    return true;
};

const resolveRandom = <T, R>(
    random: DeepRandomType<T>,
    reference?: R,
    resolver?: Resolver<any, any>
): ResolveResultType<DeepRandomType<T>> | T => {
    const currentResolver = resolver || resolveRandom;
    // deep filter weights and conditions
    if (isReferenceConditionType(random)) {
        if (!checkReferenceCondition(random, reference)) {
            return null;
        }
    }

    if (isRandomWeightedType(random)) {
        const filteredOptions = random._rWeighted.filter(([value, weight, condition]) => {
            if (weight <= 0) {
                return false;
            }
            if (isReferenceConditionType(condition) && !checkReferenceCondition(condition, reference)) {
                return false;
            }
            if (isReferenceConditionType(value) && !checkReferenceCondition(value, reference)) {
                return false;
            }
            return true;
        });
        const weightedResult = weightedRandom(filteredOptions);
        if (weightedResult !== null) {
            return currentResolver(weightedResult, reference) as ResolveResultType<T>;
        }
        return null;
    }
    if (isRandomArrayType(random)) {
        const filteredOptions = random._rArray.filter((item) => {
            if (isReferenceConditionType(item) && !checkReferenceCondition(item, reference)) {
                return false;
            }
            return true;
        });
        const arrayResult = randomValue(filteredOptions);
        if (arrayResult !== null) {
            return currentResolver(arrayResult, reference);
        }
        return null;
    }
    if (isRandomObjectType(random)) {
        const keys = Object.keys(random._rObject) as (keyof typeof random._rObject)[];
        const randomObject = keys.reduce((result, key) => {
            (result as any)[key] = currentResolver(random._rObject[key], reference !== undefined ? reference : result);
            return result;
        }, {} as ResolveObjectResultType<T>);

        return randomObject;
    }
    if (isRandomRangeType(random)) {
        return randomNumber(random._rRange.from, random._rRange.to, random._rRange.precision);
    }
    if (isRandomMultipleType(random)) {
        const count = currentResolver(random._count, reference);
        if (typeof count !== "number" || count === null) {
            return [];
        }
        random;
        const results = range(count).map(() => {
            const result = currentResolver(random._rMultiple, reference) as T;
            return result;
        });
        return results.filter((result, resultIndex, results) => {
            // removes duplicates
            if (random._filterOutDuplicates && results.indexOf(result) !== resultIndex) {
                return false;
            }
            return result !== null;
        }) as ResolveObjectResultType<T>;
    }
    if (isRandomWordType(random)) {
        const word = generateWord(random._rWord);
        return word;
    }
    if (isRandomValueType(random)) {
        return currentResolver(random._rValue, reference);
    }
    if (isRandomTemplateType(random)) {
        return random._rTemplate.replace(/\$\{[\w|_]*\}/g, (match) => {
            const key = match.slice(2, match.length - 1);
            return (key in random._variables && String(currentResolver(random._variables[key], reference))) || "";
        });
    }
    return random;
};

export default resolveRandom;

const value = resolveRandom(123);
// assert(value === 123);
// console.log(value);

const array = resolveRandom({ _rArray: [1, 2, 3] });
// console.log(array);
// assert([1, 2, 3].includes(array as number));

const deepArray = resolveRandom({ _rArray: [1, { _rArray: [2, 3, 4, 5, 6, 7] }] });
// console.log(deepArray);
// assert([1, 2, 3, 4, 5, 6, 7].includes(deepArray as number));

const valueConditionTrue = resolveRandom({ _rValue: 123, _prop: "a", _equals: 1 }, { a: 1 });
// assert(valueConditionTrue === 123);
// console.log(valueConditionTrue);
const valueConditionFalse = resolveRandom({ _rValue: 123, _prop: "a", _equals: 0 }, { a: 1 });
// assert(valueConditionFalse === null);
// console.log(valueConditionFalse);

const arrayCondition = resolveRandom({ _rArray: [1, 2, 3], _prop: "a" }, { a: 1 });
// console.log(arrayCondition);
// assert([1, 2, 3].includes(arrayCondition as number));

const arrayItemConditionTrue = resolveRandom(
    { _rArray: [{ _rValue: 3, _prop: "a", _equals: 1 }], _prop: "a" },
    { a: 1 }
);
// console.log(arrayItemConditionTrue);
// assert([1, 2, 3].includes(arrayItemConditionTrue as number));
/* const arrayItemConditionFalse = resolveRandom(
    { _rArray: [{ _rValue: 3, _prop: "a", _equals: 0 }, 2], _prop: "a" },
    { a: 1 }
); */
// console.log(arrayItemConditionFalse);
// assert([1, 2, 3].includes(arrayItemConditionFalse as number));

const deepArrayCondition = resolveRandom({ _rArray: [1, { _rArray: [2, 3, 4, 5, 6, 7] }] });
// console.log(deepArrayCondition);
// assert([1, 2, 3, 4, 5, 6, 7].includes(deepArrayCondition as number));

export type ResolveResultType<T> = T extends DeepRandomObjectType<infer T>
    ? ResolveObjectResultType<T>
    : T extends DeepRandomMultipleType<infer T>
    ? ResolveResultType<T>
    : T extends DeepRandomWeightedType<infer T>
    ? ResolveResultType<T>
    : T extends DeepRandomValueType<infer T>
    ? ResolveResultType<T>
    : T extends DeepRandomWordType
    ? string | null
    : T extends DeepRandomArrayType<infer T>
    ? ResolveResultType<T>
    : T extends DeepRandomRangeType
    ? number
    : T extends DeepRandomTemplateType
    ? string
    : T;
/*
export type XNumber = ResolveResultType<number>;
export type XArray = ResolveResultType<number[]>;

export type XDeepRandomValueType = ResolveResultType<DeepRandomValueType<string>>;
export type XDeepRandomWordType = ResolveResultType<DeepRandomWordType>;
export type XDeepRandomArrayType = ResolveResultType<DeepRandomArrayType<string>>;
export type XDeepRandomRangeType = ResolveResultType<DeepRandomRangeType>;
export type XDeepRandomObjectType = ResolveResultType<DeepRandomObjectType<string>>;
export type XDeepRandomWeightedType = ResolveResultType<DeepRandomWeightedType<string>>;

export type XDeepRandomMultipleType = ResolveResultType<DeepRandomMultipleType<string[]>>;
export type XDeepRandomMultipleType2 = ResolveResultType<DeepRandomMultipleType<DeepRandomArrayType<string[]>>>;

export type RandomRef1 = ResolveResultType<typeof simpleMultiple>;

const simpleMultiple = {
    _rMultiple: 1,
    _count: 1,
};

const x1:number = resolveRandom({
    _rMultiple: 1,
    _count: 1,
});

const x2: (number | null)[] = resolveRandom({
    _rMultiple: 1,
    _count: 1,
});
const x3: number[] | null = resolveRandom({
    _rMultiple: 1,
    _count: 1,
});
const x4: number[] = resolveRandom({
    _rMultiple: { _rArray: [1] },
    _count: 1,
});

export type X = ResolveResultType<{
    _rMultiple: { _rArray: { positiveRating: number; male: string; female: string; neutral: string }[] };
}>;
export type X2 = ResolveResultType<{
    _rArray: {
        positiveRating: number;
        male: string;
        female: string;
        neutral: string;
    }[];
}>;*/
