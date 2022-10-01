import { EnemyIntentType } from "../types";
import camelCaseObjectKeys from "../utils/camelCaseObjectKeys";

export default function enemyIntentsDataAdapter(
    data: Record<string, string>[]
): EnemyIntentType[] {
    return data.map((dataItem) => {
        const enemyIntent = camelCaseObjectKeys(dataItem) as Record<
            keyof EnemyIntentType,
            any
        >;

        return {
            ...enemyIntent,
            attack: parseInt(enemyIntent.attack || 0, 10),
            altAttack: parseInt(enemyIntent.altAttack || 0, 10),
            defend: parseInt(enemyIntent.defend || 0, 10),
            move: parseInt(enemyIntent.move || 0, 10),
            special: parseInt(enemyIntent.special || 0, 10),
        };
    });
}
