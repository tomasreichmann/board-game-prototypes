import ActorCard from "../../components/gameComponents/ActorCard";
import createPreset from "../../components/generation/createPreset";
import dogScheme from "../../generators/schemes/dogScheme";

const dogPreset = createPreset("Dog", dogScheme, ActorCard, "Actor", {
    name: "dog",
    size: "Mini US game",
    className: "drop-shadow",
    imageUri: "/ISV/minis/animals/dog1.jpg",
});

export default dogPreset;
