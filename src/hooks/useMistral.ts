import { useCallback, useEffect, useMemo, useState } from "react";
import MistralClient, { ChatCompletionResponse, ChatCompletionResponseChoice } from "@mistralai/mistralai";

import { useLocalSettings } from "./useLocalSettings";
import { useLocalStorage } from "./useLocalStorage";

const NO_KEY_ERROR = "No Mistral key provided. Set it in settings.";

export enum MistralModelEnum {
    /*
    open-mistral-7b (aka mistral-tiny-2312)
    open-mixtral-8x7b (aka mistral-small-2312)
    mistral-small-latest (aka mistral-small-2402)
    mistral-medium-latest (aka mistral-medium-2312)
    mistral-large-latest (aka mistral-large-2402)
    */
    "open-mistral-7b" = "open-mistral-7b",
    "open-mixtral-8x7b" = "open-mixtral-8x7b",
    "mistral-small-latest" = "mistral-small-latest",
    "mistral-medium-latest" = "mistral-medium-latest",
    "mistral-large-latest" = "mistral-large-latest",
}

export enum MistralFormatEnum {
    "json_object" = "json_object",
    "text" = "text",
}

type HistoryItemType =
    | {
          type: "message";
          message: string;
      }
    | {
          type: "response";
          response: ChatCompletionResponse;
      };

const defaultLocalHistoryKey = "mistralHistory";

export type MistralOptionsType = {
    includeHistoryLength?: number;
    historyKey?: string;
    model?: MistralModelEnum;
    format?: MistralFormatEnum;
    temperature?: number;
    topP?: number;
    maxTokens?: number;
    stream?: boolean;
    safePrompt?: boolean;
    randomSeed?: number;
};

export const useMistral = ({
    model = MistralModelEnum["open-mistral-7b"],
    format = MistralFormatEnum.json_object,
    temperature = 0.7,
    topP = 1,
    maxTokens = 100,
    stream = false,
    safePrompt = false,
    historyKey = defaultLocalHistoryKey,
    includeHistoryLength = 3,
    randomSeed,
}: MistralOptionsType = {}) => {
    const [{ mistralKey }] = useLocalSettings(["mistralKey"]);
    const [history, setHistory] = useLocalStorage<HistoryItemType[]>(historyKey);
    const [status, setStatus] = useState<{
        isPending: boolean;
        value: any;
        error: Error | null;
    }>({
        isPending: false,
        value: null,
        error: null,
    });

    useEffect(() => {
        if (!mistralKey) {
            setStatus((status) => ({
                ...status,
                error: new Error(NO_KEY_ERROR),
            }));
            return;
        }
        setStatus((status) => {
            if (status.error && status.error.message === NO_KEY_ERROR) {
                return {
                    ...status,
                    error: null,
                };
            }
            return status;
        });
    }, [mistralKey]);

    const client = useMemo(() => {
        if (!mistralKey) {
            return null;
        }
        return new MistralClient(mistralKey);
    }, [mistralKey]);

    const clearHistory = () => {
        setHistory([]);
    };

    const sendMessage = useCallback(
        async (message: string) => {
            if (!client) {
                setStatus((status) => ({
                    ...status,
                    error: new Error(NO_KEY_ERROR),
                }));
                return;
            }
            setHistory((history) => {
                const includedHistory = (history || []).slice(-includeHistoryLength).map((historyItem) => {
                    if (historyItem.type === "message") {
                        return { role: "user", content: historyItem.message };
                    }
                    // if (historyItem.type === "response") {
                    return historyItem.response.choices[0].message;
                    // }
                });
                setStatus((status) => ({
                    ...status,
                    isPending: true,
                    value: null,
                    error: null,
                }));
                client
                    .chat({
                        model: model,
                        temperature,
                        topP,
                        maxTokens,
                        safePrompt,
                        randomSeed,
                        responseFormat: {
                            type: format as any,
                        },
                        messages: [...includedHistory, { role: "user", content: message }],
                    })
                    .then((chatResponse) => {
                        setStatus((status) => ({
                            ...status,
                            isPending: false,
                            value: chatResponse,
                            error: null,
                        }));
                        setHistory((history) => [...(history || []), { type: "response", response: chatResponse }]);
                    });
                return [...(history || []), { type: "message", message }];
            });
        },
        [client]
    );

    return { ...status, history: history || [], sendMessage, clearHistory };
};
