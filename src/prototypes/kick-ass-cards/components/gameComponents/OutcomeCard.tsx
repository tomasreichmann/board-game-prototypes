import React from "react";
import { PaperOrDiv, PaperProps } from "../../../../components/print/Paper/Paper";
import { OutcomeType } from "../../types";
import RichText from "../RichText";
import { twMerge } from "tailwind-merge";
import { IconOrImage } from "../../../../components/Icon/IconOrImage";
import { allSizes } from "../../../../components/print/paperSizes";
import { H2 } from "../content/Text";
import Flippable, { FlippableProps } from "./Flippable";
import { ContentItemPassedProps } from "../playOnline/model/types";
import { isClickableClassName, isHighlightedClassName, isSelectedClassName } from "../playOnline/constants";
import LayeredCard, { LayeredCardBackFace, LayeredCardBackFaceProps } from "./LayeredCard";

export type OutcomeCardProps = React.PropsWithChildren<OutcomeType & Partial<PaperProps>>;

const outcomeColorClassNameMap: { [key: string]: string } = {
    "/mighty-decks/super.png": "text-kac-fire",
    "/mighty-decks/bulls-eye.png": "text-kac-monster-dark",
    "/mighty-decks/broken-coin.png": "text-kac-bone-dark",
    "/mighty-decks/half-star.png": "text-kac-bone-dark",
    "/mighty-decks/silver-medal.png": "text-kac-steel-dark",
    "/mighty-decks/half-clover.png": "text-kac-bone-dark",
    "/mighty-decks/skull.png": "text-kac-iron-light",
    "/mighty-decks/skull-ink.png": "text-kac-iron-light",
    thrustBend: "text-kac-cloth",
    "/mighty-decks/whirlwind.png": "text-kac-cloth-dark",
    drop: "text-kac-blood",
    stickyBoot: "text-kac-curse-light",
    sunbeams: "text-kac-gold",
    sprint: "text-kac-gold-dark",
    warlockEye: "text-kac-curse",

    "special-action": "text-kac-fire",
    success: "text-kac-monster-dark",
    "partial-success": "text-kac-steel-dark",
    fumble: "text-kac-iron-light",
    chaos: "text-kac-curse", // violet
};

const getColorClassName = (icon: string | undefined) => {
    if (!icon) return undefined;
    const type = icon.split("/").pop()?.split(".").shift();
    if (!type) return undefined;
    return type in outcomeColorClassNameMap ? outcomeColorClassNameMap[type as any] : undefined;
};

export default function OutcomeCard(props: OutcomeCardProps) {
    const {
        className,
        size = "54x86",
        title,
        icon,
        deck = "base",
        description,
        instructions,
        children,
        ...restProps
    } = props;
    const colorClassName = getColorClassName(icon);

    // const isSmSize = allSizes[size].mm[1] < 70;

    return (
        <LayeredCard
            size={size}
            {...restProps}
            classNames={{ noun: colorClassName }}
            noun={title}
            nounCornerIcon="/mighty-decks/types/outcome.png"
            nounDeck={deck}
            imageUri={icon}
            nounEffect={
                <RichText commonComponentProps={{ className: "h-5 inline-block -my-1" }}>{description}</RichText>
            }
            adjectiveEffect={
                instructions ? (
                    <RichText commonComponentProps={{ className: "h-5 inline-block -my-1" }}>{instructions}</RichText>
                ) : undefined
            }
        />
    );
}

export const layeredBackFaceProps: LayeredCardBackFaceProps = {
    iconUri: "/mighty-decks/types/outcome.png",
    backgroundImageUri: "/mighty-decks/background/card-backface2.png",
    label: "Outcome",
    labelClassName: "text-kac-monster-lightest",
} as const;

export const OutcomeCardBackFace = (props: Partial<LayeredCardBackFaceProps> & Partial<PaperProps>) => {
    return <LayeredCardBackFace {...layeredBackFaceProps} {...props} />;
};

export type OutcomeCardFlippableProps = React.PropsWithChildren<
    OutcomeCardProps & Pick<FlippableProps, "isFaceDown">
> & {
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
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
    onClick,
    ...restProps
}: OutcomeCardFlippableProps) => {
    return (
        <Flippable
            className={twMerge("OutcomeCardFlippable rounded-lg", className)}
            onClick={onClick}
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
