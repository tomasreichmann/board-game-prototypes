import { ErrorResponse } from "use-google-sheets/dist/types";
import { EnemyType } from "../types";
import multiplyByCount, { defaultCountAdapter } from "../utils/multiplyByCount";
import enemiesDataAdapter from "../adapters/enemiesDataAdapter";
import useSheetData from "./useSheetData";

export const useEnemies = (): {
    data: EnemyType[] | undefined;
    loading: boolean;
    error: null | ErrorResponse;
} => {
    const sheetData = useSheetData();
    if (!sheetData.data) {
        return { ...sheetData, data: undefined };
    }
    const actions = sheetData.data.find(
        (item: { id: string }) => item.id === "enemies"
    );
    const data = actions
        ? multiplyByCount(
              enemiesDataAdapter(actions.data as Record<string, string>[]),
              "cardCount",
              defaultCountAdapter
          )
        : undefined;
    return { ...sheetData, data };
};
