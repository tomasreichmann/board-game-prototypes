import React, { useContext, useReducer } from "react";

import { PresetType, StepEnum, StepGeneratorStateType } from "./stepGeneratorTypes";

export enum StepGeneratorActionTypeEnum {
    Update = "Update",
    SetStep = "SetStep",
    SetPresets = "SetPresets",
    SetPreset = "SetPreset",
    FineTune = "FineTune",
}

type StepGeneratorActionType =
    | {
          type: StepGeneratorActionTypeEnum.Update;
          updater: (state: StepGeneratorStateType) => StepGeneratorStateType;
      }
    | {
          type: StepGeneratorActionTypeEnum.SetStep;
          step: StepEnum;
      }
    | {
          type: StepGeneratorActionTypeEnum.SetPresets;
          presets: Array<PresetType<any>>;
      }
    | {
          type: StepGeneratorActionTypeEnum.SetPreset;
          presetName: string;
      }
    | {
          type: StepGeneratorActionTypeEnum.FineTune;
          props: { [key: string]: any };
      };

// Define the reducer function
const reducer = (state: StepGeneratorStateType, action: StepGeneratorActionType): StepGeneratorStateType => {
    // console.log("action", action);
    if (action.type === StepGeneratorActionTypeEnum.Update) {
        const newState = action.updater(state);
        return newState;
    }
    if (action.type === StepGeneratorActionTypeEnum.SetStep) {
        return { ...state, step: action.step, generationResult: undefined };
    }
    if (action.type === StepGeneratorActionTypeEnum.SetPresets) {
        return { ...state, presets: action.presets, step: StepEnum.Preset };
    }
    if (action.type === StepGeneratorActionTypeEnum.SetPreset) {
        const preset = state.presets.find((preset) => preset.name === action.presetName);
        if (!preset) {
            console.warn(`Preset "${action.presetName}" not found`);
            return state;
        }
        return {
            ...state,
            presetName: action.presetName,
            presetProps: preset.defaultProps,
            propPrompts: preset.propPrompts,
            step: StepEnum.Generation,
        };
    }
    if (action.type === StepGeneratorActionTypeEnum.FineTune) {
        return { ...state, presetProps: action.props, step: StepEnum.FineTune };
    }

    return state;
};

const initialState: StepGeneratorStateType = {
    presets: [],
    step: StepEnum.Preset,
    presetName: undefined,
    presetProps: undefined,
    contextPrompt: "",
    elementPrompt: "",
    generationCount: 4,
    propPrompts: {},
    generationResult: "",
};

const initialContext: { state: StepGeneratorStateType; dispatch: React.Dispatch<StepGeneratorActionType> } = {
    state: initialState,
    dispatch: () => {},
};

const StepGeneratorContext = React.createContext(initialContext);

export const useStepGenerator = () => {
    return useContext(StepGeneratorContext);
};

export const StepGeneratorProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <StepGeneratorContext.Provider value={{ state, dispatch }}>{children}</StepGeneratorContext.Provider>;
};
