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

export type BaseActorCardsPrintControlsProps = {
    className?: string;
};

export default function BaseActorCardsPrintControls({ className }: BaseActorCardsPrintControlsProps) {
    const chunkedPagesProps = useChunkedPagesProps();
    const [copyCount, setCopyCount] = useState(1);
    const actorImageUris = [
        '/mighty-decks/actors/base/animal.png',
        '/mighty-decks/actors/base/aristocrat.png',
        '/mighty-decks/actors/base/artillery.png',
        '/mighty-decks/actors/base/assassin.png',
        '/mighty-decks/actors/base/beast.png',
        '/mighty-decks/actors/base/bruiser.png',
        '/mighty-decks/actors/base/civilian.png',
        '/mighty-decks/actors/base/commander.png',
        '/mighty-decks/actors/base/construct.png',
        '/mighty-decks/actors/base/guard.png',
        '/mighty-decks/actors/base/healer.png',
        '/mighty-decks/actors/base/horror.png',
        '/mighty-decks/actors/base/manipulator.png',
        '/mighty-decks/actors/base/marksman.png',
        '/mighty-decks/actors/base/merchant.png',
        '/mighty-decks/actors/base/minion.png',
        '/mighty-decks/actors/base/minion.png',
        '/mighty-decks/actors/base/minion.png',
        '/mighty-decks/actors/base/minion.png',
        '/mighty-decks/actors/base/minion.png',
        '/mighty-decks/actors/base/sentry.png',
        '/mighty-decks/actors/base/specialist.png',
        '/mighty-decks/actors/base/swarm.png',
        '/mighty-decks/actors/base/zealot.png',
    ];
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
                        items={items}
                        {...chunkedPagesProps}
                        label="Blank Actor Cards"
                    />
                </div>
            </Print>
        </div>
    );
}
