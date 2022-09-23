import { ErrorResponse } from "use-google-sheets/dist/types";
import { ActionDeckType, ActionType } from "../types";
import arrayToMap from "../utils/arrayToMap";
import actionDataAdapter from "./actionDataAdapter";
import actionDecksDataAdapter from "./actionDecksDataAdapter";
import useSheetData from "./useSheetData";

export const useActions = (): {
    data: ActionType[] | undefined;
    loading: boolean;
    error: null | ErrorResponse;
} => {
    const sheetData = useSheetData();
    if (!sheetData.data) {
        return { ...sheetData, data: undefined };
    }
    const actions = sheetData.data.find(
        (item: { id: string }) => item.id === "actions"
    );
    const data = actions ? actionDataAdapter(actions.data) : undefined;
    return { ...sheetData, data };
};

export const useActionDeck = (): {
    data: ActionDeckType[] | undefined;
    loading: boolean;
    error: null | ErrorResponse;
} => {
    const sheetData = useSheetData();
    if (!sheetData.data) {
        return { ...sheetData, data: undefined };
    }
    const actionsData = sheetData.data.find(
        (item: { id: string }) => item.id === "actions"
    );
    const actionDecksData = sheetData.data.find(
        (item: { id: string }) => item.id === "action decks"
    );

    if (!actionsData || !actionDecksData) {
        return { ...sheetData, data: undefined };
    }
    const actionMap = arrayToMap(actionDataAdapter(actionsData.data), "slug");
    const actionDecks = actionDecksDataAdapter(actionDecksData.data);

    const data = actionDecks.map((actionDeck) => ({
        ...actionDeck,
        actions: actionDeck.actionSlugs
            .map((actionSlug, actionIndex) => {
                const action = actionMap[actionSlug];
                if (!action) {
                    console.error(
                        `slug "${actionSlug}" not found in actions (${Object.keys(
                            actionMap
                        ).join(", ")})`
                    );
                    return undefined;
                }
                return { ...action, slug: action.slug + "-" + actionIndex };
            })
            .filter((action) => action !== undefined) as ActionType[],
    }));
    return { ...sheetData, data };
};
