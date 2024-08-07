import ActorCard, { ActorCardProps, actorCardMeta } from "../../components/gameComponents/ActorCard";
import createPreset from "../../components/generation/createPreset";
import { DeepRandomType } from "../resolveRandom";

import {
    GenderEnum,
    ageOptions,
    firstNameOptions,
    genderOptions,
    lastNameOptions,
    occupationOptions,
} from "../schemes/personScheme";

const nameOptions: DeepRandomType<string> = {
    _rTemplate: "${firstName} ${lastName}",
    _variables: { firstName: firstNameOptions, lastName: lastNameOptions },
};

const imageUriOptions: DeepRandomType<string> = {
    _rArray: [
        { _rValue: "/ISV/minis/vampire1.jpg", _prop: "gender", _equals: "male" },
        { _rValue: "/ISV/minis/vampire4.jpg", _prop: "gender", _equals: "female" },
    ],
};

const actorOptions: DeepRandomType<Partial<ActorCardProps & { gender: GenderEnum }>> = {
    _rObject: {
        gender: genderOptions,
        name: nameOptions,
        age: ageOptions,
        occupation: occupationOptions,
        imageUri: imageUriOptions,
        threat: undefined,
        reward: undefined,
        notes: undefined,
    },
};

const actorPreset = createPreset<ActorCardProps>(
    "Actor",
    actorCardMeta,
    ActorCard,
    "Actor",
    {
        name: "name",
        notes: "notes",
        occupation: "occupation",
        size: "Bridge",
        reward: "reward",
        threat: "threat",
        toughness: 1,
        currentToughness: 1,
        imagePosition: "top",
        className: "drop-shadow",
        imageUri: "/ISV/minis/vampire4.jpg",
    },
    {},
    {
        name: "Marek z Dusiny",
        occupation: "Forest Bandit",
        threat: "Attacks with a dagger for 1 Effect, +1 Effect if attacking from an ambush",
        notes: "Retreats and hides in the bushes if hurt",
        reward: "Forest camouflage",
        toughness: 2,
        currentToughness: 2,
        SD_imageUri:
            "ethereal fantasy concept art of a bandit wearing a camouflage of forest branches holding a dagger on solid white background, (strong white vignette:0.7), center composition, SK_Fantasy painterly, fantasy art, dreamy",
    },
    {
        name: "A name of the character, 1-4 words.",
        SD_imageUri: `A Stable Diffusion XL prompt. Make sure to include "ethereal full body fantasy concept art" and "on solid white background, <lora:white_1_0:1>, center composition, SK_Fantasy painterly, fantasy art, dreamy". Always omit background description`,
        toughness: `Use whole numbers between 1 and 4`,
        currentToughness: `Use same value as toughness unless it makes sense the character is wounded`,
        threat: `Describes attacks or other ways how the character can threaten others. Maximum 150 characters.`,
        notes: "Additional character notes. Maximum 150 characters.",
        reward: "What can a player get from defeating or allying with the character.",
    }
);

export default actorPreset;
