import arrowLeft from "./media/arrow-left.svg";
import arrowRight from "./media/arrow-right.svg";
import barrel from "./media/barrel.svg";
import bladeBite from "./media/blade-bite.svg";
import brokenBottle from "./media/broken-bottle.svg";
import cardDraw from "./media/card-draw.svg";
import cardExchange from "./media/card-exchange.svg";
import cardPlay from "./media/card-play.svg";
import checkedShield from "./media/checked-shield.svg";
import chest from "./media/chest.svg";
import crossedAxes from "./media/crossed-axes.svg";
import crossedSwords from "./media/crossed-swords.svg";
import crownCoin from "./media/crown-coin.svg";
import crownedSkull from "./media/crowned-skull.svg";
import deathSkull from "./media/death-skull.svg";
import doubleFaceMask from "./media/double-face-mask.svg";
import drop from "./media/drop.svg";
import explosiveMaterials from "./media/explosive-materials.svg";
import fireRing from "./media/fire-ring.svg";
import fizzingFlask from "./media/fizzing-flask.svg";
import flatPlatform from "./media/flat-platform.svg";
import halt from "./media/halt.svg";
import heartBottle from "./media/heart-bottle.svg";
import highShot from "./media/high-shot.svg";
import lamellar from "./media/lamellar.svg";
import magicPotion from "./media/magic-potion.svg";
import plainDagger from "./media/plain-dagger.svg";
import push from "./media/push.svg";
import skullStaff from "./media/skull-staff.svg";
import stickyBoot from "./media/sticky-boot.svg";
import stoneBlock from "./media/stone-block.svg";
import teleport from "./media/teleport.svg";
import thrownKnife from "./media/thrown-knife.svg";
import tripleSkulls from "./media/triple-skulls.svg";
import walkingBoot from "./media/walking-boot.svg";
import warlordHelmet from "./media/warlord-helmet.svg";
import williamTellSkull from "./media/william-tell-skull.svg";
import wolfHead from "./media/wolf-head.svg";
import wolfTrap from "./media/wolf-trap.svg";

export const iconAliases = {
    ACTION: cardPlay,
    ARROW_LEFT: arrowLeft,
    ARROW_RIGHT: arrowRight,
    BARRIER: stoneBlock,
    BLOCK: checkedShield,
    COIN: crownCoin,
    EXPLOSIVE_BARRIER: barrel,
    HALT: halt,
    HIDE: doubleFaceMask,
    MELEE: plainDagger,
    MOVE: walkingBoot,
    NOVA: fireRing,
    PIN: stickyBoot,
    RANGE: highShot,
    SHOVE: push,
    SKULL: deathSkull,
    SPACE: flatPlatform,
    TELEPORT: teleport,
    TOUGHNESS: lamellar,
    TRAP: wolfTrap,
    UNDEAD: deathSkull,
    WOUND: drop,
};

export const iconMap = {
    arrowLeft,
    arrowRight,
    barrel,
    bladeBite,
    brokenBottle,
    cardDraw,
    cardExchange,
    cardPlay,
    checkedShield,
    chest,
    crossedAxes,
    crossedSwords,
    crownCoin,
    crownedSkull,
    deathSkull,
    doubleFaceMask,
    drop,
    fireRing,
    flatPlatform,
    halt,
    highShot,
    lamellar,
    plainDagger,
    push,
    skullStaff,
    stickyBoot,
    stoneBlock,
    teleport,
    tripleSkulls,
    walkingBoot,
    warlordHelmet,
    williamTellSkull,
    wolfHead,
    wolfTrap,
    explosiveMaterials,
    fizzingFlask,
    heartBottle,
    magicPotion,
    thrownKnife,
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
