import { DocMetaType, UserMetaType } from "../../services/firestoreController";

export enum ActionTypeEnum {
    Reset = "Reset",
    AddElement = "AddElement",
    UpdateElement = "UpdateElement",
    RemoveElement = "RemoveElement",
}

export type ActionType = {
    type: ActionTypeEnum;
};

export enum ContentItemTypeEnum {
    Text = "Text",
    ActorCard = "ActorCard",
}

export type ContentItemPropsType = {
    x: number;
    y: number;
    z: number;
    width: number;
    height: number;
};

export type ContentItemType = {
    type: ContentItemTypeEnum;
    componentProps: any;
    elementProps: ContentItemPropsType;
};

export enum GameStateEnum {
    Ready = "Ready",
    InProgress = "InProgress",
    Finished = "Finished",
}

export type GameDocType = {
    id: string;
    name?: string;
    description?: string;
    imageUri?: string;
    meta?: DocMetaType;
    state: GameStateEnum;
    contents?: ContentItemType[];
    playerIds?: string[];
    players?: UserMetaType[];
    storytellerIds?: string[];
    storytellers?: UserMetaType[];
};
