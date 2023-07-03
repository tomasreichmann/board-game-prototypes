import { GameStateType } from "../model/gameState";
import { GameActionType } from "./gameReducer";

export default function handleSetFlags(state: GameStateType, action: GameActionType): GameStateType {
    if (action.setFlags) {
        return {
            ...state,
            flagMap: { ...state.flagMap, ...action.setFlags },
        };
    }
    return state;
}
