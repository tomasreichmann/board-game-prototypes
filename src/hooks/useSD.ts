import { useCallback, useEffect, useMemo, useState } from "react";
// import StableDiffusionApi, { Txt2ImgOptions } from "a1111-webui-api";

import { useLocalSettings } from "./useLocalSettings";

const NO_KEY_ERROR = "No URI available. Set it in settings.";

export type SDOptionsType = {
    defaultSampler?: string;
    defaultStepCount?: number;
};

export const useSD = ({ defaultSampler = "DPM++ 2M Karras", defaultStepCount = 20 }: SDOptionsType = {}) => {
    const [{ sdUri }] = useLocalSettings(["sdUri"]);
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

    const api = useMemo(() => {
        if (!sdUri) {
            return null;
        }
        /*return new StableDiffusionApi({
            baseUrl: sdUri,
            defaultSampler,
            defaultStepCount,
        });*/
    }, [sdUri]);

    const txt2Image = useCallback(
        async (prompt: string, options: Omit<{}, "prompt"> = {}) => {
            if (!api) {
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
            /*
            const result = await api.txt2img({
                prompt,
                ...options,
            });
            result.image
                .toFormat("png")
                .toBuffer()
                .then((data) => {
                    console.log(data);
                    setStatus((status) => ({
                        ...status,
                        isPending: false,
                        value: data,
                    }));
                })
                .catch((error) => {
                    setStatus((status) => ({
                        ...status,
                        isPending: false,
                        error,
                    }));
                });*/
        },
        [api]
    );

    return { ...status, txt2Image };
};
