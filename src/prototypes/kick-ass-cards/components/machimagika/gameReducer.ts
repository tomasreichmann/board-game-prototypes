import deepCopy from "../../../../utils/deepCopy";
import { SceneEnum, StateType, dialogMap } from "./GameContext";

export enum GameActionTypeEnum {
    NewGame = "NewGame",
    ChangeScene = "ChangeScene",
}

export type GameActionType =
    | { type: GameActionTypeEnum.NewGame }
    | {
          type: GameActionTypeEnum.ChangeScene;
          scene: SceneEnum;
          dialogId?: string;
          regionId?: string;
          locationId?: string;
      };

export default function gameReducer(state: StateType, action: GameActionType): StateType {
    console.log(action);
    if (action.type === GameActionTypeEnum.NewGame) {
        return {
            ...state,
            scene: SceneEnum.Dialog,
            dialog: deepCopy(dialogMap.newGame),
        };
    }
    return state;
}
