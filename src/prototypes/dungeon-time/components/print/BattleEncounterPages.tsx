import { chunk } from "lodash";
import PrintMarkerCorners from "../../../../components/print/PrintMarker/PrintMarkerCorners";
import PrintPage from "../../../../components/print/PrintPage/PrintPage";
import BattleEncounterCard from "../gameComponents/BattleEncounterCard";
import DataToggle from "../../../../components/DataToggle";
import { useBattleEncounters } from "../../hooks/useBattleEncounters";

const CARDS_PER_PAGE = 3 * 2;

export default function BattleEncounterPages() {
    const { data: battles } = useBattleEncounters();

    return (
        <>
            {chunk(battles, CARDS_PER_PAGE).map((battles, pageIndex) => (
                <PrintPage key={"battle-cards-page-" + pageIndex}>
                    <div className="flex flex-wrap content-center items-center">
                        {battles.map((battle) => (
                            <BattleEncounterCard
                                key={battle.slug}
                                {...battle}
                                className="relative"
                            >
                                <PrintMarkerCorners />
                            </BattleEncounterCard>
                        ))}
                        <h2 className="text-2xl font-dtHeading text-blood-3 w-full text-center">
                            Battle Encounters {pageIndex + 1}/
                            {Math.ceil(battles.length / CARDS_PER_PAGE)}
                        </h2>
                    </div>
                </PrintPage>
            ))}
            <div className="w-full">
                <DataToggle data={battles} initialCollapsed />
            </div>
        </>
    );
}
