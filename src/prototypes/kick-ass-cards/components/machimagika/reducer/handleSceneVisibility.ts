import { GameStateType, VisibilityEnum } from "../model/gameState";
import { GameActionType } from "./gameReducer";
import { GameActionTypeEnum } from "./GameActionTypeEnum";
import { isSceneVisible, setAboveScenesVisibility, setSceneVisibility } from "../model/visibilityHelpers";

export const handleShowScene = (state: GameStateType, action: GameActionType): GameStateType => {
    if (action.showScene) {
        let newState = { ...state };
        // show scene
        newState = setSceneVisibility(newState, action.showScene, VisibilityEnum.Visible);
        // hide layers above
        return setAboveScenesVisibility(newState, action.showScene, VisibilityEnum.Hidden);
    }
    return state;
};
export const handleToggleScene = (state: GameStateType, action: GameActionType): GameStateType => {
    if (action.toggleScene) {
        return isSceneVisible(state, action.toggleScene)
            ? handleHideScene(state, { type: GameActionTypeEnum.Common, hideScene: action.toggleScene })
            : handleShowScene(state, { type: GameActionTypeEnum.Common, showScene: action.toggleScene });
    }
    return state;
};

export const handleHideScene = (state: GameStateType, action: GameActionType): GameStateType => {
    if (action.hideScene) {
        return setSceneVisibility(state, action.hideScene, VisibilityEnum.Hidden);
    }
    return state;
};

export default function handleSceneVisibility(state: GameStateType, action: GameActionType): GameStateType {
    let newState = state;
    newState = handleToggleScene(newState, action);
    newState = handleHideScene(newState, action);
    newState = handleShowScene(newState, action);
    return newState;
}
