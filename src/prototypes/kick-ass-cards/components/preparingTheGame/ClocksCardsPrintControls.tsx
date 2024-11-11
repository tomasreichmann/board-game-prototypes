import { twMerge } from "tailwind-merge";
import ChunkedPages from "../print/ChunkedPages";
import ToggleData from "../../../../components/DataToggle";
import { useState } from "react";
import Input from "../controls/Input";
import { range } from "lodash";
import Print from "../../../../components/print/Print";
import Icon from "../Icon";
import Clock from "../Clock";
import { useChunkedPagesProps, useItemAdapter } from "./printControlUtils";

export type ClocksCardsPrintControlsProps = {
    className?: string;
};

export default function ClocksCardsPrintControls({ className }: ClocksCardsPrintControlsProps) {
    const chunkedPagesProps = useChunkedPagesProps();
    const [copyCount, setCopyCount] = useState(1);
    const items = useItemAdapter(
        range(chunkedPagesProps.itemsPerPage * copyCount).map((index) => ({
            key: String(index),
            forPrint: true,
            total: undefined,
            current: 0,
            className: "relative",
        }))
    );
    // .sort((a, b) => a.total - b.total);

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
                documentTitle="Clocks"
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
                    <ChunkedPages Component={Clock} items={items} {...chunkedPagesProps} label="Blank Clock Cards" />
                </div>
            </Print>
        </div>
    );
}
