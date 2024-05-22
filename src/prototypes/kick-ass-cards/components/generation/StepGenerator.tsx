import { useEffect } from "react";
import { StepGeneratorActionTypeEnum, useStepGenerator } from "./useStepGenerator";
import { PresetType, StepEnum, steps } from "./stepGeneratorTypes";
import PresetStep from "./PresetStep";
import GenerationStep from "./GenerationStep";
import ToggleData from "../../../../components/DataToggle";
import Button from "../controls/Button";
import FineTuneStep from "./FineTuneStep";
import { twMerge } from "tailwind-merge";
import getComponentCode from "./getComponentCode";
import Toggle from "../../../../components/Toggle";
import copyToClipboard from "../../../../utils/copyToClipboard";
import ErrorBoundary from "../../../../components/ErrorBoundary";
import actorPreset from "../../generators/presets/actorPreset";
import catPreset from "../../generators/presets/catPreset";
import dogPreset from "../../generators/presets/dogPreset";
import assetPreset from "../../generators/presets/assetPreset";

export type StepGeneratorProps = {
    localStorageKey?: string;
    presets?: PresetType<any>[];
    className?: string;
    contextPrompt?: string;
    elementPrompt?: string;
};

export type StepGeneratorStoreType = {};

const defaultPresets = [actorPreset, assetPreset, catPreset, dogPreset];

const defaultContextPrompt =
    "I am writing a western slavic medieval fantasy RPG adventure Throne of Hawthorn. Language is English, but names should be of western slavic origin including proper accents.";
const defaultElementPrompt = "A poor bandit armed with a sword and a dagger.";

export default function StepGenerator({
    className,
    presets = defaultPresets,
    contextPrompt = defaultContextPrompt,
    elementPrompt = defaultElementPrompt,
}: StepGeneratorProps) {
    const { state, dispatch } = useStepGenerator();

    useEffect(() => {
        dispatch({ type: StepGeneratorActionTypeEnum.Update, updater: (state) => ({ ...state, contextPrompt }) });
    }, [contextPrompt]);

    useEffect(() => {
        dispatch({ type: StepGeneratorActionTypeEnum.Update, updater: (state) => ({ ...state, elementPrompt }) });
    }, [elementPrompt]);

    useEffect(() => {
        dispatch({ type: StepGeneratorActionTypeEnum.SetPresets, presets });
    }, [presets]);

    const preset = state.presets.find((preset) => preset.name === state.presetName);
    const PreviewComponent = preset?.Component;
    const defaultProps = preset?.defaultProps;
    const previewCode =
        preset?.componentName && state.presetProps
            ? getComponentCode(preset.componentName, state.presetProps)
            : undefined;

    return (
        <div className={twMerge("flex flex-col items-stretch gap-4", className)}>
            <div className="flex flex-row gap-4">
                {steps.map((step) => (
                    <Button
                        key={step}
                        onClick={() => dispatch({ type: StepGeneratorActionTypeEnum.SetStep, step })}
                        color={state.step === step ? "primary" : "info"}
                    >
                        {step}
                    </Button>
                ))}
            </div>
            <div className="flex flex-row gap-8">
                <div className="flex flex-1 flex-col gap-2">
                    {state.step === StepEnum.Preset && <PresetStep />}
                    {state.step === StepEnum.Generation && <GenerationStep />}
                    {state.step === StepEnum.FineTune && <FineTuneStep />}
                    <ToggleData
                        data={{ ...state, presets: undefined }}
                        initialCollapsed
                        buttonContent="State without presets"
                    />
                    <ToggleData data={{ presets: state.presets }} initialCollapsed buttonContent="Presets" />
                </div>
                <div className="flex flex-col gap-2">
                    <ErrorBoundary className="text-kac-steel">
                        {PreviewComponent && <PreviewComponent {...defaultProps} {...state.presetProps} />}
                        <Button
                            color="success"
                            disabled={!previewCode}
                            onClick={() => previewCode && copyToClipboard(previewCode)}
                        >
                            Copy code
                        </Button>
                        {preset?.componentName && state.presetProps && (
                            <Toggle
                                className="w-auto"
                                buttonContent="Code Block"
                                buttonProps={{ className: "shrink-0 h-auto btn-sm" }}
                                initialCollapsed
                            >
                                <pre className="rounded-md border-2 border-slate-500 bg-slate-100 p-2 whitespace-pre-wrap">
                                    {previewCode}
                                </pre>
                            </Toggle>
                        )}
                    </ErrorBoundary>
                </div>
            </div>
        </div>
    );
    /*
    return (
        <div className="flex flex-col gap-5">
            <div className={clsx("mt-5 print:hidden flex flex-row gap-5 flex-wrap", className)}>
                <Toggle buttonProps={{ color: "secondary", shape: "circle", className: "z-10" }} buttonContent="+">
                    <ComponentList className="p-2 -mt-12 -ml-2 pt-14 z-0 border-2 border-kac-monster border-t-0 rounded-b-md">
                        {presets.map((preset, presetIndex) => (
                            <Button
                                key={preset.label + "-" + presetIndex}
                                onClick={() => setSelectedPreset(preset)}
                                color="primary"
                                className="h-auto text-left normal-case font-normal"
                            >
                                {<preset.Component {...preset.defaultProps} />}
                            </Button>
                        ))}
                    </ComponentList>
                </Toggle>
            </div>
            <h2 className="text-3l font-bold">
                Result{" "}
                <Button
                    onClick={() => setCounter((c) => c + 1)}
                    color="info"
                    className="h-auto text-left normal-case font-normal"
                >
                    Re-roll
                </Button>
            </h2>
            <div>
                {result && PreviewComponent ? (
                    <PreviewComponent
                        key={selectedPreset.label + "-" + counter}
                        {...selectedPreset.defaultProps}
                        {...result}
                        {...selectedPreset.additionalProps}
                    />
                ) : (
                    "select a preset"
                )}
            </div>
            <div>
                <VisualizeRandom random={selectedPreset?.scheme} />
            </div>
        </div>
    );*/
}
