import { DialogActionType, DialogIdType, DialogStateType } from "../dialog/dialogModel";
import { GameScheduledActionType, GameStateType as GameStateType } from "../model/gameState";
import { SceneEnum } from "../scene/sceneModel";
import handleSceneVisibility from "./handleSceneVisibility";
import handleUpdateDialog from "./handleUpdateDialog";

export enum GameActionTypeEnum {
    Common = "Common",
    NewGame = "NewGame",
    ShowScene = "ShowScene",
    HideScene = "HideScene",
    ChangeScene = "ChangeScene",
    DialogAction = "DialogAction",
    AddScheduledActions = "AddScheduledActions",
    ScheduledActionStarted = "ScheduledActionStarted",
}

export type CommonActionsType = {
    addScheduledActions?: GameScheduledActionType[];
    resolveScheduledActions?: number[];
    updateDialog?: Partial<DialogStateType>;
    showScene?: SceneEnum;
    hideScene?: SceneEnum;
};

export type AddScheduledActionActionType = {
    type: GameActionTypeEnum.AddScheduledActions;
    addScheduledActions: GameScheduledActionType[];
} & CommonActionsType;

export type DialogActionGameActionType = {
    type: GameActionTypeEnum.DialogAction;
} & DialogActionType &
    CommonActionsType;

export type NewGameActionType = { type: GameActionTypeEnum.NewGame } & CommonActionsType;
export type ChangeSceneActionType = {
    type: GameActionTypeEnum.ChangeScene;
    scene: SceneEnum;
    dialogId?: DialogIdType;
    regionId?: string;
    locationId?: string;
} & CommonActionsType;

export type CommonActionType = { type: GameActionTypeEnum.Common } & CommonActionsType;
export type ShowSceneActionType = { type: GameActionTypeEnum.ShowScene } & Pick<CommonActionsType, "showScene"> &
    CommonActionsType;
export type hideSceneActionType = { type: GameActionTypeEnum.HideScene } & Pick<CommonActionsType, "hideScene"> &
    CommonActionsType;

export type GameActionType =
    | CommonActionType
    | NewGameActionType
    | ChangeSceneActionType
    | DialogActionGameActionType
    | AddScheduledActionActionType;
/*
const handleChangeDialog = (state: GameStateType, action: GameActionType) => {
    if ("dialogId" in action && action.dialogId !== state.dialogId) {
        return {
            ...state,
            dialog: action.dialogId ? deepCopy(dialogMap[action.dialogId]) : undefined,
        };
    }
    return state;
};

const handleChangeScene = (state: GameStateType, action: GameActionType): GameStateType => {
    if ("scene" in action && action?.scene) {
        const sceneVisibility = sceneVisibilityMap[action?.scene || SceneEnum.MainMenu];
        console.log(sceneVisibility);
        return { ...state, ...sceneVisibility };
    }
    return state;
};

const handleDialogAction = (state: GameStateType, action: DialogActionGameActionType): GameStateType => {
    const newState = { ...handleChangeScene(state, action) };

    if (!newState.dialog) {
        console.warn("no dialog", action);
        return newState;
    }

    const { history } = newState.dialog;

    if (action.changeNodeId !== undefined) {
        newState.dialog = { ...newState.dialog, currentNodeId: action.changeNodeId };
        const lastNodeContent = deepCopy(state.dialog?.nodeMap?.[state.dialog.currentNodeId].content) || [];
        const actions = lastNodeContent.filter((dialogContent) => dialogContent.action);
        actions.forEach((actionContent) => {
            if (actionContent.action) {
                actionContent.action.isSelected = actionContent.action?.id === action.id;
            }
        });
        newState.dialog.history = [...(history || []), ...lastNodeContent];
    }

    if (action.locationId) {
        newState.locationId = action.locationId;
    }
    if (action.regionId) {
        newState.regionId = action.regionId;
    }

    return newState;
};*/

const handleScheduledActions = (state: GameStateType, action: GameActionType): GameStateType => {
    const hasNewActions = (action.addScheduledActions?.length || 0) > 0;
    const hasResolvedActions = (action.resolveScheduledActions?.length || 0) > 0;
    if (!hasNewActions && !hasResolvedActions) {
        return state;
    }
    const newState = { ...state };
    if (hasResolvedActions) {
        return {
            ...newState,
            scheduledActions: newState.scheduledActions.filter(
                (scheduledAction) =>
                    action.resolveScheduledActions !== undefined &&
                    !action.resolveScheduledActions.includes(scheduledAction.id)
            ),
        };
    }
    if (action.addScheduledActions) {
        return {
            ...newState,
            scheduledActions: newState.scheduledActions.concat(
                action.addScheduledActions.map((action, actionIndex) => ({
                    ...action,
                    id: state.lastScheduledActionId + actionIndex,
                }))
            ),
            lastScheduledActionId: state.lastScheduledActionId + action.addScheduledActions.length,
        };
    }
    return state;
};

export default function gameReducer(state: GameStateType, action: GameActionType): GameStateType {
    console.log("gameReducer action", action, state);
    let newState = state;
    newState = handleScheduledActions(newState, action);
    newState = handleUpdateDialog(newState, action);
    newState = handleSceneVisibility(newState, action);

    return newState;
}
