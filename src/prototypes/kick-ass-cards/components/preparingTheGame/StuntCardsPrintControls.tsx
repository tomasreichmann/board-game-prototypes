import { twMerge } from "tailwind-merge";
import ChunkedPages from "../print/ChunkedPages";
import ToggleData from "../../../../components/DataToggle";
import Print from "../../../../components/print/Print";
import Icon from "../Icon";
import { useChunkedPagesProps, useItemAdapter } from "./printControlUtils";
import stunts from "../../data/stunts-en-deck";
import StuntCard, { StuntCardBackFace } from "../gameComponents/StuntCard";

export type StuntCardsPrintControlsProps = {
    className?: string;
};

export default function StuntCardsPrintControls({ className }: StuntCardsPrintControlsProps) {
    const chunkedPagesProps = useChunkedPagesProps();

    const items = useItemAdapter(
        stunts
            .map((item) => ({
                ...item,
                className: "relative",
            }))
            .filter((item) => item.count !== 0)
        //.sort((a, b) => a.title.localeCompare(b.title))
    );
    return (
        <div className={twMerge("flex flex-col gap-4 print:gap-0", className)}>
            <ToggleData
                data={items}
                buttonContent={"Items data (" + items.length + ")"}
                initialCollapsed
                className="print:hidden mt-4"
            />
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
                        Component={StuntCard}
                        BackFaceComponent={StuntCardBackFace}
                        items={items}
                        {...chunkedPagesProps}
                        label="Stunts"
                    />
                </div>
            </Print>
        </div>
    );
}
