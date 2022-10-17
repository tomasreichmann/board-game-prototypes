import { EnemyIntentDeckType, EnemyIntentType } from "../types";
import camelCaseObjectKeys from "../../../utils/camelCaseObjectKeys";

export default function enemyIntentDecksDataAdapter(
    data: Record<string, string>[],
    intentMap: Record<string, EnemyIntentType>
): EnemyIntentDeckType[] {
    return data.map((dataItem) => {
        const enemyIntentDeck = camelCaseObjectKeys(dataItem) as Record<keyof EnemyIntentDeckType, any>;

        const intentSlugs: string[] = enemyIntentDeck.intentSlugs.split(/,\s*/);
        return {
            ...enemyIntentDeck,
            intentSlugs,
            intents: intentSlugs
                .map((slug, slugIndex) => ({
                    ...intentMap[slug],
                    slug: enemyIntentDeck.slug + "-" + intentMap[slug].slug + "-" + slugIndex,
                }))
                .filter((intent) => !!intent),
        };
    });
}
