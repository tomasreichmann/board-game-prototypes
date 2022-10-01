import { chunk } from "lodash";
import PrintMarkerCorners from "../../../../components/print/PrintMarker/PrintMarkerCorners";
import PrintPage from "../../../../components/print/PrintPage/PrintPage";
import EnemyCard from "../gameComponents/EnemyCard";
import { useEnemies } from "../../hooks/useEnemies";
import DataToggle from "../../../../components/DataToggle";

const ENEMY_CARDS_PER_PAGE = 3 * 2;

export default function EnemyPages() {
    const { data: enemies = [] } = useEnemies();
    const totalPages = Math.ceil(enemies.length / ENEMY_CARDS_PER_PAGE);

    return (
        <>
            {chunk(enemies, ENEMY_CARDS_PER_PAGE).map(
                (enemies, enemyPageIndex) => (
                    <PrintPage key={"enemy-cards-page-" + enemyPageIndex}>
                        <div className="flex flex-wrap content-center items-center">
                            {enemies.map((enemy) => (
                                <EnemyCard
                                    key={enemy.slug}
                                    {...enemy}
                                    className="relative"
                                >
                                    <PrintMarkerCorners />
                                </EnemyCard>
                            ))}
                            <h2 className="text-2xl font-dtHeading text-blood-3 w-full text-center">
                                Enemies {enemyPageIndex + 1}/{totalPages}
                            </h2>
                        </div>
                    </PrintPage>
                )
            )}
            <div className="w-full">
                <DataToggle data={enemies} initialCollapsed />
            </div>
        </>
    );
}
