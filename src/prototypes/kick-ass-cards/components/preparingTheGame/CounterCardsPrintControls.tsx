import { twMerge } from "tailwind-merge";
import ChunkedPages from "../print/ChunkedPages";
import ToggleData from "../../../../components/DataToggle";
import { useState } from "react";
import Input from "../controls/Input";
import { range } from "lodash";
import Print from "../../../../components/print/Print";
import Icon from "../Icon";
import { useChunkedPagesProps, useItemAdapter } from "./printControlUtils";
import counters, { CounterType } from "../../data/counters-deck";
import Card, { CardHeader } from "../gameComponents/Card";
import { IconOrImage } from "../../../../components/Icon/IconOrImage";
import { PaperProps } from "../../../../components/print/Paper/Paper";

export type CounterCardsPrintControlsProps = {
    className?: string;
};

export type CounterCardProps = React.PropsWithChildren<
    Partial<PaperProps> & Omit<CounterType, "count"> & { className?: string }
>;

const CounterCard = ({ icon, deck, ...restProps }: CounterType) => {
    return (
        <Card {...restProps}>
            <CardHeader icon={icon} className="z-10" cornerIcon="/KAC/counter.png" deck={deck}></CardHeader>
            <div className="flex-1 relative self-stretch my-[5%]">
                {icon && <IconOrImage icon={icon} className={"absolute w-full h-full object-contain drop-shadow-lg"} />}
            </div>
            <div className="flex flex-row flex-wrap gap-2 justify-center items-center px-4 opacity-50">
                <Icon icon="d4" className={"w-8 h-8"} />
                <Icon icon="d6" className={"w-8 h-8"} />
                <Icon icon="d8" className={"w-8 h-8"} />
                <Icon icon="d10" className={"w-8 h-8"} />
                <Icon icon="d12" className={"w-8 h-8"} />
            </div>
        </Card>
    );
};

const CounterCardBackFace = ({ icon, deck, ...restProps }: CounterType) => {
    return (
        <Card {...restProps} backgroundImageUri="/KAC/clock-back-face.png">
            <div className="absolute top-[60%] left-4 right-4 flex flex-col justify-center items-center flex-1 p-3">
                <div className="text-kac-cloth-lightest text-xs text-center relative z-1 font-kacLogo tracking-widest uppercase drop-shadow-md-heavy">
                    Counter
                </div>
            </div>
        </Card>
    );
};

export default function CounterCardsPrintControls({ className }: CounterCardsPrintControlsProps) {
    const chunkedPagesProps = useChunkedPagesProps();
    const [copyCount, setCopyCount] = useState(1);
    const items = useItemAdapter(
        range(copyCount)
            .map((index) =>
                counters.map((counter) => ({
                    ...counter,
                    slug: counter.slug + String(index),
                    className: "relative",
                }))
            )
            .flat()
    );
    console.log("items", items);
    // .sort((a, b) => a.total - b.total);

    return (
        <div className={twMerge("flex flex-col gap-4 print:gap-0", className)}>
            <div className="print:hidden mt-4">
                <Input
                    label="Pages"
                    type="number"
                    value={copyCount}
                    onChange={(event) => setCopyCount(event.target.valueAsNumber || 1)}
                    className="w-32"
                />
            </div>
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
                        Component={CounterCard}
                        BackFaceComponent={CounterCardBackFace}
                        items={items}
                        {...chunkedPagesProps}
                        label="Counter Cards"
                    />
                </div>
            </Print>
        </div>
    );
}
