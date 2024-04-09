import { useEffect, useState, useRef, type MutableRefObject, useCallback } from "react";

export const getStoredData = (storageKey: string) => window.localStorage.getItem(storageKey);

export const parseStoredData = <StoreType>(rawData: string | null): StoreType => {
    const parsedData = rawData !== null && rawData !== undefined ? JSON.parse(rawData) : null;
    return parsedData;
};

export const updateState = <StoreType>(rawData: string | null, setter: (data: StoreType) => void) => {
    setter(parseStoredData<StoreType>(rawData));
};

export const useLocalStorage = <StoreType>(storageKey: string | null, defaultValue: StoreType | null = null) => {
    const initialState = storageKey ? () => parseStoredData<StoreType>(getStoredData(storageKey)) : defaultValue;
    const [storeData, setStoreData] = useState<StoreType | null>(initialState);

    useEffect(() => {
        if (storageKey !== null) {
            const storedData = getStoredData(storageKey);
            updateState(storedData, setStoreData);
            const onStorageUpdate = () => {
                updateState(getStoredData(storageKey), setStoreData);
            };
            // get updates from this tab
            window.addEventListener("storageUpdate", onStorageUpdate as any);
            const onStorage = (event: StorageEvent) => {
                if (event.storageArea != localStorage) return;
                if (event.key === storageKey) {
                    updateState(event.newValue, setStoreData);
                }
            };
            // get updates from other tabs
            window.addEventListener("storage", onStorage);
            return () => {
                window.removeEventListener("storage", onStorage);
                window.removeEventListener("storageUpdate", onStorageUpdate);
            };
        }
    }, [storageKey, setStoreData]);

    const updateStore = useCallback(
        (setter: StoreType | ((data: StoreType | null) => StoreType | null) | null): void => {
            if (storageKey === null) {
                return;
            }
            const newData =
                typeof setter === "function"
                    ? (setter as (data: StoreType | null) => StoreType | null)(
                          parseStoredData(getStoredData(storageKey))
                      )
                    : setter;
            // This updates other tabs
            window.localStorage.setItem(storageKey, JSON.stringify(newData));
            const event = new Event("storageUpdate");
            // This updates all hooks on this tab
            window.dispatchEvent(event);
        },
        [storageKey]
    );

    return [storeData, updateStore] as const;
};
