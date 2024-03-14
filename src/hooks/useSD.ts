import { useCallback, useEffect, useMemo, useState } from "react";

import { useLocalSettings } from "./useLocalSettings";

const NO_KEY_ERROR = "No URI available. Set it in settings.";

export type SDOptionsType = {
    defaultSampler?: string;
    defaultStepCount?: number;
};

export const useSD = ({ defaultSampler = "DPM++ 2M Karras", defaultStepCount = 20 }: SDOptionsType = {}) => {
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
                .then((rawData) => {
                    const data = rawData.json();
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

    return { ...status, txt2Image };
};
