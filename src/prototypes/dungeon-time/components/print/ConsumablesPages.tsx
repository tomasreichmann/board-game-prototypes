import { chunk } from "lodash";
import PrintMarkerCorners from "../../../../components/print/PrintMarker/PrintMarkerCorners";
import PrintPage from "../../../../components/print/PrintPage/PrintPage";
import ConsumableCard from "../gameComponents/ConsumableCard";
import DataToggle from "../../../../components/DataToggle";
import { useConsumables } from "../../hooks/useConsumables";
import multiplyByCount, {
    defaultCountAdapter,
} from "../../utils/multiplyByCount";

const CARDS_PER_PAGE = 3 * 3;

export default function EnemyPages() {
    const { data } = useConsumables();
    const consumables = data
        ? multiplyByCount(data, "cardCount", defaultCountAdapter)
        : [];
    const totalPages = Math.ceil(consumables.length / CARDS_PER_PAGE);
    return (
        <>
            {chunk(consumables, CARDS_PER_PAGE).map(
                (consumables, pageIndex) => (
                    <PrintPage key={"enemy-cards-page-" + pageIndex}>
                        <div className="flex flex-wrap content-center items-center">
                            {consumables.map((enemy) => (
                                <ConsumableCard
                                    key={enemy.slug}
                                    {...enemy}
                                    className="relative"
                                >
                                    <PrintMarkerCorners />
                                </ConsumableCard>
                            ))}
                            <h2 className="text-2xl font-dtHeading text-blood-3 w-full text-center">
                                Consumables {pageIndex + 1}/{totalPages}
                            </h2>
                        </div>
                    </PrintPage>
                )
            )}
            <div className="w-full">
                <DataToggle data={consumables} initialCollapsed />
            </div>
        </>
    );
}
