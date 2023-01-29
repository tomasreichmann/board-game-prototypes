import React from "react";
import clsx from "clsx";
import { PaperOrDiv, PaperProps } from "../../../../components/print/Paper/Paper";
import { AssetType } from "../../types";
import Icon, { IconType, iconMap } from "../Icon";
import RichText from "../RichText";
import Image from "../Image";
// import "./AssetCard.css";

export type AssetCardProps = React.PropsWithChildren<{ className?: string; size?: PaperProps["size"] } & AssetType>;

const effectSizeClassNameMap: { [key in IconType]?: string } = {
    //SPECIAL: "h-24",
};

const outcomeColorClassNameMap: { [key in IconType]?: string } = {
    bandageRoll: "text-slate-400",
    plainDagger: "text-kac-steel-dark",
    grapple: "text-kac-cloth",
    smokeBomb: "text-kac-iron",
    lockpicks: "text-kac-iron-light",
    humanEar: "text-kac-skin-dark",
    paranoia: "text-kac-cloth",
    dart: "text-kac-cloth-dark",
    crossbow: "text-kac-steel-dark",
    caltrops: "text-kac-steel-dark",
    lanternFlame: "text-kac-gold",
    barrel: "text-kac-bone-dark",
    explosiveMaterials: "text-kac-fire",
    heartBottle: "text-kac-blood-light",
    pestleMortar: "text-kac-curse",
    poisonBottle: "text-kac-monster",
    bigDiamondRing: "text-kac-gold",
    blackBook: "text-kac-bone-dark",
    drinkMe: "text-kac-curse-light",
    key: "text-kac-gold-dark",
    prankGlasses: "text-kac-skin-dark",
    ropeCoil: "text-kac-bone-dark",
    rupee: "text-kac-fire-dark",
    scrollQuill: "text-kac-bone",
    swapBag: "text-kac-bone-dark",
    tiedScroll: "text-kac-bone",
    toolbox: "text-kac-bone-dark",
    magicPotion: "text-kac-bone-dark",
    woodenCrate: "text-kac-bone-dark",
    slingshot: "text-kac-bone-dark",
    /*mightyForce: "text-kac-fire",
    bullseye: "text-kac-monster",
    dodge: "text-kac-monster-light",
    knockout: "text-kac-steel-dark",
    thrustBend: "text-kac-cloth",
    drop: "text-kac-blood",
    stickyBoot: "text-kac-curse-light",
    sunbeams: "text-kac-gold",
    sprint: "text-kac-gold-dark",
    warlockEye: "text-kac-curse",*/
};

const isIcon = (maybeIcon: string): maybeIcon is IconType => maybeIcon in iconMap;

export default function AssetCard({
    className,
    size = "Mini US game",
    slug,
    title,
    icon,
    effect,
    children,
}: AssetCardProps) {
    const graphics = isIcon(icon) ? (
        <Icon
            icon={icon}
            className={clsx(
                "max-h-fit",
                outcomeColorClassNameMap[icon] || "text-iron-light",
                effectSizeClassNameMap[icon] || "h-16"
            )}
        />
    ) : (
        <Image className="max-h-fit h-24" src={icon} objectFit="contain" />
    );
    return (
        <PaperOrDiv size={size} className={clsx("AssetCard bg-white p-5 flex flex-col gap-2", className)}>
            <div>
                <div className="text-slate-400 text-center text-xs">{slug}</div>
            </div>

            {graphics}

            <div className="flex-1 flex flex-col items-center justify-end gap-1 text-kac-iron-light">
                <div className="font-kacHeading text-kac-iron-light text-sm text-center">{title}</div>
            </div>
            <div className="flex-1 text-xs text-center text-kac-iron-light">
                <RichText commonComponentProps={{ className: "h-5 inline-block -my-1" }}>{effect}</RichText>
            </div>
            {children}
        </PaperOrDiv>
    );
}
