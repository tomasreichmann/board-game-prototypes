import Page from "../components/Page/Page";

import ToggleData from "../components/DataToggle";
import { useCallback, useState } from "react";
import Button from "../prototypes/kick-ass-cards/components/content/Button";
import Pending from "../components/form/Pending";
import { SDOptionsType, useSD } from "../hooks/useSD";
import SmartInput from "../prototypes/kick-ass-cards/components/content/SmartInput";
import { InputProps } from "../prototypes/kick-ass-cards/components/content/Input";
import Text from "../prototypes/kick-ass-cards/components/content/Text";
import Select from "../prototypes/kick-ass-cards/components/content/Select";
import { useLocalStorage } from "../hooks/useLocalStorage";

const base64ToUrl = (base64: string) => {
    return `data:image/png;base64,${base64}`;
};

/* const lightningJuggernautPreset: {
    label: string;
    value: Partial<SDOptionsType>;
} = {
    label: "Lightning RealVis",
    value: {
        steps: 4,
        sampler_name: "DPM++ SDE Karras",
        cfg_scale: 2,
        width: 1024,
        height: 1024,
    },
}; */

export default function SDRoute() {
    const [sdOptions, setSdOptions] = useState<SDOptionsType>({});
    const { txt2Image, presetOptions, selectedPresetOption, setSelectedPresetOption, ...status } = useSD(sdOptions);
    const { isPending, error, value } = status;
    const [prompt, setPrompt] = useState("");

    const setSdOptionProperty = useCallback((property: string, value: any) => {
        setSdOptions((sdOptions) => ({ ...sdOptions, [property]: value }));
    }, []);

    const txt2ImageCallback = useCallback(
        (prompt: string) => {
            txt2Image(prompt);
        },
        [txt2Image]
    );

    return (
        <Page className="SDRoute flex-1 h-svh flex flex-col box-border">
            <h1 className="text-3l font-bold mb-10">Stable Diffusion Prototype</h1>
            <div className="flex-1 flex flex-col sm:flex-row gap-8">
                <div className="relative flex-1 flex flex-col items-center">
                    <div className="flex-1 flex flex-col gap-4 w-full max-w-xl pb-2">
                        <div className="relative flex-1 w-full flex flex-col gap-4 overflow-auto min-h-[400px]">
                            <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col-reverse gap-4 items-center overflow-auto">
                                <div className="flex-1 pr-4 flex flex-col max-w-full">
                                    {error && <div className="text-red-500">Error: {error.message}</div>}
                                    {value && (
                                        <div className="flex flex-row flex-wrap">
                                            {value?.images?.map((imageData: string, index: number) => (
                                                <img key={index} src={base64ToUrl(imageData)} className="w-64 h-64" />
                                            ))}
                                            <ToggleData
                                                data={value}
                                                initialCollapsed
                                                className="max-w-full"
                                                previewClassName="max-h-[20vh]"
                                            />
                                        </div>
                                    )}
                                    {!value && (
                                        <Text variant="h4" color="heading" className="text-center">
                                            Enter a prompt to generate an image
                                        </Text>
                                    )}
                                </div>
                            </div>
                        </div>
                        <SmartInput
                            type="textarea"
                            value={prompt}
                            isCopyable
                            onNewPreset={(value) => {
                                console.log("onNewPreset", value);
                            }}
                            onRemovePreset={(value) => {
                                console.log("onRemovePreset", value);
                            }}
                            onChange={(e) => setPrompt(e.target.value)}
                            textareaProps={{
                                onKeyDown: (e) => {
                                    if (e.ctrlKey && e.key === "Enter") {
                                        e.preventDefault();
                                        txt2ImageCallback(prompt);
                                    }
                                },
                            }}
                            className="w-full bg-kac-gold-light text-kac-iron-light bg-opacity-25 rounded-md shadow-inner"
                            labelClassName="w-full px-4 pt-2 text-sm text-kac-steel-dark text-opacity-75 font-kacHeading"
                            inputClassName="w-full px-4 pb-2 rounded-md"
                            label="Prompt"
                        />
                        <SmartInput
                            type="textarea"
                            value={sdOptions.negative_prompt}
                            isCopyable
                            onNewPreset={(value) => {
                                console.log("onNewPreset", value);
                            }}
                            onRemovePreset={(value) => {
                                console.log("onRemovePreset", value);
                            }}
                            onChange={(e) => setSdOptionProperty("negative_prompt", e.target.value)}
                            textareaProps={{
                                onKeyDown: (e) => {
                                    if (e.ctrlKey && e.key === "Enter") {
                                        e.preventDefault();
                                        txt2ImageCallback(prompt);
                                    }
                                },
                                rows: 1,
                            }}
                            className="w-full bg-kac-curse-light bg-opacity-25 rounded-md shadow-inner text-sm"
                            labelClassName="w-full px-4 pt-2 text-xs text-kac-steel-dark text-opacity-75 font-kacHeading"
                            inputClassName="w-full px-4 pb-2 rounded-md"
                            label="Negative Prompt"
                        />
                        <div className="flex flex-row flex-wrap gap-2 items-end">
                            <Select
                                label="Preset"
                                labelClassName="font-kacHeading text-xs text-kac-steel-dark text-opacity-75"
                                selectClassName="px-2 py-1 rounded-md"
                                className="max-w-64 font-kacBody"
                                value={selectedPresetOption?.value}
                                options={presetOptions || []}
                                onChange={(e) => setSdOptionProperty("mistralModel", e.target.value)}
                            />
                            <Button
                                disabled={!prompt || isPending}
                                className="flex-1 leading-none min-h-14 font-kacHeading"
                                onClick={() => {
                                    txt2ImageCallback(prompt);
                                }}
                            >
                                {isPending ? (
                                    <Pending />
                                ) : (
                                    <>
                                        Send
                                        <br />
                                        <span className="opacity-75 text-xs"> CTRL + ENTER</span>
                                    </>
                                )}
                            </Button>
                        </div>
                        <div className="flex flex-row flex-wrap gap-2 pb-8">
                            {/* <ButtonWithConfirmation color="danger" className="flex-1 text-sm" onClick={clearHistory}>
                                Clear History
                            </ButtonWithConfirmation>
                            <Input
                                className="max-w-32 text-kac-steel-dark"
                                type="number"
                                value={sdOptions.includeHistoryLength}
                                label="Include History"
                                labelClassName="text-sm max-w-24"
                                onChange={(e) => {
                                    setSdOptions((options) => ({
                                        ...options,
                                        includeHistoryLength: parseInt(e.target.value),
                                    }));
                                }}
                            />
                            <Input
                                className="max-w-20"
                                type="number"
                                value={sdOptions.maxTokens}
                                min={10}
                                step={10}
                                max={1000}
                                label="Max Tokens"
                                labelClassName="text-sm max-w-20"
                                onChange={(e) => {
                                    setSdOptions((options) => ({
                                        ...options,
                                        maxTokens: parseInt(e.target.value),
                                    }));
                                }}
                            />
                            <Input
                                className="max-w-20"
                                type="number"
                                value={sdOptions.temperature}
                                min={0}
                                step={0.1}
                                max={1}
                                label="Temperature"
                                labelClassName="text-sm max-w-20"
                                onChange={(e) => {
                                    setSdOptions((options) => ({
                                        ...options,
                                        temperature: parseInt(e.target.value),
                                    }));
                                }}
                            />
                            <Select
                                className="max-w-40"
                                label="Model"
                                labelClassName="text-sm"
                                options={Object.entries(MistralModelEnum).map(([_, value]) => ({
                                    label: value,
                                    value,
                                }))}
                                onChange={(event) => {
                                    setSdOptions((options) => ({
                                        ...options,
                                        model: event.target.value as MistralModelEnum,
                                    }));
                                }}
                            /> */}
                        </div>
                        {error && <p className="text-red-500 mt-2">{error.message}</p>}
                    </div>
                </div>
                <div className="sm:w-[25vw] md:w-[400px] overflow-auto flex flex-col relative"></div>
            </div>
        </Page>
    );
}
