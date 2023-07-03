import { GameStateType } from "../model/gameState";
import { GameActionType } from "./gameReducer";

export default function handleUpdateLocation(state: GameStateType, action: GameActionType): GameStateType {
    if (action.updateLocation) {
        return {
            ...state,
            location: { ...state.location, ...action.updateLocation },
        };
    }
    return state;
}
