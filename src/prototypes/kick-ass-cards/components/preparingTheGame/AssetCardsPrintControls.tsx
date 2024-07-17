import { twMerge } from "tailwind-merge";
import ChunkedPages from "../print/ChunkedPages";
import ToggleData from "../../../../components/DataToggle";
import Print from "../../../../components/print/Print";
import Icon from "../Icon";
import { useChunkedPagesProps, useItemAdapter } from "./printControlUtils";
import assets from "../../data/assets-en-deck";
import multiplyByCount, { defaultCountAdapter } from "../../../../utils/multiplyByCount";
import AssetCard, { AssetCardBackFace } from "../gameComponents/AssetCard";

export type AssetCardsPrintControlsProps = {
    className?: string;
};

export default function AssetCardsPrintControls({ className }: AssetCardsPrintControlsProps) {
    const chunkedPagesProps = useChunkedPagesProps();

    const items = useItemAdapter(
        multiplyByCount(
            assets.filter((item) => item.deck !== "sci-fi"),
            "count",
            defaultCountAdapter
        ).map((item) => ({
            ...item,
            className: "relative",
        }))
        /* .sort((a, b) => {
                const deckCompare = a.deck.localeCompare(b.deck);
                if (deckCompare !== 0) {
                    return deckCompare;
                }
                return a.title.localeCompare(b.title);
            }) */
    );
    return (
        <div className={twMerge("flex flex-col gap-4 print:gap-0", className)}>
            <ToggleData data={items} initialCollapsed className="print:hidden mt-4" />
            <Print
                className="flex flex-col-reverse gap-2"
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
                        Component={AssetCard}
                        BackFaceComponent={AssetCardBackFace}
                        items={items}
                        {...chunkedPagesProps}
                        label="assets"
                    />
                </div>
            </Print>
        </div>
    );
}
