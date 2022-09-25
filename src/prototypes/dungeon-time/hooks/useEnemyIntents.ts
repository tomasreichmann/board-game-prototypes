import { ErrorResponse } from "use-google-sheets/dist/types";
import { EnemyIntentDeckType, EnemyIntentType } from "../types";
import enemyIntentsDataAdapter from "./enemyIntentsDataAdapter";
import useSheetData from "./useSheetData";

export const useEnemyIntents = (): {
    data: EnemyIntentType[] | undefined;
    loading: boolean;
    error: null | ErrorResponse;
} => {
    const sheetData = useSheetData();
    if (!sheetData.data) {
        return { ...sheetData, data: undefined };
    }
    const actions = sheetData.data.find(
        (item: { id: string }) => item.id === "enemy intents"
    );
    const data = actions
        ? enemyIntentsDataAdapter(actions.data as Record<string, string>[])
        : undefined;
    return { ...sheetData, data };
};

type IntentDeckMap = { [key: string]: EnemyIntentDeckType };

export const useEnemyIntentDeckMap = (): {
    data: IntentDeckMap | undefined;
    loading: boolean;
    error: null | ErrorResponse;
} => {
    const enemyIntentsState = useEnemyIntents();

    if (enemyIntentsState.data === undefined) {
        return { ...enemyIntentsState, data: undefined };
    }

    const data = enemyIntentsState.data.reduce((deckMap, intent) => {
        const deckSlugs = Object.keys(intent.deckCounts);
        deckSlugs.forEach((deckSlug) => {
            deckMap[deckSlug] = deckMap[deckSlug] || {
                slug: deckSlug,
                intents: [],
            };
            const deck = deckMap[deckSlug];
            deck.intents.push(
                ...Array(intent.deckCounts[deckSlug])
                    .fill(null)
                    .map((_, intentDeckIndex) => {
                        return {
                            ...intent,
                            slug:
                                deck.slug +
                                "-" +
                                intent.slug +
                                "-" +
                                intentDeckIndex,
                        };
                    })
            );
        });
        return deckMap;
    }, {} as IntentDeckMap);

    return { ...enemyIntentsState, data };
};
