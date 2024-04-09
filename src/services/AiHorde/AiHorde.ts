import { PendingBarProps, bgColorOptions } from "../../components/form/PendingBar";
import { getSettingsKey } from "../../hooks/useLocalSettings";
import delay from "../../utils/delay";
import uuid from "../../utils/uuid";
import {
    GenerateAsyncOptionsType,
    GenerationCheckResponse,
    GenerationStablePresetOptionType,
    GenerationStatusEnum,
    HistoryItemType,
} from "./aiHordeTypes";

const clientAgent = "board-game-prototypes:0.2.5:ai-horde-service";

export type AiHordeConfigType = {
    apiUri?: string;
    apiKey?: string;
    clientAgent?: string;
};

export type GenerateOptionsType = {
    checkIntervalMs?: number;
    timeoutMs?: number;
};

export const deliberate3_sd15PresetOption: GenerationStablePresetOptionType = {
    label: "Deliberate",
    preset: {
        models: ["Deliberate"],
        params: {
            steps: 20,
            cfg_scale: 7,
            height: 512,
            width: 512,
            sampler_name: "k_dpmpp_2m",
        },
    },
};

export const albedobase_sdxlPresetOption: GenerationStablePresetOptionType = {
    label: "AlbedoBase XL (SDXL)",
    preset: {
        models: ["AlbedoBase XL (SDXL)"],
        params: {
            steps: 20,
            cfg_scale: 7,
            height: 1024,
            width: 1024,
            sampler_name: "k_dpmpp_2m",
        },
    },
};

export const icbinp_sdxlPresetOption: GenerationStablePresetOptionType = {
    label: "ICBINP - I Can't Believe It's Not Photography",
    preset: {
        models: ["ICBINP - I Can't Believe It's Not Photography"],
        params: {
            steps: 20,
            cfg_scale: 7,
            height: 1024,
            width: 1024,
            sampler_name: "k_dpmpp_2m",
        },
    },
};

export const stableCascadePresetOption: GenerationStablePresetOptionType = {
    label: "Stable Cascade 1.0",
    preset: {
        models: ["Stable Cascade 1.0"],
        params: {
            steps: 20,
            cfg_scale: 3,
            height: 1024,
            width: 1024,
            sampler_name: "k_dpmpp_2m",
        },
    },
};

export const generationOptionsDefaults = {
    prompt: "",
    gathered: false,
    jobId: "",
    censor_nsfw: false,
    nsfw: true,
    r2: true,
    replacement_filter: false,
    shared: false,
    slow_workers: true,
    trusted_workers: false,
    workers: [],
    ...deliberate3_sd15PresetOption.preset,
    params: {
        n: 1,
        steps: 20,
        height: 512,
        width: 512,
        sampler_name: "k_dpmpp_2m" as const,
        karras: true,
        clip_skip: 1,
        denoising_strength: 0.75,
        facefixer_strength: 0.75,
        hires_fix: false,
        post_processing: [],
        seed: "-1",
        seed_variation: 1000,
        tiling: false,
        ...deliberate3_sd15PresetOption.preset.params,
    },
};

export const presets = [
    deliberate3_sd15PresetOption,
    albedobase_sdxlPresetOption,
    icbinp_sdxlPresetOption,
    stableCascadePresetOption,
];

const AiHorde = (initialConfig: AiHordeConfigType = {}) => {
    const config = {
        apiKey: initialConfig.apiKey || getSettingsKey("aiHordeToken") || "0000000000",
        clientAgent: initialConfig.clientAgent || clientAgent,
        apiUri: initialConfig.apiUri || "https://aihorde.net/api/v2",
    };

    const getHeaders = (fieldsMask?: string) => {
        const headers: Record<string, string> = {
            apikey: config.apiKey,
            "Client-Agent": config.clientAgent,
            "Content-Type": "application/json",
        };
        if (fieldsMask) {
            headers["X-Fields"] = fieldsMask;
        }
        return headers;
    };

    const fetchFromApi = async (apiPath: string, options: RequestInit = {}) => {
        if (!config.apiKey) {
            throw new Error("No API key provided");
        }
        if (!apiPath) {
            throw new Error("No API path provided");
        }
        const headers = getHeaders();
        const response = await fetch(config.apiUri + apiPath, {
            headers,
            ...options,
        });
        if (!response.ok) {
            const { error, message } = await response.json();
            throw new Error(`API Error (${response.status}): ${error} - ${message}`);
        }
        return response.json();
    };

    const postImageGeneration = async (optionsWithoutDefaults: GenerateAsyncOptionsType, fieldsMask?: string) => {
        const headers = getHeaders(fieldsMask);
        const options: GenerateAsyncOptionsType = {
            ...generationOptionsDefaults,
            ...optionsWithoutDefaults,
            params: {
                ...generationOptionsDefaults.params,
                ...optionsWithoutDefaults.params,
            },
        };

        const generation = await fetchFromApi("/generate/async", {
            method: "POST",
            headers,
            body: JSON.stringify(options),
        });
        console.log(generation);
        return generation;
    };

    const checkImageGenerationStatus = async (id: string, fieldsMask?: string) => {
        if (!id) {
            throw new Error("No generation id provided");
        }
        const headers = getHeaders(fieldsMask);
        const check = await fetchFromApi(`/generate/check/${id}`, {
            method: "GET",
            headers,
        });
        console.log(check);
        return check;
    };

    const getImageGenerationStatus = async (id: string, fieldsMask?: string) => {
        if (!id) {
            throw new Error("No generation id provided");
        }
        const headers = getHeaders(fieldsMask);
        const status = await fetchFromApi(`/generate/status/${id}`, {
            method: "GET",
            headers,
        });
        console.log(status);
        return status;
    };

    const getStatusFromCheck = (check: GenerationCheckResponse) => {
        if (check.faulted) {
            return GenerationStatusEnum.faulted;
        }
        if (check?.generations?.length) {
            return GenerationStatusEnum.collected;
        }
        if (check.done) {
            return GenerationStatusEnum.done;
        }
        if (check.processing) {
            return GenerationStatusEnum.processing;
        }
        if (check.is_possible) {
            return GenerationStatusEnum.queued;
        }
        return GenerationStatusEnum.created;
    };

    const getPendingPropsFromCheck = (check: GenerationCheckResponse): PendingBarProps => {
        const statusColorMap: { [key in GenerationStatusEnum]: keyof typeof bgColorOptions } = {
            [GenerationStatusEnum.created]: "info",
            [GenerationStatusEnum.queued]: "info",
            [GenerationStatusEnum.processing]: "primary",
            [GenerationStatusEnum.done]: "primary",
            [GenerationStatusEnum.collected]: "success",
            [GenerationStatusEnum.faulted]: "danger",
        };
        const statusOrder: GenerationStatusEnum[] = [
            GenerationStatusEnum.created,
            GenerationStatusEnum.queued,
            GenerationStatusEnum.processing,
            GenerationStatusEnum.done,
            GenerationStatusEnum.collected,
        ];
        const activeStatuses = [GenerationStatusEnum.processing, GenerationStatusEnum.done];
        const status = getStatusFromCheck(check);
        const pendingProps: PendingBarProps = {
            color: statusColorMap[status],
            current: statusOrder.indexOf(status),
            total: statusOrder.length - 1,
            active: activeStatuses.includes(status),
        };
        if (status === GenerationStatusEnum.faulted) {
            pendingProps.total = 0;
            pendingProps.current = 0;
        }
        if (status === GenerationStatusEnum.collected) {
            pendingProps.className = "h-0 opacity-0";
        }

        return pendingProps;
    };

    const generateImage = async (
        {
            checkIntervalMs = 2000,
            timeoutMs = 10 * 60 * 1000,
            ...optionsWithoutDefaults
        }: GenerateAsyncOptionsType & GenerateOptionsType,
        onUpdate?: (historyItem: HistoryItemType) => void
    ) => {
        if (!optionsWithoutDefaults.prompt) {
            throw new Error("No prompt provided");
        }
        const id = uuid();
        const createdAt = Date.now();
        const historyItem: HistoryItemType = {
            id,
            status: GenerationStatusEnum.created,
            createdAt,
            generationOptions: optionsWithoutDefaults,
        };
        onUpdate && onUpdate(historyItem);
        historyItem.generation = await postImageGeneration(optionsWithoutDefaults);
        historyItem.status = GenerationStatusEnum.queued;
        historyItem.updatedAt = Date.now();
        onUpdate && onUpdate(historyItem);
        if (!historyItem.generation) {
            throw new Error("Failed to generate image");
        }

        while (!historyItem.lastCheck?.done) {
            await delay(checkIntervalMs);
            if (Date.now() - historyItem.createdAt > timeoutMs) {
                throw Error("Request timed out");
            }
            historyItem.lastCheck = await checkImageGenerationStatus(historyItem.generation.id);
            if (historyItem.lastCheck) {
                historyItem.status = getStatusFromCheck(historyItem.lastCheck);
            }
            historyItem.updatedAt = Date.now();
            onUpdate && onUpdate(historyItem);
        }

        if (!historyItem.lastCheck.finished) {
            throw new Error("Generation failed");
        }
        historyItem.lastCheck = await getImageGenerationStatus(historyItem.generation.id);
        historyItem.updatedAt = Date.now();
        onUpdate && onUpdate(historyItem);
        if (!historyItem.lastCheck?.generations?.length) {
            throw new Error("No generations retrieved");
        }
        historyItem.updatedAt = Date.now();
        historyItem.finishedAt = Date.now();
        historyItem.status = GenerationStatusEnum.collected;
        onUpdate && onUpdate(historyItem);

        return historyItem;
    };

    return {
        generateImage,
        postImageGeneration,
        checkImageGenerationStatus,
        getImageGenerationStatus,
        getPendingPropsFromCheck,
    };
};
export default AiHorde;
