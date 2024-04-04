import ActorCard, { actorCardMeta } from "../../components/gameComponents/ActorCard";
import createPreset from "../../components/generation/createPreset";

const dogPreset = createPreset(
    "Dog",
    actorCardMeta,
    ActorCard,
    "Actor",
    {
        name: "dog",
        size: "Bridge",
        className: "drop-shadow",
        toughness: 1,
        imageUri: "/ISV/minis/animals/dog1.jpg",
    },
    {},
    {
        name: "Brok",
        occupation: "Hunting Dog",
        threat: "Bites you if you smell like a cat",
        notes: "Likes to play fetch",
        reward: "Expensive leather collar",
        SD_imageUri:
            "ethereal fantasy concept art of a friendly dog on solid white background, (strong white vignette:0.7), center composition, SK_Fantasy painterly, fantasy art, dreamy",
    },
    {
        SD_imageUri: `A Stable Diffusion XL prompt. Make sure to include "ethereal full body fantasy concept art" and "on solid white background, <lora:white_1_0:1>, center composition, SK_Fantasy painterly, fantasy art, dreamy". Always omit background description`,
        threat: `Describes attacks or other ways how the dog can threaten others`,
        reward: `Describes how does defeating the dog or allying with the dog reward a player`,
    }
);

export default dogPreset;
