import React from "react";
import { SubViewStateType } from "./subViewModel";

export enum SubViewActionTypeEnum {
    Update = "Update",
    Updater = "Updater",
}

export type SubViewActionType = {
    type: SubViewActionTypeEnum.Updater;
    payload: (state: SubViewStateType) => Partial<SubViewStateType>;
};

export default function subViewReducer(state: SubViewStateType, action: SubViewActionType): SubViewStateType {
    console.log(action);
    if (action.type === SubViewActionTypeEnum.Updater) {
        return {
            ...state,
            ...action.payload(state),
        };
    }
    return state;
}
