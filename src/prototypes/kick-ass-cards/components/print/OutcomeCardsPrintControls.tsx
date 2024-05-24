import { twMerge } from "tailwind-merge";
import { cardSizes, paperSizes } from "../../../../components/print/paperSizes";
import outcomes from "../../data/outcomeDeck";
import ChunkedPages from "./ChunkedPages";
import OutcomeCard, { OutcomeCardBackFace } from "../gameComponents/OutcomeCard";
import { getPaperFitCountByFormat } from "../../../../components/print/PrintPage/PrintPage";
import ToggleData from "../../../../components/DataToggle";
import { useState } from "react";
import Input from "../controls/Input";
import { flatten, range } from "lodash";

export type OutcomeCardsPrintControlsProps = {
    className?: string;
    paperSize: keyof typeof paperSizes;
    cardSize: keyof typeof cardSizes;
    pageOrientation: "portrait" | "landscape";
    pageMarginsMm: [number, number, number, number];
    bleedMm: number;
    gapMm: [number, number];
};

export default function OutcomeCardsPrintControls({
    className,
    paperSize,
    cardSize,
    pageOrientation,
    pageMarginsMm,
    bleedMm,
    gapMm,
}: OutcomeCardsPrintControlsProps) {
    const [deckCount, setDeckCount] = useState(1);
    const outcomeSet = outcomes;
    const printMarkerSizeMm = bleedMm > 0 ? 1.5 : 0;
    const allOutcomes = flatten(
        range(deckCount).map((deckIndex) => outcomeSet.map((item) => ({ ...item, slug: deckIndex + "-" + item.slug })))
    ).map((item) => ({
        ...item,
        bleedMm,
        size: cardSize,
        className: "relative",
    }));
    const cardsPerPage = getPaperFitCountByFormat(
        paperSize,
        pageOrientation,
        cardSize,
        "portrait",
        pageMarginsMm,
        bleedMm,
        printMarkerSizeMm
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
            <ToggleData data={{ cardsPerPage, allOutcomes }} initialCollapsed className="print:hidden mt-4" />
            <ChunkedPages
                Component={OutcomeCard}
                BackFaceComponent={OutcomeCardBackFace}
                items={allOutcomes}
                itemsPerPage={cardsPerPage}
                pageContentProps={{ style: { gap: `${gapMm[1]}mm ${gapMm[0]}mm` } }}
                frontFacePrintPageProps={{
                    size: paperSize,
                    orientation: pageOrientation,
                    bleedInMm: 0,
                    marginsInMm: pageMarginsMm,
                }}
                backFacePrintPageProps={{
                    size: paperSize,
                    orientation: pageOrientation,
                    bleedInMm: 0,
                    marginsInMm: pageMarginsMm,
                }}
                label="Outcomes"
            />
        </div>
    );
}
