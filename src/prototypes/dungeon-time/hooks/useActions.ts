import { ErrorResponse } from "use-google-sheets/dist/types";
import { ActionDeckType, ActionType } from "../types";
import arrayToMap from "../utils/arrayToMap";
import actionDataAdapter from "../adapters/actionDataAdapter";
import actionDecksDataAdapter from "../adapters/actionDecksDataAdapter";
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
    const data = actions
        ? actionDataAdapter(actions.data as Record<string, string>[])
        : undefined;
    return { ...sheetData, data };
};

export const insertUpgradeOptions = (
    action: ActionType,
    actionMap: {
        [key: string]: ActionType;
    }
): ActionType => {
    const upgradeOptions = action.upgradeOptionSlugs
        .reduce((upgradeOptions, upgradeOptionSlug) => {
            const upgradeOption = actionMap[upgradeOptionSlug];
            if (!upgradeOption) {
                console.error(
                    `Upgrade option "${upgradeOptionSlug}" of action "${
                        action.slug
                    }" not found in actions (${Object.keys(actionMap).join(
                        ", "
                    )})`
                );
            } else {
                upgradeOptions.push(upgradeOption);
            }
            return upgradeOptions;
        }, [] as ActionType[])
        .map((upgradeOption, upgradeOptionIndex) =>
            insertUpgradeOptions(
                {
                    ...upgradeOption,
                    slug: action.slug + "-" + upgradeOptionIndex,
                },
                actionMap
            )
        );
    return {
        ...action,
        upgradeOptions,
    };
};

export const useActionDecks = (): {
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
    const actionMap = arrayToMap(
        actionDataAdapter(actionsData.data as Record<string, string>[]),
        "slug"
    );
    const actionDecks = actionDecksDataAdapter(
        actionDecksData.data as Record<string, string>[]
    );

    const data = actionDecks.map((actionDeck) => ({
        ...actionDeck,
        actions: actionDeck.actionSlugs.reduce(
            (actions, actionSlug, actionIndex) => {
                const action = actionMap[actionSlug];
                if (!action) {
                    console.error(
                        `slug "${actionSlug}" not found in actions (${Object.keys(
                            actionMap
                        ).join(", ")})`
                    );
                } else {
                    actions.push(
                        insertUpgradeOptions(
                            {
                                ...action,
                                deck: actionDeck,
                                slug:
                                    actionDeck.slug +
                                    "-" +
                                    action.slug +
                                    "-" +
                                    actionIndex,
                            },
                            actionMap
                        )
                    );
                }
                return actions;
            },
            [] as ActionType[]
        ),
    }));
    return { ...sheetData, data };
};
