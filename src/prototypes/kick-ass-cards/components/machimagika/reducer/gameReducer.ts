import { DialogIdType, DialogStateType, FlagMapType } from "../dialog/dialogModel";
import { LocationStateType } from "../location/locationModel";
import { GameScheduledActionType, GameStateType } from "../model/gameState";
import { SceneEnum } from "../scene/sceneModel";
import { GameActionTypeEnum } from "./GameActionTypeEnum";
import handleNewGame from "./handleNewGame";
import handleSceneVisibility from "./handleSceneVisibility";
import handleSetFlags from "./handleSetFlags";
import handleUpdateDialog from "./handleUpdateDialog";
import handleUpdateLocation from "./handleUpdateLocation";

export type CommonActionsType = {
    actionId?: string;
    addScheduledActions?: GameScheduledActionType[];
    resolveScheduledActions?: number[];
    updateDialog?: Partial<DialogStateType>;
    updateLocation?: Partial<LocationStateType>;
    setFlags?: Partial<FlagMapType>;
    showScene?: SceneEnum;
    hideScene?: SceneEnum;
};

export type AddScheduledActionActionType = {
    type: GameActionTypeEnum.AddScheduledActions;
} & CommonActionsType;

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
    let newAction = action;
    [newState, newAction] = handleNewGame(newState, action);

    newState = handleScheduledActions(newState, newAction);
    newState = handleSetFlags(newState, newAction);
    newState = handleUpdateDialog(newState, newAction);
    newState = handleUpdateLocation(newState, newAction);
    newState = handleSceneVisibility(newState, newAction);

    return newState;
}
