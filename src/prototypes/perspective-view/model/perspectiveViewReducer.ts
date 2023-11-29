import React from "react";
import { PerspectiveViewStateType } from "./perspectiveViewModel";

export enum PerspectiveViewActionTypeEnum {
    Update = "Update",
    Updater = "Updater",
}

export type PerspectiveViewActionType =
    | {
          type: PerspectiveViewActionTypeEnum.Update;
          payload: Partial<PerspectiveViewStateType>;
      }
    | {
          type: PerspectiveViewActionTypeEnum.Updater;
          payload: (state: PerspectiveViewStateType) => Partial<PerspectiveViewStateType>;
      };

const calculateStageStyle = (state: PerspectiveViewStateType): PerspectiveViewStateType => {
    return {
        ...state,
        stageStyle: {
            ...state.stageStyle,
            transform: `translate(${state.stage.x}px, ${state.stage.y}px) scale(${state.stage.scale})`,
        },
    };
};

export default function (state: PerspectiveViewStateType, action: PerspectiveViewActionType): PerspectiveViewStateType {
    console.log(action);
    if (action.type === PerspectiveViewActionTypeEnum.Update) {
        return calculateStageStyle({
            ...state,
            ...action.payload,
        });
    }
    if (action.type === PerspectiveViewActionTypeEnum.Updater) {
        return calculateStageStyle({
            ...state,
            ...action.payload(state),
        });
    }
    return state;
}
