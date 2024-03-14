import ActorCard from "../../components/gameComponents/ActorCard";
import createPreset from "../../components/generation/createPreset";
import dogScheme from "../../generators/schemes/dogScheme";

const dogPreset = createPreset(
    "Dog",
    dogScheme,
    ActorCard,
    "Actor",
    {
        name: "dog",
        size: "Mini European",
        className: "drop-shadow",
        imageUri: "/ISV/minis/animals/dog1.jpg",
    },
    {},
    {
        name: "Brok",
        occupation: "Hunting Dog",
        threat: "Bites you if you smell like a cat",
        notes: "Likes to play fetch",
        reward: "Expensive leather collar",
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

export default dogPreset;
