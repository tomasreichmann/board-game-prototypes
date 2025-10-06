import React from "react";
import { twMerge } from "tailwind-merge";
import { PaperOrDiv, PaperProps } from "../../../../components/print/Paper/Paper";
import { EffectType } from "../../types";
import RichText from "../RichText";
import { IconOrImage } from "../../../../components/Icon/IconOrImage";
import { allSizes } from "../../../../components/print/paperSizes";
import { H2 } from "../content/Text";
import LayeredCard, { LayeredCardBackFace, LayeredCardBackFaceProps } from "./LayeredCard";
import { LayeredActorCardBackFace } from "./LayeredActorCard";

type OptionalKeysType = "slug" | "count";

export type EffectCardProps = React.PropsWithChildren<
    Partial<PaperProps> & Omit<EffectType, OptionalKeysType> & Partial<Pick<EffectType, OptionalKeysType>>
>;

const colorClassNameMap = {
    "/mighty-decks/blood.png": "text-kac-blood",
    weight: "text-kac-steel-dark",
    "/mighty-decks/unconscious.png": "text-kac-steel-dark",
    "/mighty-decks/flee.png": "text-kac-iron-dark",
    "/mighty-decks/hopeless.png": "text-kac-iron-dark",
    "/mighty-decks/panicked.png": "text-kac-curse",
    "/mighty-decks/panicked2.png": "text-kac-curse",
    sleepy: "text-kac-cloth-dark",
    "/mighty-decks/sprint.png": "text-kac-monster-dark",
    quicksand: "text-kac-bone-dark",
    "/mighty-decks/complication.png": "text-kac-fire-light",
    "/mighty-decks/frozen.png": "text-kac-cloth-dark",
    "/mighty-decks/distress.png": "text-kac-cloth",
    "/mighty-decks/doom.png": "text-kac-iron-dark",
    "/mighty-decks/salvation.png": "text-kac-gold-dark",
    "/mighty-decks/frost.png": "text-kac-cloth-dark",
    "/mighty-decks/sun.png": "text-kac-fire",
    injury: "text-kac-blood",
    distress: "text-lightning-3", // blue
    dying: "text-kac-iron-dark",
    panicked: "text-kac-curse-dark",
    hopeless: "text-kac-steel-dark",
    stuck: "text-kac-steel-dark",
    hindered: "text-kac-bone-darker",
    boost: "text-kac-monster-dark",
    complication: "text-kac-iron-light",
    freezing: "text-kac-cloth",
    burning: "text-kac-fire",
};

const getColorClassName = (icon: string | undefined) => {
    if (!icon) return undefined;
    const type = icon.split("/").pop()?.split(".").shift();
    if (!type) return undefined;
    return type in colorClassNameMap ? colorClassNameMap[type as keyof typeof colorClassNameMap] : undefined;
};

export default function EffectCard({
    className,
    size = "54x86",
    slug,
    deck,
    title,
    icon,
    effect,
    children,
    ...restProps
}: EffectCardProps) {
    const colorClassName = getColorClassName(icon) || "text-kac-iron-light";

    // const isSmSize = allSizes[size].mm[1] < 70;

    const [nounEffect, adjectiveEffect] = effect?.split("──").map((part) => part.trim()) || [undefined, undefined];

    return (
        <LayeredCard
            size={size}
            className={twMerge(
                "EffectCard bg-white rounded-lg print:rounded-none flex flex-col justify-stretch items-stretch font-kacBody",
                className
            )}
            noun={title}
            nounEffect={
                nounEffect ? (
                    <RichText commonComponentProps={{ className: "h-5 inline-block -my-1" }}>{nounEffect}</RichText>
                ) : undefined
            }
            adjectiveEffect={
                adjectiveEffect ? (
                    <RichText commonComponentProps={{ className: "h-5 inline-block -my-1" }}>
                        {adjectiveEffect}
                    </RichText>
                ) : undefined
            }
            imageUri={icon}
            classNames={{ noun: colorClassName }}
            {...restProps}
        />
    );
}

export const EffectCardBackFace = ({
    className,
    size = "54x86",
    label,
    children,
    ...restProps
}: LayeredCardBackFaceProps) => {
    return (
        <LayeredCardBackFace
            size={size}
            label="Effect"
            labelClassName="text-kac-curse-lightest"
            iconUri="/mighty-decks/types/effect.png"
            className={twMerge("EffectCardBackFace", className)}
            {...restProps}
        />
    );
};
