import { twMerge } from "tailwind-merge";
import ChunkedPages from "../print/ChunkedPages";
import ToggleData from "../../../../components/DataToggle";
import { useState } from "react";
import Input from "../controls/Input";
import { range } from "lodash";
import Print from "../../../../components/print/Print";
import Icon from "../Icon";
import EffectCard, { EffectCardBackFace } from "../gameComponents/EffectCard";
import effects from "../../data/effects-deck-en";
import { useChunkedPagesProps, useItemAdapter } from "./printControlUtils";

export type EffectCardsPrintControlsProps = {
    className?: string;
};

export default function EffectCardsPrintControls({ className }: EffectCardsPrintControlsProps) {
    const chunkedPagesProps = useChunkedPagesProps();
    const [playerCount, setPlayerCount] = useState(5);
    const items = useItemAdapter(
        range(playerCount)
            .map((playerIndex) =>
                effects.map((item) => ({
                    ...item,
                    slug: `${playerIndex + 1}-${item.slug}`,
                    className: "relative",
                }))
            )
            .flat()
            .sort((a, b) => a.title.localeCompare(b.title))
    );

    return (
        <div className={twMerge("flex flex-col gap-4 print:gap-0", className)}>
            <div className="print:hidden mt-4">
                <Input
                    label="Player count"
                    type="number"
                    value={playerCount}
                    onChange={(event) => setPlayerCount(event.target.valueAsNumber || 1)}
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
                documentTitle="Effects"
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
                        Component={EffectCard}
                        BackFaceComponent={EffectCardBackFace}
                        items={items}
                        {...chunkedPagesProps}
                        label="Effects"
                    />
                </div>
            </Print>
        </div>
    );
}
