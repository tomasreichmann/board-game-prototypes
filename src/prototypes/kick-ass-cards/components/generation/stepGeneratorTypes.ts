import { DeepRandomType } from "../../generators/resolveRandom";

export enum StepEnum {
    Preset = "Preset",
    Generation = "Generation",
    FineTune = "Fine Tune",
    Export = "Export",
}

export const steps = Object.values(StepEnum);

export type StepGeneratorStateType = {
    step: StepEnum;
    presets: Array<PresetType<any>>;
    presetName?: string;
    presetProps?: Record<string, any>;
    contextPrompt: string;
    propPrompts: PresetType<any>["propPrompts"];
    elementPrompt: string;
    generationResult?: string;
    generationCount: number;
};

export type PresetType<T> = {
    name: string;
    scheme: DeepRandomType<T>;
    Component: React.ComponentType<T>;
    componentName: string;
    propPrompts?: { [key in keyof T]?: string };
    defaultProps: Partial<T>;
    sampleProps?: Partial<T>;
    additionalProps: Partial<T>;
};
