import { useCallback, useEffect, useMemo, useState } from "react";
import MistralClient, { ChatCompletionResponse, ChatCompletionResponseChoice } from "@mistralai/mistralai";

import { useLocalSettings } from "./useLocalSettings";

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

type ResponseChoice = {
    index: 0;
    message: {
        role: "assistant";
        content: "I'm an AI language model and I don't have the ability to generate images directly. However, I can help you generate descriptive text that could be used to create an image in your mind or guide a computer program to generate an image based on your specifications. If you're looking for a specific image, I can help you search for it online or try to describe it in detail so you can create it yourself.";
        tool_calls: null;
    };
    finish_reason: "stop";
    logprobs: null;
};

type HistoryItemType =
    | {
          type: "message";
          message: string;
      }
    | {
          type: "response";
          response: ChatCompletionResponse;
      };

export type MistralOptionsType = {
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
    randomSeed,
}: MistralOptionsType = {}) => {
    const [{ mistralKey }] = useLocalSettings(["mistralKey"]);
    const [status, setStatus] = useState<{
        isPending: boolean;
        value: any;
        history: HistoryItemType[];
        error: Error | null;
    }>({
        isPending: false,
        value: null,
        error: null,
        history: [],
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

    const sendMessage = useCallback(
        async (message: string) => {
            if (!client) {
                setStatus((status) => ({
                    ...status,
                    history: [...status.history, { type: "message", message }],
                    error: new Error(NO_KEY_ERROR),
                }));
                return;
            }
            setStatus((status) => ({
                ...status,
                history: [...status.history, { type: "message", message }],
                isPending: true,
                value: null,
                error: null,
            }));
            const chatResponse = await client.chat({
                model: model,
                temperature,
                topP,
                maxTokens,
                safePrompt,
                randomSeed,
                responseFormat: {
                    type: format as any,
                },
                messages: [{ role: "user", content: message }],
            });
            setStatus((status) => ({
                ...status,
                history: [...status.history, { type: "response", response: chatResponse }],
                isPending: false,
                value: chatResponse,
                error: null,
            }));
        },
        [client]
    );

    return { ...status, sendMessage };
};
