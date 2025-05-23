import { CSSProperties, useCallback, useEffect, useReducer } from "react";
import Paper, { PaperProps } from "../../../components/print/Paper/Paper";
import Clock, { ClockProps } from "../components/Clock";
import ActorCard, { ActorCardProps } from "../components/gameComponents/ActorCard";
import AssetCard, { AssetCardProps } from "../components/gameComponents/AssetCard";
import EffectCard, { EffectCardProps } from "../components/gameComponents/EffectCard";
import PaperMini, { PaperMiniProps } from "../components/gameComponents/PaperMini";
import Image, { ImageProps } from "../components/Image";
import Heading, { HeadingProps } from "../components/Heading";
import CounterCard from "../components/gameComponents/CounterCard";
import GenericCounterCard, { GenericCounterCardProps } from "../components/gameComponents/GenericCounterCard";
import StuntCard from "../components/gameComponents/StuntCard";
import ActorCardWithTacticalOverlay from "../components/gameComponents/ActorCardWithTacticalOverlay";

export enum AnimationEnum {
    FadeOut = "fadeOut",
    FadeIn = "fadeIn",
}

export enum ScreenContentTypeEnum {
    Image = "Image",
    Heading = "Heading",
    Actor = "Actor",
    ActorCardWithTacticalOverlay = "ActorCardWithTacticalOverlay",
    Asset = "Asset",
    Clock = "Clock",
    Counter = "Counter",
    StuntCard = "StuntCard",
    GenericCounterCard = "GenericCounterCard",
    Effect = "Effect",
    PaperMini = "PaperMini",
    Paper = "Paper",
}

export type SharedContentType = {
    id: string;
    style?: CSSProperties;
    animation?: AnimationEnum;
};

export type ScreenImageContentType = {
    type: ScreenContentTypeEnum.Image;
    props: ImageProps;
} & SharedContentType;

export type ActorContentType = {
    type: ScreenContentTypeEnum.Actor;
    props: ActorCardProps;
} & SharedContentType;

export type HeadingContentType = {
    type: ScreenContentTypeEnum.Heading;
    props: HeadingProps;
} & SharedContentType;

export type AssetContentType = {
    type: ScreenContentTypeEnum.Asset;
    props: AssetCardProps;
} & SharedContentType;

export type ClockContentType = {
    type: ScreenContentTypeEnum.Clock;
    props: ClockProps;
} & SharedContentType;

export type EffectContentType = {
    type: ScreenContentTypeEnum.Effect;
    props: EffectCardProps;
} & SharedContentType;

export type PaperMiniContentType = {
    type: ScreenContentTypeEnum.PaperMini;
    props: PaperMiniProps;
} & SharedContentType;

export type PaperContentType = {
    type: ScreenContentTypeEnum.Paper;
    props: PaperProps;
} & SharedContentType;

export type GenericCounterCardContentType = {
    type: ScreenContentTypeEnum.GenericCounterCard;
    props: GenericCounterCardProps;
} & SharedContentType;

export type ScreenContentType =
    | ScreenImageContentType
    | HeadingContentType
    | ActorContentType
    | AssetContentType
    | ClockContentType
    | EffectContentType
    | PaperMiniContentType
    | GenericCounterCardContentType
    | PaperContentType;

export const typeComponentMap = {
    [ScreenContentTypeEnum.Image]: Image,
    [ScreenContentTypeEnum.Heading]: Heading,
    [ScreenContentTypeEnum.Actor]: ActorCard,
    [ScreenContentTypeEnum.Asset]: AssetCard,
    [ScreenContentTypeEnum.Clock]: Clock,
    [ScreenContentTypeEnum.Counter]: CounterCard,
    [ScreenContentTypeEnum.GenericCounterCard]: GenericCounterCard,
    [ScreenContentTypeEnum.Effect]: EffectCard,
    [ScreenContentTypeEnum.PaperMini]: PaperMini,
    [ScreenContentTypeEnum.Paper]: Paper,
    [ScreenContentTypeEnum.ActorCardWithTacticalOverlay]: ActorCardWithTacticalOverlay,
    [ScreenContentTypeEnum.StuntCard]: StuntCard,
};

export type ScreenStoreType = {
    content: ScreenContentType[];
    style?: CSSProperties;
};

export enum ScreenStoreActionTypeEnum {
    Set = "Set",
    AppendContent = "AppendContent",
    ReplaceContent = "ReplaceContent",
    UpdateContent = "UpdateContent",
    RemoveContent = "RemoveContent",
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
      }
    | {
          type: ScreenStoreActionTypeEnum.RemoveContent;
          id: ScreenContentType["id"];
      };

export const screenStoreReducer = (store: ScreenStoreType, action: ScreenStoreActionType): ScreenStoreType => {
    if (action.type === ScreenStoreActionTypeEnum.Set) {
        if (JSON.stringify(action.store) !== JSON.stringify(store)) {
            return action.store;
        }
        return store;
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
    if (action.type === ScreenStoreActionTypeEnum.RemoveContent) {
        const contentItemIndex = store.content.findIndex((item) => item.id === action.id);
        if (contentItemIndex === -1) {
            console.warn("Cannot remove item with id", action.id);
            return store;
        }
        const newContent = [...store.content.slice(0, contentItemIndex), ...store.content.slice(contentItemIndex + 1)];
        return {
            ...store,
            content: newContent,
        };
    }
    return store;
};

export const getStoredData = (storageKey: string) => window.localStorage.getItem(storageKey);

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

export const useBroadcastData = (storageKey: string) => {
    const [storeData, dispatch] = useReducer(
        screenStoreReducer,
        parseStoredData(getStoredData(storageKey)) || initialStore
    );

    const broadcastData = useCallback((newStoreData: ScreenStoreType) => {
        dispatch({ type: ScreenStoreActionTypeEnum.Set, store: newStoreData });
    }, []);

    useEffect(() => {
        const storedData = window.localStorage.getItem(storageKey);
        updateState(storedData, broadcastData);
        const onStorageUpdate = (event: StorageEvent) => {
            if (event.storageArea === localStorage && event.key === storageKey) {
                updateState(event.newValue, broadcastData);
            }
        };
        window.addEventListener("storage", onStorageUpdate);
        return () => {
            window.removeEventListener("storage", onStorageUpdate);
        };
    }, [storageKey]);

    useEffect(() => {
        const serializedStore = JSON.stringify(storeData);
        const storedData = window.localStorage.getItem(storageKey);
        if (serializedStore !== storedData) {
            window.localStorage.setItem(storageKey, serializedStore);
            const event: Event & { key?: string; storageArea?: Storage; newValue?: string } = new Event("storage");
            event.key = storageKey;
            event.storageArea = localStorage;
            event.newValue = serializedStore;
            window.dispatchEvent(event);
        }
    }, [storeData]);
    return { storeData, broadcastData, dispatch };
};
