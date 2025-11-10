import Page from "../components/Page/Page";

import ToggleData from "../components/DataToggle";
import { SyntheticEvent, useCallback, useState } from "react";
import Button from "../prototypes/kick-ass-cards/components/controls/Button";
import Pending from "../components/form/Pending";
import { useSD } from "../hooks/useSD";
import SmartInput from "../prototypes/kick-ass-cards/components/controls/SmartInput";
import { InputProps } from "../prototypes/kick-ass-cards/components/controls/Input";
import Text from "../prototypes/kick-ass-cards/components/content/Text";
import Select from "../prototypes/kick-ass-cards/components/controls/Select";
import sdApiSchema from "../schemas/sdApiSchema";
import Form from "../prototypes/kick-ass-cards/components/controls/Form";
import ButtonWithConfirmation from "../prototypes/kick-ass-cards/components/controls/ButtonWithConfirmation";
import copyToClipboard from "../utils/copyToClipboard";
import { stringToFileName } from "../utils/stringToFilename";
import openImageInNewTab from "../utils/openImageInNewTab";

const smallButtonClassName = "px-2 py-1 rounded-md text-xs";

const ignoredDefaultTypes = ["object", "array"];

const optionsSchema = Object.fromEntries(
    Object.entries(sdApiSchema.components.schemas.StableDiffusionProcessingImg2Img.properties)
        .filter(([key]) => key !== "prompt" && key !== "negative_prompt")
        .map(([prop, value]) => {
            const newValue: InputProps = { type: "text" };
            if (value.type === "integer") {
                newValue.type = "number";
                newValue.step = 1;
            } else if (value.type === "boolean") {
                newValue.type = "checkbox";
            } else if (value.type === "array") {
                newValue.type = "text";
                // TODO: handle Arrays
            } else if (value.type === "object") {
                newValue.type = "text";
                // TODO: handle Objects
            }
            if ((value as any).default && !ignoredDefaultTypes.includes(value.type)) {
                newValue.value = (value as any).default;
            }
            newValue.label = value.title;
            if ((value as any).description) {
                newValue.description = (value as any).description;
            }
            return [prop, { ...newValue } as InputProps];
        })
);

const defaultInputProps: Partial<InputProps> = {
    labelClassName: "font-kacHeading text-xs text-kac-steel-dark text-opacity-75",
    className: "font-kacBody",
};

export default function SDRoute() {
    const {
        txt2Image,
        presetOptions,
        selectedPresetOption,
        setSelectedPresetOption,
        clearHistory,
        modelsConfig,
        getModelsInfo,
        setSelectedModel,
        options,
        setOptions,
        setOptionProperty,
        isPending,
        error,
        history,
    } = useSD({
        historyKeyPostfix: "COMMON",
    });
    const [prompt, setPrompt] = useState("");
    const [isDetailedOptionsDisplayed, setIsDetailedOptionsDisplayed] = useState(false);

    const txt2ImageCallback = useCallback(
        (prompt: string) => {
            txt2Image(prompt);
        },
        [txt2Image]
    );

    return (
        <Page className="SDRoute flex-1 h-svh flex flex-col box-border">
            <Text variant={"h1"} className="mb-8">
                Stable Diffusion Prototype
            </Text>
            <div className="relative flex-1 flex flex-col items-center">
                <div className="flex-1 flex flex-col gap-4 w-full pb-2">
                    <div className="relative flex-1 w-full flex flex-col gap-4 overflow-auto min-h-[400px]">
                        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col-reverse gap-4 items-center overflow-auto">
                            <div className="flex-1 pr-4 flex flex-col w-full max-w-full gap-4">
                                {error && <div className="text-red-500">Error: {error.message}</div>}
                                {history?.map((historyItem) => {
                                    if (historyItem.type === "response") {
                                        const images = historyItem.response?.images || [];
                                        const imageCount = images.length;
                                        return (
                                            <div
                                                key={historyItem.id}
                                                className="flex flex-row gap-2 flex-wrap self-start max-w-full"
                                            >
                                                {historyItem?.response?.images?.map(
                                                    (imageData: string, index: number) => {
                                                        // const imageUri = base64ToUrl(imageData);
                                                        const imageUri = imageData;
                                                        return (
                                                            <Button
                                                                key={index}
                                                                color="info"
                                                                variant="text"
                                                                className="p-1 relative block border-2"
                                                                onClick={() => {
                                                                    openImageInNewTab(imageUri);
                                                                }}
                                                            >
                                                                <img
                                                                    key={index}
                                                                    src={imageUri}
                                                                    className="w-64 h-64  rounded-md"
                                                                />
                                                                <Button
                                                                    href={imageUri}
                                                                    download={`image-${stringToFileName(
                                                                        historyItem?.response?.parameters?.prompt +
                                                                            "-" +
                                                                            historyItem?.requestId +
                                                                            "-" +
                                                                            index || String(Date.now())
                                                                    )}.png`}
                                                                    onClick={(e: SyntheticEvent) => {
                                                                        e.stopPropagation();
                                                                    }}
                                                                    className="absolute top-0 right-0 px-2 py-2 text-xs"
                                                                    variant="text"
                                                                    color="success"
                                                                >
                                                                    💾
                                                                </Button>
                                                            </Button>
                                                        );
                                                    }
                                                )}
                                                <div className="flex flex-col">
                                                    <Text variant="h4" color="heading" className="text-sm">
                                                        Generated {imageCount || 0}
                                                        {(imageCount || 0) > 1 ? " images" : " image"}
                                                    </Text>
                                                    {historyItem?.response?.parameters?.prompt && (
                                                        <Text
                                                            variant="body"
                                                            className="text-sm font-kacBody text-kac-steel-dark"
                                                        >
                                                            {historyItem?.response?.parameters?.prompt}&emsp;
                                                            <Button
                                                                color="success"
                                                                variant="text"
                                                                className={smallButtonClassName}
                                                                tabIndex={-1}
                                                                onClick={() => {
                                                                    if (historyItem?.response?.parameters?.prompt) {
                                                                        copyToClipboard(
                                                                            historyItem?.response?.parameters?.prompt
                                                                        );
                                                                    }
                                                                }}
                                                            >
                                                                Copy
                                                            </Button>
                                                        </Text>
                                                    )}
                                                    <ToggleData
                                                        data={historyItem}
                                                        initialCollapsed
                                                        className="max-w-full text-xs font-kacHeading"
                                                        buttonProps={{ size: "xs" }}
                                                        previewClassName="max-h-[20vh] max-w-full"
                                                    />
                                                </div>
                                            </div>
                                        );
                                    }
                                    if (historyItem.type === "request") {
                                        const imageCount = historyItem.options.n_iter || 1;
                                        return (
                                            <div key={historyItem.id} className="flex flex-col self-end max-w-full">
                                                <Text
                                                    variant="body"
                                                    className="text-sm text-kac-steel-dark font-kacBody text-right"
                                                >
                                                    Requested {imageCount}
                                                    {imageCount > 1 ? " images" : " image"}
                                                </Text>
                                                {historyItem.options?.prompt && (
                                                    <Text variant="h4" color="heading" className="mb-2">
                                                        {historyItem.options?.prompt}&emsp;
                                                        <Button
                                                            color="success"
                                                            variant="text"
                                                            className={smallButtonClassName}
                                                            tabIndex={-1}
                                                            onClick={() => {
                                                                if (historyItem.options?.prompt) {
                                                                    copyToClipboard(historyItem.options?.prompt);
                                                                }
                                                            }}
                                                        >
                                                            Copy
                                                        </Button>
                                                    </Text>
                                                )}
                                                <ToggleData
                                                    data={historyItem.options}
                                                    initialCollapsed
                                                    className="max-w-full text-xs font-kacHeading self-end"
                                                    buttonProps={{ size: "xs" }}
                                                    previewClassName="max-h-[20vh] max-w-full"
                                                />
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                                <ToggleData
                                    data={history}
                                    initialCollapsed
                                    buttonContent="Show All History Data"
                                    className="max-w-full text-xs font-kacHeading mt-4"
                                    buttonProps={{ size: "xs" }}
                                    previewClassName="max-h-[20vh] max-w-full"
                                />
                                {(!history || history.length === 0) && (
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
                            className: "placeholder:font-kacBody placeholder:text-2xl",
                            placeholder: "Start by entering a prompt...",
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
                        value={options.negative_prompt}
                        isCopyable
                        onNewPreset={(value) => {
                            console.log("onNewPreset", value);
                        }}
                        onRemovePreset={(value) => {
                            console.log("onRemovePreset", value);
                        }}
                        onChange={(e) => setOptionProperty("negative_prompt", e.target.value)}
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
                    <label className="flex flex-row gap-2">
                        <span className="font-kacHeading text-sm text-kac-steel-dark text-opacity-75">
                            Nr of Images: {options.n_iter ?? 1}
                        </span>
                        <input
                            className="flex-1"
                            type="range"
                            value={options.n_iter ?? 1}
                            min={1}
                            max={16}
                            onChange={(e) => setOptionProperty("n_iter", Number(e.target.value))}
                        />
                    </label>
                    <div className="flex flex-row flex-wrap gap-4 items-end">
                        <ButtonWithConfirmation color="danger" className="flex-1 text-sm" onClick={clearHistory}>
                            Clear History
                        </ButtonWithConfirmation>
                        <div className="flex flex-row flex-wrap gap-2 items-end">
                            <Select
                                label="Checkpoint Model"
                                labelClassName="font-kacHeading text-xs text-kac-steel-dark text-opacity-75"
                                className="max-w-64 font-kacBody"
                                selectClassName="px-2 py-1 rounded-md"
                                value={modelsConfig.selectedModel || undefined}
                                options={modelsConfig.models || []}
                                disabled={modelsConfig.isPending}
                                onChange={(e) => {
                                    const selectedModel = e.target.value;
                                    if (selectedModel) {
                                        setSelectedModel(selectedModel);
                                    }
                                }}
                            />
                            <Button
                                disabled={modelsConfig.isPending}
                                color="info"
                                className="flex-1 leading-none min-h-14 font-kacHeading text-sm"
                                onClick={() => {
                                    getModelsInfo();
                                }}
                            >
                                {isPending ? <Pending /> : "Load Model Info"}
                            </Button>
                            {modelsConfig.error && (
                                <Text color="danger" className="text-xs font-kacBody">
                                    {modelsConfig.error}
                                </Text>
                            )}
                        </div>

                        <Select
                            label="Preset"
                            labelClassName="font-kacHeading text-xs text-kac-steel-dark text-opacity-75"
                            className="max-w-64 font-kacBody"
                            selectClassName="px-2 py-1 rounded-md"
                            value={selectedPresetOption?.value}
                            options={presetOptions || []}
                            onChange={(e) =>
                                setSelectedPresetOption(
                                    presetOptions.find((option) => option.value === e.target.value) ||
                                        selectedPresetOption
                                )
                            }
                        />
                        <Button
                            disabled={modelsConfig.isPending}
                            color="info"
                            className="flex-1 leading-none min-h-14 font-kacHeading text-sm"
                            onClick={() => {
                                setIsDetailedOptionsDisplayed(
                                    (isDetailedOptionsDisplayed) => !isDetailedOptionsDisplayed
                                );
                            }}
                        >
                            {isDetailedOptionsDisplayed ? "Hide" : "Show"} Detailed Options
                        </Button>
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
                                    Generate {options.n_iter ?? 1}
                                    <br />
                                    <span className="opacity-75 text-xs"> CTRL + ENTER</span>
                                </>
                            )}
                        </Button>
                    </div>
                    {isDetailedOptionsDisplayed && (
                        <div className="flex flex-row flex-wrap gap-2 pb-8">
                            <Form
                                className="flex-1"
                                propertiesClassName="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4"
                                value={options}
                                schema={optionsSchema}
                                // errorMap={errorMap}
                                onChange={(value) => {
                                    console.log("Form onChange", value);
                                    setOptions(value);
                                }}
                                defaultInputProps={defaultInputProps}
                            />
                        </div>
                    )}
                    {error && <p className="text-red-500 mt-2">{error.message}</p>}
                </div>
            </div>
        </Page>
    );
}
