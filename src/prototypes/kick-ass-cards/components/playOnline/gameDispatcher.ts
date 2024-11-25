import { ActionType, ActionTypeEnum, ContentItemType, GameDocType, GameStateEnum, LayoutType } from "./types";
import { claimDocument, getUserMeta, updateDocument } from "../../services/firestoreController";
import { deleteGame } from "./firestorePlayOnlineController";
import { createNewGameData } from "./factories";
import createInitialBoard from "./createInitialBoard";

export type StoreRequestType = {};

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
    const [layoutIndex, contentIndex] = path.split(".").map(Number);
    if (!layoutIndex || !contentIndex) {
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

const updateContentItem = (
    game: GameDocType,
    contentItemPath: string,
    updater: (contentItem: ContentItemType) => ContentItemType
): GameDocType => {
    const [targetLayoutIndex, targetContentIndex] = contentItemPath.split(".").map(Number);
    if (!targetLayoutIndex || targetLayoutIndex < 0 || !targetContentIndex || targetContentIndex < 0) {
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
        console.log("isSelected", isSelected);

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
