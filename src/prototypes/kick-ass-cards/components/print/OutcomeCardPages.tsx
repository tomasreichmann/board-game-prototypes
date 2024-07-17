import outcomes from "../../data/outcomeDeck";
import OutcomeCard, { OutcomeCardBackFace } from "../gameComponents/OutcomeCard";
import ChunkedPages from "./ChunkedPages";

const CARDS_PER_PAGE = 4 * 2;

const outcomeSet = outcomes;
const allOutcomes = [...outcomeSet, ...outcomeSet, ...outcomeSet, ...outcomeSet, ...outcomeSet, ...outcomeSet].map(
    (item) => ({ ...item, bleedMm: 3, className: "relative", size: "54x86" as const })
);

export default function OutcomeCardPages() {
    return (
        <ChunkedPages
            Component={OutcomeCard}
            BackFaceComponent={OutcomeCardBackFace}
            items={allOutcomes}
            itemsPerPage={CARDS_PER_PAGE}
            frontFacePrintPageProps={{
                bleedInMm: 0,
                marginsInMm: [7, 10, 7, 10],
                orientation: "landscape",
            }}
            backFacePrintPageProps={{
                bleedInMm: 0,
                marginsInMm: [7, 10, 7, 10],
                orientation: "landscape",
            }}
            label="Outcomes"
        />
    );
}
