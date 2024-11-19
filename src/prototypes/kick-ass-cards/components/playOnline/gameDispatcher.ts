import { ActionType, ActionTypeEnum, GameDocType, GameStateEnum } from "./types";
import { claimDocument, getUserMeta, updateDocument } from "../../services/firestoreController";
import { deleteGame } from "./firestorePlayOnlineController";
import { createNewGameData } from "./factories";
import createInitialBoard from "./createInitialBoard";

export type StoreRequestType = {};

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

    // Game must be in Ready state
    if (game.state !== GameStateEnum.Ready) {
        console.error("Game must be in Ready state");
        throw new Error("Game must be in Ready state");
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
