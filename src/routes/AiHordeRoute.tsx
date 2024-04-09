import Page from "../components/Page/Page";

import ToggleData from "../components/DataToggle";
import { useCallback } from "react";
import Button from "../prototypes/kick-ass-cards/components/content/Button";
import Pending from "../components/form/Pending";
import SmartInput from "../prototypes/kick-ass-cards/components/content/SmartInput";
import Text from "../prototypes/kick-ass-cards/components/content/Text";
import { useAiHorde } from "../hooks/useAiHorde";
import { HistoryItemType } from "../services/AiHorde/aiHordeTypes";
import GeneratedImage from "../components/form/GeneratedImage";
import { range } from "lodash";
import openImageInNewTab from "../utils/openImageInNewTab";
import { useLocalStorage } from "../hooks/useLocalStorage";
import TextPreview from "../components/content/TextPreview";
import { generationOptionsDefaults } from "../services/AiHorde/AiHorde";
import Select from "../prototypes/kick-ass-cards/components/content/Select";
import Input from "../prototypes/kick-ass-cards/components/content/Input";
import ButtonWithConfirmation from "../prototypes/kick-ass-cards/components/content/ButtonWithConfirmation";

export const AiHordeHistoryStorageKey = "ai-horde-history";
export const AiHordeOptionsStorageKey = "ai-horde-options";
const negativePromptDelimiter = " ### ";

export default function AiHordeRoute() {
    const { generateImage, getPendingPropsFromCheck } = useAiHorde();
    const [historyOrNull, setHistory] = useLocalStorage(AiHordeHistoryStorageKey, [] as HistoryItemType[]);
    const history = historyOrNull || [];
    const [optionsOrNull, setOptions] = useLocalStorage(AiHordeOptionsStorageKey, generationOptionsDefaults);
    const options = optionsOrNull || generationOptionsDefaults;
    const [prompt = "", negativePrompt = ""] = (options.prompt || "").split(negativePromptDelimiter);

    const setOptionProperty = useCallback(
        (property: keyof typeof generationOptionsDefaults, value: any) => {
            setOptions((sdOptions) => ({ ...sdOptions, [property]: value } as any));
        },
        [setOptions]
    );
    const setPrompt = useCallback(
        (newPrompt: string) => {
            setOptions((optionsOrNull) => {
                const options = optionsOrNull || generationOptionsDefaults;
                const [, negativePrompt = ""] = (options.prompt || "").split(negativePromptDelimiter);
                return { ...options, prompt: [newPrompt, negativePromptDelimiter, negativePrompt].join("") };
            });
        },
        [setOptionProperty]
    );
    const setNegativePrompt = useCallback(
        (newNegativePrompt: string) => {
            setOptions((optionsOrNull) => {
                const options = optionsOrNull || generationOptionsDefaults;
                const [prompt = ""] = (options.prompt || "").split(negativePromptDelimiter);
                return { ...options, prompt: [prompt, negativePromptDelimiter, newNegativePrompt].join("") };
            });
        },
        [setOptionProperty]
    );
    const setParamProperty = useCallback(
        (param: keyof typeof generationOptionsDefaults.params, value: any) => {
            setOptions((sdOptionsOrNull) => {
                const sdOptions = sdOptionsOrNull || generationOptionsDefaults;
                return { ...sdOptions, params: { ...sdOptions.params, [param]: value } } as any;
            });
        },
        [setOptions]
    );

    const txt2ImgCallback = useCallback(() => {
        let id: string;
        const updateHistory = (historyItem: HistoryItemType) => {
            id = historyItem.id;
            setHistory((historyOrNull) => {
                const history = historyOrNull || [];
                const historyMatchIndex = history.findIndex((item) => item.id === historyItem.id);
                if (historyMatchIndex !== -1) {
                    return [
                        ...history.slice(0, historyMatchIndex),
                        historyItem,
                        ...history.slice(historyMatchIndex + 1),
                    ];
                } else {
                    history.push(historyItem);
                }
                return history;
            });
        };
        generateImage(options, updateHistory).catch((error) => {
            if (id) {
                setHistory((history) =>
                    (history || []).map((item) => {
                        if (item.id === id) {
                            return {
                                ...item,
                                error,
                            };
                        }
                        return item;
                    })
                );
            }
        });
    }, [generateImage, options]);

    return (
        <Page className="AiHordeRoute flex-1 h-svh flex flex-col box-border">
            <Text variant="h1">AI Horde Prototype</Text>
            <Text variant="body" className="mb-8">
                <TextPreview initialCollapsed>
                    This prototype connects to the{" "}
                    <Button
                        variant="text"
                        className="px-2 py-1 text.sm"
                        href="https://stablehorde.net/api/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        AI Horde API
                    </Button>
                    of one of the
                    <Button
                        variant="text"
                        className="px-2 py-1 text.sm"
                        href="https://stablehorde.net/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        AI Horde
                    </Button>
                    agents to generate images using Stable Diffusion. Images are hosted on Cloudflare for as little as
                    10 minutes, so make sure to <strong>save them locally</strong>.
                </TextPreview>
            </Text>
            <div className="relative flex-1 flex flex-col items-center">
                <div className="flex-1 flex flex-col gap-4 w-full pb-2">
                    <div className="relative flex-1 w-full flex flex-col gap-4 overflow-auto min-h-[400px]">
                        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col-reverse gap-4 items-center overflow-auto">
                            <div className="flex-1 pr-4 flex flex-col w-full max-w-full gap-4">
                                {history.map((currentHistoryItem, index) => {
                                    const id = currentHistoryItem.id;
                                    const pendingProps = currentHistoryItem.lastCheck
                                        ? getPendingPropsFromCheck(currentHistoryItem.lastCheck)
                                        : undefined;
                                    return (
                                        <div className="flex flex-col gap-4" key={id}>
                                            <Text variant={"h5"}>{`#${index + 1} ${
                                                currentHistoryItem.generationOptions.prompt
                                            }`}</Text>
                                            {!currentHistoryItem.error && (
                                                <div className="flex flex-row flex-wrap gap-4">
                                                    {range(currentHistoryItem.generationOptions.params?.n ?? 1).map(
                                                        (imageIndex) => {
                                                            const generation =
                                                                currentHistoryItem?.lastCheck?.generations?.[
                                                                    imageIndex
                                                                ];
                                                            const prompt = currentHistoryItem.generationOptions.prompt;
                                                            return (
                                                                <Button
                                                                    key={index}
                                                                    color="info"
                                                                    variant="text"
                                                                    className="p-0 relative block border-2 rounded-lg border-kac-steel overflow-hidden"
                                                                    disabled={!generation}
                                                                    onClick={() => {
                                                                        if (generation?.img) {
                                                                            openImageInNewTab(generation?.img);
                                                                        }
                                                                    }}
                                                                >
                                                                    <GeneratedImage
                                                                        key={index}
                                                                        className="w-64 h-64"
                                                                        generationContent={prompt}
                                                                        imageProps={{ src: generation?.img }}
                                                                        pendingProps={pendingProps}
                                                                    />
                                                                </Button>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            )}
                                            {currentHistoryItem.error && (
                                                <div className="text-red-500">
                                                    Error: {currentHistoryItem.error.message}
                                                </div>
                                            )}
                                            <ToggleData data={currentHistoryItem} initialCollapsed />
                                        </div>
                                    );
                                })}
                                <ToggleData
                                    data={history}
                                    initialCollapsed
                                    buttonContent="Show All History Data"
                                    className="max-w-full text-xs font-kacHeading mt-4"
                                    buttonProps={{ size: "xs" }}
                                    previewClassName="max-h-[20vh] max-w-full"
                                />
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
                                    txt2ImgCallback();
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
                        value={negativePrompt}
                        isCopyable
                        onNewPreset={(value) => {
                            console.log("onNewPreset", value);
                        }}
                        onRemovePreset={(value) => {
                            console.log("onRemovePreset", value);
                        }}
                        onChange={(e) => setNegativePrompt(e.target.value)}
                        textareaProps={{
                            onKeyDown: (e) => {
                                if (e.ctrlKey && e.key === "Enter") {
                                    e.preventDefault();
                                    txt2ImgCallback();
                                }
                            },
                            rows: 1,
                        }}
                        className="w-full bg-kac-curse-light bg-opacity-25 rounded-md shadow-inner text-sm"
                        labelClassName="w-full px-4 pt-2 text-xs text-kac-steel-dark text-opacity-75 font-kacHeading"
                        inputClassName="w-full px-4 pb-2 rounded-md"
                        label="Negative Prompt"
                    />
                    <div className="flex flex-row flex-wrap gap-4 items-end">
                        <ButtonWithConfirmation
                            color="danger"
                            className="flex-1 text-sm max-w-64"
                            onClick={() => setHistory([])}
                        >
                            Clear History
                        </ButtonWithConfirmation>
                        {/* TODO: Implement presets, size, steps, cfg */}
                        <Input
                            type="range"
                            label={"Images " + (options?.params?.n ?? 1)}
                            value={options?.params?.n}
                            min={1}
                            max={8}
                            className="max-w-64"
                            onChange={(e) => setParamProperty("n", e.target.valueAsNumber)}
                        />
                        <Button
                            className="flex-1 leading-none min-h-14 font-kacHeading"
                            onClick={() => {
                                txt2ImgCallback();
                            }}
                        >
                            Generate {options?.params?.n ?? 1}
                            <br />
                            <span className="opacity-75 text-xs"> CTRL + ENTER</span>
                        </Button>
                    </div>
                </div>
            </div>
        </Page>
    );
}
