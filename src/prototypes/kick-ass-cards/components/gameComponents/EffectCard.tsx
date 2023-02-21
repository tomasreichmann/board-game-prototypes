import React from "react";
import clsx from "clsx";
import { PaperOrDiv, PaperProps } from "../../../../components/print/Paper/Paper";
import { EffectType } from "../../types";
import Icon, { IconType, iconMap } from "../Icon";
import RichText from "../RichText";
// import "./EffectCard.css";

export type EffectCardProps = React.PropsWithChildren<
    { className?: string; size?: PaperProps["size"] } & Omit<EffectType, "cardCount">
>;

const effectSizeClassNameMap: { [key in IconType]?: string } = {
    //SPECIAL: "h-24",
};

const outcomeColorClassNameMap: { [key in IconType]?: string } = {
    drop: "text-kac-blood-dark",
    halt: "text-kac-steel-dark",
    knockout: "text-kac-iron-dark",
    run: "text-kac-curse-dark",
    shouting: "text-kac-curse",
    sleepy: "text-kac-cloth",
    sprint: "text-kac-gold-dark",
    quicksand: "text-kac-bone-dark",
    stickyBoot: "text-kac-monster",
    tearTracks: "text-kac-cloth",
    thermometerCold: "text-kac-cloth-dark",
    thermometerHot: "text-kac-fire",
};

const isIcon = (maybeIcon: string): maybeIcon is IconType => maybeIcon in iconMap;
const getGraphics = (icon: EffectType["icon"]) => {
    if (!icon) {
        return null;
    }
    if (isIcon(icon)) {
        return (
            <Icon
                icon={icon}
                className={clsx(
                    "max-h-fit",
                    outcomeColorClassNameMap[icon] || "text-iron-light",
                    effectSizeClassNameMap[icon] || "h-16"
                )}
            />
        );
    }
    return (
        <div
            className="max-h-fit h-24"
            style={{ background: "url(" + icon + ") center center / contain no-repeat" }}
        ></div>
    );
};

export default function EffectCard({
    className,
    size = "Mini US game",
    slug,
    title,
    icon,
    effect,
    children,
}: EffectCardProps) {
    const graphics = getGraphics(icon);
    return (
        <PaperOrDiv size={size} className={clsx("EffectCard bg-white p-5 flex flex-col gap-2", className)}>
            <div className="text-slate-400 text-center text-xs">{slug}</div>
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
