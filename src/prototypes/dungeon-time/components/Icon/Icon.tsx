import cardPlay from "./media/card-play.svg";
import checkedShield from "./media/checked-shield.svg";
import halt from "./media/halt.svg";
import highShot from "./media/high-shot.svg";
import plainDagger from "./media/plain-dagger.svg";
import push from "./media/push.svg";
import stoneBlock from "./media/stone-block.svg";
import walkingBoot from "./media/walking-boot.svg";
import wolfTrap from "./media/wolf-trap.svg";
import clsx from "clsx";

export const iconMap = {
    cardPlay,
    checkedShield,
    halt,
    highShot,
    plainDagger,
    push,
    stoneBlock,
    walkingBoot,
    wolfTrap,
};

export type IconProps = {
    className?: string;
    icon: keyof typeof iconMap;
};

export default function Icon({ className, icon }: IconProps) {
    return <img className={clsx("Icon", className)} src={iconMap[icon]} />;
}
