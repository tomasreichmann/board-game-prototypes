import { twMerge } from "tailwind-merge";
import { cardSizes, paperSizes } from "../../../../components/print/paperSizes";
import outcomes from "../../data/outcomeDeck";
import ChunkedPages from "./ChunkedPages";
import OutcomeCard, { OutcomeCardBackFace } from "../gameComponents/OutcomeCard";
import { getPaperFitCountByFormat } from "../../../../components/print/PrintPage/PrintPage";
import ToggleData from "../../../../components/DataToggle";

export type OutcomeCardsPrintControlsProps = {
    className?: string;
    paperSize: keyof typeof paperSizes;
    cardSize: keyof typeof cardSizes;
    pageOrientation: "portrait" | "landscape";
    pageMarginsMm: [number, number, number, number];
    bleedMm: number;
};

export default function OutcomeCardsPrintControls({
    className,
    paperSize,
    cardSize,
    pageOrientation,
    pageMarginsMm,
    bleedMm,
}: OutcomeCardsPrintControlsProps) {
    const outcomeSet = outcomes;
    const printMarkerSizeMm = bleedMm > 0 ? 1.5 : 0;
    const allOutcomes = [...outcomeSet, ...outcomeSet, ...outcomeSet, ...outcomeSet, ...outcomeSet, ...outcomeSet].map(
        (item) => ({
            ...item,
            bleedMm,
            size: cardSize,
            className: "relative",
            style: { margin: printMarkerSizeMm + "mm" },
        })
    );
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
            <ToggleData data={{ cardsPerPage, allOutcomes }} className="print:hidden" />
            <ChunkedPages
                Component={OutcomeCard}
                BackFaceComponent={OutcomeCardBackFace}
                items={allOutcomes}
                itemsPerPage={cardsPerPage}
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
