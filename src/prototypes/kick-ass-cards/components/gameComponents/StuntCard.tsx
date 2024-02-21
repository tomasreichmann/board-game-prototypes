import React from "react";
import { twMerge } from "tailwind-merge";
import { PaperOrDiv, PaperProps } from "../../../../components/print/Paper/Paper";
import { StuntType } from "../../types";
import Icon, { IconType, iconMap } from "../Icon";
import RichText from "../RichText";
// import "./StuntCard.css";

export type StuntCardProps = React.PropsWithChildren<Partial<PaperProps> & Omit<StuntType, "cardCount">>;

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
    size = "Mini European",
    slug,
    title,
    icon,
    requirements,
    effect,
    children,
    bleedMm = 0,
    ...restProps
}: StuntCardProps) {
    const graphics = getGraphics(icon);
    return (
        <PaperOrDiv
            size={size}
            bleedMm={bleedMm}
            className={twMerge(
                "StuntCard bg-white rounded-lg print:rounded-none flex flex-col justify-stretch items-stretch",
                className
            )}
            {...restProps}
        >
            <div
                className="relative flex flex-col justify-center items-stretch flex-1 p-3"
                style={{ margin: `${bleedMm}mm` }}
            >
                <div className="flex flex-row items-center gap-2">
                    <div className="flex-1 text-slate-400 text-center text-xs -mr-4">{slug}</div>
                    <Icon icon="bodyBalance" className={"text-kac-bone-dark text-opacity-50 h-4"} />
                </div>
                <div className="flex-1 flex flex-col items-center">
                    <div className="flex-1 self-stretch flex flex-col justify-center relative">{graphics}</div>
                    <div className="font-kacHeading text-kac-iron-light text-sm text-center leading-none mt-2 mb-1">
                        {title}
                    </div>
                    {requirements && (
                        <div className="text-xs text-center text-kac-steel-dark">
                            <RichText commonComponentProps={{ className: "h-5 inline-block text-kac-steel-dark" }}>
                                {requirements}
                            </RichText>
                        </div>
                    )}
                </div>
                <div className="text-xs text-center min-h-[6em] text-kac-iron-light leading-tight text-balance">
                    <RichText commonComponentProps={{ className: "h-5 inline-block -my-1" }}>{effect}</RichText>
                </div>
                {children}
            </div>
        </PaperOrDiv>
    );
}
export const StuntCardBackFace = ({
    className,
    size = "Mini European",
    children,
    ...restProps
}: Partial<PaperProps>) => {
    return (
        <PaperOrDiv
            size={size}
            className={twMerge(
                "StuntCardBackFace gap-2 rounded-lg print:rounded-none bg-kac-bone-dark flex flex-col justify-stretch items-stretch",
                className
            )}
            {...restProps}
        >
            <div className="m-[3mm] relative flex flex-col justify-center items-center flex-1 p-3">
                <div className="w-32 h-32 flex flex-col justify-center items-center relative">
                    <div
                        className={
                            "w-8/12 aspect-square rounded-full border-[0.2mm] border-kac-bone-darker absolute bg-kac-bone-light"
                        }
                    />
                    <Icon icon="bodyBalance" className={"text-kac-bone-darker h-10 relative z-1 mt-2"} />
                    <div className="font-kacBody text-kac-bone-darker text-xs text-center relative z-1">Stunt</div>
                </div>
                {children}
            </div>
        </PaperOrDiv>
    );
};
