import { DeepRandomType } from "../resolveRandom";
import maleNames from "../../data/dog-names-male-cs-cleaned";
import femaleNames from "../../data/dog-names-female-cs-cleaned";
import { GenderEnum } from "./personScheme";

export const genderOptions: DeepRandomType<GenderEnum> = {
    _rArray: [GenderEnum.Male, GenderEnum.Female],
};

export const dogNameOptions: DeepRandomType<string> = {
    _rArray: [
        {
            _rWeighted: maleNames.map(({ name, weight }) => [name, weight]),
            _prop: "gender",
            _equals: GenderEnum.Male,
        },
        {
            _rWeighted: femaleNames.map(({ name, weight }) => [name, weight]),
            _prop: "gender",
            _equals: GenderEnum.Female,
        },
    ],
};

export const dogAgeOptions: DeepRandomType<string> = {
    _rRange: { from: 0, to: 20 },
};

export const dogImageOptions: DeepRandomType<string> = {
    _rArray: [
        "/ISV/minis/animals/dog1.jpg",
        "/ISV/minis/animals/dog2.jpg",
        "/ISV/minis/animals/dog3.jpg",
        "/ISV/minis/animals/dog4.jpg",
    ],
};

const dogScheme = {
    _rObject: {
        gender: genderOptions,
        name: dogNameOptions,
        age: dogAgeOptions,
        imageUri: dogImageOptions,
    },
};
export default dogScheme;
