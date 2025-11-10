import { GameStateType, initialState } from "../model/gameState";
import { SceneEnum } from "../scene/sceneModel";
import { GameActionType } from "./gameReducer";
import { GameActionTypeEnum } from "./GameActionTypeEnum";

export default function handleNewGame(state: GameStateType, action: GameActionType): [GameStateType, GameActionType] {
    if (action.type === GameActionTypeEnum.NewGame) {
        const newState: GameStateType = {
            ...state,
            ...initialState,
        };
        const newAction: GameActionType = {
            type: GameActionTypeEnum.Common,
            updateDialog: {
                dialogId: "newGame",
                currentNodeId: "start",
            },
            showScene: SceneEnum.Dialog,
        };

        return [newState, newAction];
    }
    return [state, action];
}
