import { useEffect, useState } from "react";

export const getStoredData = (storageKey: string) => window.localStorage.getItem(storageKey);

export const parseStoredData = <StoreType>(rawData: string | null): StoreType => {
    const parsedData = rawData !== null ? JSON.parse(rawData) : null;
    return parsedData;
};

export const updateState = <StoreType>(rawData: string | null, setter: (data: StoreType) => void) => {
    setter(parseStoredData<StoreType>(rawData));
};

export const useLocalStorage = <StoreType>(storageKey: string) => {
    const [storeData, setStoreData] = useState(parseStoredData<StoreType>(getStoredData(storageKey)));

    useEffect(() => {
        const storedData = window.localStorage.getItem(storageKey);
        updateState(storedData, setStoreData);
        const onStorageUpdate = (event: StorageEvent) => {
            if (event.storageArea != localStorage) return;
            if (event.key === storageKey) {
                updateState(event.newValue, setStoreData);
            }
        };
        window.addEventListener("storage", onStorageUpdate);
        return () => {
            window.removeEventListener("storage", onStorageUpdate);
        };
    }, []);

    useEffect(() => {
        const serializedStore = JSON.stringify(storeData);
        const storedData = window.localStorage.getItem(storageKey);
        if (serializedStore !== storedData) {
            window.localStorage.setItem(storageKey, serializedStore);
        }
    }, [storeData]);
    return [storeData, setStoreData];
};
