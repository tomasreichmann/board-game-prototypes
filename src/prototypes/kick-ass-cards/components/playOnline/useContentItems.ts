import { Children, useMemo, useRef } from "react";
import { ContentItemType, ContentItemTypeEnum, GameDocType } from "./types";
import { ContentItemProps } from "./ContentItem";
import { useAuth } from "@clerk/clerk-react";
import { organizeDeck, organizeHand } from "./organizeBoardItems";
import { outcomeCardSize } from "./createInitialBoard";

const emptyGame: GameDocType = {
    layout: { debug: [] as ContentItemProps[], handMap: {}, deckMap: {}, spreadMap: {} },
} as GameDocType;

const handStackingVisibilityMultiplier = 0.9;

export const stripMetaPropsFromContentItem = ({
    ownerUid,
    isHighlightedForOwner,
    isHighlightedForStoryteller,
    isClickableForOwner,
    isClickableForStoryteller,
    isSelectedForOwner,
    isSelectedForStoryteller,
    /* isHighlighted,
    isClickable,
    isSelected, */
    ...restProps
}: ContentItemProps) => restProps;

export const stripMetaPropsFromContent = (contentItems: ContentItemProps[]) =>
    contentItems.map(stripMetaPropsFromContentItem);

export default function useContentItems(game: GameDocType | undefined): ContentItemProps[] {
    const { userId: uid } = useAuth();
    /* For transitions, lastGame might be useful
    const lastGameRef = useRef(game);
    const lastGame = lastGameRef.current; */
    const {
        layout: { misc, debug, handMap, deckMap, spreadMap },
        isDebugging,
        players,
        playerIds,
        state,
    } = game || emptyGame;
    const contentItemProps = useMemo<ContentItemProps[]>(() => {
        if (!debug || !handMap || !deckMap || !spreadMap || !players || !playerIds || !state || !uid) {
            return [];
        }
        const combinedDebug: ContentItemType[] = [...debug];
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
                        ...organizeDeck(
                            currentPlayerDeck.content.map((content) => ({
                                ...content,
                                isClickable: content.isClickableForOwner,
                            })),
                            currentPlayerDeckArea.positionProps
                        )
                    );
                }
            }
            const currentPlayerHandArea =
                isPlayer && debug ? debug.find((item) => item.id === "currentUserHand") : undefined;
            if (currentPlayerHandArea) {
                const currentPlayerHand = handMap[uid];

                if (currentPlayerHand) {
                    contentItemProps.push(
                        ...organizeHand(
                            currentPlayerHand.content.map((content) => ({
                                ...content,
                                isClickable: content.isClickableForOwner,
                            })),
                            {
                                ...currentPlayerHandArea.positionProps,
                                width:
                                    outcomeCardSize.width *
                                    currentPlayerHand.content.length *
                                    handStackingVisibilityMultiplier,
                                height: outcomeCardSize.height,
                            }
                        )
                    );
                }
            }
        }
        const otherPlayerUids = isPlayer ? (playerIds ?? []).filter((id) => id !== uid) : playerIds ?? [];
        const otherPlayerTablesArea = debug ? debug.find((item) => item.id === "otherPlayerTables") : undefined;
        const otherPlayerDeckAreaWidth =
            (otherPlayerTablesArea?.positionProps?.width ?? 0) / (otherPlayerUids.length || 1);
        const otherPlayerHandsArea =
            isPlayer && debug ? debug.find((item) => item.id === "otherPlayerHands") : undefined;
        const otherPlayerHandAreaWidth =
            (otherPlayerHandsArea?.positionProps?.width ?? 0) / (otherPlayerUids.length || 1);

        otherPlayerUids.forEach((uid, playerIndex) => {
            if (otherPlayerTablesArea) {
                const playerDeckArea = {
                    ...otherPlayerTablesArea,
                    positionProps: {
                        ...otherPlayerTablesArea.positionProps,
                        x: otherPlayerTablesArea.positionProps.x + otherPlayerDeckAreaWidth * playerIndex,
                        width: otherPlayerDeckAreaWidth,
                        rotateZ: 180,
                    },
                };
                const playerDeck = deckMap[uid];
                if (playerDeck) {
                    const id = `otherPlayerTable-${uid}`;
                    const playerDebugArea = {
                        id,
                        positionProps: playerDeckArea.positionProps,
                        type: ContentItemTypeEnum.Div,
                        componentProps: {
                            className: "border-2 border-kac-cloth-light",
                            children: id,
                        },
                    };
                    combinedDebug.push(playerDebugArea);
                    contentItemProps.push(...organizeDeck(playerDeck.content, playerDeckArea.positionProps));
                } else {
                    console.warn("No deck for", uid, "in", deckMap);
                }
            } else {
                console.warn("No otherPlayerTables in", debug);
            }
            if (otherPlayerHandsArea) {
                const playerHandArea = {
                    ...otherPlayerHandsArea,
                    positionProps: {
                        ...otherPlayerHandsArea.positionProps,
                        x: otherPlayerHandsArea.positionProps.x + otherPlayerHandAreaWidth * playerIndex,
                        width: otherPlayerHandAreaWidth,
                        height: otherPlayerHandsArea.positionProps.height ?? 0,
                    },
                };
                const playerHand = handMap[uid];

                if (playerHand) {
                    const id = `otherPlayerHand-${uid}`;
                    const playerDebugArea = {
                        id,
                        positionProps: playerHandArea.positionProps,
                        type: ContentItemTypeEnum.Div,
                        componentProps: {
                            className: "border-2 border-kac-cloth-light",
                            children: id,
                        },
                    };
                    const handWidth = Math.min(
                        otherPlayerHandAreaWidth,
                        outcomeCardSize.width * playerHand.content.length * handStackingVisibilityMultiplier
                    );
                    combinedDebug.push(playerDebugArea);
                    contentItemProps.push(
                        ...organizeHand(
                            playerHand.content.map((contentItem) => ({
                                ...contentItem,
                                componentProps: { ...contentItem.componentProps, isFaceDown: true },
                            })),
                            { ...playerHandArea.positionProps, width: handWidth }
                        )
                    );
                } else {
                    console.warn("No hand for", uid, "in", handMap);
                }
            } else {
                console.warn("No otherPlayersHands in", debug);
            }
        });
        // Generate other player decks content items
        // Generate debug content items
        if (misc?.length) {
            contentItemProps.push(...misc);
        }
        if (isDebugging && debug?.length) {
            contentItemProps.push(...debug);
        }

        return contentItemProps;
    }, [debug, handMap, deckMap, spreadMap, players, playerIds, state, uid]);

    /*     console.log(
        "useContentItems ids",
        contentItemProps.map(({ id }) => id)
    );
    console.log("useContentItems", { contentItemProps, newGame: game, lastGame }); */

    // lastGameRef.current = game;
    return contentItemProps;
}
