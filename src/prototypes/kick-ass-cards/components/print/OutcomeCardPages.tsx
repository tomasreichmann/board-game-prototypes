import { chunk } from "lodash";
import PrintMarkerCorners from "../../../../components/print/PrintMarker/PrintMarkerCorners";
import PrintPage from "../../../../components/print/PrintPage/PrintPage";
import DataToggle from "../../../../components/DataToggle";
import outcomes, { outcomeMap } from "../../data/outcomeDeck";
import OutcomeCard from "../gameComponents/OutcomeCard";

const CARDS_PER_PAGE = 4 * 4;

const outcomeSet = outcomes;
const allOutcomes = [
    ...outcomeSet,
    ...outcomeSet,
    ...outcomeSet,
    ...outcomeSet,
    ...outcomeSet,
    ...outcomeSet,
    ...outcomeSet,
];
console.log("outcomes", outcomes);
export default function OutcomeCardPages() {
    return (
        <>
            {chunk(allOutcomes, CARDS_PER_PAGE).map((outcomes, pageIndex) => (
                <PrintPage key={"action-deck-page-" + pageIndex}>
                    <div className="flex flex-wrap content-center items-center">
                        {outcomes.map((outcome, outcomeIndex) => (
                            <OutcomeCard key={outcome.slug + "-" + outcomeIndex} {...outcome} className="relative">
                                <PrintMarkerCorners />
                            </OutcomeCard>
                        ))}
                        <h2 className="text-2xl font-kacHeading text-kac-steel-dark w-full text-center">
                            Outcomes {pageIndex + 1}/{Math.ceil(allOutcomes.length / CARDS_PER_PAGE)}
                        </h2>
                    </div>
                </PrintPage>
            ))}
            <DataToggle
                data={outcomes}
                initialCollapsed
                className="print:hidden flex flex-col w-full items-start relative"
            />
        </>
    );
}
