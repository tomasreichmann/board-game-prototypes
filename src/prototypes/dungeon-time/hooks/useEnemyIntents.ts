import { ErrorResponse } from "use-google-sheets/dist/types";
import { EnemyIntentType } from "../types";
import enemyIntentsDataAdapter from "../adapters/enemyIntentsDataAdapter";
import useSheetData from "./useSheetData";

export const useEnemyIntents = (): {
    data: EnemyIntentType[] | undefined;
    loading: boolean;
    error: null | ErrorResponse;
} => {
    const sheetsState = useSheetData();
    if (!sheetsState.data) {
        return { ...sheetsState, data: undefined };
    }
    const sheet = sheetsState.data.find(
        (item: { id: string }) => item.id === "enemy intents"
    );
    const data = sheet
        ? enemyIntentsDataAdapter(sheet.data as Record<string, string>[])
        : undefined;
    return { ...sheetsState, data };
};
