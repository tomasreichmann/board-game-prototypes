import { chunk, zip } from "lodash";
import PrintMarkerCorners from "../../../../components/print/PrintMarker/PrintMarkerCorners";
import PrintPage from "../../../../components/print/PrintPage/PrintPage";
import EnemyIntentCard from "../gameComponents/EnemyIntentCard";
import { ActionType } from "../../types";
import DataToggle from "../../../../components/DataToggle";
import useEnemyIntentDeckMap from "../../hooks/useEnemyIntentDeckMap";
import Icon from "../Icon";

const CARDS_PER_PAGE = 4 * 4;

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

    const basicDeck = enemyIntentDeckMap ? enemyIntentDeckMap.basic_deck : undefined;
    const basicIntents = basicDeck ? basicDeck.intents : [];
    const bossDeck = enemyIntentDeckMap ? enemyIntentDeckMap.boss_deck : undefined;
    const bossIntents = bossDeck ? bossDeck.intents : [];
    return (
        <>
            {chunk(basicIntents, CARDS_PER_PAGE).map((intents, intentPageIndex) => (
                <PrintPage key={"generic-action-deck-page-" + intentPageIndex}>
                    <div className="flex flex-wrap content-center items-center">
                        {intents.map((intent, intentIndex) => (
                            <EnemyIntentCard key={intent.slug} {...intent} className="relative bg-slate-300">
                                <div className="absolute right-1/2 top-0 bottom-0 flex flex-col justify-center pr-1">
                                    <Icon icon={basicDeck?.icon || "HALT"} className="h-7 text-lightning-2" />
                                </div>
                                <div className="absolute left-1/2 top-0 w-1/2 h-full overflow-hidden rotate-180">
                                    <EnemyIntentCard
                                        key={bossIntents[intentIndex]?.slug}
                                        {...bossIntents[intentIndex]}
                                        className="absolute top-0 bg-blood-2"
                                    >
                                        <div className="absolute right-1/2 top-0 bottom-0 flex flex-col justify-center pr-1">
                                            <Icon icon={bossDeck?.icon || "HALT"} className="h-7 text-blood-5" />
                                        </div>
                                    </EnemyIntentCard>
                                </div>
                                <PrintMarkerCorners />
                            </EnemyIntentCard>
                        ))}
                        <h2 className="text-2xl font-dtHeading text-blood-3 w-full text-center">
                            Enemy Intents {intentPageIndex + 1}/{Math.ceil(basicIntents.length / CARDS_PER_PAGE)}
                        </h2>
                    </div>
                </PrintPage>
            ))}
            <div className="w-full">
                <DataToggle data={enemyIntentDeckMap} initialCollapsed />
            </div>
        </>
    );
}
