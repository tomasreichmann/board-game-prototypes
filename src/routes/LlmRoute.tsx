import Page from "../components/Page/Page";
import { useLocalStorage } from "../hooks/useLocalStorage";

import ToggleData from "../components/DataToggle";
import { useLocalSettings } from "../hooks/useLocalSettings";
import { MistralFormatEnum, MistralModelEnum, MistralOptionsType, useMistral } from "../hooks/useMistral";
import Input from "../prototypes/kick-ass-cards/components/content/Input";
import { useCallback, useState } from "react";
import Button from "../prototypes/kick-ass-cards/components/content/Button";
import { twMerge } from "tailwind-merge";
import ButtonWithConfirmation from "../prototypes/kick-ass-cards/components/content/ButtonWithConfirmation";
import Select from "../prototypes/kick-ass-cards/components/content/Select";

export default function LlmRoute() {
    const [mistralOptions, setMistralOptions] = useState<MistralOptionsType>({
        model: MistralModelEnum["open-mistral-7b"],
        includeHistoryLength: 0,
        format: MistralFormatEnum.json_object,
        temperature: 0.7,
        topP: 1,
        maxTokens: 100,
        stream: false,
        safePrompt: false,
    });
    const { sendMessage, clearHistory, ...status } = useMistral(mistralOptions);
    const { isPending, error, history } = status;
    const [message, setMessage] = useState("");

    const sendMessageCallback = useCallback(
        (message: string) => {
            sendMessage(message);
            setMessage("");
        },
        [sendMessage]
    );

    return (
        <Page className="LlmRoute flex-1 h-svh flex flex-col box-border">
            <h1 className="text-3l font-bold mb-10">LLM Prototype</h1>
            <div className="flex-1 flex flex-col sm:flex-row gap-8">
                <div className="relative flex-1 flex flex-col items-center">
                    <div className="flex-1 flex flex-col gap-4 w-full max-w-xl pb-2">
                        <div className="relative flex-1 w-full flex flex-col gap-4 overflow-auto min-h-[400px]">
                            <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col-reverse gap-4 items-center overflow-auto">
                                <div className="pr-4">
                                    {history.map((historyItem, historyIndex) => {
                                        const isLast = historyIndex === history.length - 1;
                                        if (historyItem.type === "message") {
                                            return (
                                                <div
                                                    key={historyIndex}
                                                    className={twMerge(
                                                        "flex flex-col items-stretch text-sm text-right mt-2",
                                                        isLast && "text-md"
                                                    )}
                                                >
                                                    <div className="text-xs text-slate-400">User</div>
                                                    {historyItem.message}
                                                </div>
                                            );
                                        }
                                        if (historyItem.type === "response") {
                                            return (
                                                <div
                                                    key={historyIndex}
                                                    className={twMerge(
                                                        "flex flex-col items-stretch text-sm mt-2",
                                                        isLast && "text-md"
                                                    )}
                                                >
                                                    <div className="text-xs capitalize text-slate-400">
                                                        {historyItem.response.choices[0].message.role}
                                                    </div>
                                                    {historyItem.response.choices[0].message.content}
                                                </div>
                                            );
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                        <Input
                            type="textarea"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            textareaProps={{
                                onKeyDown: (e) => {
                                    if (e.ctrlKey && e.key === "Enter") {
                                        e.preventDefault();
                                        sendMessageCallback(message);
                                    }
                                },
                            }}
                            className="w-full max-w-none"
                            labelClassName="w-full max-w-none"
                            label="Message"
                        />
                        <Button
                            disabled={!message || isPending}
                            className="w-full"
                            onClick={() => {
                                sendMessageCallback(message);
                            }}
                        >
                            Send{isPending ? "..." : <span className="opacity-50 text-xs"> CTRL + ENTER</span>}
                        </Button>
                        <div className="flex flex-row flex-wrap gap-2 pb-8">
                            <ButtonWithConfirmation color="danger" className="flex-1 text-sm" onClick={clearHistory}>
                                Clear History
                            </ButtonWithConfirmation>
                            <Input
                                className="max-w-32"
                                type="number"
                                value={mistralOptions.includeHistoryLength}
                                label="Include History"
                                labelClassName="text-sm max-w-32"
                                onChange={(e) => {
                                    setMistralOptions((options) => ({
                                        ...options,
                                        includeHistoryLength: parseInt(e.target.value),
                                    }));
                                }}
                            />
                            <Input
                                className="max-w-20"
                                type="number"
                                value={mistralOptions.maxTokens}
                                min={10}
                                step={10}
                                max={1000}
                                label="Max Tokens"
                                labelClassName="text-sm max-w-20"
                                onChange={(e) => {
                                    setMistralOptions((options) => ({
                                        ...options,
                                        maxTokens: parseInt(e.target.value),
                                    }));
                                }}
                            />
                            <Input
                                className="max-w-20"
                                type="number"
                                value={mistralOptions.temperature}
                                min={0}
                                step={0.1}
                                max={1}
                                label="Temperature"
                                labelClassName="text-sm max-w-20"
                                onChange={(e) => {
                                    setMistralOptions((options) => ({
                                        ...options,
                                        temperature: parseInt(e.target.value),
                                    }));
                                }}
                            />
                            <Select
                                className="max-w-xs"
                                label="Model"
                                options={Object.entries(MistralModelEnum).map(([_, value]) => ({
                                    label: value,
                                    value,
                                }))}
                                onChange={(event) => {
                                    setMistralOptions((options) => ({
                                        ...options,
                                        model: event.target.value as MistralModelEnum,
                                    }));
                                }}
                            />
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
