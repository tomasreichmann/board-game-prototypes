import { AnyRecord } from "../../../../utils/simpleTypes";
import { DeepRandomType } from "../../generators/resolveRandom";
import { PropsWithAiPrefixes } from "./ComponentMetaEditor";
import ComponentMetaType from "./ComponentMetaType";

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

export type PresetType<T extends AnyRecord> = {
    name: string;
    scheme: DeepRandomType<T>;
    meta: ComponentMetaType<T>;
    Component: React.ComponentType<T>;
    componentName: string;
    propPrompts?: PropsWithAiPrefixes<{ [key in keyof T]?: string }>;
    defaultProps: Partial<T>;
    sampleProps?: Partial<PropsWithAiPrefixes<T>>;
    additionalProps: Partial<T>;
};
