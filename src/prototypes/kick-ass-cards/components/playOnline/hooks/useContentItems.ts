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
import { useUser } from "@clerk/clerk-react";
import { organizeDeck, organizeDiscard, organizeHand } from "../model/organizeBoardItems";
import { cardMargin, outcomeCardSize } from "../model/createInitialBoard";
import { DispatchType } from "./useGame";
import { makePath } from "../model/gameDispatcher";
import { isClickableClassName } from "../constants";
import { PositionType } from "../../../../../components/PerspectiveView/Position";

const handStackingVisibilityMultiplier = 0.9;

const emptyGame: GameDocType = {
    id: "emptyGame",
    layouts: [],
    state: GameStateEnum.Ready,
};

const originPosition: PositionType = { x: 0, y: 0, z: 0, rotateX: 0, rotateY: 0, rotateZ: 0 };

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
}: ContentItemType): ContentItemProps => restProps;

const isUserStoryteller = (game: GameDocType, uid?: string) => (uid && game?.storytellerIds?.includes(uid)) || false;
const isUserOwner = (item: ContentItemType, uid: string) => item.ownerUid === uid;
const isSelectedItem = (item: ContentItemType, game: GameDocType, uid: string) =>
    item.isSelected ||
    (isUserOwner(item, uid) && item.isSelectedForOwner) ||
    (isUserStoryteller(game, uid) && item.isSelectedForStoryteller);
const isClickableItem = (item: ContentItemType, game: GameDocType, uid: string) =>
    item.isClickable ||
    (isUserOwner(item, uid) && item.isClickableForOwner) ||
    (isUserStoryteller(game, uid) && item.isClickableForStoryteller);
const isHighlightedItem = (item: ContentItemType, game: GameDocType, uid: string) =>
    item.isHighlighted ||
    (isUserOwner(item, uid) && item.isHighlightedForOwner) ||
    (isUserStoryteller(game, uid) && item.isHighlightedForStoryteller);

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
    const { layouts, isDebugging, players, playerIds, storytellerIds, state } = game || emptyGame;
    const contentItemProps = useMemo<ContentItemProps[]>(() => {
        const layoutGroups = groupLayoutByType(layouts);
        const debug = layoutGroups[LayoutTypeEnum.Debug]?.[0]?.content || [];
        const misc = layoutGroups[LayoutTypeEnum.Misc]?.[0]?.content || [];

        if (!game || !debug || !players || !playerIds || !state || !uid || state === GameStateEnum.Ready) {
            return [];
        }
        const deckLayouts = layoutGroups[LayoutTypeEnum.Deck] || [];
        const handLayouts = layoutGroups[LayoutTypeEnum.Hand] || [];
        const discardLayouts = layoutGroups[LayoutTypeEnum.Discard] || [];

        const combinedDebug: ContentItemType[] = [...debug];
        const contentItemProps: ContentItemProps[] = [];
        const isPlayer = (playerIds ?? []).includes(uid);
        const isStoryteller = (storytellerIds ?? []).includes(uid);
        // Generate curent player deck content items
        if (isPlayer) {
            const currentPlayerHand = handLayouts.find((item) => item.id === uid);
            const currentPlayerHandPath = makePath(LayoutTypeEnum.Hand, uid);

            const currentPlayerDeckArea = debug ? debug.find((item) => item.id === "currentUserTable") : undefined;
            const currentPlayerDeck = deckLayouts.find((item) => item.id === uid);
            const currentPlayerDeckPath = makePath(LayoutTypeEnum.Deck, uid);
            if (currentPlayerDeckArea) {
                if (currentPlayerDeck) {
                    const currentPlayerDeckContent = currentPlayerDeck.content.map(
                        (content, contentIndex, allItems) => {
                            const isLastCard = contentIndex === allItems.length - 1;
                            const isClickable = isLastCard;
                            const isSelected = isSelectedItem(content, game, uid);
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
                        }
                    );
                    // if deck is empty, show a placeholder to shuffle discard pile
                    if (currentPlayerDeckContent.length === 0) {
                        const placeholderId = `placeholder-deck-${uid}`;
                        currentPlayerDeckContent.push({
                            id: placeholderId,
                            ownerUid: uid,
                            type: ContentItemTypeEnum.PlaceholderCard,
                            isClickable: true,
                            isSelected: false,
                            isHighlighted: false,
                            positionProps: {
                                ...originPosition,
                                id: placeholderId,
                                ...outcomeCardSize,
                            },
                            componentProps: {
                                className: isClickableClassName,
                                text: "Shuffle",
                                textProps: { variant: "h1", color: "primary", className: "text-center" },
                                cardProps: { size: "Mini European" },
                            },
                            onClick: () => {
                                console.log("Play card");
                                dispatch({
                                    type: ActionTypeEnum.ShuffleDiscardPile,
                                    pathFrom: currentPlayerDiscardPath,
                                    pathTo: currentPlayerDeckPath,
                                });
                            },
                        });
                    }
                    contentItemProps.push(
                        ...organizeDeck(currentPlayerDeckContent, currentPlayerDeckArea.positionProps)
                    );
                    const currentPlayerDiscard = discardLayouts.find((item) => item.id === uid);
                    const currentPlayerDiscardPath = makePath(LayoutTypeEnum.Discard, uid);
                    const currentPlayerDiscardPosition = {
                        ...currentPlayerDeckArea.positionProps,
                        x: currentPlayerDeckArea.positionProps.x + outcomeCardSize.width + cardMargin,
                    };
                    if (currentPlayerDiscard) {
                        const currentPlayerDiscardContent = currentPlayerDiscard.content.map(
                            (content, contentIndex, allItems) => {
                                const isLastCard = contentIndex === allItems.length - 1;
                                const isClickable = false; // TODO: Maybe do something with the last card
                                const isSelected = isSelectedItem(content, game, uid);
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
                            }
                        );
                        // Discard placeholder is displayed when:
                        // Outcome Card in hand is selected
                        const selectedHandItem = currentPlayerHand?.content.find((item) =>
                            isSelectedItem(item, game, uid)
                        );
                        const selectedHandItemPath = selectedHandItem
                            ? makePath(LayoutTypeEnum.Hand, uid, selectedHandItem.id)
                            : "";
                        // Outcome Card in deck is selected
                        const selectedDeckItem = currentPlayerDeck?.content.find((item) =>
                            isSelectedItem(item, game, uid)
                        );
                        const selectedDeckItemPath = selectedDeckItem
                            ? makePath(LayoutTypeEnum.Deck, uid, selectedDeckItem.id)
                            : "";

                        // TODO: Optimize to only look for one path or the other
                        const pathDiscardFrom = selectedHandItemPath || selectedDeckItemPath;
                        if (pathDiscardFrom) {
                            const placeholderId = `placeholder-discard-${uid}`;
                            currentPlayerDiscardContent.push({
                                id: placeholderId,
                                ownerUid: uid,
                                type: ContentItemTypeEnum.PlaceholderCard,
                                isClickable: true,
                                isSelected: false,
                                isHighlighted: false,
                                positionProps: { ...originPosition, id: placeholderId, ...outcomeCardSize },
                                componentProps: {
                                    className: isClickableClassName,
                                    text: "Play",
                                    textProps: { variant: "h1", color: "primary", className: "text-center" },
                                    cardProps: { size: "Mini European" },
                                },
                                onClick: () => {
                                    console.log("Play card");
                                    dispatch({
                                        type: ActionTypeEnum.MoveItem,
                                        pathFrom: pathDiscardFrom,
                                        pathTo: currentPlayerDiscardPath,
                                        deselectPaths: [currentPlayerDeckPath, currentPlayerHandPath],
                                    });
                                },
                            });
                        }
                        contentItemProps.push(
                            ...organizeDiscard(currentPlayerDiscardContent, currentPlayerDiscardPosition)
                        );
                    } else {
                        console.error("Could not find deck for player", uid, "in", deckLayouts);
                    }
                } else {
                    console.error("Could not find deck for player", uid, "in", deckLayouts);
                }
            }

            const currentPlayerHandArea = debug ? debug.find((item) => item.id === "currentUserHand") : undefined;
            if (currentPlayerHandArea) {
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
                    const lastDeckCardIsSelected = lastDeckCard && isSelectedItem(lastDeckCard, game, uid);
                    if (lastDeckCardIsSelected) {
                        const placeholderId = `placeholder-hand-${uid}`;
                        handContent.push({
                            id: placeholderId,
                            ownerUid: uid,
                            type: ContentItemTypeEnum.PlaceholderCard,
                            isClickable: true,
                            isSelected: false,
                            isHighlighted: false,
                            positionProps: { ...originPosition, id: placeholderId, ...outcomeCardSize },
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
                    const handSize = currentPlayerHand.content.length + (lastDeckCardIsSelected ? 1 : 0);
                    const handWidth = Math.max(
                        Math.min(
                            outcomeCardSize.width * handSize * handStackingVisibilityMultiplier,
                            currentPlayerHandArea.positionProps.width ?? 0
                        ),
                        outcomeCardSize.width
                    );
                    contentItemProps.push(
                        ...organizeHand(handContent, {
                            ...currentPlayerHandArea.positionProps,
                            width: handWidth,
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
