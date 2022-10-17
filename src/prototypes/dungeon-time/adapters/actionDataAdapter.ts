import { iconMap, IconType } from "../components/Icon";
import { ActionType } from "../types";
import camelCaseObjectKeys from "../../../utils/camelCaseObjectKeys";

export default function actionDataAdapter(actionData: Record<string, string>[]): ActionType[] {
    return actionData.map((actionItemData) => {
        const action = camelCaseObjectKeys(actionItemData) as Record<keyof ActionType, any>;
        const upgradeOptionSlugs = action.upgradeOptionSlugs
            ? (action.upgradeOptionSlugs as string)
                  .trim()
                  .split(/\s+/)
                  .map((slug) => slug.trim())
            : [];
        return {
            ...action,
            sourceSlug: action.slug,
            effects: action.effects
                .trim()
                .split(/\s+/)
                .map((fragment: string) => (fragment in iconMap ? fragment : undefined))
                .filter((fragment: IconType) => fragment !== undefined) as IconType[],
            description: action.description,
            upgradeSlots: parseInt(action.upgradeSlots, 10),
            upgradeOptionSlugs,
            utilityValue: action.utilityValue ? parseFloat(action.utilityValue) : 0,
            comments: action.comments || undefined,
        };
    });
}
