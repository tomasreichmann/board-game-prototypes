import { useEffect } from "react";
import ActorCard, { ActorCardProps } from "../gameComponents/ActorCard";
import { DeepRandomType } from "../../generators/resolveRandom";
import personScheme, {
    GenderEnum,
    ageOptions,
    firstNameOptions,
    genderOptions,
    lastNameOptions,
    occupationOptions,
} from "../../generators/schemes/personScheme";
import VisualizeRandom from "./VisualizeRandom";
import catScheme from "../../generators/schemes/catScheme";
import dogScheme from "../../generators/schemes/dogScheme";
import DataPreview from "../../../../components/DataPreview";
import { StepGeneratorActionTypeEnum, useStepGenerator } from "./useStepGenerator";
import { PresetType, StepEnum, steps } from "./stepGeneratorTypes";
import PresetStep from "./PresetStep";
import GenerationStep from "./GenerationStep";
import ToggleData from "../../../../components/DataToggle";
import Button from "../content/Button";
import FineTuneStep from "./FineTuneStep";
import { twMerge } from "tailwind-merge";
import getComponentCode from "./getComponentCode";
import Toggle from "../../../../components/Toggle";
import copyToClipboard from "../../../../utils/copyToClipboard";
import ErrorBoundary from "../../../../components/ErrorBoundary";

export type StepGeneratorProps = {
    localStorageKey?: string;
    presets?: PresetType<any>[];
    className?: string;
    contextPrompt?: string;
    elementPrompt?: string;
};

export type StepGeneratorStoreType = {};

const createPreset = <T extends any>(
    name: PresetType<T>["name"],
    scheme: PresetType<T>["scheme"],
    Component: PresetType<T>["Component"],
    componentName: PresetType<T>["componentName"],
    defaultProps: PresetType<T>["defaultProps"] = {},
    additionalProps: PresetType<T>["additionalProps"] = {},
    sampleProps: PresetType<T>["sampleProps"] = {},
    propPrompts: PresetType<T>["propPrompts"] = {}
): PresetType<any> => ({
    name,
    scheme,
    Component,
    componentName,
    defaultProps,
    additionalProps,
    sampleProps,
    propPrompts,
});

const nameOptions: DeepRandomType<string> = {
    _rTemplate: "${firstName} ${lastName}",
    _variables: { firstName: firstNameOptions, lastName: lastNameOptions },
};

const imageUriOptions: DeepRandomType<string> = {
    _rArray: [
        { _rValue: "/ISV/minis/vampire1.jpg", _prop: "gender", _equals: "male" },
        { _rValue: "/ISV/minis/vampire4.jpg", _prop: "gender", _equals: "female" },
    ],
};

const actorOptions: DeepRandomType<Partial<ActorCardProps & { gender: GenderEnum }>> = {
    _rObject: {
        gender: genderOptions,
        name: nameOptions,
        age: ageOptions,
        occupation: occupationOptions,
        imageUri: imageUriOptions,
        threat: undefined,
        reward: undefined,
        notes: undefined,
    },
};

const defaultPresets = [
    createPreset<ActorCardProps>(
        "Actor",
        actorOptions,
        ActorCard,
        "Actor",
        {
            name: "name",
            notes: "notes",
            occupation: "occupation",
            size: "Bridge",
            reward: "reward",
            threat: "threat",
            toughness: 1,
            currentToughness: 1,
            imagePosition: "top",
            className: "drop-shadow",
            imageUri: "/ISV/minis/vampire4.jpg",
        },
        {},
        {
            name: "Marek z Dusiny",
            occupation: "Forest Bandit",
            threat: "Attacks with a dagger for 1 Effect, +1 Effect if attacking from an ambush",
            notes: "Retreats and hides in the bushes if hurt",
            reward: "Forest camouflage",
            imageUri:
                "ethereal fantasy concept art of a bandit wearing a camouflage of forest branches holding a dagger on solid white background, (strong white vignette:0.7), center composition, SK_Fantasy painterly, fantasy art, dreamy",
        },
        {
            imageUri: `use a stable diffusion prompt instead of an URI and make sure to include "ethereal full body fantasy concept art" and "on solid white background, <lora:white_1_0:1>, center composition, SK_Fantasy painterly, fantasy art, dreamy". Always omit background description`,
            size: `do not change. Use: "Bridge"`,
            toughness: `Use whole numbers between 1 and 4`,
            currentToughness: `Use same value as toughness unless it makes sense the character is wounded`,
            threat: `Describes attacks or other ways how the character can threaten others`,
            className: `Do not change, Use: "drop-shadow"`,
            imagePosition: `Do not change. Use: "top"`,
        }
    ),
    createPreset("Cat", catScheme, ActorCard, "Actor", {
        name: "cat",
        size: "Mini US game",
        className: "drop-shadow",
        imageUri: "/ISV/minis/animals/cat1.jpg",
    }),
    createPreset("Dog", dogScheme, ActorCard, "Actor", {
        name: "dog",
        size: "Mini US game",
        className: "drop-shadow",
        imageUri: "/ISV/minis/animals/dog1.jpg",
    }),
    createPreset("PersonAppeared", { _rObject: { data: personScheme } }, DataPreview, "DataPreview", {
        data: "personAppeared",
    }),
];

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
                        <Button disabled={!previewCode} onClick={() => previewCode && copyToClipboard(previewCode)}>
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
