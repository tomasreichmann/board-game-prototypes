import { IconType } from "../components/Icon";
import { BattleEncounterType, EnemyIntentDeckType, EnemyType } from "../types";
import camelCaseObjectKeys from "../../../utils/camelCaseObjectKeys";

export default function battleEncountersDataAdapter(
    sheetData: Record<string, string>[],
    enemyMap: Record<string, EnemyType> = {},
    enemyIntentDeckMap: Record<string, EnemyIntentDeckType> = {}
): BattleEncounterType[] {
    const getEnemy = (slug: string) => enemyMap[slug];
    return sheetData
        .map((dataItem) => camelCaseObjectKeys(dataItem) as Record<keyof BattleEncounterType, any>)
        .map((dataItem) => {
            const enemySlugsForPlayerCount1: string[] = dataItem.enemySlugsForPlayerCount1.split(/\s+/);
            const enemySlugsForPlayerCount2: string[] = dataItem.enemySlugsForPlayerCount2.split(/\s+/);
            const enemySlugsForPlayerCount3: string[] = dataItem.enemySlugsForPlayerCount3.split(/\s+/);
            const enemySlugsForPlayerCount4: string[] = dataItem.enemySlugsForPlayerCount4.split(/\s+/);
            const enemySlugsForPlayerCount5: string[] = dataItem.enemySlugsForPlayerCount5.split(/\s+/);
            return {
                ...dataItem,
                icon: dataItem.icon as IconType,
                enemyIntentDeck: enemyIntentDeckMap[dataItem.enemyIntentDeckSlug],
                enemySlugsForPlayerCount1,
                enemiesForPlayerCount1: enemySlugsForPlayerCount1.map(getEnemy).filter((enemy) => !!enemy),

                enemySlugsForPlayerCount2,
                enemiesForPlayerCount2: enemySlugsForPlayerCount2.map(getEnemy).filter((enemy) => !!enemy),

                enemySlugsForPlayerCount3,
                enemiesForPlayerCount3: enemySlugsForPlayerCount3.map(getEnemy).filter((enemy) => !!enemy),

                enemySlugsForPlayerCount4,
                enemiesForPlayerCount4: enemySlugsForPlayerCount4.map(getEnemy).filter((enemy) => !!enemy),

                enemySlugsForPlayerCount5,
                enemiesForPlayerCount5: enemySlugsForPlayerCount5.map(getEnemy).filter((enemy) => !!enemy),
            } as BattleEncounterType;
        });
}
