import { OutcomeType, AssetType } from "../../../types";
import { DialogIdType, DialogStateType, FlagMapType } from "../dialog/dialogModel";
import { LocationStateType } from "../location/locationModel";
import { GameActionType } from "../reducer/gameReducer";

export type GameScheduledActionType = {
    id?: number;
    action: GameActionType;
    delayMs: number;
};

export type GameScheduledActionsType = {
    scheduledActions?: Required<GameScheduledActionType>[];
};

export enum VisibilityEnum {
    Visible = "Visible",
    Hidden = "Hidden",
    FadeIn = "FadeIn",
    FadeOut = "FadeOut",
}

export type GameStateType = {
    isEditorEnabled?: boolean;
    mainMenuVisibility: VisibilityEnum;
    editorVisibility: VisibilityEnum;
    regionId?: string;
    regionVisibility: VisibilityEnum;
    location: LocationStateType;
    locationVisibility: VisibilityEnum;
    dialog: DialogStateType;
    dialogVisibility: VisibilityEnum;
    hand: OutcomeType[];
    flagMap: FlagMapType;
    inventory: AssetType[];
    inventoryVisibility: VisibilityEnum;
    scheduledActions: Required<GameScheduledActionType>[];
    lastScheduledActionId: number;
};

export const initialState: GameStateType = {
    isEditorEnabled: true,
    mainMenuVisibility: VisibilityEnum.Visible,
    editorVisibility: VisibilityEnum.Hidden,
    inventoryVisibility: VisibilityEnum.Hidden,
    dialogVisibility: VisibilityEnum.Hidden,
    locationVisibility: VisibilityEnum.Hidden,
    regionVisibility: VisibilityEnum.Hidden,
    flagMap: {},
    dialog: {},
    location: {},
    hand: [],
    inventory: [],
    scheduledActions: [],
    lastScheduledActionId: -1,
};
