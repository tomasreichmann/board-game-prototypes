import React, { CSSProperties } from "react";
import Image, { ImageProps } from "../Image";
import twm from "@/utils/twm";
import LayeredCard, { LayeredCardBackFace, LayeredCardBackFaceProps, LayeredCardProps } from "./LayeredCard";
import { TacticalRoleType, tacticalModifierMap, tacticalRolesMap } from "../../data/tactical-roles";
import { IconOrImage, IconOrImageProps } from "@/components/Icon/IconOrImage";
import { IconProps } from "../Icon";
import { AssetType } from "../../types";

export type LayeredAssetCardProps = React.PropsWithChildren<
    {
        slug?: string;
        className?: string;
        modifier?: AssetType;
    } & Partial<AssetType> &
        Partial<LayeredCardProps>
>;

const getLayeredCardProps = (baseProps?: Partial<AssetType>, modifier?: Partial<AssetType>): LayeredCardProps => {
    return {
        adjective: modifier?.title,
        adjectiveEffect: modifier?.effect,
        adjectiveDeck: modifier?.deck,
        adjectiveCornerIcon: "/mighty-decks/types/asset.png",
        noun: baseProps?.title,
        nounEffect: baseProps?.effect,
        nounDeck: baseProps?.deck,
        nounCornerIcon: "/mighty-decks/types/asset.png",
        imageUri: baseProps?.icon,
        imageOverlayUri: modifier?.icon,
    };
};

export default function LayeredAssetCard({
    className,
    slug,
    title,
    deck,
    count,
    effect,
    icon,
    modifier,
    children,
    ...restProps
}: LayeredAssetCardProps) {
    const baseProps = { deck, title, icon, effect };
    const props = getLayeredCardProps(baseProps, modifier);

    return <LayeredCard className={twm("LayeredAssetCard", className)} {...props} {...restProps} />;
}

export type LayeredAssetCardBackFaceProps = LayeredCardBackFaceProps;

export const LayeredAssetCardBackFace = LayeredCardBackFace;
