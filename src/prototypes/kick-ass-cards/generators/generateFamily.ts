import generatePerson, {
    GenderEnum,
    GeneratePersonOptions,
    Person,
    familyNamesCzechWeightedRange,
    firstNamesCzechFemaleWeightedRange,
    firstNamesCzechMaleWeightedRange,
} from "./generatePerson";
import resolveValue, { ValueOrRangeOrWeightedRange } from "./resolveValue";

type GenerateFamilyOptions = {
    motherCount?: number;
    fatherCount?: number;
    grandmothersCount?: number;
    grandfathersCount?: number;
    auntsCount?: number;
    unclesCount?: number;
    childrenCount?: ValueOrRangeOrWeightedRange<number>;
    motherData?: GeneratePersonOptions;
    fatherData?: GeneratePersonOptions;
    childData?: GeneratePersonOptions;
    firstNamesByGender?: {
        [GenderEnum.Male]: { values: string[]; weights: number[] };
        [GenderEnum.Female]: { values: string[]; weights: number[] };
    };
    fatherMotherAgeDifference?: { minModifier: number; maxModifier: number };
};

const defaultMotherData: GeneratePersonOptions = {
    genderData: GenderEnum.Female,
    ageData: [18, 60],
};
const defaultFatherData: GeneratePersonOptions = {
    genderData: GenderEnum.Male,
    ageData: [18, 60],
};
const defaultChildData: GeneratePersonOptions = {};

const defaultFatherMotherAgeDifferenceModifier = { minModifier: 0.75, maxModifier: 2 };

const defaultFirstNamesByGender = {
    [GenderEnum.Male]: firstNamesCzechMaleWeightedRange,
    [GenderEnum.Female]: firstNamesCzechFemaleWeightedRange,
};

const filterWeightedRange = <T>(
    weightedRange: { values: T[]; weights: number[] },
    predicate: (value: T) => boolean
) => {
    weightedRange.values.filter((_, index) => weightedRange.weights[index] > 0);
    const values = [] as T[];
    const weights = [] as number[];
    weightedRange.values.forEach((value, valueIndex) => {
        if (predicate(value)) {
            values.push(value);
            weights.push(weightedRange.weights[valueIndex]);
        }
    });
    return {
        values,
        weights,
    };
};

const generateFamily = ({
    motherCount = 1,
    fatherCount = 1,
    grandmothersCount = 2,
    grandfathersCount = 2,
    childrenCount = [0, 5],
    auntsCount = 1,
    unclesCount = 1,
    motherData = defaultMotherData,
    fatherData = defaultFatherData,
    firstNamesByGender = defaultFirstNamesByGender,
    fatherMotherAgeDifference = defaultFatherMotherAgeDifferenceModifier,
    childData = defaultChildData,
}: GenerateFamilyOptions = {}) => {
    const familyName = resolveValue(motherData.familyNameData || familyNamesCzechWeightedRange);
    const mother = generatePerson({ ...motherData, familyNameData: familyName });
    const minFatherAge = mother.age * fatherMotherAgeDifference.minModifier;
    const maxFatherAge = mother.age * fatherMotherAgeDifference.maxModifier;
    const isFatherAgeDataRange = Array.isArray(fatherData.ageData) && fatherData.ageData.length === 2;
    const fatherAgeData = isFatherAgeDataRange
        ? [
              Math.max(minFatherAge, (fatherData.ageData as number[])[0]),
              Math.min(maxFatherAge, (fatherData.ageData as number[])[1]),
          ]
        : fatherData.ageData;
    const father = generatePerson({ ...fatherData, familyNameData: familyName, ageData: fatherAgeData });

    const availableFirstNames = {
        [GenderEnum.Male]: filterWeightedRange(firstNamesByGender.male, (firstName) => father.firstName !== firstName),
        [GenderEnum.Female]: filterWeightedRange(
            firstNamesByGender.female,
            (firstName) => mother.firstName !== firstName
        ),
    };

    const childrenAgeData = [0, Math.max(mother.age - 18, 0)];

    let lastChild = undefined as Pick<Person, "gender" | "firstName"> | undefined;
    const childrenCountResolved = resolveValue(childrenCount);
    const children = Array(childrenCountResolved)
        .fill(0)
        .map((_, childIndex, children) => {
            if (lastChild) {
                availableFirstNames[lastChild.gender] = filterWeightedRange(
                    availableFirstNames[lastChild.gender],
                    (firstName) => lastChild === undefined || lastChild.firstName !== firstName
                );
            }
            const newChild = generatePerson({
                ...childData,
                firstNameData: availableFirstNames,
                familyNameData: familyName,
                ageData: childrenAgeData,
            });
            lastChild = newChild;
            return newChild;
        });
    return {
        familyName: familyName.family,
        mother,
        father,
        children,
    };
};

export default generateFamily;
