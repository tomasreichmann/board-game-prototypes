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
        "/mighty-decks/actors/anti-hero.png",
        "/mighty-decks/actors/anybody.png",
        "/mighty-decks/actors/aristocrat.png",
        "/mighty-decks/actors/artist.png",
        "/mighty-decks/actors/boy.png",
        "/mighty-decks/actors/commander.png",
        "/mighty-decks/actors/damsel.png",
        "/mighty-decks/actors/devil.png",
        "/mighty-decks/actors/femme-fatale.png",
        "/mighty-decks/actors/golem.png",
        "/mighty-decks/actors/golem-2.png",
        "/mighty-decks/actors/grandmother.png",
        "/mighty-decks/actors/guard.png",
        "/mighty-decks/actors/innocent-girl.png",
        "/mighty-decks/actors/jester.png",
        "/mighty-decks/actors/lion.png",
        "/mighty-decks/actors/lover.png",
        "/mighty-decks/actors/mother.png",
        "/mighty-decks/actors/nurse.png",
        "/mighty-decks/actors/outcast.png",
        "/mighty-decks/actors/priestess.png",
        "/mighty-decks/actors/princess.png",
        "/mighty-decks/actors/queen.png",
        "/mighty-decks/actors/rebel.png",
        "/mighty-decks/actors/ruler.png",
        "/mighty-decks/actors/shaman.png",
        "/mighty-decks/actors/skull.png",
        "/mighty-decks/actors/skull.png", // TODO: replace
        "/mighty-decks/actors/strong-man.png",
        "/mighty-decks/actors/trickster.png",
        "/mighty-decks/actors/wise-man.png",
        "/mighty-decks/actors/wolf.png",
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
                        label="Base Actor Cards"
                    />
                </div>
            </Print>
        </div>
    );
}
