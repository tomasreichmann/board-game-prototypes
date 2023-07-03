import { ContentItemProps } from "../content/sharedContentProps";
import newGameDialog from "../dialogs/newGameDialog";

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
    history?: DialogNodeType[];
};

export type DialogNodeMapType = { [key: string]: DialogNodeType };

export type FlagMapType = {
    watchedSunset?: boolean;
};

export const dialogMap = {
    newGame: newGameDialog,
};

export type DialogIdType = keyof typeof dialogMap;
