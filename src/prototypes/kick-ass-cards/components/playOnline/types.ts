import { DocMetaType } from "../../services/firestoreController";

export enum ActionTypeEnum {
    Reset = "Reset",
    AddElement = "AddElement",
    UpdateElement = "UpdateElement",
    RemoveElement = "RemoveElement",
}

export type ActionType = {
    type: ActionTypeEnum;
};

export enum ElementTypeEnum {
    Text = "Text",
    ActorCard = "ActorCard",
}

export type ElementPropsType = {
    x: number;
    y: number;
    z: number;
    width: number;
    height: number;
};

export type ElementType = {
    type: ElementTypeEnum;
    componentProps: any;
    elementProps: ElementPropsType;
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
    contents?: ElementType[];
};
