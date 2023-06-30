import { StateType } from "../GameContext";
import newGameDialog from "../dialogs/newGameDialog";
import { DialogContentItemProps } from "./DialogContentItem";

export type DialogConditionType = {
    selector: string;
    value?: any;
    minValue?: number;
    maxValue?: number;
};

export type DialogActionBaseType = {
    children: DialogContentItemProps[];
    setFlags?: Partial<FlagMapType>;
};

export type DialogActionType = {
    id: string;
    changeNodeId?: string;
    setFlags?: Partial<FlagMapType>;
    isSelected?: boolean;
    backgroundContent?: any;
    delayMs?: number;
} & Partial<Pick<StateType, "scene" | "regionId" | "locationId" | "dialogId">>;

export type DialogNodeType = {
    id: string;
    content: DialogContentItemProps[];
};
export type DialogNodeMapType = { [key: string]: DialogNodeType };

export type DialogStateType = {
    id: string;
    currentNodeId: string;
    backgroundContent?: any;
    nodeMap: DialogNodeMapType;
    history?: DialogContentItemProps[];
};

export type FlagMapType = {
    watchedSunset?: boolean;
};

export const dialogMap = {
    newGame: newGameDialog,
};

export type DialogIdType = keyof typeof dialogMap;
