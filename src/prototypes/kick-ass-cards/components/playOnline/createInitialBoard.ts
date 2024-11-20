import { range } from "lodash";
import outcomes from "../../data/outcomeDeck";
import { ContentItemTypeEnum, GameDocType, GameLayoutType, HandLayoutType, LayoutTypeEnum } from "./types";
import { cardSizes } from "../../../../components/print/paperSizes";
import mmToPx from "../../../../utils/mmToPx";

export const createOutcomeDeck = () => {};

const [outcomeCardSizeWidthMm, outcomeCardSizeHeightMm] = cardSizes["Mini European"].mm;
export const outcomeCardSize = {
    width: mmToPx(outcomeCardSizeWidthMm, 96),
    height: mmToPx(outcomeCardSizeHeightMm, 96),
};

export default function createInitialBoard(game: GameDocType): Partial<GameDocType> {
    // Generate stacks of Outcome cards for each player
    const layout: GameDocType["layout"] = {
        handMap: {},
        deckMap: {},
        spreadMap: {},
    };

    const playerCount = game.playerIds?.length ?? 0;
    const playerOutcomes = range(0, playerCount).map((playerIndex) =>
        outcomes.map((outcome) => ({
            id: `player-${playerIndex}-${outcome.slug}`,
            type: ContentItemTypeEnum.OutcomeCard,
            componentProps: { ...outcome, slug: `player-${playerIndex}-${outcome.slug}` },
            elementProps: outcomeCardSize,
        }))
    );
    const initialCardsInHand = 3;
    const playerHandMap = range(0, playerCount).reduce((playerHandMap, playerIndex) => {
        const playerUid = game.playerIds?.[playerIndex];
        if (!playerUid) {
            throw new Error("Player UID not found");
        }
        playerHandMap[playerUid] = {
            id: playerUid,
            ownerId: playerUid,
            type: LayoutTypeEnum.Hand,
            content: playerOutcomes[playerIndex].slice(0, initialCardsInHand),
        };

        return playerHandMap;
    }, {} as GameLayoutType["handMap"]);
    layout.handMap = { ...layout.handMap, ...playerHandMap };

    const playerDeckMap = range(0, playerCount).reduce((playerDeckMap, playerIndex) => {
        const playerUid = game.playerIds?.[playerIndex];
        if (!playerUid) {
            throw new Error("Player UID not found");
        }
        playerDeckMap[playerUid] = {
            id: playerUid,
            ownerId: playerUid,
            type: LayoutTypeEnum.Deck,
            content: playerOutcomes[playerIndex].slice(initialCardsInHand),
        };

        return playerDeckMap;
    }, {} as GameLayoutType["deckMap"]);
    layout.deckMap = { ...layout.deckMap, ...playerDeckMap };

    return { ...game, layout };
}
