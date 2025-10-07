import { twMerge } from "tailwind-merge";
import outcomes from "../../data/outcomeDeck";
import ChunkedPages from "../print/ChunkedPages";
import OutcomeCard, { OutcomeCardBackFace } from "../gameComponents/OutcomeCard";
import ToggleData from "../../../../components/DataToggle";
import { useState } from "react";
import Input from "../controls/Input";
import { flatten, range } from "lodash";
import Print from "../../../../components/print/Print";
import Icon from "../Icon";
import { useChunkedPagesProps, useItemAdapter } from "./printControlUtils";

export type OutcomeCardsPrintControlsProps = {
    className?: string;
};

export default function OutcomeCardsPrintControls({ className }: OutcomeCardsPrintControlsProps) {
    const chunkedPagesProps = useChunkedPagesProps();
    const [deckCount, setDeckCount] = useState(5);
    const outcomeSet = outcomes;

    const items = useItemAdapter(
        flatten(
            range(deckCount).map((deckIndex) =>
                outcomeSet.map((item) => ({ ...item, slug: deckIndex + "-" + item.slug }))
            )
        )
    );

    return (
        <div className={twMerge("flex flex-col gap-4 print:gap-0", className)}>
            <div className="print:hidden mt-4">
                <Input
                    label="Deck count"
                    type="number"
                    value={deckCount}
                    onChange={(event) => setDeckCount(event.target.valueAsNumber || 1)}
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
                documentTitle="Outcomes"
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
                        Component={OutcomeCard}
                        BackFaceComponent={OutcomeCardBackFace}
                        items={items}
                        {...chunkedPagesProps}
                        label="Outcomes"
                    />
                </div>
            </Print>
        </div>
    );
}
