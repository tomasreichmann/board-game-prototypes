import { twMerge } from "tailwind-merge";
import ChunkedPages from "../print/ChunkedPages";
import ToggleData from "../../../../components/DataToggle";
import { useState } from "react";
import Input from "../controls/Input";
import Print from "../../../../components/print/Print";
import Icon from "../Icon";
import LayeredCard, { LayeredCardProps } from "../gameComponents/LayeredCard";
import { useChunkedPagesProps, useItemAdapter } from "./printControlUtils";
import { assetMap } from "../../data/assets-en-deck";
import assetModifiers from "../../data/asset-modifiers-en-deck";
import { AssetType } from "../../types";
import multiplyByCount, { defaultCountAdapter } from "@/utils/multiplyByCount";

export type BaseAssetModifierCardsPrintControllsProps = {
    className?: string;
};

type BaseLayeredAssetModifierCard = Omit<LayeredCardProps, "children"> & {
    slug: string;
};

const adaptAssetModifier = (asset: AssetType): BaseLayeredAssetModifierCard => ({
    slug: `base-layered-asset-modifier-${asset.slug}`,
    size: "54x86",
    bleedMm: 3,
    className: "relative",

    /* noun: assetMap.base_shield.title,
    nounEffect: assetMap.base_shield.effect,
    nounDeck: assetMap.base_shield.deck,
    nounCornerIcon: "/mighty-decks/backpack.png",
    imageUri: assetMap.base_shield.icon || undefined, */

    adjective: asset.title,
    adjectiveEffect: asset.effect,
    adjectiveDeck: asset.deck,
    adjectiveCornerIcon: "/mighty-decks/types/asset.png",

    imageOverlayUri: asset.icon || undefined,
    // backFaceProps: sampleLayeredAssetModifierBackFaceProps,
    backgroundImageUri: null,
});

export default function BaseAssetModifierCardsPrintControls({ className }: BaseAssetModifierCardsPrintControllsProps) {
    const chunkedPagesProps = useChunkedPagesProps();
    const [copyCount, setCopyCount] = useState(1);

    const baseAssetModifiers = assetModifiers.filter((asset) => asset.deck === "base modifier");

    const items = useItemAdapter<BaseLayeredAssetModifierCard>(
        //multiplyByCount(baseAssetModifiers, "count", defaultCountAdapter).map(adaptAssetModifier)
        baseAssetModifiers.map(adaptAssetModifier)
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
                documentTitle="Base Asset Modifier Cards"
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
                        // BackFaceComponent={LayeredCardBackFace}
                        getBackFaceProps={(item) => ({
                            size: item.size ?? "54x86",
                            bleedMm: item.bleedMm,
                            ...item.backFaceProps,
                        })}
                        items={items}
                        {...chunkedPagesProps}
                        label="Base Asset Modifier Cards"
                    />
                </div>
            </Print>
        </div>
    );
}
