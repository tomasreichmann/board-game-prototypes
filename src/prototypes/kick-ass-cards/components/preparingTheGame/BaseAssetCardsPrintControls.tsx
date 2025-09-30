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

export type BaseAssetCardsPrintControlsProps = {
    className?: string;
};

type BaseLayeredAssetCard = Omit<LayeredCardProps, "children"> & {
    slug: string;
};

const sampleLayeredAssetBackFaceProps: LayeredCardBackFaceProps = {
    iconUri: "/mighty-decks/types/asset.png",
    backgroundImageUri: "/mighty-decks/background/card-backface.png",
    label: "Asset",
    labelClassName: "text-kac-gold-light",
} as const;

console.log("assetModifierMap", assetModifierMap);

const adaptAsset = (asset: AssetType, index: number): BaseLayeredAssetCard => ({
    slug: `base-layered-asset-${asset.slug}`,
    size: "54x86",
    bleedMm: 3,
    className: "relative",

    noun: asset.title,
    nounEffect: asset.effect,
    nounDeck: asset.deck,
    nounCornerIcon: "/mighty-decks/types/asset.png",

    /* adjective: assetModifierMap.base_dangerous.title,
    adjectiveEffect: assetModifierMap.base_dangerous.effect,
    adjectiveDeck: assetModifierMap.base_dangerous.deck,
    adjectiveCornerIcon: "/mighty-decks/types/asset.png",
    imageOverlayUri: assetModifierMap.base_dangerous.icon || undefined, */

    imageUri: asset.icon || "/mighty-decks/assets/base/explosive.png",
    backFaceProps: {
        ...sampleLayeredAssetBackFaceProps,
        // backgroundImageUri: "/mighty-decks/background/card-backface-" + ((index % 18) + 1) + ".png",
    },
});

export default function BaseAssetCardsPrintControls({ className }: BaseAssetCardsPrintControlsProps) {
    const chunkedPagesProps = useChunkedPagesProps();
    const [copyCount, setCopyCount] = useState(1);

    const baseAssets = assets.filter((asset) => asset.deck === "base");

    const items = useItemAdapter<BaseLayeredAssetCard>(
        // multiplyByCount(baseAssets, "count", defaultCountAdapter).map(adaptAsset)
        [baseAssets[0], baseAssets[1], ...baseAssets].map(adaptAsset)
    );

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
