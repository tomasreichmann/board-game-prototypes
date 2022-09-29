import { chunk } from "lodash";
import PrintMarkerCorners from "../../../../components/print/PrintMarker/PrintMarkerCorners";
import PrintPage from "../../../../components/print/PrintPage/PrintPage";
import EnemyIntentCard from "../EnemyIntentCard";
import { ActionType } from "../../types";
import DataToggle from "../../../../components/DataToggle";
import useEnemyIntentDeckMap from "../../hooks/useEnemyIntentDeckMap";

const ENEMY_INTENT_CARDS_PER_PAGE = 4 * 4;

const getUpgrades = (action: ActionType): ActionType[] => {
    return action.upgradeOptions || [];
};

const getUpgradesDeep = (action: ActionType): ActionType[] => {
    const upgrades = getUpgrades(action);
    return upgrades.reduce(
        (upgrades, upgrade) => {
            if ((upgrade.upgradeOptions || []).length > 0) {
                upgrades.push(...getUpgradesDeep(upgrade));
            }
            return upgrades;
        },
        [...upgrades]
    );
};

export default function EnemyIntentPages() {
    const { data: enemyIntentDeckMap } = useEnemyIntentDeckMap();

    const enemyIntentCards =
        enemyIntentDeckMap !== undefined
            ? Object.values(enemyIntentDeckMap).flatMap((deck) => {
                  return deck.intents;
              })
            : [];

    return (
        <>
            {chunk(enemyIntentCards, ENEMY_INTENT_CARDS_PER_PAGE).map(
                (intents, intentPageIndex) => (
                    <PrintPage
                        key={"generic-action-deck-page-" + intentPageIndex}
                    >
                        <div className="flex flex-wrap content-center items-center">
                            {intents.map((intent) => (
                                <EnemyIntentCard
                                    key={intent.slug}
                                    {...intent}
                                    className="relative"
                                >
                                    <PrintMarkerCorners />
                                </EnemyIntentCard>
                            ))}
                            <h2 className="text-2xl font-dtHeading text-blood-3 w-full text-center">
                                Enemy Intents {intentPageIndex + 1}/
                                {Math.ceil(
                                    enemyIntentCards.length /
                                        ENEMY_INTENT_CARDS_PER_PAGE
                                )}
                            </h2>
                        </div>
                    </PrintPage>
                )
            )}
            <DataToggle data={enemyIntentDeckMap} initialCollapsed />
        </>
    );
}
