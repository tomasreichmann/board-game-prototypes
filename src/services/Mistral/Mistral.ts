import MistralClient, { ToolCalls } from "@mistralai/mistralai";
import { localSettingsKey } from "../../hooks/useLocalSettings";

const getMistralKeyFromLocalSettings = () => {
    // localSettingsKey
    const localSettings = localStorage.getItem(localSettingsKey);
    if (localSettings) {
        const { mistralKey } = JSON.parse(localSettings);
        return mistralKey as string;
    }
    throw new Error("Local settings not found");
};

export type MistralOptionsType = {
    mistralKey?: string;
};

export enum MistralModelEnum {
    "open-mistral-7b" = "open-mistral-7b",
    "open-mixtral-8x7b" = "open-mixtral-8x7b",
    "mistral-small-latest" = "mistral-small-latest",
    "mistral-medium-latest" = "mistral-medium-latest",
    "mistral-large-latest" = "mistral-large-latest",
}

export type MessageType = { role: string; name?: string; content: string | string[]; tool_calls?: ToolCalls[] };

export type MistralChatOptionsType = {
    history: MessageType[];
    prompt: string;
    model?: MistralModelEnum;
    temperature?: number;
    topP?: number;
    maxTokens?: number;
    stream?: boolean;
    safePrompt?: boolean;
    randomSeed?: number;
};

// Service type
const Mistral = ({ mistralKey = getMistralKeyFromLocalSettings() }: MistralOptionsType = {}) => {
    const client = new MistralClient(mistralKey);

    const chat = (
        prompt: string,
        {
            history = [],
            model = MistralModelEnum["open-mistral-7b"],
            temperature = 0.7,
            topP = 1,
            maxTokens = 100,
            safePrompt = false,
            randomSeed,
        }: MistralChatOptionsType
    ) =>
        client.chat({
            model,
            temperature,
            topP,
            max_tokens: maxTokens, // Wrong types in d.ts
            maxTokens,
            safePrompt,
            randomSeed,
            /*responseFormat: {
                type: format as any,
            },*/
            messages: [...history, { role: "user", content: prompt }],
        } as any);

    return {
        chat,
    };
};

export default Mistral;
