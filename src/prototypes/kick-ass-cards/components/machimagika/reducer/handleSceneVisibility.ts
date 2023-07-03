import { GameStateType, VisibilityEnum } from "../model/gameState";
import { SceneEnum } from "../scene/sceneModel";
import { GameActionType } from "./gameReducer";
import { GameActionTypeEnum } from "./GameActionTypeEnum";

const sceneOrderFromBottom = [
    SceneEnum.Region,
    SceneEnum.Location,
    SceneEnum.Dialog,
    SceneEnum.Inventory,
    SceneEnum.MainMenu,
];

export type VisibilityKeysType =
    | "mainMenuVisibility"
    | "inventoryVisibility"
    | "dialogVisibility"
    | "locationVisibility"
    | "regionVisibility";

const sceneVisibilityPropMap = {
    [SceneEnum.MainMenu]: "mainMenuVisibility" as const,
    [SceneEnum.Inventory]: "inventoryVisibility" as const,
    [SceneEnum.Dialog]: "dialogVisibility" as const,
    [SceneEnum.Location]: "locationVisibility" as const,
    [SceneEnum.Region]: "regionVisibility" as const,
};

export const handleShowScene = (state: GameStateType, action: GameActionType): GameStateType => {
    if (action.showScene) {
        const newState = { ...state };
        // show scene
        newState[sceneVisibilityPropMap[action.showScene]] = VisibilityEnum.Visible;
        // hide layers above
        const sceneLayerIndex = sceneOrderFromBottom.indexOf(action.showScene);
        sceneOrderFromBottom.slice(sceneLayerIndex + 1).forEach((scene) => {
            newState[sceneVisibilityPropMap[scene]] = VisibilityEnum.Hidden;
        });
        return newState;
    }
    return state;
};
export const handleHideScene = (state: GameStateType, action: GameActionType): GameStateType => {
    if (action.hideScene) {
        return { ...state, [sceneVisibilityPropMap[action.hideScene]]: VisibilityEnum.Hidden };
    }
    return state;
};

export default function handleSceneVisibility(state: GameStateType, action: GameActionType): GameStateType {
    let newState = state;
    newState = handleHideScene(newState, action);
    newState = handleShowScene(newState, action);
    return newState;
}
