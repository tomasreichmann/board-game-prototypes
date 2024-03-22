import { useCallback, useEffect, useMemo, useState } from "react";
import { ChatCompletionResponse } from "@mistralai/mistralai";

import { useLocalSettings } from "./useLocalSettings";
import { useLocalStorage } from "./useLocalStorage";
import Mistral, { MistralModelEnum } from "../services/Mistral/Mistral";

const NO_KEY_ERROR = "No Mistral key provided. Set it in settings.";

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
        value: ChatCompletionResponse | null;
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
        return Mistral(mistralKey);
    }, [mistralKey]);

    const chatOptions = useMemo(() => {
        return {
            model,
            format,
            temperature,
            topP,
            maxTokens,
            stream,
            safePrompt,
            historyKey,
            includeHistoryLength,
            randomSeed,
        };
    }, [model, format, temperature, topP, maxTokens, stream, safePrompt, historyKey, includeHistoryLength, randomSeed]);

    const clearHistory = () => {
        console.log("clearing history");
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
                const lastHistoryItems = includeHistoryLength > 0 ? (history || []).slice(-includeHistoryLength) : [];
                const includedHistory = lastHistoryItems.map((historyItem) => {
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
                    .chat(message, { chatOptions, history: includedHistory } as any)
                    .then((chatResponse) => {
                        setStatus((status) => ({
                            ...status,
                            isPending: false,
                            value: chatResponse,
                            error: null,
                        }));
                        setHistory((history) => [...(history || []), { type: "response", response: chatResponse }]);
                    })
                    .catch((error) => {
                        console.warn("useMistral error:", error);
                        let errorMessage = "Request Error: ";
                        if (error?.message) {
                            errorMessage += error.message;
                        }
                        if (error?.detail && Array.isArray(error.detail) && error.detail.length) {
                            errorMessage += "\n" + error.detail.map((error: any) => JSON.stringify(error)).join("\n");
                        }
                        setStatus((status) => ({
                            ...status,
                            isPending: false,
                            value: null,
                            error: new Error(errorMessage),
                        }));
                    });
                return [...(history || []), { type: "message", message }];
            });
        },
        [client, chatOptions]
    );

    return { ...status, history: history || [], sendMessage, clearHistory };
};
