import { useEffect, useState } from "react";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
import clsx from "clsx";
import { Button } from "react-daisyui";
import cultureScheme, { Culture } from "../../generators/schemes/cultureScheme";
import resolveRandom, { DeepRandomType } from "../../generators/resolveRandom";
import DataPreview from "../../../../components/DataPreview";
import personScheme from "../../generators/schemes/personScheme";

export type GeneratorProps = {
    localStorageKey?: string;
    initialPresets?: PresetType<any>[];
    className?: string;
};

export type GeneratorStoreType = {};

const initialStore = {};

export type PresetType<T> = {
    label: string;
    scheme: DeepRandomType<T>;
    Component: React.ComponentType<T>;
    additionalProps: Partial<T>;
};

const createPreset = <T extends any>(
    label: string,
    scheme: DeepRandomType<T>,
    Component: React.ComponentType<T>,
    additionalProps: Partial<T> = {}
) => ({
    label,
    scheme,
    Component,
    additionalProps,
});

const defaultPresets = [
    createPreset("Kultura", { _rObject: { data: cultureScheme } }, DataPreview, {}),
    createPreset("Person", { _rObject: { data: personScheme } }, DataPreview, {}),
];

export default function Generator({
    className,
    initialPresets = defaultPresets,
    localStorageKey = "generator",
}: GeneratorProps) {
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
        <div className={clsx("mt-5 print:hidden flex flex-row gap-5 flex-wrap", className)}>
            <div className="flex flex-row gap-5">
                {presets.map((preset, presetIndex) => (
                    <Button key={preset.label + "-" + presetIndex} onClick={() => setSelectedPreset(preset)}>
                        {preset.label}
                    </Button>
                ))}
            </div>
            <Button onClick={() => setCounter((c) => c + 1)} size="xs" color="secondary">
                Reroll ({counter})
            </Button>
            <div>
                {result && PreviewComponent && <PreviewComponent {...result} {...selectedPreset.additionalProps} />}
            </div>
        </div>
    );
}
