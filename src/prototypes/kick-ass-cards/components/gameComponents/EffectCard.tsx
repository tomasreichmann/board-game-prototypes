import React from "react";
import { twMerge } from "tailwind-merge";
import { PaperOrDiv, PaperProps } from "../../../../components/print/Paper/Paper";
import { EffectType } from "../../types";
import Icon, { IconType, iconMap } from "../Icon";
import RichText from "../RichText";
import { IconOrImage } from "../../../../components/Icon/IconOrImage";

type OptionalKeysType = "slug" | "count";

export type EffectCardProps = React.PropsWithChildren<
    Partial<PaperProps> & Omit<EffectType, OptionalKeysType> & Partial<Pick<EffectType, OptionalKeysType>>
>;

const colorClassNameMap = {
    "/KAC/blood.png": "text-kac-blood",
    weight: "text-kac-steel-dark",
    "/KAC/unconscious.png": "text-kac-steel-dark",
    "/KAC/flee.png": "text-kac-iron-dark",
    "/KAC/hopeless.png": "text-kac-iron-dark",
    "/KAC/panicked.png": "text-kac-curse",
    "/KAC/panicked2.png": "text-kac-curse",
    sleepy: "text-kac-cloth-dark",
    "/KAC/sprint.png": "text-kac-monster-dark",
    quicksand: "text-kac-bone-dark",
    "/KAC/complication.png": "text-kac-fire-light",
    "/KAC/frozen.png": "text-kac-cloth-dark",
    "/KAC/distress.png": "text-kac-cloth",
    "/KAC/doom.png": "text-kac-iron-dark",
    "/KAC/salvation.png": "text-kac-gold-dark",
    "/KAC/frost.png": "text-kac-cloth-dark",
    "/KAC/sun.png": "text-kac-fire",
};

export default function EffectCard({
    className,
    size = "Mini European",
    slug,
    title,
    icon,
    effect,
    children,
    ...restProps
}: EffectCardProps) {
    const {
        bleedMm = 0,
        bleedTopMm = bleedMm,
        bleedRightMm = bleedMm,
        bleedBottomMm = bleedMm,
        bleedLeftMm = bleedMm,
    } = restProps;

    const colorClassName =
        icon in colorClassNameMap ? colorClassNameMap[icon as keyof typeof colorClassNameMap] : "text-kac-steel-dark";

    return (
        <PaperOrDiv
            size={size}
            bleedMm={bleedMm}
            className={twMerge(
                "EffectCard bg-white rounded-lg print:rounded-none flex flex-col justify-stretch items-stretch font-kacBody",
                className
            )}
            {...restProps}
        >
            <div
                className="relative flex-1 flex flex-col justify-center items-stretch"
                style={{
                    margin: `-${bleedTopMm}mm -${bleedRightMm}mm -${bleedBottomMm}mm -${bleedLeftMm}mm`,
                    padding: `${bleedTopMm}mm ${bleedRightMm}mm ${bleedBottomMm}mm ${bleedLeftMm}mm`,
                }}
            >
                <img
                    src="/KAC/paper.png"
                    alt=""
                    className="absolute left-0 top-0 w-full h-full object-cover max-w-none"
                />

                <div className="flex-1 relative flex flex-col justify-center items-stretch p-3 gap-2 z-10">
                    <div className="flex flex-row items-center gap-1">
                        <IconOrImage icon={icon} className="h-6 text-kac-steel-dark" />
                        <div className="flex-1 text-slate-400 text-center text-xs invisible">{slug}</div>
                        <IconOrImage icon="/KAC/heartbeat.png" className={"text-kac-skin-dark h-6"} />
                    </div>
                    <div className="flex-1 basis-[60%] flex flex-col items-center justify-end gap-2">
                        <div className="flex-1 relative self-stretch mx-[10%] my-[5%]">
                            <IconOrImage
                                icon={icon}
                                className={twMerge(
                                    "absolute w-full h-full object-contain drop-shadow-lg",
                                    colorClassName || "text-kac-iron-light"
                                )}
                            />
                        </div>
                        <div
                            className={twMerge(
                                "font-kacLogo text-kac-cloth text-lg leading-none text-center mb-1",
                                colorClassName
                            )}
                        >
                            {title}
                        </div>
                    </div>
                    <div className="flex-1 basis-[40%] text-xs text-center min-h-[6em] text-kac-iron-light leading-tight text-balance">
                        <RichText commonComponentProps={{ className: "h-5 inline-block -my-1" }}>{effect}</RichText>
                    </div>
                    {children}
                </div>
            </div>
        </PaperOrDiv>
    );
}

export const EffectCardBackFace = ({
    className,
    size = "Mini European",
    children,
    ...restProps
}: Partial<PaperProps>) => {
    const {
        bleedMm = 0,
        bleedTopMm = bleedMm,
        bleedRightMm = bleedMm,
        bleedBottomMm = bleedMm,
        bleedLeftMm = bleedMm,
    } = restProps;
    return (
        <PaperOrDiv
            size={size}
            bleedMm={bleedMm}
            className={twMerge(
                "EffectCardBackFace gap-2 rounded-lg print:rounded-none flex flex-col justify-stretch items-stretch",
                className
            )}
            {...restProps}
        >
            <div
                className="relative flex-1 flex flex-col justify-center items-stretch bg-kac-steel-dark rounded-lg print:rounded-none"
                style={{
                    margin: `-${bleedTopMm}mm -${bleedRightMm}mm -${bleedBottomMm}mm -${bleedLeftMm}mm`,
                    padding: `${bleedTopMm}mm ${bleedRightMm}mm ${bleedBottomMm}mm ${bleedLeftMm}mm`,
                }}
            >
                <img
                    src="/KAC/effect-back-face.png"
                    alt=""
                    className="absolute left-0 top-0 w-full h-full object-cover max-w-none"
                />
                <div className="absolute top-[60%] left-4 right-4 flex flex-col justify-center items-center flex-1 p-3">
                    <div className="text-white text-xs text-center relative z-1 font-kacLogo tracking-widest uppercase drop-shadow-md-heavy">
                        Effect
                    </div>
                    {children}
                </div>
            </div>
        </PaperOrDiv>
    );
};
