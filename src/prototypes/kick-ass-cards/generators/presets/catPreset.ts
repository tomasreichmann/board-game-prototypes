import ActorCard, { actorCardMeta } from "../../components/gameComponents/ActorCard";
import createPreset from "../../components/generation/createPreset";

const catPreset = createPreset(
    "Cat",
    actorCardMeta,
    ActorCard,
    "Actor",
    {
        name: "cat",
        size: "Bridge",
        className: "drop-shadow",
        toughness: 1,
        imageUri: "/ISV/minis/animals/cat1.jpg",
    },
    {},
    {
        name: "Micka",
        occupation: "House Cat",
        threat: "Will scratch you if you snuggle her too hard",
        notes: "Likes to jump on curtains",
        reward: "Brings dead rats from time to time",
        SD_imageUri:
            "ethereal fantasy concept art of a black cat on solid white background, (strong white vignette:0.7), center composition, SK_Fantasy painterly, fantasy art, dreamy",
    },
    {
        SD_imageUri: `A Stable Diffusion XL prompt. Make sure to include "ethereal full body fantasy concept art" and "on solid white background, <lora:white_1_0:1>, center composition, SK_Fantasy painterly, fantasy art, dreamy". Always omit background description`,
        threat: `Describes attacks or other ways how the cat can threaten others`,
        reward: `Describes how does defeating the cat or allying with the cat reward a player`,
    }
);

export default catPreset;
