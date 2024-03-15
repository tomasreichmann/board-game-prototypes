import { useCallback, useEffect, useMemo, useState } from "react";

import { useLocalSettings } from "./useLocalSettings";
import { useLocalStorage } from "./useLocalStorage";

const NO_KEY_ERROR = "No URI available. Set it in settings.";

export type SDOptionsType = {
    negative_prompt?: string;
    styles?: string;
    seed?: number;
    subseed?: number;
    subseed_strength?: number;
    seed_resize_from_h?: number;
    seed_resize_from_w?: number;
    sampler_name?: string;
    batch_size?: number;
    n_iter?: number;
    steps?: number;
    cfg_scale?: number;
    width?: number;
    height?: number;
    restore_faces?: string;
    tiling?: string;
    do_not_save_samples?: boolean;
    do_not_save_grid?: boolean;
    eta?: string;
    denoising_strength?: number;
    s_min_uncond?: number;
    s_churn?: number;
    s_tmax?: number;
    s_tmin?: number;
    s_noise?: number;
    override_settings?: string;
    override_settings_restore_afterwards?: boolean;
    refiner_checkpoint?: string;
    refiner_switch_at?: number;
    disable_extra_networks?: boolean;
    firstpass_image?: string;
    comments?: string;
    enable_hr?: boolean;
    firstphase_width?: number;
    firstphase_height?: number;
    hr_scale?: number;
    hr_upscaler?: string;
    hr_second_pass_steps?: number;
    hr_resize_x?: number;
    hr_resize_y?: number;
    hr_checkpoint_name?: string;
    hr_sampler_name?: string;
    hr_prompt?: string;
    hr_negative_prompt?: string;
    force_task_id?: string;
    sampler_index?: string;
    script_name?: string;
    script_args?: string[];
    send_images?: boolean;
    save_images?: boolean;
};

export type SDPresetType = {
    label: string;
    value: Partial<SDOptionsType>;
};

const lightningRealVisPreset: SDPresetType = {
    label: "Lightning RealVis",
    value: {
        steps: 4,
        sampler_name: "DPM++ SDE Karras",
        cfg_scale: 2,
        width: 1024,
        height: 1024,
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

const initialPresets = [noPreset, lightningRealVisPreset];

const defaultOptions: SDOptionsType = {
    sampler_name: "DPM++ 2M Karras",
    steps: 20,
    width: 1024,
    height: 1024,
    save_images: true,
};

export const SD_METADATA_KEY = "SD_METADATA";
export const SD_PRESETS_KEY = "SD_PRESETS";
export const SD_SELECTED_PRESET_KEY = "SD_SELECTED_PRESET_KEY";

export const useSD = (options: SDOptionsType) => {
    const [metadata, setMetadata] = useLocalStorage(SD_METADATA_KEY);
    const [presets, setPresets] = useLocalStorage<SDPresetType[]>(SD_PRESETS_KEY);
    const [selectedPresetOption, setSelectedPresetOption] =
        useLocalStorage<typeof noPresetOption>(SD_SELECTED_PRESET_KEY);

    const selectedPreset = useMemo(
        () => presets?.find((preset) => preset.label === selectedPresetOption?.label) || {},
        [presets, options]
    );

    useEffect(() => {
        if (!presets) {
            setPresets(initialPresets);
        }
    }, [presets, setPresets]);

    const defaultedOptions = useMemo(
        () =>
            ({
                ...defaultOptions,
                ...options,
            } as SDOptionsType),
        [options]
    );
    const [{ sdUri }] = useLocalSettings(["sdUri"]);
    console.log("sdUri", sdUri);
    const [status, setStatus] = useState<{
        isPending: boolean;
        value: any | null; // TODO: type this
        error: Error | null;
    }>({
        isPending: false,
        value: null,
        error: null,
    });

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

    const txt2Image = useCallback(
        async (prompt: string, options: Omit<{}, "prompt"> = {}) => {
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

            const data = JSON.stringify({
                prompt,
                ...defaultedOptions,
                ...selectedPreset,
                ...options,
            });
            const uri = sdUri + "sdapi/v1/txt2img";
            console.log("request", uri, data);
            fetch(uri, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data,
            })
                .then(async (rawData) => {
                    const data = await rawData.json();
                    console.log("result", data);
                    setStatus((status) => ({
                        ...status,
                        isPending: false,
                        value: data,
                    }));
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
        [sdUri]
    );

    const presetOptions = useMemo(() => {
        if (!presets) {
            return [noPresetOption];
        }
        return presets.map((preset) => ({
            label: preset.label,
            value: preset.label,
        }));
    }, [presets]);

    return { ...status, presets, presetOptions, selectedPresetOption, setSelectedPresetOption, txt2Image };
};
