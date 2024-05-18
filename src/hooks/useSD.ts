import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocalSettings } from "./useLocalSettings";
import { useLocalStorage } from "./useLocalStorage";
import uuid from "../utils/uuid";
import getImageUrlFromBase64 from "../utils/getImageUrlFromBase64";

const NO_KEY_ERROR = "No URI available. Set it in settings.";

// TODO magically infer SDOptionsType type from
// import sdApiSchema from "../schemas/sdApiSchema";
// import { TypeFromTypeString } from "../prototypes/kick-ass-cards/components/content/Form";
// const properties = sdApiSchema.components.schemas.Options.properties;

export type SDOptionsType = Partial<{
    prompt: string;
    negative_prompt: string;
    styles: string[];
    seed: number;
    subseed: number;
    subseed_strength: number;
    seed_resize_from_h: number;
    seed_resize_from_w: number;
    sampler_name: string;
    batch_size: number;
    n_iter: number;
    steps: number;
    cfg_scale: number;
    width: number;
    height: number;
    restore_faces: boolean;
    tiling: boolean;
    do_not_save_samples: boolean;
    do_not_save_grid: boolean;
    eta: number;
    denoising_strength: number;
    s_min_uncond: number;
    s_churn: number;
    s_tmax: number;
    s_tmin: number;
    s_noise: number;
    override_settings: object;
    override_settings_restore_afterwards: boolean;
    refiner_checkpoint: string;
    refiner_switch_at: number;
    disable_extra_networks: boolean;
    firstpass_image: string;
    comments: object;
    enable_hr: boolean;
    firstphase_width: number;
    firstphase_height: number;
    hr_scale: number;
    hr_upscaler: string;
    hr_second_pass_steps: number;
    hr_resize_x: number;
    hr_resize_y: number;
    hr_checkpoint_name: string;
    hr_sampler_name: string;
    hr_prompt: string;
    hr_negative_prompt: string;
    force_task_id: string;
    sampler_index: string;
    script_name: string;
    script_args: any[];
    send_images: boolean;
    save_images: boolean;
    alwayson_scripts: object;
    infotext: string;
}>;

export type SDPresetType = {
    label: string;
    value: Partial<SDOptionsType>;
};

export type SDResultType = {
    /* Images: An array of generated images in base64 format. */
    images: string[];
    parameters: SDOptionsType;
    /* Info: string in JSON format. */
    info: string;
};

const sdXlPreset: SDPresetType = {
    label: "SDXL",
    value: {
        steps: 20,
        sampler_name: "DPM++ 2M",
        cfg_scale: 7,
        width: 1024,
        height: 1024,
    },
};

const sdXlLightningPreset: SDPresetType = {
    label: "SDXL Lightning",
    value: {
        steps: 4,
        sampler_name: "DPM++ SDE",
        cfg_scale: 2,
        width: 1024,
        height: 1024,
    },
};

const sd1_5Preset: SDPresetType = {
    label: "SD 1-5",
    value: {
        steps: 20,
        sampler_name: "DPM++ 2M",
        cfg_scale: 7,
        width: 512,
        height: 512,
    },
};

const noPreset: SDPresetType = {
    label: "-",
    value: {},
};
const noPresetOption = {
    label: "-",
    value: "-",
};

const initialPresets = [noPreset, sdXlPreset, sdXlLightningPreset, sd1_5Preset];

const defaultOptions: SDOptionsType = {
    sampler_name: "DPM++ 2M",
    steps: 20,
    width: 1024,
    height: 1024,
    save_images: true,
};

export const SD_OPTIONS_KEY = "SD_OPTIONS";
export const SD_PRESETS_KEY = "SD_PRESETS";
export const SD_SELECTED_PRESET_KEY = "SD_SELECTED_PRESET";
export const SD_HISTORY_KEY = "SD_HISTORY";
export const SD_MODELS_CONFIG_KEY = "SD_MODELS_CONFIG";

export type SDConfigType = {
    historyKeyPostfix?: string;
    historyLength?: number;
};

export type SDModelResponseType = {
    title: string;
    model_name: string;
    hash: string;
    sha256: string;
    filename: string;
    config: null;
};

export type SDModelOptionType = {
    label: string;
    value: string;
};

export type SDModelsConfigType = {
    models: SDModelOptionType[];
    isPending: boolean;
    error: string | null;
    selectedModel: string | null;
};

export type HistoryItemType =
    | {
          id: string;
          type: "request";
          options: SDOptionsType;
      }
    | {
          id: string;
          requestId: string;
          type: "response";
          response: SDResultType;
      };

const getDefaultModelsConfig = (modelsConfigMaybeNull: SDModelsConfigType | null): SDModelsConfigType => {
    return {
        models: [],
        isPending: false,
        error: null,
        selectedModel: null,
        ...(modelsConfigMaybeNull ? modelsConfigMaybeNull : {}),
    };
};

export const useSD = (config: SDConfigType = {}) => {
    const { historyKeyPostfix, historyLength = 100 } = config;
    const isHistoryEnabled = !!historyKeyPostfix;
    const resolvedHistoryKey = isHistoryEnabled ? SD_HISTORY_KEY + "_" + historyKeyPostfix : null;
    const [optionsWithoutDefaults, setOptions] = useLocalStorage<SDOptionsType>(SD_OPTIONS_KEY);
    const [history, setHistory] = useLocalStorage<HistoryItemType[]>(resolvedHistoryKey);
    const [presets, setPresets] = useLocalStorage<SDPresetType[]>(SD_PRESETS_KEY);
    const [modelsConfig, setModelsConfig] = useLocalStorage<SDModelsConfigType>(SD_MODELS_CONFIG_KEY);
    const [{ sdUri }] = useLocalSettings(["sdUri"]);

    const [selectedPresetOption, setSelectedPresetOption] =
        useLocalStorage<typeof noPresetOption>(SD_SELECTED_PRESET_KEY);

    const options = useMemo(
        () =>
            ({
                ...defaultOptions,
                ...optionsWithoutDefaults,
            } as SDOptionsType),
        [optionsWithoutDefaults]
    );

    const selectedPreset = useMemo(() => {
        if (presets) {
            const presetMatch = presets?.find((preset) => preset.label === selectedPresetOption?.label);
            if (presetMatch && presetMatch !== noPreset) {
                return presetMatch;
            }
        }
        return noPreset;
    }, [presets, options]);

    const [status, setStatus] = useState<{
        isPending: boolean;
        value: SDResultType | null;
        error: Error | null;
    }>({
        isPending: false,
        value: null,
        error: null,
    });

    const presetOptions = useMemo(() => {
        if (!presets) {
            return [noPresetOption];
        }
        return presets.map((preset) => ({
            label: preset.label,
            value: preset.label,
        }));
    }, [presets]);

    useEffect(() => {
        if (!presets) {
            setPresets(initialPresets);
        }
    }, [presets, setPresets]);

    useEffect(() => {
        if (selectedPreset && noPreset !== selectedPreset) {
            if (
                Object.entries(selectedPreset.value).some(
                    ([key, value]) => options[key as keyof SDOptionsType] !== value
                )
            ) {
                setOptions((option) => ({ ...option, ...selectedPreset.value }));
            }
        }
    }, [selectedPreset]);

    useEffect(() => {
        if (!sdUri) {
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
    }, [sdUri]);

    const setOptionProperty = useCallback(
        (property: string, value: any) => {
            setOptions((sdOptions) => ({ ...sdOptions, [property]: value }));
        },
        [setOptions]
    );

    const getModelsInfo = useCallback(async () => {
        setModelsConfig((modelsConfigMaybeNull) => {
            const modelConfig = getDefaultModelsConfig(modelsConfigMaybeNull);
            return { ...modelConfig, isPending: true, error: null };
        });
        try {
            const availableModels = (await fetch(sdUri + "sdapi/v1/sd-models").then((res) =>
                res.json()
            )) as SDModelResponseType[];
            console.log("availableModels", availableModels);
            setModelsConfig((modelsConfigMaybeNull) => {
                const modelConfig = getDefaultModelsConfig(modelsConfigMaybeNull);
                const newModelConfig = {
                    ...modelConfig,
                    models: availableModels.map((model) => ({ label: model.title, value: model.title })),
                    isPending: false,
                };
                console.log({ modelConfig, newModelConfig });
                return newModelConfig;
            });
            const selectedModel = await fetch(sdUri + "sdapi/v1/options")
                .then((res) => res.json())
                .then((config) => config.sd_model_checkpoint);
            setModelsConfig((modelsConfigMaybeNull) => {
                const modelConfig = getDefaultModelsConfig(modelsConfigMaybeNull);
                const newModelConfig = { ...modelConfig, selectedModel, isPending: false };
                console.log({ modelConfig, newModelConfig });
                return newModelConfig;
            });
        } catch (e: unknown) {
            setModelsConfig((modelsConfigMaybeNull) => {
                const modelConfig = getDefaultModelsConfig(modelsConfigMaybeNull);
                const errorMessage = e instanceof Error ? e.message : "Unknown error";
                const newModelConfig = { ...modelConfig, error: errorMessage, isPending: false };
                console.log({ modelConfig, newModelConfig });
                return newModelConfig;
            });
        }
    }, [setModelsConfig]);

    const setSelectedModel = useCallback(
        async (model: string) => {
            setModelsConfig((modelsConfigMaybeNull) => {
                const modelConfig = getDefaultModelsConfig(modelsConfigMaybeNull);
                return { ...modelConfig, isPending: true, error: null };
            });
            try {
                const currentOptions = await fetch(sdUri + "sdapi/v1/options").then((res) => res.json());

                await fetch(sdUri + "sdapi/v1/options", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...currentOptions, sd_model_checkpoint: model }),
                });
                setModelsConfig((modelsConfigMaybeNull) => {
                    const modelConfig = getDefaultModelsConfig(modelsConfigMaybeNull);
                    return { ...modelConfig, selectedModel: model, isPending: false };
                });
            } catch (e: unknown) {
                setModelsConfig((modelsConfigMaybeNull) => {
                    const modelConfig = getDefaultModelsConfig(modelsConfigMaybeNull);
                    const errorMessage = e instanceof Error ? e.message : "Unknown error";
                    return { ...modelConfig, error: errorMessage, isPending: false };
                });
            }
        },
        [setModelsConfig]
    );

    const txt2Image = useCallback(
        async (prompt: string, currentOptions: Omit<SDOptionsType, "prompt"> = {}) => {
            if (!sdUri) {
                setStatus((status) => ({
                    ...status,
                    error: new Error(NO_KEY_ERROR),
                }));
                return;
            }
            setStatus((status) => ({
                ...status,
                isPending: true,
                value: null,
            }));
            const combinedOptions = {
                prompt,
                ...options,
                ...currentOptions,
            };
            const requestId = uuid();

            if (isHistoryEnabled) {
                setHistory((history) => [
                    ...(history || []),
                    {
                        id: requestId,
                        type: "request",
                        options: combinedOptions,
                    },
                ]);
            }

            const data = JSON.stringify(combinedOptions);
            const uri = sdUri + "sdapi/v1/txt2img";

            return fetch(uri, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data,
            })
                .then(async (rawData) => {
                    const data = await rawData.json();
                    const imageUris: string[] = [];

                    data?.images?.forEach((image: string, index: number) => {
                        const fileName = requestId + "_" + index + ".png";
                        try {
                            const imageUri = getImageUrlFromBase64(image);
                            imageUris.push(imageUri);
                        } catch (error) {
                            throw new Error("Failed to save image " + fileName);
                        }
                    });

                    const dataWithBlobUris = {
                        ...data,
                        images: imageUris,
                    } as SDResultType;

                    if (isHistoryEnabled) {
                        setHistory((history) => [
                            ...(history || []),
                            {
                                id: uuid(),
                                requestId,
                                type: "response",
                                response: dataWithBlobUris,
                            },
                        ]);
                    }
                    setStatus((status) => ({
                        ...status,
                        isPending: false,
                        value: dataWithBlobUris,
                    }));

                    return dataWithBlobUris;
                })
                .catch((error) => {
                    console.error("Error", error);
                    setStatus((status) => ({
                        ...status,
                        isPending: false,
                        error,
                    }));
                });
        },
        [sdUri, options, setStatus, setHistory, isHistoryEnabled]
    );

    const clearHistory = () => {
        console.log("clearing history");
        setHistory([]);
    };

    return {
        ...status,
        presets,
        presetOptions,
        history,
        options,
        setOptions,
        setOptionProperty,
        modelsConfig: modelsConfig || getDefaultModelsConfig(null),
        getModelsInfo,
        setSelectedModel,
        clearHistory,
        selectedPresetOption,
        setSelectedPresetOption,
        txt2Image,
    };
};
