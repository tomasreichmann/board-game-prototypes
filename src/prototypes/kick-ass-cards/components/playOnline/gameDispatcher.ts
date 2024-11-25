import { ActionType, ActionTypeEnum, ContentItemType, GameDocType, GameStateEnum, LayoutType } from "./types";
import { claimDocument, getUserMeta, updateDocument } from "../../services/firestoreController";
import { deleteGame } from "./firestorePlayOnlineController";
import { createNewGameData } from "./factories";
import createInitialBoard from "./createInitialBoard";

export type StoreRequestType = {};

const getContentItemLayoutPath = (game: GameDocType, contentItemId: string) => {
    const layoutKeys = Object.keys(game.layout);
    for (let layoutKeyIndex = 0; layoutKeyIndex < layoutKeys.length; layoutKeyIndex++) {
        const layoutGroupKey = layoutKeys[layoutKeyIndex];
        const layoutGroup = game.layout[layoutGroupKey as keyof GameDocType["layout"]];
        // check if layout[layoutKey] is array or object
        if (Array.isArray(layoutGroup)) {
            const match = layoutGroup.find((item) => item.id === contentItemId);
            return match ? `${layoutGroupKey}.${layoutGroup.indexOf(match)}` : null;
        } else {
            const layoutGroupKeys = Object.keys(layoutGroup);
            for (let layoutGroupKeyIndex = 0; layoutGroupKeyIndex < layoutGroupKeys.length; layoutGroupKeyIndex++) {
                const layoutKey = layoutGroupKeys[layoutGroupKeyIndex];
                const layout = layoutGroup[layoutKey];
                const match = (layout as LayoutType).content.find((item) => item.id === contentItemId);
                return match ? `${layoutGroupKey}.${layoutKey}.${layout.content.indexOf(match)}` : null;
            }
        }
    }
    return null;
};

const updateContentItemByLayoutPath = (
    game: GameDocType,
    layoutPath: string,
    updater: (contentItem: ContentItemType) => ContentItemType
) => {
    /* const layoutKeys = layoutPath.split(".");
    let layout = game.layout;
    for (let layoutKeyIndex = 0; layoutKeyIndex < layoutKeys.length; layoutKeyIndex++) {
        const layoutKey = layoutKeys[layoutKeyIndex];
        const layoutGroup = layout[layoutKey as keyof GameDocType["layout"]];
        // check if layout[layoutKey] is array or object
        if (Array.isArray(layoutGroup)) {
            layout = layoutGroup;
        } else {
            layout = layoutGroup[layoutKeys[layoutKeyIndex + 1]];
        }
    } */
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
        console.warn("not implemented", action.type);
        // Find content item
        const path = getContentItemLayoutPath(game, action.itemId);
        if (!path) {
            console.error("Content item not found", action.itemId);
        }

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
