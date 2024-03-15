import Page from "../components/Page/Page";

import ToggleData from "../components/DataToggle";
import Input from "../prototypes/kick-ass-cards/components/content/Input";
import { useCallback, useState } from "react";
import Button from "../prototypes/kick-ass-cards/components/content/Button";
import Pending from "../components/form/Pending";
import { SDOptionsType, useSD } from "../hooks/useSD";

const base64ToUrl = (base64: string) => {
    return `data:image/png;base64,${base64}`;
};

export default function SDRoute() {
    const [sdOptions, setSdOptions] = useState<SDOptionsType>({});
    const { txt2Image, ...status } = useSD(sdOptions);
    const { isPending, error, value } = status;
    const [prompt, setPrompt] = useState("");

    const setSdOptionProperty = useCallback((property: string, value: any) => {
        setSdOptions((sdOptions) => ({ ...sdOptions, [property]: value }));
    }, []);

    const txt2ImageCallback = useCallback(
        (prompt: string) => {
            txt2Image(prompt);
            setPrompt("");
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
                                        </div>
                                    )}
                                    <ToggleData data={value} className="max-w-full" previewClassName="max-h-[20vh]" />
                                </div>
                            </div>
                        </div>
                        <Input
                            type="textarea"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            textareaProps={{
                                onKeyDown: (e) => {
                                    if (e.ctrlKey && e.key === "Enter") {
                                        e.preventDefault();
                                        txt2ImageCallback(prompt);
                                    }
                                },
                            }}
                            className="w-full max-w-none px-4 py-2 bg-kac-steel-light rounded-md shadow-inner"
                            labelClassName="w-full max-w-none"
                            label="Prompt"
                        />
                        <Button
                            disabled={!prompt || isPending}
                            className="w-full leading-none min-h-14"
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
                                    <span className="opacity-50 text-xs"> CTRL + ENTER</span>
                                </>
                            )}
                        </Button>
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
                <div className="sm:w-[25vw] md:w-[400px] overflow-auto flex flex-col relative">
                    <ToggleData
                        data={{ status }}
                        previewClassName="flex-1 shrink"
                        className="absolute left-0 top-0 bottom-0 right-0"
                    />
                </div>
            </div>
        </Page>
    );
}
