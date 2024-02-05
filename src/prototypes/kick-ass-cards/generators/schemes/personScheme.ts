import { culturesSyllablesData } from "../../data/cultures-syllables";
import resolveRandom, { DeepRandomMultipleType, DeepRandomType, ReferenceConditionType } from "../resolveRandom";

import firstNamesCzechFemaleRaw from "../../data/first-names-czech-female.csv";
import firstNamesCzechMaleRaw from "../../data/first-names-czech-male.csv";
import lastNamesCzechRaw from "../../data/last-names-czech.csv";
import occupations from "../../data/LSV-occupations-cs.csv";
import LSVOccupationsCs from "../../data/LSV-occupations-cs-cleaned";
import ageDistributionData from "../../data/age-distribution-18th-century-cleaned";

export const lastNamesCzech = lastNamesCzechRaw.map((item) => ({
    family: item.family,
    male: item.male,
    female: item.female,
    maleWeight: Number(item.maleWeight),
    femaleWeight: Number(item.femaleWeight),
}));
export const familyNamesCzechWeightedRange = lastNamesCzech.reduce(
    (result, { family, male, female, maleWeight, femaleWeight }) => {
        result.values.push({ male, female, family });
        result.weights.push(maleWeight + femaleWeight);
        return result;
    },
    {
        values: [] as { family: string; male: string; female: string }[],
        weights: [] as number[],
    }
);
export const lastNamesCzechMale = lastNamesCzechRaw.map(({ male }) => male);
export const lastNamesCzechMaleWeightedRangeDeprecated = lastNamesCzech.reduce(
    (result, { male, maleWeight }) => {
        result.values.push(male);
        result.weights.push(maleWeight);
        return result;
    },
    {
        values: [] as string[],
        weights: [] as number[],
    }
);
export const lastNamesCzechFemaleWeightedRangeDeprecated = lastNamesCzech.reduce(
    (result, { female, femaleWeight }) => {
        result.values.push(female);
        result.weights.push(femaleWeight);
        return result;
    },
    {
        values: [] as string[],
        weights: [] as number[],
    }
);
export const firstNamesCzechMale = firstNamesCzechMaleRaw.map((item) => ({
    name: item.name,
    weight: Number(item.weight),
    order: item.order,
}));
export const firstNamesCzechFemale = firstNamesCzechFemaleRaw.map((item) => ({
    name: item.name,
    weight: Number(item.weight),
    order: item.order,
}));

export const firstNamesCzechMaleWeightedRange = firstNamesCzechMale.map(
    ({ name, weight }) => [name, weight] as [string, number]
);
export const firstNamesCzechFemaleWeightedRange = firstNamesCzechFemale.map(
    ({ name, weight }) => [name, weight] as [string, number]
);
export const lastNamesCzechMaleWeightedRange = lastNamesCzech.map(({ male: name, maleWeight: weight }) => {
    return [name, weight] as [string, number];
});
export const lastNamesCzechFemaleWeightedRange = lastNamesCzech.map(({ female: name, femaleWeight: weight }) => {
    return [name, weight] as [string, number];
});

export enum GenderEnum {
    Male = "male",
    Female = "female",
}

export const defaultGenderRange = [GenderEnum.Male, GenderEnum.Female] as GenderEnum[];
export const defaultFirstNameRangeMap = {
    [GenderEnum.Male]: firstNamesCzechMaleWeightedRange,
    [GenderEnum.Female]: firstNamesCzechFemaleWeightedRange,
};
export const defaultLastNameRangeMap = {
    [GenderEnum.Male]: lastNamesCzechMaleWeightedRangeDeprecated,
    [GenderEnum.Female]: lastNamesCzechFemaleWeightedRangeDeprecated,
};
export const defaultAgeRange = [0, 100];
export const defaultIsAliveAgeRangeList = [
    { max: 1, value: { values: [true, false], weights: [70, 30] } },
    { max: 15, value: { values: [true, false], weights: [80, 20] } },
    { max: 30, value: { values: [true, false], weights: [90, 10] } },
    { max: 45, value: { values: [true, false], weights: [90, 10] } },
    { max: 60, value: { values: [true, false], weights: [80, 20] } },
    { max: 100, value: { values: [true, false], weights: [70, 30] } },
    { max: 999, value: false },
];

export const defaultOccupationRangeDeprecated = {
    [GenderEnum.Male]: [
        { max: 4, value: "Batole" },
        { max: 7, value: "Dítě" },
        { max: 15, value: { values: ["Učedník", "Student"], weights: [90, 10] } },
        { max: 60, value: occupations.map(({ male }) => male) },
        { max: 999, value: null },
    ],
    [GenderEnum.Female]: [
        { max: 4, value: "Batole" },
        { max: 7, value: "Dítě" },
        { max: 15, value: { values: ["Učednice", "Studentka"], weights: [90, 10] } },
        { max: 60, value: occupations.map(({ female }) => female) },
        { max: 999, value: null },
    ],
};

export const maleOccupationOptions: DeepRandomType<string> = {
    _rWeighted: LSVOccupationsCs.map(({ male, maleWeight }) => [male, maleWeight]),
};
export const femaleOccupationOptions: DeepRandomType<string> = {
    _rWeighted: LSVOccupationsCs.map(({ female, femaleWeight }) => [female, femaleWeight]),
};

export const occupationOptions: DeepRandomType<string> = {
    _rArray: [
        { ...maleOccupationOptions, _prop: "gender", _equals: GenderEnum.Male },
        { ...femaleOccupationOptions, _prop: "gender", _equals: GenderEnum.Female },
    ],
};

export type PersonType = {
    gender: GenderEnum;
    firstName: string;
    lastName: string;
    familyName: string;
    occupation: string | null;
    toughness: number;
    threat: string;
    notes: string;
    treasure: string;
    color?: string;
    imageUri?: string;
    age: number;
    isAlive: boolean;
    relationships?: {
        mother: string;
        father: string | null;
        spouse: string;
        exSpouses: string[];
        siblings: string[];
        children: string[];
    };
};

export const genderOptions: DeepRandomType<GenderEnum> = {
    _rWeighted: [
        [GenderEnum.Male, 105],
        [GenderEnum.Female, 100],
    ],
};

export const firstNameOptions: DeepRandomType<string> = {
    _rArray: [
        { _rWeighted: firstNamesCzechMaleWeightedRange, _prop: "gender", _equals: GenderEnum.Male },
        { _rWeighted: firstNamesCzechFemaleWeightedRange, _prop: "gender", _equals: GenderEnum.Female },
    ],
};

export const lastNameOptions: DeepRandomType<string> = {
    _rArray: [
        { _rWeighted: lastNamesCzechMaleWeightedRange, _prop: "gender", _equals: GenderEnum.Male },
        { _rWeighted: lastNamesCzechFemaleWeightedRange, _prop: "gender", _equals: GenderEnum.Female },
    ],
};

export const ageOptions: DeepRandomType<number> = {
    _rWeighted: ageDistributionData.map(
        ({ fromAge, toAge, percentage }) =>
            [{ _rRange: { from: fromAge, to: toAge } }, percentage] as [DeepRandomType<number>, number]
    ),
};

const personScheme = {
    _rObject: {
        gender: genderOptions,
        firstName: firstNameOptions,
        age: ageOptions,
        /*
        lastName,
        familyName,
        occupation,
        toughness,
        threat,
        notes,
        treasure,
        color,
        */
        imageUri: undefined,
        isAlive: true,
    },
};
export default personScheme;
