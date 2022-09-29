import { ErrorResponse } from "use-google-sheets/dist/types";
import { EnemyIntentDeckType } from "../types";
import arrayToMap from "../utils/arrayToMap";
import enemyIntentDecksDataAdapter from "./enemyIntentDecksDataAdapter";
import enemyIntentsDataAdapter from "./enemyIntentsDataAdapter";
import useSheetData from "./useSheetData";

type IntentDeckMap = { [key: string]: EnemyIntentDeckType };

export default function useEnemyIntentDeckMap(): {
    data: IntentDeckMap | undefined;
    loading: boolean;
    error: null | ErrorResponse;
} {
    const sheetsState = useSheetData();
    if (!sheetsState.data) {
        return { ...sheetsState, data: undefined };
    }
    const enemyIntentsSheet = sheetsState.data.find(
        (item: { id: string }) => item.id === "enemy intents"
    );
    const enemyIntentDecksSheet = sheetsState.data.find(
        (item: { id: string }) => item.id === "enemy intent decks"
    );
    if (!enemyIntentsSheet || !enemyIntentDecksSheet) {
        return { ...sheetsState, data: undefined };
    }

    const enemyIntentMap = arrayToMap(
        enemyIntentsDataAdapter(
            enemyIntentsSheet.data as Record<string, string>[]
        ),
        "slug"
    );
    const enemyIntentDecks = enemyIntentDecksDataAdapter(
        enemyIntentDecksSheet.data as Record<string, string>[],
        enemyIntentMap
    );

    return { ...sheetsState, data: arrayToMap(enemyIntentDecks, "slug") };
}
