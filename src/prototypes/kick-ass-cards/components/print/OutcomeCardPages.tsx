import outcomes from "../../data/outcomeDeck";
import OutcomeCard, { OutcomeCardBackFace } from "../gameComponents/OutcomeCard";
import ChunkedPages from "./ChunkedPages";

const CARDS_PER_PAGE = 3 * 4;

const outcomeSet = outcomes;
const allOutcomes = [...outcomeSet, ...outcomeSet, ...outcomeSet, ...outcomeSet, ...outcomeSet, ...outcomeSet].map(
    (item) => ({ ...item, bleedMm: 3, className: "relative -m-[3mm]" })
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
                contentClassName: "p-[3mm]",
            }}
            backFacePrintPageProps={{
                bleedInMm: 0,
                contentClassName: "p-[3mm]",
            }}
            label="Outcomes"
        />
    );
}
