import { CSSProperties, useMemo } from "react";
import {
    ActionTypeEnum,
    ContentItemType,
    ContentItemTypeEnum,
    GameDocType,
    GameStateEnum,
    LayoutType,
    LayoutTypeEnum,
} from "../model/types";
import { ContentItemProps } from "../components/ContentItem";
import { useAuth, useUser } from "@clerk/clerk-react";
import { organizeDeck, organizeHand } from "../model/organizeBoardItems";
import { outcomeCardSize } from "../model/createInitialBoard";
import { DispatchType } from "./useGame";
import { makePath } from "../model/gameDispatcher";
import { isClickableClassName } from "../constants";

const handStackingVisibilityMultiplier = 0.9;

const emptyGame: GameDocType = {
    id: "emptyGame",
    layouts: [],
    state: GameStateEnum.Ready,
};

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

export const groupLayoutByType = (layout: GameDocType["layouts"]) => {
    const groups: Partial<{ [key in LayoutTypeEnum]: LayoutType[] }> = {};
    layout?.forEach((layout) => {
        const key = layout.type;
        groups[key] = groups[key] || [];
        (groups[key] as LayoutType[]).push(layout);
    });
    return groups;
};

export default function useContentItems(game: GameDocType | undefined, dispatch: DispatchType): ContentItemProps[] {
    const { user } = useUser();
    const uid = user?.id;
    /* For transitions, lastGame might be useful
    const lastGameRef = useRef(game);
    const lastGame = lastGameRef.current; */
    const { layouts, isDebugging, players, playerIds, state } = game || emptyGame;
    const contentItemProps = useMemo<ContentItemProps[]>(() => {
        const layoutGroups = groupLayoutByType(layouts);
        const debug = layoutGroups[LayoutTypeEnum.Debug]?.[0]?.content || [];
        const misc = layoutGroups[LayoutTypeEnum.Misc]?.[0]?.content || [];

        if (!debug || !players || !playerIds || !state || !uid) {
            return [];
        }
        const deckLayouts = layoutGroups[LayoutTypeEnum.Deck] || [];
        const handLayouts = layoutGroups[LayoutTypeEnum.Hand] || [];
        const discardLayouts = layoutGroups[LayoutTypeEnum.Discard] || [];

        const combinedDebug: ContentItemType[] = [...debug];
        const contentItemProps: ContentItemProps[] = [];
        const isPlayer = (playerIds ?? []).includes(uid);
        // Generate curent player deck content items
        if (isPlayer) {
            const currentPlayerDeckArea = debug ? debug.find((item) => item.id === "currentUserTable") : undefined;
            const currentPlayerDeck = deckLayouts.find((item) => item.id === uid);
            const currentPlayerDeckPath = makePath(LayoutTypeEnum.Deck, uid);
            if (currentPlayerDeckArea) {
                if (currentPlayerDeck) {
                    contentItemProps.push(
                        ...organizeDeck(
                            currentPlayerDeck.content.map((content) => {
                                const isClickable = content.isClickable || content.isClickableForOwner; // TODO resolve against current user
                                const isSelected = content.isSelected || content.isSelectedForOwner; // TODO resolve against current user
                                return {
                                    ...content,
                                    isClickable,
                                    isSelected,
                                    onClick: isClickable
                                        ? () => {
                                              if (user) {
                                                  dispatch({
                                                      type: ActionTypeEnum.ContentItemClick,
                                                      user,
                                                      itemId: content.id,
                                                  });
                                              }
                                          }
                                        : undefined,
                                };
                            }),
                            currentPlayerDeckArea.positionProps
                        )
                    );
                    // if deck is empty, show a placeholder to shuffle discard pile
                } else {
                    console.error("Could not find deck for player", uid, "in", deckLayouts);
                }
            }
            const currentPlayerHandArea = debug ? debug.find((item) => item.id === "currentUserHand") : undefined;
            if (currentPlayerHandArea) {
                const currentPlayerHand = handLayouts.find((item) => item.id === uid);
                const currentPlayerHandPath = makePath(LayoutTypeEnum.Hand, uid);

                if (currentPlayerHand) {
                    const handContent: ContentItemProps[] = currentPlayerHand.content.map((content) => {
                        const isClickable = content.isClickable || content.isClickableForOwner;
                        const isSelected = content.isSelected || content.isSelectedForOwner;
                        return {
                            ...content,
                            isClickable,
                            isSelected,
                            onClick: isClickable
                                ? () => {
                                      if (user) {
                                          dispatch({
                                              type: ActionTypeEnum.ContentItemClick,
                                              user,
                                              itemId: content.id,
                                          });
                                      }
                                  }
                                : undefined,
                        };
                    });
                    // if deck card is selected, show placeholder in hand
                    const lastDeckCard = currentPlayerDeck?.content?.at(-1);
                    if (lastDeckCard?.isSelected || lastDeckCard?.isSelectedForOwner) {
                        const placeholderId = `placeholder-hand-${uid}`;
                        handContent.push({
                            id: placeholderId,
                            ownerUid: uid,
                            type: ContentItemTypeEnum.PlaceholderCard,
                            isClickable: true,
                            isClickableForOwner: true,
                            isClickableForStoryteller: false,
                            isSelected: false,
                            isSelectedForOwner: false,
                            isSelectedForStoryteller: false,
                            isHighlighted: false,
                            isHighlightedForOwner: false,
                            isHighlightedForStoryteller: false,
                            positionProps: { id: placeholderId, x: 0, y: 0, z: 0, ...outcomeCardSize },
                            componentProps: {
                                className: isClickableClassName,
                                text: "Draw",
                                textProps: { variant: "h1", color: "primary", className: "text-center" },
                                cardProps: { size: "Mini European" },
                            },
                            onClick: () => {
                                console.log("Draw card");
                                dispatch({
                                    type: ActionTypeEnum.MoveItem,
                                    pathFrom: makePath(currentPlayerDeckPath, lastDeckCard.id),
                                    pathTo: currentPlayerHandPath,
                                    deselectPaths: [currentPlayerDeckPath],
                                });
                            },
                        });
                    }
                    contentItemProps.push(
                        ...organizeHand(handContent, {
                            ...currentPlayerHandArea.positionProps,
                            width:
                                outcomeCardSize.width *
                                currentPlayerHand.content.length *
                                handStackingVisibilityMultiplier,
                            height: outcomeCardSize.height,
                        })
                    );
                }
            } else {
                console.error("Could not find hand for player", uid, "in", handLayouts);
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
                const playerDeck = deckLayouts.find((item) => item.id === uid);
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
                    console.warn("Could not find deck for player", uid, "in", deckLayouts);
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
                const playerHand = handLayouts.find((item) => item.id === uid);

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
                    console.warn("Could not find hand for player", uid, "in", handLayouts);
                }
            } else {
                console.warn("No otherPlayersHands in", debug);
            }
        });

        if (misc?.length) {
            contentItemProps.push(...misc);
        }
        console.log("isDebugging", isDebugging);
        contentItemProps.push(
            ...debug.map((item) => ({
                ...item,
                isHidden: !isDebugging,
            }))
        );

        return contentItemProps;
    }, [layouts, players, playerIds, state, uid]);

    /*     console.log(
        "useContentItems ids",
        contentItemProps.map(({ id }) => id)
    );
    console.log("useContentItems", { contentItemProps, newGame: game, lastGame }); */

    // lastGameRef.current = game;
    return contentItemProps;
}
