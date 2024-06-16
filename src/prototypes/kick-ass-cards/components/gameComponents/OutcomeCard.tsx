import React from "react";
import { PaperOrDiv, PaperProps } from "../../../../components/print/Paper/Paper";
import { OutcomeType } from "../../types";
import RichText from "../RichText";
import { twMerge } from "tailwind-merge";
import { IconOrImage } from "../../../../components/Icon/IconOrImage";

export type OutcomeCardProps = React.PropsWithChildren<OutcomeType & Partial<PaperProps>>;

const outcomeColorClassNameMap: { [key: string]: string } = {
    "/KAC/super.png": "text-kac-fire",
    "/KAC/bulls-eye.png": "text-kac-monster-dark",
    "/KAC/broken-coin.png": "text-kac-bone-dark",
    "/KAC/half-star.png": "text-kac-bone-dark",
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
                        <div
                            className={twMerge(
                                "font-kacLogo text-kac-cloth text-lg leading-none text-center mb-1",
                                colorClassName
                            )}
                        >
                            {title}
                        </div>
                    </div>

                    <div className="flex-1 basis-[40%] text-xs text-center text-kac-iron-light leading-tight text-balance ">
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
                    <div className="text-kac-gold-light text-xs text-center relative z-1 font-kacLogo tracking-widest uppercase drop-shadow-md-heavy">
                        Outcome
                    </div>
                    {children}
                </div>
            </div>
        </PaperOrDiv>
    );
};
