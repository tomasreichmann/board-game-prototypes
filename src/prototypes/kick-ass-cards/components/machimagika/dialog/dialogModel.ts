import { ContentItemProps } from "../content/sharedContentProps";
import newGameDialog from "../dialogs/newGameDialog";
import { GameStateType } from "../model/gameState";
import { GameActionTypeEnum } from "../reducer/gameReducer";
import { SceneEnum } from "../scene/sceneModel";

export type DialogNodeType = {
    nodeId: string;
    content: ContentItemProps[];
};

export type DialogType = {
    dialogId?: keyof typeof dialogMap;
    backgroundContent?: ContentItemProps[];
    nodeMap: { [key: string]: DialogNodeType };
};

export type DialogStateType = {
    dialogId?: keyof typeof dialogMap;
    currentNodeId?: string;
    backgroundContent?: ContentItemProps[];
    history?: ContentItemProps[];
};

export type DialogActionType = {
    id: string;
    type: GameActionTypeEnum;
    changeNodeId?: string;
    setFlags?: Partial<FlagMapType>;
    isSelected?: boolean;
    backgroundContent?: any;
    delayMs?: number;
    scene?: SceneEnum;
} & Partial<Pick<GameStateType, "regionId" | "locationId">>;

export type DialogNodeMapType = { [key: string]: DialogNodeType };

export type FlagMapType = {
    watchedSunset?: boolean;
};

export const dialogMap = {
    newGame: newGameDialog,
};

export type DialogIdType = keyof typeof dialogMap;
