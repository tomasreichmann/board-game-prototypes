import React from "react";
import { twMerge } from "tailwind-merge";
import { PaperOrDiv, PaperProps } from "../../../../components/print/Paper/Paper";
import { StuntType } from "../../types";
import Icon, { IconType, iconMap } from "../Icon";
import RichText from "../RichText";
// import "./StuntCard.css";

export type StuntCardProps = React.PropsWithChildren<
    { className?: string; size?: PaperProps["size"] } & Omit<StuntType, "cardCount">
>;

const effectSizeClassNameMap: { [key: string]: string } = {
    //"/LP/icons/doom.png": "h-24",
};

const outcomeColorClassNameMap: { [key in IconType]?: string } = {
    //drop: "text-kac-blood-dark",
};

const isIcon = (maybeIcon: string): maybeIcon is IconType => maybeIcon in iconMap;
const getGraphics = (icon: StuntType["icon"]) => {
    if (!icon) {
        return null;
    }
    if (isIcon(icon)) {
        return (
            <Icon
                icon={icon}
                className={twMerge(
                    "flex-1 max-h-full",
                    outcomeColorClassNameMap[icon] || "text-iron-light",
                    effectSizeClassNameMap[icon] || "h-16"
                )}
            />
        );
    }
    return (
        <img
            className={twMerge(
                "absolute left-0 top-1/2 -translate-y-1/2 h-full w-full object-contain max-h-16",
                effectSizeClassNameMap[icon] || "max-h-16"
            )}
            src={icon}
            alt=""
        />
    );
};

export default function StuntCard({
    className,
    size = "Mini US game",
    slug,
    title,
    icon,
    requirements,
    effect,
    children,
}: StuntCardProps) {
    const graphics = getGraphics(icon);
    return (
        <PaperOrDiv size={size} className={twMerge("StuntCard bg-white p-5 flex flex-col gap-2 rounded-lg", className)}>
            <div className="flex flex-row items-center gap-2">
                <Icon icon="sprint" className={"text-kac-monster-dark text-opacity-50 h-4"} />
                <div className="flex-1 text-slate-400 text-center text-xs pr-4">{slug}</div>
            </div>
            <div className="flex-1 flex flex-col items-center">
                <div className="flex-1 self-stretch flex flex-col justify-center relative">{graphics}</div>
                <div className="font-kacHeading text-kac-iron-light text-sm text-center leading-none mt-1">{title}</div>
                {requirements && (
                    <div className="text-xs text-center text-kac-steel-dark ">
                        <RichText commonComponentProps={{ className: "h-5 inline-block text-kac-steel-dark" }}>
                            {requirements}
                        </RichText>
                    </div>
                )}
            </div>
            <div className="text-xs leading-tight text-center text-kac-iron-light min-h-8">
                <RichText commonComponentProps={{ className: "h-5 inline-block -my-1" }}>{effect}</RichText>
            </div>
            {children}
        </PaperOrDiv>
    );
}
