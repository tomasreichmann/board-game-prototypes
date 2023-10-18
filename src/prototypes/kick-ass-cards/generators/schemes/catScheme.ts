import { DeepRandomType } from "../resolveRandom";
import maleNames from "../../data/cat-names-male-cs-cleaned";
import femaleNames from "../../data/cat-names-female-cs-cleaned";
import { GenderEnum } from "./personScheme";

export const genderOptions: DeepRandomType<GenderEnum> = {
    _rArray: [GenderEnum.Male, GenderEnum.Female],
};

export const catNameOptions: DeepRandomType<string> = {
    _rArray: [
        { _rWeighted: maleNames.map(({ name, weight }) => [name, weight]), _prop: "gender", _equals: GenderEnum.Male },
        {
            _rWeighted: femaleNames.map(({ name, weight }) => [name, weight]),
            _prop: "gender",
            _equals: GenderEnum.Female,
        },
    ],
};

export const catAgeOptions: DeepRandomType<string> = {
    _rRange: { from: 0, to: 20 },
};

export const catImageOptions: DeepRandomType<string> = {
    _rArray: [
        "/ISV/minis/animals/cat1.jpg",
        "/ISV/minis/animals/cat2.jpg",
        "/ISV/minis/animals/cat3.jpg",
        "/ISV/minis/animals/cat4.jpg",
    ],
};

const catScheme = {
    _rObject: {
        gender: genderOptions,
        name: catNameOptions,
        age: catAgeOptions,
        imageUri: catImageOptions,
    },
};
export default catScheme;
