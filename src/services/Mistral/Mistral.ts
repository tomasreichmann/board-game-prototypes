import MistralClient, { ChatCompletionResponseChoice, ResponseFormat, ToolCalls } from "@mistralai/mistralai";
import { getSettingsKey } from "../../hooks/useLocalSettings";
import { JSONSchemaType } from "ajv";

const getMistralKeyFromLocalSettings = () => {
    // localSettingsKey
    const key = getSettingsKey("mistralKey");
    if (!key) {
        console.warn("Local settings not found");
    }
    return key;
};

export type MistralServiceOptionsType = {
    mistralKey?: string;
};

export enum MistralModelEnum {
    "open-mistral-7b" = "open-mistral-7b",
    "open-mixtral-8x7b" = "open-mixtral-8x7b",
    "open-mixtral-8x22b" = "open-mixtral-8x22b",
    "mistral-small-latest" = "mistral-small-latest",
    "mistral-medium-latest" = "mistral-medium-latest",
    "mistral-large-latest" = "mistral-large-latest",
}

export enum ToolChoice {
    auto = "auto",
    any = "any",
    none = "none",
}

export type MessageType = {
    role: string;
    name?: string;
    content: string | string[] | JSX.Element;
    tool_calls?: ToolCalls[];
    finishReason?: string;
};

export type MistralChatToolType = {
    type: string;
    name?: string;
    description?: string;
    function: { name?: string; description?: string; function: Function; parameters?: JSONSchemaType<any> };
};

export type MistralChatOptionsType = {
    includeHistoryLength?: number;
    model?: MistralModelEnum;
    history?: MessageType[];
    tools?: MistralChatToolType[];
    temperature?: number;
    maxTokens?: number;
    topP?: number;
    randomSeed?: number;
    stream?: boolean;
    safePrompt?: boolean;
    toolChoice?: ToolChoice;
    responseFormat?: ResponseFormat;
};

export type MistralHistoryItem = ChatCompletionResponseChoice["message"];

const modelsWithToolCallSupport = [
    // MistralModelEnum["open-mistral-7b"],
    MistralModelEnum["mistral-small-latest"],
    // MistralModelEnum["mistral-medium-latest"],
    MistralModelEnum["mistral-large-latest"],
    MistralModelEnum["open-mixtral-8x22b"],
];

// Service type
const MistralService = ({ mistralKey = getMistralKeyFromLocalSettings() || "" }: MistralServiceOptionsType = {}) => {
    const client = new MistralClient(mistralKey);

    const chat = (
        prompt: string,
        {
            includeHistoryLength = 6,
            history = [],
            model = MistralModelEnum["open-mistral-7b"],
            temperature = 0.7,
            topP = 1,
            maxTokens = 100,
            safePrompt = false,
            toolChoice = ToolChoice.auto,
            tools,
            ...restOptions
        }: MistralChatOptionsType
    ) => {
        if (!mistralKey) {
            console.error("Mistral key not found");
            return Promise.reject("Mistral key not found");
        }
        console.log({ toolChoice, tools });

        const includedHistory = includeHistoryLength > 0 ? history.slice(-includeHistoryLength) : [];
        const isToolCallingSupported = modelsWithToolCallSupport.includes(model);
        const toolOptions = isToolCallingSupported
            ? {
                  toolChoice,
                  tools,
              }
            : {
                  toolChoice: ToolChoice.none,
              };
        if (!isToolCallingSupported) {
            if (toolChoice !== ToolChoice.none) {
                ({
                    [ToolChoice.auto]: console.warn,
                    [ToolChoice.any]: console.error,
                })[toolChoice]?.(`Tool calling is not supported for this model. Tools removed.`);
            }
        }
        return client.chat({
            model,
            max_tokens: maxTokens, // Wrong types in d.ts
            maxTokens,
            temperature,
            topP,
            safePrompt,
            ...toolOptions,
            ...restOptions,
            /*responseFormat: {
                type: format as any,
            },*/
            messages: [...includedHistory, { role: "user", content: prompt }],
        } as any);
    };

    return {
        chat,
    };
};

export default MistralService;
