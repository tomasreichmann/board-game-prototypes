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
        title?: string;
        imageUri?: string;
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
    agriculture: "/machi-koro/agriculture.png",
    food: "/machi-koro/food.png",
    cow: "/machi-koro/cow.png",
    industry: "/machi-koro/industry.png",
    landmark: "/machi-koro/landmark.png",
    retail: "/machi-koro/retail.png",
    special: "/machi-koro/special.png",
    card: "/machi-koro/card.png",
};

const RichFragment = ({
    children,
    imageClassName,
    isLast,
}: {
    children: string;
    imageClassName?: string;
    isLast?: boolean;
}) => {
    if (typeof children === "string") {
        if (children === "\n") {
            return <br />;
        }
        if (children === "\n\n") {
            return <span className="inline-block w-full h-[0.25em]" />;
        }
        const activationNumberMatch = children.match(/\((\d+\-?\+?)\)/);
        if (activationNumberMatch) {
            const [, condition] = activationNumberMatch;
            return (
                <>
                    <span className="inline-block border-white border-2 rounded px-[0.25em] py-[0.25em] align-middle leading-none">
                        {condition}
                    </span>{" "}
                    {!isLast && " "}
                </>
            );
        }
        const coinNumberMatch = children.match(/(\d+)C/);
        if (coinNumberMatch) {
            const [, amount] = coinNumberMatch;
            return (
                <>
                    <span
                        className="inline-flex size-[2em] -mx-[0.2em] -my-[0.2em] flex-col justify-center items-center align-middle text-black font-mkHeading tracking-tight leading-none"
                        style={{
                            background: "url(/machi-koro/coin.svg) no-repeat center center / contain",
                            textShadow: "none",
                        }}
                    >
                        {amount}
                    </span>{" "}
                    {!isLast && " "}
                </>
            );
        }
        const keyWithoutBrackets = children.replace("[", "").replace("]", "");
        if (keyWithoutBrackets in typeImageUriMap) {
            return (
                <>
                    <img
                        className={imageClassName}
                        src={typeImageUriMap[keyWithoutBrackets as keyof typeof typeImageUriMap]}
                    />
                    {!isLast && " "}
                </>
            );
        }
    }
    return (
        <>
            {children}
            {!isLast && " "}
        </>
    );
};

export default function BuildingCard({
    slug,
    className,
    activation,
    title,
    imageUri,
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
            <div
                className="flex-1 relative flex flex-col p-5 gap-2"
                style={{
                    margin: `${bleedMm}mm`,
                    background: "url(/machi-koro/building-frontface.png) no-repeat center center / contain",
                }}
            >
                <div className="absolute left-6 right-6 top-9 -translate-y-1/2 text-center font-mkHeading text-white leading-none">
                    {(activation || " ").split(" ").map((word, index) => (
                        <RichFragment key={index} imageClassName="inline h-8 middle -my-2 -mx-1">
                            {word}
                        </RichFragment>
                    ))}
                </div>
                <div className="absolute left-6 right-6 top-14 bottom-8 flex flex-col">
                    <div className="text-center font-mkHeading text-mk-tender uppercase mt-4 leading-none">
                        <img src="/machi-koro/handshake.svg" className="inline h-5 rounded-full bg-mk-tender" /> {title}
                    </div>
                    <div className="relative flex-1 -mx-3">
                        {imageUri && <img src={imageUri} alt="" className="w-full h-full object-contain" />}
                    </div>
                    <div
                        className={twMerge(
                            "text-center font-mkBody font-[500] text-white mt-4 leading-tight text-sm [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]",
                            (description?.length || 0) > 100 && "text-xs",
                            (description?.length || 0) > 200 && "text-[0.65rem] leading-[1.2em]"
                        )}
                    >
                        {(description || "").split(" ").map((word, index) => (
                            <RichFragment
                                key={index}
                                imageClassName={twMerge(
                                    "inline middle -mx-1 -mt-3 -mb-2 h-8 ",
                                    (description?.length || 0) > 100 && "h-5 -mx-0 -mt-2 -mb-1 "
                                )}
                            >
                                {word}
                            </RichFragment>
                        ))}
                    </div>
                </div>
                {/* <ToggleData
                    className="absolute left-0 bottom-0 max-h-full"
                    initialCollapsed
                    data={{ slug, activation, deckType, type, cost, reward, description, title }}
                    buttonProps={{ size: "xs" }}
                /> */}
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
                "BuildingCardBackFace gap-2 rounded-lg print:rounded-none bg-white flex flex-col justify-stretch items-stretch",
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
