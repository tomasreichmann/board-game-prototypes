import React from "react";
import { PaperOrDiv, PaperProps } from "../../../../components/print/Paper/Paper";
import { twMerge } from "tailwind-merge";
import ToggleData from "../../../../components/DataToggle";

export enum BuildingTypeEnum {
    "PublicTender" = "PublicTender",
}

export enum DeckTypeEnum {
    "Landmark" = "Landmark",
    "Small" = "Small",
    "Big" = "Big",
}

export type BuildingCardProps = React.PropsWithChildren<
    {
        slug?: string;
        className?: string;
        activation?: string;
        deckType?: DeckTypeEnum;
        type?: BuildingTypeEnum;
        cost?: number;
        reward?: number;
        description?: string;
    } & Partial<PaperProps>
>;

const typeImageUriMap = {
    agriculture: "public/machi-koro/agriculture.png",
    food: "public/machi-koro/food.png",
    industry: "public/machi-koro/industry.png",
    landmark: "public/machi-koro/landmark.png",
    retail: "public/machi-koro/retail.png",
    special: "public/machi-koro/special.png",
};

export default function BuildingCard({
    slug,
    className,
    activation,
    deckType,
    type,
    cost,
    reward,
    description,
    children,
    bleedMm = 0,
    size = "standard",
    ...restProps
}: BuildingCardProps) {
    return (
        <PaperOrDiv
            size={size}
            bleedMm={bleedMm}
            className={twMerge(
                "BuildingCard flex flex-col text-kac-steel-dark bg-white relative rounded-lg",
                className
            )}
            {...restProps}
        >
            <div className="flex-1 relative flex flex-col p-5 gap-2" style={{ margin: `${bleedMm}mm` }}>
                <ToggleData data={{ slug, activation, deckType, type, cost, reward, description }} />
                {children}
            </div>
        </PaperOrDiv>
    );
}

export const BuildingCardBackFace = ({ className, children, size = "standard", ...restProps }: Partial<PaperProps>) => {
    return (
        <PaperOrDiv
            size={size}
            className={twMerge(
                "BuildingCardBackFace gap-2 rounded-lg print:rounded-none bg-kac-gold-dark flex flex-col justify-stretch items-stretch",
                className
            )}
            {...restProps}
        >
            <div
                className="m-[3mm] relative flex flex-col justify-center items-center flex-1 p-3"
                style={{ background: "url(/machi-koro/building-backface.png) no-repeat center center / contain" }}
            >
                {children}
            </div>
        </PaperOrDiv>
    );
};
