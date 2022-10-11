import arrowLeft from "./media/arrow-left.svg";
import arrowRight from "./media/arrow-right.svg";
import bandageRoll from "./media/bandage-roll.svg";
import barrel from "./media/barrel.svg";
import batteredAxe from "./media/battered-axe.svg";
import bearHead from "./media/bear-head.svg";
import bladeBite from "./media/blade-bite.svg";
import bookCover from "./media/book-cover.svg";
import bracers from "./media/bracers.svg";
import brokenBottle from "./media/broken-bottle.svg";
import campingTent from "./media/camping-tent.svg";
import cardDraw from "./media/card-draw.svg";
import cardExchange from "./media/card-exchange.svg";
import cardPlay from "./media/card-play.svg";
import cardRandom from "./media/card-random.svg";
import checkedShield from "./media/checked-shield.svg";
import chest from "./media/chest.svg";
import crossbow from "./media/crossbow.svg";
import crossedAxes from "./media/crossed-axes.svg";
import crossedSwords from "./media/crossed-swords.svg";
import crownCoin from "./media/crown-coin.svg";
import crownedSkull from "./media/crowned-skull.svg";
import crystalBall from "./media/crystal-ball.svg";
import deathSkull from "./media/death-skull.svg";
import doubleFaceMask from "./media/double-face-mask.svg";
import drop from "./media/drop.svg";
import explosiveMaterials from "./media/explosive-materials.svg";
import fairyWand from "./media/fairy-wand.svg";
import fireRing from "./media/fire-ring.svg";
import fizzingFlask from "./media/fizzing-flask.svg";
import flatPlatform from "./media/flat-platform.svg";
import globeRing from "./media/globe-ring.svg";
import halt from "./media/halt.svg";
import hangingSign from "./media/hanging-sign.svg";
import heartBottle from "./media/heart-bottle.svg";
import highShot from "./media/high-shot.svg";
import knapsack from "./media/knapsack.svg";
import lamellar from "./media/lamellar.svg";
import loincloth from "./media/loincloth.svg";
import magicPalm from "./media/magic-palm.svg";
import magicPotion from "./media/magic-potion.svg";
import mailedFist from "./media/mailed-fist.svg";
import mightyForce from "./media/mighty-force.svg";
import ninjaHead from "./media/ninja-head.svg";
import pestleMortar from "./media/pestle-mortar.svg";
import plainDagger from "./media/plain-dagger.svg";
import pointyHat from "./media/pointy-hat.svg";
import push from "./media/push.svg";
import rollerSkate from "./media/roller-skate.svg";
import shieldOpposition from "./media/shield-opposition.svg";
import shorts from "./media/shorts.svg";
import sickle from "./media/sickle.svg";
import skullStaff from "./media/skull-staff.svg";
import spikedShield from "./media/spiked-shield.svg";
import stickyBoot from "./media/sticky-boot.svg";
import stoneBlock from "./media/stone-block.svg";
import supersonicArrow from "./media/supersonic-arrow.svg";
import talk from "./media/talk.svg";
import teleport from "./media/teleport.svg";
import templarShield from "./media/templar-shield.svg";
import thirdEye from "./media/third-eye.svg";
import thrownKnife from "./media/thrown-knife.svg";
import thrust from "./media/thrust.svg";
import thrustDown from "./media/thrust-down.svg";
import tripleSkulls from "./media/triple-skulls.svg";
import walkingBoot from "./media/walking-boot.svg";
import warlockEye from "./media/warlock-eye.svg";
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
    SPECIAL: mightyForce,
    TELEPORT: teleport,
    TOUGHNESS: lamellar,
    TRAP: wolfTrap,
    UNDEAD: deathSkull,
    WOLF: wolfHead,
    BEAR: bearHead,
    WOUND: drop,
};

export const iconMap = {
    arrowLeft,
    arrowRight,
    bandageRoll,
    barrel,
    bladeBite,
    brokenBottle,
    campingTent,
    cardDraw,
    cardExchange,
    cardPlay,
    cardRandom,
    checkedShield,
    chest,
    crossbow,
    crossedAxes,
    crossedSwords,
    crownCoin,
    crownedSkull,
    deathSkull,
    doubleFaceMask,
    drop,
    explosiveMaterials,
    fireRing,
    fizzingFlask,
    flatPlatform,
    halt,
    hangingSign,
    heartBottle,
    highShot,
    lamellar,
    magicPotion,
    mailedFist,
    mightyForce,
    ninjaHead,
    pestleMortar,
    plainDagger,
    push,
    sickle,
    skullStaff,
    stickyBoot,
    stoneBlock,
    talk,
    teleport,
    templarShield,
    thrownKnife,
    thrust,
    thrustDown,
    tripleSkulls,
    walkingBoot,
    warlockEye,
    warlordHelmet,
    williamTellSkull,
    wolfHead,
    wolfTrap,
    batteredAxe,
    bookCover,
    bracers,
    crystalBall,
    fairyWand,
    globeRing,
    knapsack,
    loincloth,
    magicPalm,
    pointyHat,
    rollerSkate,
    shieldOpposition,
    shorts,
    spikedShield,
    supersonicArrow,
    thirdEye,
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
        `icon "${icon}" not found in iconMap (${Object.keys(iconMap).join(", ")})`;
    }
    const Component = (iconMap[icon] || halt) as unknown as React.ComponentType<React.SVGAttributes<SVGSVGElement>>;
    return <Component className={className as string} style={{}} {...params} />;
}
