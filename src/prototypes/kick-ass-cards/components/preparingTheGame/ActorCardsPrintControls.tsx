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

export type ActorCardsPrintControlsProps = {
    className?: string;
};

export default function ActorCardsPrintControls({ className }: ActorCardsPrintControlsProps) {
    const chunkedPagesProps = useChunkedPagesProps();
    const [copyCount, setCopyCount] = useState(1);
    const actorImageUris = [
        "/KAC/actors/anti-hero.png",
        "/KAC/actors/anybody.png",
        "/KAC/actors/aristocrat.png",
        "/KAC/actors/artist.png",
        "/KAC/actors/boy.png",
        "/KAC/actors/commander.png",
        "/KAC/actors/damsel.png",
        "/KAC/actors/devil.png",
        "/KAC/actors/femme-fatale.png",
        "/KAC/actors/golem.png",
        "/KAC/actors/golem-2.png",
        "/KAC/actors/grandmother.png",
        "/KAC/actors/guard.png",
        "/KAC/actors/innocent-girl.png",
        "/KAC/actors/jester.png",
        "/KAC/actors/lion.png",
        "/KAC/actors/lover.png",
        "/KAC/actors/mother.png",
        "/KAC/actors/nurse.png",
        "/KAC/actors/outcast.png",
        "/KAC/actors/priestess.png",
        "/KAC/actors/princess.png",
        "/KAC/actors/queen.png",
        "/KAC/actors/rebel.png",
        "/KAC/actors/ruler.png",
        "/KAC/actors/shaman.png",
        "/KAC/actors/skull.png",
        "/KAC/actors/skull.png", // TODO: replace
        "/KAC/actors/strong-man.png",
        "/KAC/actors/trickster.png",
        "/KAC/actors/wise-man.png",
        "/KAC/actors/wolf.png",
    ];
    const items = useItemAdapter(
        range(copyCount)
            .map((copyIndex) =>
                actorImageUris.map((imageUri, imageIndex) => ({
                    slug: copyIndex + "-" + imageIndex,
                    forPrint: true,
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
                    label="Copy count"
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
                        items={items}
                        {...chunkedPagesProps}
                        label="Blank Actor Cards"
                    />
                </div>
            </Print>
        </div>
    );
}
