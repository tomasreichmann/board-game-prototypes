import { EnemyType } from "../types";
import camelCaseObjectKeys from "../../../utils/camelCaseObjectKeys";

export default function enemiesDataAdapter(actionData: Record<string, string>[]): EnemyType[] {
    return actionData.map((actionItemData) => {
        const camelCasedItem = camelCaseObjectKeys(actionItemData) as Record<keyof EnemyType, any>;
        return {
            ...camelCasedItem,
            sourceSlug: camelCasedItem.slug,
        };
    });
}
