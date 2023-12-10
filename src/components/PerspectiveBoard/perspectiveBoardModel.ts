import { PositionType } from "../PerspectiveViewX/Position";

export type BoardPositionType = Omit<PositionType, "scale"> & {
    width: number;
    height: number;
    draggable?: boolean;
};

export type ComponentDefinitionType = {
    id: string;
    width: number;
    height: number;
    componentName: string;
    props: { [key: string]: any };
};

export enum BoardContentItemTypeEnum {
    Single = "Single",
    Spread = "Spread",
    Hand = "Hand",
    Stack = "Stack",
}

export type SingleItemType = {
    type: BoardContentItemTypeEnum.Single;
    position: BoardPositionType;
    component: ComponentDefinitionType;
};

export type SpreadItemType = {
    type: BoardContentItemTypeEnum.Spread;
    position: BoardPositionType;
    components: ComponentDefinitionType[];
};

export type HandItemType = {
    type: BoardContentItemTypeEnum.Hand;
    position: BoardPositionType;
    components: ComponentDefinitionType[];
};

export type StackItemType = {
    type: BoardContentItemTypeEnum.Stack;
    position: BoardPositionType;
    components: ComponentDefinitionType[];
};

export type BoardContentItemType = SingleItemType | SpreadItemType | HandItemType;

export type BoardPositionItemType = BoardPositionType & ComponentDefinitionType;

export type PerspectiveBoardStateType = {
    content: BoardContentItemType[];
    positionItems: BoardPositionItemType[];
};

export const initialPerspectiveBoardState: PerspectiveBoardStateType = {
    content: [],
    positionItems: [],
};
