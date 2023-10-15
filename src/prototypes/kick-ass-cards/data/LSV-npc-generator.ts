import { ValueOrRangeOrWeightedRange } from "../generators/resolveValue_deprecated";
import firstNamesCzechFemaleRaw from "./first-names-czech-female.csv";
import firstNamesCzechMaleRaw from "./first-names-czech-male.csv";
import lastNamesCzechRaw from "./last-names-czech.csv";
import occupationsRaw from "./LSV-occupations-cs.csv";

export type Person = {
    firstName: string;
    lastName: string;
    familyName: string;
    occupation: string;
    toughness: number;
    threat: string;
    notes: string;
    treasure: string;
    color: string;
    imageUri: string;
    age: number;
    isDead: boolean;
    relationships?: {
        mother: string;
        father: string | null;
        spouse: string;
        exSpouses: string[];
        siblings: string[];
        children: string[];
    };
};

export type GenderType = "male" | "female";

export const random = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
};

export const weightedRandom = <T extends any>(values: T[], weights: number[]) => {
    if (values.length !== weights.length) {
        throw new Error(
            "Invalid number of weights. Values: " +
                values.length +
                ", Weights: " +
                weights.length +
                " | values: " +
                values +
                " | weights: " +
                weights
        );
    }
    const totalWeights = weights.reduce((a, b) => a + b);
    if (totalWeights === 0) {
        console.warn("Total weights are zero");
        return values[Math.floor(Math.random() * values.length)] as T;
    }
    const rand = Math.random() * totalWeights;
    let sum = 0;
    for (let i = 0; i < weights.length; i++) {
        sum += weights[i];
        if (sum > rand) {
            return values[i] as T;
        }
    }
    console.log({ sum, rand, values, weights });
    throw new Error("Weighted random failed");
};

const getNewFamilyMemberWeight = (currentSize: number) => {
    return 4 / currentSize;
};

type FamilyNameItemType = { male: string; maleWeight: number; female: string; femaleWeight: number };
type OccupationItemType = { male: string; female: string; description: string };
type FirstNameItemType = { name: string; weight: number; order: number };

const removeItemFromArray = <T>(array: T[], item: T) => {
    const index = array.indexOf(item);
    if (index > -1) {
        array.splice(index, 1);
    }
};
const removeIndexFromArray = <T>(array: T[], index: number) => {
    array.splice(index, 1);
};

/* const getRelationshipOptions = (
    person: Pick<Person, "firstName" | "lastName" | "familyName" | "gender">,
    relative: Person
) => {
    const options = [] as string[];
    const optionWeights = [] as number[];
    const optionConditions = [] as string[];

    // mother
    options.push("mother");
    optionWeights.push(5);
}; */

const generatePeople = (
    count: number,
    familyNames: FamilyNameItemType[],
    firstNamesMale: FirstNameItemType[],
    firstNamesFemale: FirstNameItemType[],
    occupations: OccupationItemType[]
) => {
    const people: Person[] = [];
    const genderDistribution = {
        male: 0,
        female: 0,
    };
    const availableFamilyNames = [] as string[];
    const availableFamilyNamesWeights = [] as number[];
    const availableFirstNamesMale = [] as string[];
    const availableFirstNamesMaleWeights = [] as number[];
    const availableFirstNamesFemale = [] as string[];
    const availableFirstNamesFemaleWeights = [] as number[];

    familyNames.forEach((familyName) => {
        availableFamilyNames.push(familyName.male);
        availableFamilyNamesWeights.push(familyName.maleWeight + familyName.femaleWeight);
    });

    firstNamesMale.forEach((firstName) => {
        availableFirstNamesMale.push(firstName.name);
        availableFirstNamesMaleWeights.push(firstName.weight);
    });

    firstNamesFemale.forEach((firstName) => {
        availableFirstNamesFemale.push(firstName.name);
        availableFirstNamesFemaleWeights.push(firstName.weight);
    });

    const availableFirstNames = { male: availableFirstNamesMale, female: availableFirstNamesFemale };
    const availableFirstNamesWeight = {
        male: availableFirstNamesMaleWeights,
        female: availableFirstNamesFemaleWeights,
    };

    const fullNames = [] as string[];
    const families: { [key: string]: Person[] } = {};

    const newFamilyNameWeight = 1;

    let failsafe = 1000;
    while (people.length < count && failsafe-- > 0) {
        // pick gender
        const gender = weightedRandom(["male", "female"] as [GenderType, GenderType], [
            genderDistribution.female * 1.05,
            genderDistribution.male,
        ]);
        genderDistribution[gender]++;

        // pick family name
        const newFamilyName = weightedRandom(availableFamilyNames, availableFamilyNamesWeights);
        // TODO reuse last new family if not picked
        const existingFamilies = Object.keys(families);
        const existingFamiliesWeights = existingFamilies.map((name) => getNewFamilyMemberWeight(families[name].length));
        // pick between existing family names and a new family name
        console.log(existingFamilies, existingFamiliesWeights);
        const familyName = weightedRandom(
            existingFamilies.concat([newFamilyName]),
            existingFamiliesWeights.concat([newFamilyNameWeight])
        );
        // remove familyName from availableFamilyNamesMale
        const familyNameIndex = availableFamilyNames.indexOf(familyName);
        removeIndexFromArray(availableFamilyNames, familyNameIndex);
        removeIndexFromArray(availableFamilyNamesWeights, familyNameIndex);
        const lastName =
            gender === "male" ? familyName : familyNames.find(({ male }) => male === familyName)?.female || familyName;
        console.log(
            lastName,
            familyNames.find(({ male }) => male === familyName)
        );

        // pick first name
        const filteredFirstNamesWeights = [] as number[];
        const filteredFirstNames = availableFirstNames[gender].filter((firstName, nameIndex) => {
            if (fullNames.includes(`${firstName} ${lastName}`)) {
                return false;
            }
            filteredFirstNamesWeights.push(availableFirstNamesWeight[gender][nameIndex]);
            return true;
        });
        const firstName = weightedRandom(filteredFirstNames, filteredFirstNamesWeights);
        const fullName = `${firstName} ${lastName}`;
        fullNames.push(fullName);

        // pick family relationship
        families[familyName] = families[familyName] || [];
        const isNewFamily = families[familyName].length === 0;

        // pick age
        // pick occupation
        // set toughness
        // generate threat
        // generate notes
        // generate treasure
        // create a Person
        const person: Person = {
            firstName,
            lastName,
            familyName,
            occupation: "",
            toughness: 0,
            threat: "",
            notes: "",
            treasure: "",
            color: "",
            age: 0,
            isDead: false,
            imageUri: "",
        };
        families[familyName].push(person);
        people.push(person);
    }
    return people;
};

const generate = (count: number) => {
    const lastNamesCzech = lastNamesCzechRaw.map((item) => ({
        male: item.male,
        female: item.female,
        maleWeight: Number(item.maleWeight),
        femaleWeight: Number(item.femaleWeight),
    }));
    const firstNamesCzechMale = firstNamesCzechMaleRaw.map((item) => ({
        name: item.name,
        weight: Number(item.weight),
        order: item.order,
    }));
    const firstNamesCzechFemale = firstNamesCzechFemaleRaw.map((item) => ({
        name: item.name,
        weight: Number(item.weight),
        order: item.order,
    }));
    return generatePeople(count, lastNamesCzech, firstNamesCzechMale, firstNamesCzechFemale, occupationsRaw);
};

export default generate;
