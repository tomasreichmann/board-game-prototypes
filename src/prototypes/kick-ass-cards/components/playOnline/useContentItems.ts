import { useMemo, useRef } from "react";
import { GameDocType } from "./types";
import { ContentItemProps } from "./ContentItem";
import { useAuth } from "@clerk/clerk-react";
import { organizeDeck, organizeHand } from "./organizeBoardItems";
import { outcomeCardSize } from "./createInitialBoard";

const emptyGame: GameDocType = {
    layout: { debug: [] as ContentItemProps[], handMap: {}, deckMap: {}, spreadMap: {} },
} as GameDocType;
export default function useContentItems(game: GameDocType | undefined): ContentItemProps[] {
    const lastGameRef = useRef(game);
    const { userId: uid } = useAuth();
    const lastGame = lastGameRef.current;
    const {
        layout: { debug, handMap, deckMap, spreadMap },
        players,
        playerIds,
        state,
    } = game || emptyGame;
    const contentItemProps = useMemo<ContentItemProps[]>(() => {
        if (!debug || !handMap || !deckMap || !spreadMap || !players || !playerIds || !state || !uid) {
            return [];
        }
        const contentItemProps: ContentItemProps[] = [];
        const isPlayer = (playerIds ?? []).includes(uid);
        // Generate curent player deck content items
        if (isPlayer) {
            const currentPlayerDeckArea =
                isPlayer && debug ? debug.find((item) => item.id === "currentUserTable") : undefined;
            if (currentPlayerDeckArea) {
                const currentPlayerDeck = deckMap[uid];
                if (currentPlayerDeck) {
                    contentItemProps.push(
                        ...organizeDeck(currentPlayerDeck.content, currentPlayerDeckArea.positionProps)
                    );
                }
            }
            const currentPlayerHandArea =
                isPlayer && debug ? debug.find((item) => item.id === "currentUserHand") : undefined;
            if (currentPlayerHandArea) {
                const currentPlayerHand = handMap[uid];

                const handStackingVisibility = 0.9;

                if (currentPlayerHand) {
                    contentItemProps.push(
                        ...organizeHand(currentPlayerHand.content, {
                            ...currentPlayerHandArea.positionProps,
                            width: outcomeCardSize.width * currentPlayerHand.content.length * handStackingVisibility,
                            height: outcomeCardSize.height,
                        })
                    );
                }
            }
        }
        const otherPlayerUids = isPlayer ? (playerIds ?? []).filter((id) => id !== uid) : playerIds ?? [];
        // Generate other player decks content items
        // Generate debug content items
        if (debug.length) {
            contentItemProps.push(...debug);
        }
        // Generate debug content items for current player
        // Generate debug content items for other player

        //const otherPlayerCount = Math.max(playerCount - 1, 0);
        /* const otherPlayerCount = 3;
        const otherPlayerHandSize = {
            width: otherPlayerHandsSize.width / otherPlayerCount,
            height: otherPlayerHandsSize.height,
        };
        const otherPlayerTableSize = {
            width: otherPlayerTablesSize.width / otherPlayerCount,
            height: otherPlayerTablesSize.height,
        };
        // specific player hands
        debugPositions.push(
            ...range(otherPlayerCount).map((playerIndex) => {
                const playerId = game.playerIds?.[playerIndex] || playerIndex.toString();
                return {
                    ...otherPlayerHandsProps,
                    ...otherPlayerHandSize,
                    id: otherPlayerHandsProps.id + "-" + playerId,
                    x: otherPlayerHandSize.width * playerIndex,
                };
            })
        );
        debugPositions.push(
            ...range(otherPlayerCount).map((playerIndex) => {
                const playerId = game.playerIds?.[playerIndex] || playerIndex.toString();
                return {
                    ...otherPlayerTablesProps,
                    ...otherPlayerTableSize,
                    id: otherPlayerTablesProps.id + "-" + playerId,
                    x: otherPlayerTableSize.width * playerIndex,
                };
            })
        ); */

        return contentItemProps;
    }, [debug, handMap, deckMap, spreadMap, players, playerIds, state, uid]);

    console.log("useContentItems", { contentItemProps, newGame: game, lastGame });

    lastGameRef.current = game;
    return contentItemProps;
}
