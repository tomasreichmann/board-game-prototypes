import { twMerge } from "tailwind-merge";
import ChunkedPages from "../print/ChunkedPages";
import ToggleData from "../../../../components/DataToggle";
import { useState } from "react";
import Input from "../controls/Input";
import { range } from "lodash";
import Print from "../../../../components/print/Print";
import Icon from "../Icon";
import ActorCard, { ActorCardBackFace } from "../gameComponents/ActorCard";
import { useChunkedPagesProps, useItemAdapter } from "./printControlUtils";
import actors from "../../data/actors-deck";

export type BaseActorCardsPrintControlsProps = {
    className?: string;
};

export default function BaseActorCardsPrintControls({ className }: BaseActorCardsPrintControlsProps) {
    const chunkedPagesProps = useChunkedPagesProps();
    const [copyCount, setCopyCount] = useState(1);
    const actorImageUris = actors.map((a) => a.imageUri);
    const items = useItemAdapter(
        range(copyCount)
            .map((copyIndex) =>
                actorImageUris.map((imageUri, imageIndex) => ({
                    slug: copyIndex + "-" + imageIndex,
                    forPrint: true,
                    name: null,
                    occupation: null,
                    threat: null,
                    reward: null,
                    notes: null,
                    className: "relative",
                    size: "54x86",
                    imageUri,
                }))
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
                        Component={ActorCard}
                        BackFaceComponent={ActorCardBackFace}
                        items={items}
                        {...chunkedPagesProps}
                        label="Blank Actor Cards"
                    />
                </div>
            </Print>
        </div>
    );
}
