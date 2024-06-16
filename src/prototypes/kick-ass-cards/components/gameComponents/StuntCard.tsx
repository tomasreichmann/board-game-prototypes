import React from "react";
import { twMerge } from "tailwind-merge";
import { PaperOrDiv, PaperProps } from "../../../../components/print/Paper/Paper";
import { StuntType } from "../../types";
import Icon, { IconType, iconMap } from "../Icon";
import RichText from "../RichText";
import { IconOrImage } from "../../../../components/Icon/IconOrImage";
// import "./StuntCard.css";

export type StuntCardProps = React.PropsWithChildren<Partial<PaperProps> & Omit<StuntType, "count">>;

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
                    "absolute left-0 top-1/2 -translate-y-1/2 h-full w-full object-contain max-h-16",
                    outcomeColorClassNameMap[icon] || "text-kac-bone-dark",
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
    ...restProps
}: StuntCardProps) {
    const {
        bleedMm = 0,
        bleedTopMm = bleedMm,
        bleedRightMm = bleedMm,
        bleedBottomMm = bleedMm,
        bleedLeftMm = bleedMm,
    } = restProps;
    const graphics = getGraphics(icon);
    return (
        <PaperOrDiv
            size={size}
            bleedMm={bleedMm}
            className={twMerge(
                "StuntCard bg-white rounded-lg print:rounded-none flex flex-col justify-stretch items-stretch font-kacBody",
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
                        <IconOrImage icon="/KAC/fist.png" className={"text-kac-bone-dark text-opacity-50 h-4"} />
                    </div>
                    <div className="flex-1 basis-[60%] flex flex-col items-center justify-end gap-2">
                        <div className="flex-1 relative self-stretch mx-[10%] my-[5%]">
                            <IconOrImage icon={icon} className="absolute w-full h-full object-contain drop-shadow-lg" />
                        </div>
                        <div className="font-kacLogo text-kac-gold-darker text-lg leading-none text-center mb-1">
                            {title}
                        </div>
                    </div>
                    <div className="flex-1 basis-[40%] text-xs text-center min-h-[6em] text-kac-iron-light leading-tight text-balance">
                        {requirements && (
                            <div className="text-xs text-center text-kac-blood mb-2">
                                <strong>Requirements:</strong>{" "}
                                <RichText commonComponentProps={{ className: "h-5 inline-block text-kac-steel-dark" }}>
                                    {requirements}
                                </RichText>
                            </div>
                        )}
                        <RichText commonComponentProps={{ className: "h-5 inline-block -my-1" }}>{effect}</RichText>
                    </div>
                    {children}
                </div>
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
            className={twMerge(
                "StuntCardBackFace gap-2 print:rounded-none flex flex-col justify-stretch items-stretch",
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
                    src="/KAC/stunt-back-face.png"
                    alt=""
                    className="absolute left-0 top-0 w-full h-full object-cover max-w-none"
                />
                <div className="absolute top-[60%] left-4 right-4 flex flex-col justify-center items-center flex-1 p-3">
                    <div className="text-kac-gold-light text-xs text-center relative z-1 font-kacLogo tracking-widest uppercase drop-shadow-md-heavy">
                        Stunt
                    </div>
                    {children}
                </div>
            </div>
        </PaperOrDiv>
    );
};
