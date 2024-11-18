import { ActionType, GameDocType } from "./types";

export type StoreRequestType = {};

export default function dispatcher(action: ActionType, state: GameDocType) {
    console.log("dispatcher", { action, state });
    const requests = requestReducer(action, state);
    console.log("requests", requests);
    // Handle requests
}

const noRequests = [] as StoreRequestType[];

export function requestReducer(action: ActionType, state: GameDocType): StoreRequestType[] {
    console.log("requestReducer", { action, state });
    return noRequests;
}
