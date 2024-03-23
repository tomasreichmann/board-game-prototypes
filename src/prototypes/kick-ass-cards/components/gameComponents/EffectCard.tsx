import React from "react";
import { twMerge } from "tailwind-merge";
import { PaperOrDiv, PaperProps } from "../../../../components/print/Paper/Paper";
import { EffectType } from "../../types";
import Icon, { IconType, iconMap } from "../Icon";
import RichText from "../RichText";

type OptionalKeysType = "slug" | "count";

export type EffectCardProps = React.PropsWithChildren<
    Partial<PaperProps> & Omit<EffectType, OptionalKeysType> & Partial<Pick<EffectType, OptionalKeysType>>
>;

const effectSizeClassNameMap: { [key: string]: string } = {
    "/LP/icons/doom.png": "h-24",
    "/LP/icons/salvation.png": "h-24",
};

const outcomeColorClassNameMap: { [key in IconType]?: string } = {
    drop: "text-kac-blood",
    weight: "text-kac-steel-dark",
    knockout: "text-kac-iron-dark",
    run: "text-kac-iron-dark",
    shouting: "text-kac-curse",
    sleepy: "text-kac-cloth-dark",
    sprint: "text-kac-gold-dark",
    quicksand: "text-kac-bone-dark",
    footTrip: "text-kac-bone-dark",
    stickyBoot: "text-kac-monster",
    tearTracks: "text-kac-cloth",
    thermometerCold: "text-kac-cloth-dark",
    thermometerHot: "text-kac-fire",
};

const isIcon = (maybeIcon: string): maybeIcon is IconType => maybeIcon in iconMap;
const getGraphics = (icon: EffectType["icon"], className?: string) => {
    if (!icon) {
        return null;
    }
    if (isIcon(icon)) {
        return (
            <Icon
                icon={icon}
                className={twMerge(
                    "max-h-fit",
                    outcomeColorClassNameMap[icon] || "text-iron-light",
                    effectSizeClassNameMap[icon] || "h-16",
                    className
                )}
            />
        );
    }
    return (
        <img
            className={twMerge("max-h-fit h-16", effectSizeClassNameMap[icon] || "h-16", className)}
            src={icon}
            alt=""
        />
    );
};

export default function EffectCard({
    className,
    size = "Mini European",
    slug,
    title,
    icon,
    effect,
    children,
    bleedMm = 0,
    ...restProps
}: EffectCardProps) {
    const graphics = getGraphics(icon);
    const smallGraphics = getGraphics(icon, "h-4");
    return (
        <PaperOrDiv
            size={size}
            bleedMm={bleedMm}
            className={twMerge(
                "EffectCard bg-white rounded-lg print:rounded-none flex flex-col justify-stretch items-stretch",
                className
            )}
            {...restProps}
        >
            <div
                className="relative flex flex-col justify-center items-stretch flex-1 p-3"
                style={{ margin: `${bleedMm}mm` }}
            >
                <div className="flex flex-row items-center gap-2">
                    {smallGraphics}
                    <div className="flex-1 text-slate-400 text-center text-xs">{slug}</div>
                    <Icon icon="heartBeats" className={"text-kac-skin-dark h-4"} />
                </div>
                <div className="flex-1 flex flex-col items-center justify-end gap-1 h-0">
                    {graphics}
                    <div
                        className={twMerge(
                            "font-kacHeading text-kac-iron-light text-sm text-center leading-none mb-1 mt-2",
                            icon && isIcon(icon) && outcomeColorClassNameMap[icon]
                        )}
                    >
                        {title}
                    </div>
                </div>
                <div className="text-xs text-center min-h-[6em] text-kac-iron-light leading-tight text-balance">
                    <RichText commonComponentProps={{ className: "h-5 inline-block -my-1" }}>{effect}</RichText>
                </div>
                {children}
            </div>
        </PaperOrDiv>
    );
}

export const EffectCardBackFace = ({
    className,
    size = "Mini European",
    children,
    bleedMm = 0,
    ...restProps
}: Partial<PaperProps>) => {
    return (
        <PaperOrDiv
            size={size}
            bleedMm={bleedMm}
            className={twMerge(
                "EffectCardBackFace gap-2 rounded-lg print:rounded-none bg-kac-skin-light flex flex-col justify-stretch items-stretch",
                className
            )}
            {...restProps}
        >
            <div
                className="relative flex flex-col justify-center items-center flex-1 p-3"
                style={{ margin: `${bleedMm}mm` }}
            >
                <div className="w-32 h-32 flex flex-col justify-center items-center relative">
                    <div
                        className={
                            "text-kac-blood w-8/12 aspect-square rounded-full border-[0.2mm] border-skin-dark absolute bg-kac-blood-light"
                        }
                    />
                    <Icon icon="heartBeats" className={"text-kac-skin-light h-10 relative z-1 mt-2"} />
                    <div className="font-kacBody text-kac-skin-light text-xs text-center relative z-1">Effect</div>
                </div>
                {children}
            </div>
        </PaperOrDiv>
    );
};
