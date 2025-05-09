import React from "react";
import { twMerge } from "tailwind-merge";
import { PaperOrDiv, PaperProps } from "../../../../components/print/Paper/Paper";
import { StuntType } from "../../types";
import RichText from "../RichText";
import { IconOrImage } from "../../../../components/Icon/IconOrImage";
import Card, { CardProps } from "./Card";
import { H2 } from "../content/Text";
// import "./StuntCard.css";

export type StuntCardProps = React.PropsWithChildren<Partial<CardProps> & Omit<StuntType, "count">>;

export default function StuntCard({
    className,
    size = "Mini European",
    slug,
    deck,
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
                    src="/mighty-decks/paper.png"
                    alt=""
                    className="absolute left-0 top-0 w-full h-full object-cover max-w-none"
                />
                <div className="flex-1 relative flex flex-col justify-center items-stretch p-3 gap-2 z-10">
                    <div className="flex flex-row items-center gap-1">
                        <IconOrImage icon={icon} className="h-6 text-kac-steel-dark" />
                        {/* <div className="flex-1 text-kac-iron-light text-center text-xs invisible">{slug}</div> */}
                        <div className="flex-1 text-kac-bone-dark text-right text-xs leading-none">{deck}</div>
                        <IconOrImage icon="/mighty-decks/backpack.png" className="text-kac-bone-dark text-opacity-50 h-4" />
                    </div>
                    <div className="flex-1 basis-[60%] flex flex-col items-center justify-end gap-2">
                        <div className="flex-1 relative self-stretch mx-[10%] my-[5%]">
                            <IconOrImage icon={icon} className="absolute w-full h-full object-contain drop-shadow-lg" />
                        </div>
                        <H2 className="font-kacLogo text-kac-iron-light text-2xl leading-none text-center mb-1">
                            {title}
                        </H2>
                    </div>
                    <div className="flex-1 basis-[40%] text-xs text-center min-h-[6em] text-kac-iron-light leading-tight tracking-tight text-balance">
                        {requirements && (
                            <div className="text-center text-kac-blood mb-2 font-bold">
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
export const StuntCardBackFace = ({ ...restProps }: Partial<CardProps>) => {
    return (
        <Card {...restProps} backgroundImageUri="/mighty-decks/stunt-back-face.png">
            <div className="absolute top-[60%] left-4 right-4 flex flex-col justify-center items-center flex-1 p-3">
                <H2 className="text-kac-gold-light text-2xl text-center relative z-1 drop-shadow-md-heavy">Stunt</H2>
            </div>
        </Card>
    );
};
