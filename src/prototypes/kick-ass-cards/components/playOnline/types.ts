import { DocMetaType, UserMetaType } from "../../services/firestoreController";
import { UserResource } from "@clerk/types";

export enum ActionTypeEnum {
    ResetGame = "ResetGame",
    StartGame = "StartGame",
    UpdateGame = "UpdateGame",
    RemoveGame = "RemoveGame",
    ClaimGame = "ClaimGame",
    JoinGameAsPlayer = "JoinGameAsPlayer",
    LeaveGameAsPlayer = "LeaveGameAsPlayer",
    JoinGameAsStoryteller = "JoinGameAsStoryteller",
    LeaveGameAsStoryteller = "LeaveGameAsStoryteller",
    AddElement = "AddElement",
    UpdateElement = "UpdateElement",
    RemoveElement = "RemoveElement",
}

export type ActionType =
    | { type: ActionTypeEnum.ResetGame }
    | { type: ActionTypeEnum.StartGame }
    | { type: ActionTypeEnum.UpdateGame; updater: (game: GameDocType) => GameDocType }
    | { type: ActionTypeEnum.RemoveGame }
    | { type: ActionTypeEnum.ClaimGame; user: UserResource }
    | { type: ActionTypeEnum.JoinGameAsPlayer; user: UserResource }
    | { type: ActionTypeEnum.LeaveGameAsPlayer; user: UserResource }
    | { type: ActionTypeEnum.JoinGameAsStoryteller; user: UserResource }
    | { type: ActionTypeEnum.LeaveGameAsStoryteller; user: UserResource };

export enum ContentItemTypeEnum {
    Text = "Text",
    ActorCard = "ActorCard",
    OutcomeCard = "OutcomeCard",
}

export type ContentItemPropsType = {
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

export enum LayoutTypeEnum {
    Hand = "Hand",
    Deck = "Deck",
    Spread = "Spread",
    Center = "Center",
}

export type HandLayoutType = {
    id: string;
    type: LayoutTypeEnum.Hand;
    ownerId: string;
    content: ContentItemType[];
};

export type DeckLayoutType = {
    id: string;
    type: LayoutTypeEnum.Deck;
    ownerId: string;
    content: ContentItemType[];
};

export type SpreadLayoutType = {
    type: LayoutTypeEnum.Spread;
    id: string;
    content: ContentItemType[];
};

export type GameLayoutType = {
    handMap: { [key: string]: HandLayoutType };
    deckMap: { [key: string]: DeckLayoutType };
    spreadMap: { [key: string]: SpreadLayoutType };
};

export type GameDocType = {
    id: string;
    name?: string;
    description?: string;
    imageUri?: string;
    meta?: DocMetaType;
    state: GameStateEnum;
    layout: GameLayoutType;
    playerIds?: string[];
    players?: UserMetaType[];
    storytellerIds?: string[];
    storytellers?: UserMetaType[];
};