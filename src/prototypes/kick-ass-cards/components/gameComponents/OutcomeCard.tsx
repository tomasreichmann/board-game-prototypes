import React from "react";
import { PaperOrDiv, PaperProps } from "../../../../components/print/Paper/Paper";
import { OutcomeType } from "../../types";
import RichText from "../RichText";
import { twMerge } from "tailwind-merge";
import { IconOrImage } from "../../../../components/Icon/IconOrImage";
import { allSizes } from "../../../../components/print/paperSizes";
import { H2 } from "../content/Text";
import Flippable, { FlippableProps } from "./Flippable";
import { ContentItemPassedProps } from "../playOnline/types";
import { isClickableClassName, isHighlightedClassName, isSelectedClassName } from "../playOnline/constants";

export type OutcomeCardProps = React.PropsWithChildren<OutcomeType & Partial<PaperProps>>;

const outcomeColorClassNameMap: { [key: string]: string } = {
    "/KAC/super.png": "text-kac-fire",
    "/KAC/bulls-eye.png": "text-kac-monster-dark",
    "/KAC/broken-coin.png": "text-kac-bone-dark",
    "/KAC/half-star.png": "text-kac-bone-dark",
    "/KAC/silver-medal.png": "text-kac-steel-dark",
    "/KAC/half-clover.png": "text-kac-bone-dark",
    "/KAC/skull.png": "text-kac-iron-light",
    "/KAC/skull-ink.png": "text-kac-iron-light",
    thrustBend: "text-kac-cloth",
    "/KAC/whirlwind.png": "text-kac-cloth-dark",
    drop: "text-kac-blood",
    stickyBoot: "text-kac-curse-light",
    sunbeams: "text-kac-gold",
    sprint: "text-kac-gold-dark",
    warlockEye: "text-kac-curse",
};

export default function OutcomeCard({
    className,
    size = "Mini European",
    slug,
    title,
    icon,
    description,
    children,
    ...restProps
}: OutcomeCardProps) {
    const colorClassName = outcomeColorClassNameMap[icon];
    const {
        bleedMm = 0,
        bleedTopMm = bleedMm,
        bleedRightMm = bleedMm,
        bleedBottomMm = bleedMm,
        bleedLeftMm = bleedMm,
    } = restProps;

    const isSmSize = allSizes[size].mm[1] < 70;

    return (
        <PaperOrDiv
            size={size}
            className={twMerge(
                "OutcomeCard bg-white rounded-lg print:rounded-none flex flex-col justify-stretch items-stretch font-kacBody",
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
                        <IconOrImage icon={icon} className={twMerge("h-6", colorClassName || "text-kac-steel")} />
                        <div className="flex-1 text-slate-400 text-center text-xs invisible">{slug}</div>
                        <IconOrImage icon="/KAC/d20-gold.png" className={"text-kac-steel-dark h-6"} />
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
                        <H2
                            className={twMerge(
                                "font-kacLogo text-kac-cloth text-center mb-1 leading-none",
                                colorClassName
                            )}
                            size={isSmSize ? "xl" : "xxl"}
                        >
                            {title}
                        </H2>
                    </div>

                    <div
                        className={twMerge(
                            "flex-1 basis-[40%] text-xs text-center text-kac-iron-light text-balance",
                            isSmSize && "text-[0.6rem]",
                            "leading-tight tracking-tight"
                        )}
                    >
                        <RichText commonComponentProps={{ className: "h-5 inline-block -my-1" }}>
                            {description}
                        </RichText>
                    </div>
                    {children}
                </div>
            </div>
        </PaperOrDiv>
    );
}

export const OutcomeCardBackFace = ({
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
                "OutcomeCardBackFace gap-2 print:rounded-none flex flex-col justify-stretch items-stretch",
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
                    src="/KAC/outcome-back-face.png"
                    alt=""
                    className="absolute left-0 top-0 w-full h-full object-cover max-w-none"
                />
                <div className="absolute top-[60%] left-4 right-4 flex flex-col justify-center items-center flex-1 p-3">
                    <H2 className="text-kac-gold-light text-2xl text-center relative z-1 drop-shadow-md-heavy">
                        Outcome
                    </H2>
                    {children}
                </div>
            </div>
        </PaperOrDiv>
    );
};

export type OutcomeCardFlippableProps = React.PropsWithChildren<
    OutcomeCardProps & Pick<FlippableProps, "isFaceDown">
> & {
    style?: React.CSSProperties;
    outcomeClassName?: string;
} & ContentItemPassedProps;

export const OutcomeCardFlippable = ({
    className,
    isFaceDown = false,
    style,
    outcomeClassName,
    isClickable,
    isHighlighted,
    isSelected,
    ...restProps
}: OutcomeCardFlippableProps) => {
    return (
        <Flippable
            className={twMerge("OutcomeCardFlippable rounded-lg", className)}
            isFaceDown={isFaceDown}
            backFace={
                <OutcomeCardBackFace
                    className={twMerge(
                        "relative overflow-hidden rounded-lg",
                        isClickable && isClickableClassName,
                        isHighlighted && isHighlightedClassName,
                        isSelected && isSelectedClassName
                    )}
                />
            }
            style={style}
        >
            <OutcomeCard
                {...restProps}
                className={twMerge(
                    "overflow-hidden",
                    isClickable && isClickableClassName,
                    isHighlighted && isHighlightedClassName,
                    isSelected && isSelectedClassName,
                    outcomeClassName
                )}
            />
        </Flippable>
    );
};
