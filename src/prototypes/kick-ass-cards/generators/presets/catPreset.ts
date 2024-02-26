import ActorCard from "../../components/gameComponents/ActorCard";
import createPreset from "../../components/generation/createPreset";
import catScheme from "../../generators/schemes/catScheme";

const catPreset = createPreset("Cat", catScheme, ActorCard, "Actor", {
    name: "cat",
    size: "Mini US game",
    className: "drop-shadow",
    imageUri: "/ISV/minis/animals/cat1.jpg",
});

export default catPreset;
