import { ActionDeckType } from "../types";

export default function actionDecksDataAdapter(
    actionDecksData: { [key: string]: string }[]
): ActionDeckType[] {
    const deckSlugs: string[] = [];
    return actionDecksData.reduce((actionDecks, actionDecksDataRow) => {
        const {
            ["deck slug"]: slug,
            ["action slug"]: actionSlug,
            count: countString,
        } = actionDecksDataRow;
        let deckSlugIndex = deckSlugs.indexOf(slug);

        if (deckSlugIndex === -1) {
            deckSlugs.push(slug);
            actionDecks.push({
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
        actionDecks[deckSlugIndex].actionSlugs.push(
            ...Array(count).fill(actionSlug)
        );
        return actionDecks;
    }, [] as ActionDeckType[]);
}
