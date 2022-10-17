import { mapValues } from "lodash";
import GenericIcon, {
    IconProps as GenericIconProps,
    iconMap as genericIconMap,
    IconType as GenericIconType,
} from "../../../components/Icon/Icon";

export type IconProps = Omit<GenericIconProps<typeof aliasMap>, "aliasMap" | "iconMap">;

export const aliasMap = {
    ACTION: "cardPlay",
    ARROW_LEFT: "arrowLeft",
    ARROW_RIGHT: "arrowRight",
    BARRIER: "stoneBlock",
    BLOCK: "checkedShield",
    COIN: "crownCoin",
    EXPLOSIVE_BARRIER: "barrel",
    HALT: "halt",
    HIDE: "doubleFaceMask",
    MELEE: "plainDagger",
    MOVE: "walkingBoot",
    NOVA: "fireRing",
    PIN: "stickyBoot",
    RANGE: "highShot",
    SHOVE: "push",
    SKULL: "deathSkull",
    SPACE: "flatPlatform",
    SPECIAL: "mightyForce",
    TELEPORT: "teleport",
    TOUGHNESS: "lamellar",
    TRAP: "wolfTrap",
    UNDEAD: "deathSkull",
    WOLF: "wolfHead",
    BEAR: "bearHead",
    WOUND: "drop",
} as const;

export const iconMap = { ...genericIconMap, ...mapValues(aliasMap, (value) => genericIconMap[value]) };

export type IconType = keyof typeof iconMap;

export default function Icon(props: IconProps) {
    return <GenericIcon<typeof aliasMap> {...props} aliasMap={aliasMap} />;
}
