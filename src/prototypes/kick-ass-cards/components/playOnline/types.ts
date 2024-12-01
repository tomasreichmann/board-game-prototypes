import { PerspectiveViewStateType } from "../../../../components/PerspectiveView/perspectiveViewModel";
import { PositionProps } from "../../../../components/PerspectiveView/Position";
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
    ContentItemClick = "ContentItemClick",
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
    | { type: ActionTypeEnum.LeaveGameAsStoryteller; user: UserResource }
    | { type: ActionTypeEnum.ContentItemClick; user: UserResource; itemId: string };

export enum ContentItemTypeEnum {
    PlaceholderCard = "PlaceholderCard",
    Pre = "Pre",
    Text = "Text",
    //ActorCard = "ActorCard",
    OutcomeCard = "OutcomeCard",
    Div = "Div",
    ToggleCheckbox = "ToggleCheckbox",
    FlippableTest = "FlippableTest",
}

export type ContentItemPassedProps = {
    isHighlighted?: boolean;
    isClickable?: boolean;
    isSelected?: boolean;
};

export type ContentItemType = {
    id: string;
    type: ContentItemTypeEnum;
    componentProps: any;
    positionProps: PositionProps;
    castShadow?: boolean;
    ownerUid?: string;
    isHighlightedForOwner?: boolean;
    isHighlightedForStoryteller?: boolean;
    isClickableForOwner?: boolean;
    isClickableForStoryteller?: boolean;
    isSelectedForOwner?: boolean;
    isSelectedForStoryteller?: boolean;
} & ContentItemPassedProps;

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
    Debug = "Debug",
    Misc = "Misc",
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

export type LayoutType = {
    id: string;
    type: LayoutTypeEnum;
    ownerId?: string;
    content: ContentItemType[];
};

// export type LayoutType = HandLayoutType | DeckLayoutType | SpreadLayoutType;

// TODO: refactor to use homogenous types
export type GameLayoutType = Partial<{ [key in LayoutTypeEnum]: LayoutType[] }>;

export type GameDocType = {
    id: string;
    name?: string;
    description?: string;
    isDebugging?: boolean;
    imageUri?: string;
    meta?: DocMetaType;
    viewState?: Partial<PerspectiveViewStateType>;
    state: GameStateEnum;
    layouts: LayoutType[];
    playerIds?: string[];
    players?: UserMetaType[];
    storytellerIds?: string[];
    storytellers?: UserMetaType[];
};
