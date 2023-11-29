import { ContentItemProps } from "../content/sharedContentProps";
import { dialogMap } from "../dialog/dialogModel";
import { GameStateType } from "../model/gameState";
import { GameActionType } from "./gameReducer";
import update from "react-addons-update";

export default function handleUpdateDialog(state: GameStateType, action: GameActionType): GameStateType {
    if (action.updateDialog) {
        const isDialogChange =
            action.updateDialog.dialogId !== undefined && action.updateDialog.dialogId !== state.dialog.dialogId;
        const isDialogNodeChange =
            isDialogChange ||
            (action.updateDialog.currentNodeId !== undefined &&
                action.updateDialog.currentNodeId !== state.dialog.currentNodeId);
        const dialog = { ...state.dialog, ...action.updateDialog };
        // only change history if isDialogNodeChange
        if (isDialogNodeChange && dialog.dialogId && dialog.currentNodeId) {
            const dialogNode = dialogMap[dialog.dialogId]?.nodeMap[dialog.currentNodeId];
            const previousHistory = [...(dialog.history || [])];
            // mark actions as selected in the last history node

            if (previousHistory.length > 0) {
                previousHistory[previousHistory.length - 1] = update(previousHistory[previousHistory.length - 1], {
                    content: {
                        $apply: (contentItems: ContentItemProps[]) => {
                            return contentItems.map((content) => {
                                if (content?.component?.DialogAction) {
                                    const isSelected =
                                        content.component.DialogAction?.action?.actionId === action.actionId;
                                    return update(content, {
                                        component: { DialogAction: { isSelected: { $set: isSelected } } },
                                    });
                                }
                                return content;
                            });
                        },
                    },
                });
            }

            const history = [...previousHistory, dialogNode];

            dialog.history = history;
        }
        return {
            ...state,
            dialog,
        };
    }
    return state;
}
