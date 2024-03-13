import Page from "../components/Page/Page";
import { useLocalStorage } from "../hooks/useLocalStorage";

import ToggleData from "../components/DataToggle";
import { useLocalSettings } from "../hooks/useLocalSettings";
import { useMistral } from "../hooks/useMistral";
import Input from "../prototypes/kick-ass-cards/components/content/Input";
import { useCallback, useState } from "react";
import Button from "../prototypes/kick-ass-cards/components/content/Button";
import { twMerge } from "tailwind-merge";

export default function LlmRoute() {
    const { sendMessage, ...status } = useMistral();
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
            <div className="flex-1 flex flex-row gap-8">
                <div className="relative flex-1 flex flex-col">
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
                        <div className="flex flex-row flex-wrap">
                            <Button
                                disabled={!message || isPending}
                                className="w-full flex-1"
                                onClick={() => {
                                    sendMessageCallback(message);
                                }}
                            >
                                Send{isPending ? "..." : <span className="opacity-50 text-xs"> CTRL + ENTER</span>}
                            </Button>
                        </div>
                        {error && <p className="text-red-500 mt-2">{error.message}</p>}
                    </div>
                </div>
                <div className="w-[400px] overflow-auto flex flex-col relative">
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
