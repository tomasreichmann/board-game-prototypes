import resolveValue, {
    ValueOrRangeOrWeightedRange,
    resolveValueOrConditionList,
    resolveValueOrMap,
} from "./resolveValue";
import firstNamesCzechFemaleRaw from "../data/first-names-czech-female.csv";
import firstNamesCzechMaleRaw from "../data/first-names-czech-male.csv";
import lastNamesCzechRaw from "../data/last-names-czech.csv";
import occupations from "../data/LSV-occupations-cs.csv";

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
export const lastNamesCzechMaleWeightedRange = lastNamesCzech.reduce(
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
export const lastNamesCzechFemaleWeightedRange = lastNamesCzech.reduce(
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
export const firstNamesCzechMaleWeightedRange = firstNamesCzechMale.reduce(
    (result, { name, weight }) => {
        result.values.push(name);
        result.weights.push(weight);
        return result;
    },
    {
        values: [] as string[],
        weights: [] as number[],
    }
);
export const firstNamesCzechFemaleWeightedRange = firstNamesCzechFemale.reduce(
    (result, { name, weight }) => {
        result.values.push(name);
        result.weights.push(weight);
        return result;
    },
    {
        values: [] as string[],
        weights: [] as number[],
    }
);

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
    [GenderEnum.Male]: lastNamesCzechMaleWeightedRange,
    [GenderEnum.Female]: lastNamesCzechFemaleWeightedRange,
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

export const defaultOccupationRange = {
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

export type Person = {
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

export type GeneratePersonOptions = {
    genderData?: ValueOrRangeOrWeightedRange<GenderEnum>;
    firstNameData?: ValueOrRangeOrWeightedRange<string> | { [key in GenderEnum]: ValueOrRangeOrWeightedRange<string> };
    familyNameData?: ValueOrRangeOrWeightedRange<{ family: string; male: string; female: string }>;
    ageData?: ValueOrRangeOrWeightedRange<number>;
    isAliveData?: ValueOrRangeOrWeightedRange<boolean> | { max: number; value: ValueOrRangeOrWeightedRange<boolean> }[];
    occupationData?:
        | {
              [key in GenderEnum]:
                  | ValueOrRangeOrWeightedRange<string | null>
                  | { max: number; value: ValueOrRangeOrWeightedRange<string | null> }[];
          };
};

const generatePerson = ({
    genderData = defaultGenderRange,
    familyNameData = familyNamesCzechWeightedRange,
    ageData = defaultAgeRange,
    firstNameData = defaultFirstNameRangeMap,
    isAliveData = defaultIsAliveAgeRangeList,
    occupationData = defaultOccupationRange,
}: GeneratePersonOptions = {}) => {
    const gender = resolveValue(genderData);
    const familyNames = resolveValue(familyNameData);
    const familyName = familyNames.male;
    const age = resolveValue(ageData);
    const firstName = resolveValueOrMap(firstNameData, gender) as string;
    const lastName = familyNames[gender as "male" | "female"];
    const isAlive = resolveValueOrConditionList(isAliveData, age) as boolean;
    const occupation = resolveValueOrConditionList(occupationData[gender], age);

    return {
        gender,
        firstName,
        familyName,
        lastName,
        age,
        isAlive,
        occupation,
        /*
        toughness,
        threat,
        notes,
        treasure,
        color,
        imageUri,*/
    };
};

export default generatePerson;
