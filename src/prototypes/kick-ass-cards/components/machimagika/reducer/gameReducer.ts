import deepCopy from "../../../../../utils/deepCopy";
import { GameScheduledActionType, StateType } from "../GameContext";
import { DialogActionType, DialogIdType, dialogMap } from "../dialog/dialogModel";
import { SceneEnum } from "../scenes/sceneModel";

export enum GameActionTypeEnum {
    NewGame = "NewGame",
    ChangeScene = "ChangeScene",
    DialogAction = "DialogAction",
    AddScheduledActions = "AddScheduledActions",
    ScheduledActionStarted = "ScheduledActionStarted",
}

export type ScheduledActionsType = {
    addScheduledActions?: GameScheduledActionType[];
    resolveScheduledActions?: number[];
};

export type AddScheduledActionActionType = {
    type: GameActionTypeEnum.AddScheduledActions;
    addScheduledActions: GameScheduledActionType[];
} & ScheduledActionsType;

export type DialogActionGameActionType = {
    type: GameActionTypeEnum.DialogAction;
} & DialogActionType &
    ScheduledActionsType;

export type NewGameActionType = { type: GameActionTypeEnum.NewGame } & ScheduledActionsType;
export type ChangeSceneActionType = {
    type: GameActionTypeEnum.ChangeScene;
    scene: SceneEnum;
    dialogId?: DialogIdType;
    regionId?: string;
    locationId?: string;
} & ScheduledActionsType;

export type GameActionType =
    | NewGameActionType
    | ChangeSceneActionType
    | DialogActionGameActionType
    | AddScheduledActionActionType;

const handleChangeDialog = (state: StateType, action: GameActionType) => {
    if ("dialogId" in action && action.dialogId !== state.dialogId) {
        return {
            ...state,
            dialog: action.dialogId ? deepCopy(dialogMap[action.dialogId]) : undefined,
        };
    }
    return state;
};

const handleChangeScene = (state: StateType, action: GameActionType): StateType => {
    if ("scene" in action && state.scene !== action?.scene) {
        return { ...state, scene: action?.scene || SceneEnum.MainMenu };
    }
    return state;
};

const handleDialogAction = (state: StateType, action: DialogActionGameActionType): StateType => {
    const newState = { ...handleChangeScene(state, action) };

    if (!newState.dialog) {
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

    return newState;
};

const handleScheduledActions = (state: StateType, action: GameActionType): StateType => {
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

export default function gameReducer(state: StateType, action: GameActionType): StateType {
    console.log("gameReducer action", action, state);
    if (action.type === GameActionTypeEnum.NewGame) {
    }
    const scheduledState = handleScheduledActions(state, action);

    if (action.type === GameActionTypeEnum.NewGame) {
        const newGameAction: GameActionType = {
            type: GameActionTypeEnum.ChangeScene,
            scene: SceneEnum.Dialog,
            dialogId: "newGame",
        };
        return handleChangeScene(handleChangeDialog(scheduledState, newGameAction), newGameAction);
    }
    if (action.type === GameActionTypeEnum.DialogAction) {
        let newState = handleChangeDialog(scheduledState, action);
        newState = handleDialogAction(newState, action);
        return newState;
    }
    if (action.type === GameActionTypeEnum.ChangeScene) {
        return handleChangeScene(handleChangeDialog(scheduledState, action), action);
    }
    return scheduledState;
}
