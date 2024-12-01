import {
    ActionType,
    ActionTypeEnum,
    ContentItemType,
    GameDocType,
    GameStateEnum,
    LayoutType,
    LayoutTypeEnum,
} from "./types";
import { claimDocument, getUserMeta, updateDocument } from "../../../services/firestoreController";
import { deleteGame } from "./firestorePlayOnlineController";
import { createNewGameData } from "./factories";
import createInitialBoard from "./createInitialBoard";
import { get, isNumber } from "lodash";
import shuffle from "../../../../../utils/shuffle";

export type StoreRequestType = {};

const areValidIndexes = (...indexes: (string | number)[]) => indexes.every((index) => Number(index) >= 0);

const pathDelimiter = ".";

export const makePath = (...fragments: (string | number)[]) => fragments.join(pathDelimiter);

export const parsePath = (path: string) =>
    path.split(pathDelimiter).map((fragment) => (isNumber(fragment) ? Number(fragment) : fragment));

const findContentItemPathById = (game: GameDocType, contentItemId: string) => {
    for (let layoutIndex = 0; layoutIndex < game.layouts.length; layoutIndex++) {
        const layout = game.layouts[layoutIndex];
        const contentIndex = layout.content.findIndex((contentItem) => contentItem.id === contentItemId);
        if (contentIndex >= 0) {
            return `${layoutIndex}.${contentIndex}`;
        }
    }
    return null;
};

const findContentItemPathByMatcher = (
    game: GameDocType,
    matcher: (contentItem: ContentItemType, index: number, allItems: ContentItemType[]) => boolean
) => {
    for (let layoutIndex = 0; layoutIndex < game.layouts.length; layoutIndex++) {
        const layout = game.layouts[layoutIndex];
        const contentIndex = layout.content.findIndex(matcher);
        if (contentIndex >= 0) {
            return `${layoutIndex}.${contentIndex}`;
        }
    }
    return null;
};

const findContentItemByPath = (game: GameDocType, path: string | null) => {
    if (!path) {
        console.warn("findContentItemByPath: no path");
        return null;
    }
    const [layoutIndex, contentIndex] = path.split(pathDelimiter).map(Number);
    if (!areValidIndexes(layoutIndex, contentIndex)) {
        console.warn("findContentItemByPath: no layoutIndex or contentIndex", { layoutIndex, contentIndex });
        return null;
    }
    return game.layouts[layoutIndex]?.content[contentIndex];
};

const findContentItemById = (game: GameDocType, contentItemId: string) =>
    findContentItemByPath(game, findContentItemPathById(game, contentItemId));

const isUserStoryteller = (game: GameDocType, uid: string) => game?.storytellerIds?.includes(uid) || false;

const resolveIsSelected = (game: GameDocType, contentItem: ContentItemType, uid: string) =>
    contentItem.isSelected ||
    (contentItem.ownerUid === uid && contentItem.isSelectedForOwner) ||
    (contentItem.isSelectedForStoryteller && isUserStoryteller(game, uid)) ||
    false;

const getLayoutPath = (layout: LayoutType) => makePath(layout.type, layout.id);

const updateContentItem = (
    game: GameDocType,
    contentItemPath: string,
    updater: (contentItem: ContentItemType) => ContentItemType
): GameDocType => {
    const [targetLayoutIndex, targetContentIndex] = contentItemPath.split(pathDelimiter).map(Number);
    if (!areValidIndexes(targetLayoutIndex, targetContentIndex)) {
        console.warn("Invalid contentItemPath", {
            layoutIndex: targetLayoutIndex,
            contentIndex: targetContentIndex,
            contentItemPath,
        });
        return game;
    }
    console.log({ targetLayoutIndex, targetContentIndex });
    return {
        ...game,
        layouts: game.layouts.map((layout, layoutIndex) =>
            layoutIndex === targetLayoutIndex
                ? {
                      ...layout,
                      content: layout.content.map((item, index) =>
                          index === targetContentIndex ? updater(item) : item
                      ),
                  }
                : layout
        ),
    };
};

const deselectItem = (contentItem: ContentItemType): ContentItemType => ({
    ...contentItem,
    isSelected: false,
    isSelectedForOwner: false,
    isSelectedForStoryteller: false,
});

const makeClickable = (
    contentItem: ContentItemType,
    inGeneral: boolean = false,
    forOwner: boolean = true,
    forStoryteller: boolean = true
): ContentItemType => ({
    ...contentItem,
    isClickable: inGeneral,
    isClickableForOwner: forOwner,
    isClickableForStoryteller: forStoryteller,
});

const findLayout = (game: GameDocType, layoutType: LayoutTypeEnum, layoutId: string) =>
    game.layouts.find((layout) => layout.type === layoutType && layout.id === layoutId);

const removeContentItemFromLayout = (layout: LayoutType, contentId: string): LayoutType => {
    return {
        ...layout,
        content: layout.content.filter((item) => item.id !== contentId),
    };
};

export default async function gameDispatcher(firestoreRootPath: string, game: GameDocType, action: ActionType) {
    console.log("dispatcher", { action, game });
    if (!action) {
        console.warn("No action");
        return;
    }
    // Requires game
    if (!game) {
        console.error("Game not loaded");
        throw new Error("Game not loaded");
    }
    if (action.type === ActionTypeEnum.ResetGame) {
        return updateDocument(firestoreRootPath, game.id, createNewGameData());
    }
    if (action.type === ActionTypeEnum.StartGame) {
        return updateDocument(firestoreRootPath, game.id, {
            ...createInitialBoard(game),
            state: GameStateEnum.InProgress,
        } as Partial<GameDocType>);
    }
    if (action.type === ActionTypeEnum.UpdateGame) {
        return updateDocument(firestoreRootPath, game.id, action.updater(game));
    }
    if (action.type === ActionTypeEnum.RemoveGame) {
        return deleteGame(game.id);
    }
    if (action.type === ActionTypeEnum.MoveItem) {
        const { pathFrom, pathTo, deselectPaths } = action;
        const [fromDeckType, fromDeckId, contentId] = parsePath(pathFrom);
        const pathFromLayout = makePath(fromDeckType, fromDeckId);
        const fromLayoutMatch = findLayout(game, fromDeckType as LayoutTypeEnum, fromDeckId as string);
        if (!fromLayoutMatch) {
            console.warn("Source layout not found", { pathFrom: pathFrom, fromDeckType, fromDeckId });
            return game;
        }
        const itemToMove = fromLayoutMatch.content.find((item) => item.id === contentId);
        if (!itemToMove) {
            console.warn("Item to move not found", { pathFrom: pathFrom, contentId });
            return game;
        }
        const [toDeckType, toDeckId] = parsePath(pathTo);
        const toLayoutMatch = findLayout(game, toDeckType as LayoutTypeEnum, toDeckId as string);
        if (!toLayoutMatch) {
            console.warn("Destination layout not found", { pathTo: pathTo, toDeckType, toDeckId });
            return game;
        }

        /* if (fromLayoutMatch === toLayoutMatch) {
            console.warn("Moving to the same layout not supported", { pathFrom: pathFrom, pathTo: pathTo });
        } */

        let isPathFromFound = false;
        let isPathToFound = false;

        const newLayouts = game.layouts.map((layout) => {
            const layoutPath = getLayoutPath(layout);
            // find layout from, remove item and save it temporarily
            let currentLayout = layout;
            if ((deselectPaths ?? []).includes(layoutPath)) {
                currentLayout = {
                    ...currentLayout,
                    content: currentLayout.content.map((item) => deselectItem(item)),
                };
            }
            if (layoutPath === pathFromLayout) {
                isPathFromFound = true;
                currentLayout = {
                    ...currentLayout,
                    content: currentLayout.content.filter((item) => item.id !== contentId),
                };
            }
            if (layoutPath === pathTo) {
                isPathToFound = true;
                console.log("pathTo match", { layout, layoutPath });
                const newItem: ContentItemType = makeClickable(
                    deselectItem({
                        ...itemToMove,
                        componentProps: { ...itemToMove.componentProps, isFaceDown: false },
                    })
                );
                currentLayout = {
                    ...currentLayout,
                    content: [...currentLayout.content, newItem],
                };
            }

            // if layout to
            return currentLayout;
        });
        if (!isPathFromFound) {
            console.warn(
                "Source path not found",
                { pathFrom: pathFrom, fromDeckType, fromDeckId },
                game.layouts.map((layout) => getLayoutPath(layout))
            );
            return game;
        }
        if (!isPathToFound) {
            console.warn(
                "Destination path not found",
                { pathTo: pathTo, toDeckType, toDeckId },
                game.layouts.map((layout) => getLayoutPath(layout))
            );
            return game;
        }
        return updateDocument(firestoreRootPath, game.id, {
            ...game,
            layouts: newLayouts,
        });
    }
    if (action.type === ActionTypeEnum.ShuffleDiscardPile) {
        const { pathFrom, pathTo } = action;
        const [fromDeckType, fromDeckId] = parsePath(pathFrom);
        const fromLayoutMatch = findLayout(game, fromDeckType as LayoutTypeEnum, fromDeckId as string);
        if (!fromLayoutMatch) {
            console.warn("Source layout not found", { pathFrom: pathFrom, fromDeckType, fromDeckId });
            return game;
        }

        const [toDeckType, toDeckId] = parsePath(pathTo);
        const toLayoutMatch = findLayout(game, toDeckType as LayoutTypeEnum, toDeckId as string);
        if (!toLayoutMatch) {
            console.warn("Destination layout not found", { pathTo: pathTo, toDeckType, toDeckId });
            return game;
        }

        if (fromLayoutMatch === toLayoutMatch) {
            console.warn("Moving to the same layout not supported", { pathFrom: pathFrom, pathTo: pathTo });
        }

        let isPathFromFound = false;
        let isPathToFound = false;

        const shuffledItems = shuffle(
            fromLayoutMatch.content.map((item) => ({
                ...item,
                componentProps: { ...item.componentProps, isFaceDown: true },
            }))
        );

        const newLayouts = game.layouts.map((layout) => {
            const layoutPath = getLayoutPath(layout);
            // find layout from, remove item and save it temporarily
            let currentLayout = layout;

            if (layoutPath === pathFrom) {
                isPathFromFound = true;
                currentLayout = {
                    ...currentLayout,
                    content: [],
                };
            }
            if (layoutPath === pathTo) {
                isPathToFound = true;
                currentLayout = {
                    ...currentLayout,
                    content: [...currentLayout.content, ...shuffledItems],
                };
            }

            // if layout to
            return currentLayout;
        });
        if (!isPathFromFound) {
            console.warn(
                "Source path not found",
                { pathFrom: pathFrom, fromDeckType, fromDeckId },
                game.layouts.map((layout) => getLayoutPath(layout))
            );
            return game;
        }
        if (!isPathToFound) {
            console.warn(
                "Destination path not found",
                { pathTo: pathTo, toDeckType, toDeckId },
                game.layouts.map((layout) => getLayoutPath(layout))
            );
            return game;
        }
        return updateDocument(firestoreRootPath, game.id, {
            ...game,
            layouts: newLayouts,
        });
    }
    if (action.type === ActionTypeEnum.CloneItem || action.type === ActionTypeEnum.RemoveItem) {
        console.warn("Not implemented");
        return game;
    }

    // Requires user
    if (!action.user) {
        console.error("User must be logged in");
        throw new Error("User must be logged in");
    }
    if (action.type === ActionTypeEnum.ClaimGame) {
        return claimDocument(firestoreRootPath, game.id, action.user);
    }

    if (action.type === ActionTypeEnum.ContentItemClick) {
        const contentItemPath = findContentItemPathById(game, action.itemId);
        const contentItem = findContentItemByPath(game, contentItemPath);
        if (!contentItemPath || !contentItem) {
            console.error("Content item not found", action.itemId, game.layouts);
            return game;
        }

        const isSelected = resolveIsSelected(game, contentItem, action.user.id);

        // Deselect
        if (isSelected) {
            return updateDocument(
                firestoreRootPath,
                game.id,
                updateContentItem(game, contentItemPath, (contentItem) => ({ ...contentItem, isSelected: false }))
            );
        }

        // Select
        if (!isSelected) {
            // TODO: Deselect other layouts
            return updateDocument(
                firestoreRootPath,
                game.id,
                updateContentItem(game, contentItemPath, (contentItem) => ({ ...contentItem, isSelected: true }))
            );
        }

        console.warn("not implemented", action.type);

        return game;
    }

    // Game must be in Ready state
    if (game.state !== GameStateEnum.Ready) {
        console.error("Game must be in Ready state");
        throw new Error("Game must be in Ready state", { cause: "ignorable" });
    }
    if (action.type === ActionTypeEnum.JoinGameAsPlayer) {
        return updateDocument(firestoreRootPath, game.id, {
            ...game,
            players: [...(game?.players || []), getUserMeta(action.user)],
            playerIds: [...(game?.playerIds || []), action.user.id],
        });
    }
    if (action.type === ActionTypeEnum.LeaveGameAsPlayer) {
        return updateDocument(firestoreRootPath, game.id, {
            ...game,
            players: game?.players?.filter((userItem) => userItem.uid !== action.user.id) || [],
            playerIds: game?.playerIds?.filter((id) => id !== action.user.id) || [],
        });
    }
    if (action.type === ActionTypeEnum.JoinGameAsStoryteller) {
        return updateDocument(firestoreRootPath, game.id, {
            ...game,
            storytellers: [...(game?.storytellers || []), getUserMeta(action.user)],
            storytellerIds: [...(game?.storytellerIds || []), action.user.id],
        });
    }
    if (action.type === ActionTypeEnum.LeaveGameAsStoryteller) {
        return updateDocument(firestoreRootPath, game.id, {
            ...game,
            storytellers: game?.storytellers?.filter((userItem) => userItem.uid !== action.user.id) || [],
            storytellerIds: game?.storytellerIds?.filter((id) => id !== action.user.id) || [],
        });
    }
    console.error(`Unhandled action type: ${(action as any)?.type}`);
    // Handle requests
}

const noRequests = [] as StoreRequestType[];

export function requestReducer(action: ActionType, state: GameDocType): StoreRequestType[] {
    console.log("requestReducer", { action, state });
    return noRequests;
}
