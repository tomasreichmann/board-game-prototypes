import { ErrorResponse } from "use-google-sheets/dist/types";
import { BattleEncounterType, EnemyType } from "../types";
import arrayToMap from "../utils/arrayToMap";
import battleEncountersDataAdapter from "./battleEncountersDataAdapter";
import enemiesDataAdapter from "./enemiesDataAdapter";
import useEnemyIntentDeckMap from "./useEnemyIntentDeckMap";
import useSheetData from "./useSheetData";

export const useBattleEncounters = (): {
    data: BattleEncounterType[] | undefined;
    loading: boolean;
    error: null | ErrorResponse;
} => {
    const sheetData = useSheetData();
    const { data: enemyIntentDeckMap } = useEnemyIntentDeckMap();
    if (!sheetData.data || !enemyIntentDeckMap) {
        return { ...sheetData, data: undefined };
    }
    const battleSheet = sheetData.data.find(
        (item: { id: string }) => item.id === "battle encounters"
    );
    const enemiesSheet = sheetData.data.find(
        (item: { id: string }) => item.id === "enemies"
    );

    const enemyMap =
        enemiesSheet && enemiesSheet.data
            ? arrayToMap(
                  enemiesDataAdapter(
                      enemiesSheet.data as Record<keyof EnemyType, string>[]
                  ),
                  "slug"
              )
            : {};
    const data = battleSheet
        ? battleEncountersDataAdapter(
              battleSheet.data as Record<string, string>[],
              enemyMap,
              enemyIntentDeckMap
          )
        : undefined;
    return { ...sheetData, data };
};
