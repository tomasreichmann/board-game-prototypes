import { GameStateType } from "../model/gameState";
import { GameActionType } from "./gameReducer";

export default function handleUpdateDialog(state: GameStateType, action: GameActionType): GameStateType {
    if (action.updateDialog) {
        return {
            ...state,
            dialog: { ...state.dialog, ...action.updateDialog },
        };
    }
    return state;
}
