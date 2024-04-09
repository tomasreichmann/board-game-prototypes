import { useCallback, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const localSettingsKey = "local-settings";

export const defaultSettings = {
    mistralKey: "",
    sdUri: "http://127.0.0.1:7860/",
    aiHordeToken: "",
};

export type LocalSettingsType = typeof defaultSettings;
export type LocalSettingsKeyType = keyof LocalSettingsType;

export const getSettingsKey = <Key extends LocalSettingsKeyType>(key: Key) => {
    const raw = localStorage.getItem(localSettingsKey);
    if (!raw) {
        return null;
    }
    try {
        return raw ? (JSON.parse(raw)[key] as LocalSettingsType[typeof key]) : null;
    } catch (e) {
        console.error("Error parsing local settings", e);
        return null;
    }
};

export const useLocalSettings = <Keys extends LocalSettingsKeyType>(keys: Keys[]) => {
    const [localSettings, setLocalSettings] = useLocalStorage<LocalSettingsType>(localSettingsKey);

    const keySettings = useMemo(() => {
        const keySettings: { [key in Keys]?: any } = {};
        const isLocalSettingsValid = typeof localSettings === "object" && localSettings !== null;
        [...keys].forEach((key) => {
            keySettings[key] = isLocalSettingsValid && key in localSettings ? localSettings[key] : null;
        });
        return keySettings;
    }, [keys]);

    const setKeySettings = useCallback((values: Record<Keys, any>) => {
        setLocalSettings((settings) => {
            const newSettings = {
                ...settings,
                ...values,
            } as LocalSettingsType;
            return newSettings;
        });
    }, []);

    return [keySettings, setKeySettings] as const;
};
