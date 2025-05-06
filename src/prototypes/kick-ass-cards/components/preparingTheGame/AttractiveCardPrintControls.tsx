import { twMerge } from "tailwind-merge";
import ChunkedPages from "../print/ChunkedPages";
import ToggleData from "../../../../components/DataToggle";
import { useState } from "react";
import Input from "../controls/Input";
import { range } from "lodash";
import Print from "../../../../components/print/Print";
import Icon from "../Icon";
import ActorCard from "../gameComponents/ActorCard";
import { useChunkedPagesProps, useItemAdapter } from "./printControlUtils";
import Card, { CardProps } from "../gameComponents/Card";

export type AttractiveCardPrintControlsProps = {
    className?: string;
};

export default function AttractiveCardPrintControls({ className }: AttractiveCardPrintControlsProps) {
    const chunkedPagesProps = useChunkedPagesProps();
    const [copyCount, setCopyCount] = useState(1);

    const imageUris = [
        "/misc/attractive/attractive-front.png",
        "/misc/attractive/attractive-front.png",
        "/misc/attractive/attractive-front.png",
        "/misc/attractive/mustache-front.png",
        "/misc/attractive/awesome-front.png",
        "/misc/attractive/moves-front.png",
        "/misc/attractive/smile-front.png",
        "/misc/attractive/style-front.png",
    ];

    const items = useItemAdapter(
        range(copyCount)
            .map((copyIndex) =>
                imageUris.map(
                    (imageUri) =>
                        ({
                            slug: copyIndex,
                            forPrint: true,
                            className: "relative",
                            size: "54x86",
                            backgroundImageUri: imageUri,
                        } as CardProps)
                )
            )
            .flat()
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
                documentTitle="Actors"
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
                        Component={Card}
                        BackFaceComponent={(props: CardProps) => (
                            <Card
                                {...props}
                                backgroundImageUri={
                                    props.backgroundImageUri === "/misc/attractive/mustache-front.png"
                                        ? "/misc/attractive/attractive-back-mustache.png"
                                        : "/misc/attractive/attractive-back.png"
                                }
                            />
                        )}
                        items={items}
                        {...chunkedPagesProps}
                        label="Base Actor Cards"
                    />
                </div>
            </Print>
        </div>
    );
}
