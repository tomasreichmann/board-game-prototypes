import { EnemyType } from "../types";
import camelCaseObjectKeys from "../utils/camelCaseObjectKeys";

export default function enemiesDataAdapter(
    actionData: Record<string, string>[]
): EnemyType[] {
    return actionData.map((actionItemData) => {
        return camelCaseObjectKeys(actionItemData) as Record<
            keyof EnemyType,
            any
        >;
    });
}
