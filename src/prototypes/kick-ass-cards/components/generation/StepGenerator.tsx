import { useEffect, useState } from "react";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
import clsx from "clsx";
import { Button } from "react-daisyui";
import Toggle from "../../../../components/Toggle";
import ActorCard, { ActorCardProps } from "../gameComponents/ActorCard";
import ComponentList from "../ComponentList";
import resolveRandom, { DeepRandomType } from "../../generators/resolveRandom";
import {
    GenderEnum,
    ageOptions,
    firstNameOptions,
    genderOptions,
    lastNameOptions,
    occupationOptions,
} from "../../generators/schemes/personScheme";

export type StepGeneratorProps = {
    localStorageKey?: string;
    initialPresets?: PresetType<any>[];
    className?: string;
};

export type StepGeneratorStoreType = {};

const initialStore = {};

export type PresetType<T> = {
    label: string;
    scheme: DeepRandomType<T>;
    Component: React.ComponentType<T>;
    defaultProps: Partial<T>;
    additionalProps: Partial<T>;
};

const createPreset = <T extends any>(
    label: string,
    scheme: DeepRandomType<Partial<T>>,
    Component: React.ComponentType<T>,
    defaultProps: Partial<T>,
    additionalProps: Partial<T> = {}
) => ({
    label,
    scheme,
    Component,
    defaultProps,
    additionalProps,
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
    createPreset<ActorCardProps & { gender: GenderEnum }>(
        "Actor",
        actorOptions,
        ActorCard,
        {
            name: "name",
            notes: "notes",
            occupation: "occupation",
            size: "US game",
            reward: "reward",
            threat: "threat",
            toughness: 0,
            currentToughness: 0,
            imagePosition: "top",
            className: "drop-shadow",
            imageUri: "/ISV/minis/vampire4.jpg",
        },
        {}
    ),
];

export default function StepGenerator({
    className,
    initialPresets = defaultPresets,
    localStorageKey = "step_generator",
}: StepGeneratorProps) {
    const presets = initialPresets;
    const [selectedPreset, setSelectedPreset] = useState<PresetType<any> | null>(presets[0]);
    const [counter, setCounter] = useState(0);
    const [result, setResult] = useState<any | null>(null);

    useEffect(() => {
        if (selectedPreset) {
            setResult(resolveRandom(selectedPreset.scheme));
        }
    }, [selectedPreset, counter]);
    //const store = useLocalStorage<>(localStorageKey);

    /*const families = Array(10)
        .fill(0)
        .map(() => generateFamily());*/

    const PreviewComponent = selectedPreset?.Component;

    return (
        <div className="flex flex-col gap-5">
            <div className={clsx("mt-5 print:hidden flex flex-row gap-5 flex-wrap", className)}>
                <Toggle buttonProps={{ color: "secondary", shape: "circle", className: "z-10" }} buttonContent="+">
                    <ComponentList className="p-2 -mt-12 -ml-2 pt-14 z-0 border-2 border-kac-monster border-t-0 rounded-b-md">
                        {presets.map((preset, presetIndex) => (
                            <Button
                                key={preset.label + "-" + presetIndex}
                                onClick={() => setSelectedPreset(preset)}
                                color="secondary"
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
                    color="secondary"
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
        </div>
    );
}
