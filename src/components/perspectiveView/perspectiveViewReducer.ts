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

const calculateStyle = (state: PerspectiveViewStateType): PerspectiveViewStateType => {
    return {
        ...state,
        stageStyle: {
            ...state.stageStyle,
            width: state.stage.width,
            height: state.stage.height,
            transform: `translate3d(${state.stage.x}px, ${state.stage.y}px, ${state.stage.z}px) rotateX(${state.stage.rotateX}deg) rotateY(${state.stage.rotateY}deg) rotateZ(${state.stage.rotateZ}deg) scale(${state.stage.scale})`,
        },
        frameStyle: {
            perspective: state.lens.perspective,
        },
    };
};

export default function (state: PerspectiveViewStateType, action: PerspectiveViewActionType): PerspectiveViewStateType {
    console.log(action);
    if (action.type === PerspectiveViewActionTypeEnum.Update) {
        return calculateStyle({
            ...state,
            ...action.payload,
        });
    }
    if (action.type === PerspectiveViewActionTypeEnum.Updater) {
        return calculateStyle({
            ...state,
            ...action.payload(state),
        });
    }
    return state;
}
