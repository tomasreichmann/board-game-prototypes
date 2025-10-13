import { twMerge } from "tailwind-merge";
import ChunkedPages from "../print/ChunkedPages";
import ToggleData from "../../../../components/DataToggle";
import { useState } from "react";
import Input from "../controls/Input";
import Print from "../../../../components/print/Print";
import Icon from "../Icon";
import LayeredCard, {
    LayeredCardBackFace,
    LayeredCardBackFaceProps,
    LayeredCardProps,
} from "../gameComponents/LayeredCard";
import { useChunkedPagesProps, useItemAdapter } from "./printControlUtils";
import assets from "../../data/assets-en-deck";
import { AssetType } from "../../types";
import multiplyByCount, { defaultCountAdapter } from "@/utils/multiplyByCount";
import { assetModifierMap } from "../../data/asset-modifiers-en-deck";
import RichText from "../RichText";

export type BaseAssetCardsPrintControlsProps = {
    className?: string;
};

type BaseLayeredAssetCard = Omit<LayeredCardProps, "children"> & {
    slug: string;
};

const sampleLayeredAssetBackFaceProps: LayeredCardBackFaceProps = {
    iconUri: "/mighty-decks/types/asset.png",
    backgroundImageUri: "/mighty-decks/background/card-backface2.png",
    label: "Asset",
    labelClassName: "text-[#edd9ff]",
} as const;

console.log("assetModifierMap", assetModifierMap);

const adaptAsset = (asset: AssetType, index: number): BaseLayeredAssetCard => ({
    slug: `base-layered-asset-${asset.slug}`,
    size: "54x86",
    bleedMm: 3,
    className: "relative",

    noun: asset.title,
    nounEffect: <RichText commonComponentProps={{ className: "h-5 inline-block -my-1" }}>{asset.effect}</RichText>,
    nounDeck: asset.deck,
    nounCornerIcon: "/mighty-decks/types/asset.png",

    /* adjective: assetModifiers[index % assetModifiers.length].title,
    adjectiveEffect: assetModifiers[index % assetModifiers.length].effect,
    adjectiveDeck: assetModifiers[index % assetModifiers.length].deck,
    adjectiveCornerIcon: "/mighty-decks/types/asset.png",
    imageOverlayUri: assetModifiers[index % assetModifiers.length].icon || undefined, */

    imageUri: asset.icon,
    backFaceProps: {
        ...sampleLayeredAssetBackFaceProps,
    },
});

export default function BaseAssetCardsPrintControls({ className }: BaseAssetCardsPrintControlsProps) {
    const chunkedPagesProps = useChunkedPagesProps();
    const [copyCount, setCopyCount] = useState(1);

    const baseAssets = assets.filter((asset) => asset.deck === "base");
    const rawItems = multiplyByCount(baseAssets, "count", defaultCountAdapter).map(adaptAsset);
    // const rawItems = [baseAssets[0], baseAssets[1], ...baseAssets].map(adaptAsset)
    const cardsPerPage = 8;
    const missingCountToMakeFullPages = (cardsPerPage - (rawItems.length % cardsPerPage)) % cardsPerPage;
    rawItems.push(
        ...Array(missingCountToMakeFullPages)
            .fill(null)
            .map((_, index) =>
                adaptAsset(
                    {
                        slug: "empty-" + index,
                        title: "",
                        icon: "",
                        count: 0,
                        effect: "",
                        cost: 0,
                    },
                    index
                )
            )
    );
    const items = useItemAdapter<BaseLayeredAssetCard>(rawItems);

    return (
        <div className={twMerge("flex flex-col gap-4 print:gap-0", className)}>
            <div className="print:hidden mt-4">
                <Input
                    label="Copies"
                    type="number"
                    value={copyCount}
                    onChange={(event) => setCopyCount(event.target.valueAsNumber || 1)}
                    className="w-32"
                />
            </div>
            <ToggleData
                data={items}
                buttonContent={"Items data (" + items.length + ")"}
                initialCollapsed
                className="print:hidden mt-4"
            />
            <Print
                className="flex flex-col-reverse gap-2"
                documentTitle="Base Asset Cards"
                buttonProps={{
                    className: "self-center flex flex-row items-center",
                    children: (
                        <>
                            <Icon icon="print" className="w-6 h-6" />
                            &ensp;Print all pages
                        </>
                    ),
                }}
            >
                <div className="flex flex-col items-center w-full">
                    <ChunkedPages
                        Component={LayeredCard}
                        BackFaceComponent={LayeredCardBackFace}
                        getBackFaceProps={(item) => ({
                            size: item.size ?? "54x86",
                            bleedMm: item.bleedMm,
                            ...item.backFaceProps,
                        })}
                        items={items}
                        {...chunkedPagesProps}
                        label="Base Asset Cards"
                    />
                </div>
            </Print>
        </div>
    );
}
