import { iconMap } from "../components/Icon/Icon";

const effectToIconMap: { [key: string]: keyof typeof iconMap } = {
    ACTION: "cardPlay",
    BLOCK: "checkedShield",
    RANGE: "highShot",
    FREEZE: "halt",
    MELEE: "plainDagger",
    SHOVE: "push",
    BARRIER: "stoneBlock",
    MOVE: "walkingBoot",
    TRAP: "wolfTrap",
};

export default function effectToIcon(effect: string) {
    return effectToIconMap[effect];
}
