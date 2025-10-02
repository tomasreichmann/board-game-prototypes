import React, { CSSProperties } from "react";
import Image, { ImageProps } from "../Image";
import twm from "@/utils/twm";
import LayeredCard, { LayeredCardBackFace, LayeredCardBackFaceProps, LayeredCardProps } from "./LayeredCard";
import { TacticalRoleType, tacticalModifierMap, tacticalRolesMap } from "../../data/tactical-roles";
import { IconOrImage, IconOrImageProps } from "@/components/Icon/IconOrImage";
import { IconProps } from "../Icon";

export type LayeredActorCardProps = React.PropsWithChildren<
    {
        slug?: string;
        className?: string;
        imagePosition?: CSSProperties["objectPosition"];
        imageFit?: CSSProperties["objectFit"];
        imageClassName?: string;
        imageWrapperClassName?: string;
        ImageComponent?: React.ComponentType<ImageProps>;
    } & Partial<TacticalRoleType> &
        Partial<LayeredCardProps>
>;

const sampleRole = tacticalRolesMap.pawn;
const sampleModifier = tacticalModifierMap.regenerating;

const TextWithIcons = ({ text }: { text: string; iconProps?: Partial<IconOrImageProps<IconProps>> }) => {
    const fragments = text.split(/(\[[^\]]+\])/g).filter((fr) => fr !== "");
    return (
        <>
            {fragments.map((fragment, i) => (
                <React.Fragment key={i}>
                    {fragment.startsWith("[") && fragment.endsWith("]") ? (
                        <IconOrImage
                            className="inline-block align-center h-4 -my-1"
                            icon={`/mighty-decks/textIcons/${fragment.substring(1, fragment.length - 1)}.png`}
                        />
                    ) : (
                        fragment
                    )}
                </React.Fragment>
            ))}
        </>
    );
};

export default function LayeredActorCard({
    className,
    slug,
    name,
    deck,
    toughness,
    speed,
    special,
    actions,
    count,
    isModifier,
    imageClassName,
    imagePosition,
    imageFit = "contain",
    imageWrapperClassName,
    ImageComponent = Image,
    children,
    ...restProps
}: LayeredActorCardProps) {
    const props: LayeredCardProps = {
        slug,
        imageUri: "/mighty-decks/actors/base/minion-yellow.png",
    };
    if (isModifier) {
        props.adjective = name;
        props.adjectiveDeck = deck;
        props.adjectiveEffect = special ? <TextWithIcons text={special} /> : undefined;
        props.adjectiveCornerIcon = "/mighty-decks/types/actor.png";

        Object.assign(props, sampleRole);
    } else {
        props.noun = name;
        props.nounDeck = deck;
        props.nounCornerIcon = "/mighty-decks/types/actor.png";
        Object.assign(props, sampleModifier);
    }
    return <LayeredCard className={twm("LayeredActorCard", className)} {...props} {...restProps} />;
}

export type LayeredActorCardBackFaceProps = LayeredCardBackFaceProps;

export const LayeredActorCardBackFace = LayeredCardBackFace;
