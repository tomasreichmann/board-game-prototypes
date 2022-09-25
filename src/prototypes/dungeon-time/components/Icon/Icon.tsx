import arrowLeft from "./media/arrow-left.svg";
import arrowRight from "./media/arrow-right.svg";
import bladeBite from "./media/blade-bite.svg";
import cardExchange from "./media/card-exchange.svg";
import cardPlay from "./media/card-play.svg";
import checkedShield from "./media/checked-shield.svg";
import crossedAxes from "./media/crossed-axes.svg";
import crossedSwords from "./media/crossed-swords.svg";
import crownedSkull from "./media/crowned-skull.svg";
import fireRing from "./media/fire-ring.svg";
import flatPlatform from "./media/flat-platform.svg";
import halt from "./media/halt.svg";
import highShot from "./media/high-shot.svg";
import plainDagger from "./media/plain-dagger.svg";
import push from "./media/push.svg";
import skullStaff from "./media/skull-staff.svg";
import stickyBoot from "./media/sticky-boot.svg";
import stoneBlock from "./media/stone-block.svg";
import teleport from "./media/teleport.svg";
import walkingBoot from "./media/walking-boot.svg";
import warlordHelmet from "./media/warlord-helmet.svg";
import williamTellSkull from "./media/william-tell-skull.svg";
import wolfHead from "./media/wolf-head.svg";
import wolfTrap from "./media/wolf-trap.svg";
export const iconAliases = {
    ACTION: cardPlay,
    BLOCK: checkedShield,
    RANGE: highShot,
    FREEZE: halt,
    MELEE: plainDagger,
    SHOVE: push,
    BARRIER: stoneBlock,
    MOVE: walkingBoot,
    TRAP: wolfTrap,
    PIN: stickyBoot,
    TELEPORT: teleport,
    SPACE: flatPlatform,
    NOVA: fireRing,
};

export const iconMap = {
    arrowLeft,
    arrowRight,
    bladeBite,
    cardExchange,
    cardPlay,
    checkedShield,
    crossedAxes,
    crossedSwords,
    crownedSkull,
    fireRing,
    flatPlatform,
    halt,
    highShot,
    plainDagger,
    push,
    skullStaff,
    stickyBoot,
    stoneBlock,
    teleport,
    walkingBoot,
    warlordHelmet,
    williamTellSkull,
    wolfHead,
    wolfTrap,
    ...iconAliases,
};

export type IconType = keyof typeof iconMap;

export type IconProps = {
    className?: string;
    icon: IconType;
    params?: { [key: string]: any };
};

export default function Icon({ className, icon, params }: IconProps) {
    if (!iconMap[icon]) {
        `icon "${icon}" not found in iconMap (${Object.keys(iconMap).join(
            ", "
        )})`;
    }
    const Component = (iconMap[icon] || halt) as unknown as React.ComponentType<
        React.SVGAttributes<SVGSVGElement>
    >;
    return <Component className={className as string} style={{}} {...params} />;
}
