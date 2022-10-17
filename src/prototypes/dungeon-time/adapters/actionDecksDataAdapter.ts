import { ActionDeckType } from "../types";
import camelCaseObjectKeys from "../../../utils/camelCaseObjectKeys";

export default function actionDecksDataAdapter(actionDecksData: Record<string, string>[]): ActionDeckType[] {
    const deckSlugs: string[] = [];
    return actionDecksData.reduce((actionDecks, actionDecksDataRow) => {
        const { slug, name, actionSlug, count: countString, ...restData } = camelCaseObjectKeys(actionDecksDataRow);
        let deckSlugIndex = deckSlugs.indexOf(slug);

        if (deckSlugIndex === -1) {
            deckSlugs.push(slug);
            actionDecks.push({
                ...restData,
                name,
                slug,
                actionSlugCounts: [],
                actionSlugs: [],
                actions: [],
            });
            deckSlugIndex = deckSlugs.indexOf(slug);
        }
        const count = parseInt(countString, 10) || 0;
        actionDecks[deckSlugIndex].actionSlugCounts.push({
            actionSlug,
            count,
        });
        actionDecks[deckSlugIndex].actionSlugs.push(...Array(count).fill(actionSlug));
        return actionDecks;
    }, [] as ActionDeckType[]);
}
