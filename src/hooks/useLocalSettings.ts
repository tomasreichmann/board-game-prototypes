import { useCallback, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const localSettingsKey = "local-settings";

export const useLocalSettings = <Keys extends string[]>(keys: Keys) => {
    const [localSettings, setLocalSettings] = useLocalStorage(localSettingsKey);

    const keySettings = useMemo(() => {
        const keySettings: { [key: string]: any } = {};
        const isLocalSettingsValid = typeof localSettings === "object" && localSettings !== null;
        [...keys].forEach((key) => {
            keySettings[key] =
                isLocalSettingsValid && key in localSettings ? (localSettings as { [key: string]: any })[key] : null;
        });
        return keySettings;
    }, [keys]);

    const setKeys = useCallback((values: Record<Keys[number], any>) => {
        setLocalSettings((settings: Record<Keys[number], any>) => {
            const newSettings = {
                ...settings,
                ...values,
            };
            return newSettings;
        });
    }, []);

    return [keySettings, setKeys] as const;
};
