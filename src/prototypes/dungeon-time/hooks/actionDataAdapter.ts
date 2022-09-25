import { ActionType } from "../types";
import camelCaseObjectKeys from "../utils/camelCaseObjectKeys";

export default function actionDataAdapter(
    actionData: Record<string, string>[]
): ActionType[] {
    return actionData.map((actionItemData) => {
        const action = camelCaseObjectKeys(actionItemData) as Record<
            keyof ActionType,
            any
        >;
        const upgradeOptionSlugs = action.upgradeOptionSlugs
            ? (action.upgradeOptionSlugs as string)
                  .split(/\s+/)
                  .map((slug) => slug.trim())
            : [];
        return {
            ...action,
            effects: action.effects.split(/\s+/),
            description: action.description,
            upgradeSlots: parseInt(action.upgradeSlots, 10),
            upgradeOptionSlugs,
            utilityValue: action.utilityValue
                ? parseFloat(action.utilityValue)
                : 0,
            comments: action.comments || undefined,
        };
    });
}
