import { EnemyType } from "../types";
import camelCaseObjectKeys from "../utils/camelCaseObjectKeys";

export default function enemiesDataAdapter(
    actionData: Record<string, string>[]
): EnemyType[] {
    return actionData.map((actionItemData) => {
        const enemy = camelCaseObjectKeys(actionItemData) as Record<
            keyof EnemyType,
            any
        >;
        return {
            ...enemy,
            hitPoints: parseInt(enemy.hitPoints, 10),
        };
    });
}
