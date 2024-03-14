import ActorCard from "../../components/gameComponents/ActorCard";
import createPreset from "../../components/generation/createPreset";
import catScheme from "../../generators/schemes/catScheme";

const catPreset = createPreset(
    "Cat",
    catScheme,
    ActorCard,
    "Actor",
    {
        name: "cat",
        size: "Mini European",
        className: "drop-shadow",
        imageUri: "/ISV/minis/animals/cat1.jpg",
    },
    {},
    {
        name: "Micka",
        occupation: "House Cat",
        threat: "Will scratch you if you snuggle her too hard",
        notes: "Likes to jump on curtains",
        reward: "Brings dead rats from time to time",
        imageUri:
            "ethereal fantasy concept art of a black cat on solid white background, (strong white vignette:0.7), center composition, SK_Fantasy painterly, fantasy art, dreamy",
    },
    {
        imageUri: `use a stable diffusion prompt instead of an URI and make sure to include "ethereal full body fantasy concept art" and "on solid white background, <lora:white_1_0:1>, center composition, SK_Fantasy painterly, fantasy art, dreamy". Always omit background description`,
        size: `do not change. Use: "Mini European"`,
        threat: `Describes attacks or other ways how the character can threaten others`,
        reward: `Describes how does defeating the character or allying with the character reward a player`,
        className: `Do not change, Use: "drop-shadow"`,
        imagePosition: `Do not change. Use: "top"`,
    }
);

export default catPreset;
