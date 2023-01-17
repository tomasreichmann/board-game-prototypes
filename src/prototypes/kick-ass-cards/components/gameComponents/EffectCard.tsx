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
    sleepy: "text-kac-cloth",
    knockout: "text-kac-iron-dark",
    shouting: "text-kac-curse",
    run: "text-kac-curse-dark",
    thermometerHot: "text-kac-fire",
    halt: "text-kac-steel-dark",
    stickyBoot: "text-kac-monster",
    drop: "text-kac-blood-dark",
    tearTracks: "text-kac-cloth",
    sprint: "text-kac-gold-dark",
};

const isIcon = (maybeIcon: string): maybeIcon is IconType => maybeIcon in iconMap;

export default function EffectCard({
    className,
    size = "Mini US game",
    slug,
    title,
    icon,
    effect,
    children,
}: EffectCardProps) {
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
        <div
            className="max-h-fit h-24"
            style={{ background: "url(" + icon + ") center center / contain no-repeat" }}
        ></div>
    );
    return (
        <PaperOrDiv size={size} className={clsx("EffectCard bg-white p-5 flex flex-col gap-2", className)}>
            <div className="text-slate-400 text-center text-xs">{slug}</div>
            {graphics}
            <div className="flex-1 flex flex-col items-center justify-end gap-1 text-kac-iron-light">
                <div className="font-kacHeading text-kac-iron-light text-sm text-center">{title}</div>
            </div>
            <div className="flex-1 text-xs text-center max-h-24 text-kac-iron-light">
                <RichText commonComponentProps={{ className: "h-5 inline-block -my-1" }}>{effect}</RichText>
            </div>
            {children}
        </PaperOrDiv>
    );
}
