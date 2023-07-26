import { SceneEnum } from "../scene/sceneModel";
import { GameStateType, VisibilityEnum } from "./gameState";

export const sceneOrderFromBottom = [
    SceneEnum.Region,
    SceneEnum.Location,
    SceneEnum.Dialog,
    SceneEnum.Inventory,
    SceneEnum.Editor,
    SceneEnum.MainMenu,
];

export type VisibilityKeysType =
    | "mainMenuVisibility"
    | "editorVisibility"
    | "inventoryVisibility"
    | "dialogVisibility"
    | "locationVisibility"
    | "regionVisibility";

const sceneVisibilityPropMap = {
    [SceneEnum.MainMenu]: "mainMenuVisibility" as const,
    [SceneEnum.Editor]: "editorVisibility" as const,
    [SceneEnum.Inventory]: "inventoryVisibility" as const,
    [SceneEnum.Dialog]: "dialogVisibility" as const,
    [SceneEnum.Location]: "locationVisibility" as const,
    [SceneEnum.Region]: "regionVisibility" as const,
};

export const isSceneVisible = (state: GameStateType, scene: SceneEnum): boolean => {
    return state[sceneVisibilityPropMap[scene]] === VisibilityEnum.Visible;
};

export const isAnyOtherSceneVisible = (state: GameStateType, scene: SceneEnum): boolean => {
    const otherScenes = sceneOrderFromBottom.filter((s) => s !== scene);
    return otherScenes.some((s) => isSceneVisible(state, s));
};

export const setSceneVisibility = (state: GameStateType, scene: SceneEnum, visibility: VisibilityEnum) => {
    return {
        ...state,
        [sceneVisibilityPropMap[scene]]: visibility,
    };
};

export const setAboveScenesVisibility = (state: GameStateType, scene: SceneEnum, visibility: VisibilityEnum) => {
    const sceneLayerIndex = sceneOrderFromBottom.indexOf(scene);
    let newState = { ...state };
    sceneOrderFromBottom.slice(sceneLayerIndex + 1).forEach((scene) => {
        newState[sceneVisibilityPropMap[scene]] = visibility;
    });
    return newState;
};
