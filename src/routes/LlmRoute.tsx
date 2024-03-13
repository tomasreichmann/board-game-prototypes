import Page from "../components/Page/Page";
import { useLocalStorage } from "../hooks/useLocalStorage";

import ToggleData from "../components/DataToggle";
import { useLocalSettings } from "../hooks/useLocalSettings";
import { useMistral } from "../hooks/useMistral";
import Input from "../prototypes/kick-ass-cards/components/content/Input";
import { useState } from "react";
import Button from "../prototypes/kick-ass-cards/components/content/Button";
import { twMerge } from "tailwind-merge";

export default function LlmRoute() {
    const [{ mistralKey }] = useLocalSettings(["mistralKey"]);
    const { sendMessage, ...status } = useMistral();
    const { isPending, error, history } = status;
    const [message, setMessage] = useState("");

    return (
        <Page className="LlmRoute flex-1 h-svh flex flex-col">
            <h1 className="text-3l font-bold mb-10">LLM Prototype</h1>
            <div className="flex-1 flex flex-row gap-8">
                <div className="flex-1 flex flex-col gap-4 items-center">
                    <div className="flex-1 flex flex-col gap-4 w-full max-w-sm">
                        <div className="flex-1 flex flex-col gap-4 overflow-auto">
                            {history.map((historyItem, historyIndex) => {
                                if (historyItem.type === "message") {
                                    return (
                                        <div key={historyIndex} className="flex flex-row gap-4 items-center text-sm">
                                            {historyItem.message}
                                        </div>
                                    );
                                }
                            })}
                        </div>
                        <Input
                            type="textarea"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full max-w-sm"
                            labelClassName="w-full max-w-sm"
                            label="Message"
                        />
                        <Button
                            disabled={!message || isPending}
                            className="max-w-sm"
                            onClick={() => sendMessage(message)}
                        >
                            Send{isPending ? "..." : ""}
                        </Button>
                        {error && <p className="text-red-500 mt-2">{error.message}</p>}
                    </div>
                </div>
                <div className="max-w-sm">
                    <ToggleData data={{ mistralKey, status }} />
                </div>
            </div>
        </Page>
    );
}
