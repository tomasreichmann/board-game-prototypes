import { CSSProperties, useCallback, useEffect, useReducer } from "react";

export const storageKey = "kac-screen";

export enum AnimationEnum {
    FadeOut = "fadeOut",
    FadeIn = "fadeIn",
}

export enum ScreenContentTypeEnum {
    Image = "Image",
}

export type ScreenImageContentType = {
    type: ScreenContentTypeEnum.Image;
    id: string;
    uri: string;
    style?: CSSProperties;
    animation?: AnimationEnum;
};

export type ScreenContentType = ScreenImageContentType;

export type ScreenStoreType = {
    content: ScreenContentType[];
    style?: CSSProperties;
};

export enum ScreenStoreActionTypeEnum {
    Set = "Set",
    AppendContent = "AppendContent",
    ReplaceContent = "ReplaceContent",
    UpdateContentById = "UpdateContentById",
}

export type ScreenStoreActionType =
    | {
          type: ScreenStoreActionTypeEnum.Set;
          store: ScreenStoreType;
      }
    | {
          type: ScreenStoreActionTypeEnum.ReplaceContent;
          content: ScreenContentType[];
      }
    | {
          type: ScreenStoreActionTypeEnum.AppendContent;
          content: ScreenContentType[];
      };

export const screenStoreReducer = (store: ScreenStoreType, action: ScreenStoreActionType): ScreenStoreType => {
    if (action.type === ScreenStoreActionTypeEnum.Set) {
        return action.store;
    }
    if (action.type === ScreenStoreActionTypeEnum.ReplaceContent) {
        return {
            ...store,
            content: action.content,
        };
    }
    if (action.type === ScreenStoreActionTypeEnum.AppendContent) {
        return {
            ...store,
            content: [...store.content, ...action.content],
        };
    }
    return store;
};

export const getStoredData = () => window.localStorage.getItem(storageKey);

export const parseStoredData = (rawData: string | null): ScreenStoreType => {
    const parsedData = rawData !== null ? JSON.parse(rawData) : null;
    return parsedData;
};

export const updateState = (rawData: string | null, setter: (data: ScreenStoreType) => void) => {
    setter(parseStoredData(rawData));
};

export const initialStore: ScreenStoreType = {
    content: [],
    style: {
        backgroundColor: "black",
    },
};

export const useBroadcastData = () => {
    const [storeData, dispatch] = useReducer(screenStoreReducer, parseStoredData(getStoredData()) || initialStore);

    const broadcastData = useCallback((newStoreData: ScreenStoreType) => {
        dispatch({ type: ScreenStoreActionTypeEnum.Set, store: newStoreData });
    }, []);

    useEffect(() => {
        const storedData = window.localStorage.getItem(storageKey);
        updateState(storedData, broadcastData);
        const onStorageUpdate = (event: StorageEvent) => {
            if (event.storageArea != localStorage) return;
            if (event.key === storageKey) {
                updateState(event.newValue, broadcastData);
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
    return { storeData, broadcastData, dispatch };
};
