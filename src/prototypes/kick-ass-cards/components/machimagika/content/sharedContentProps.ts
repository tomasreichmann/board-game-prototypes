import { PropsType } from "../../../../../utils/PropsType";
import { ConditionType } from "../utils/Conditional";
import DialogAction from "./DialogAction";
import DialogIntrospection from "./DialogIntrospection";
import Pre from "./Pre";
import Image from "./Image";

export const contentComponentMap = {
    DialogIntrospection,
    DialogAction,
    Pre,
    Image,
};

type ComponentObjectType3 = {
    [key in keyof typeof contentComponentMap]?: PropsType<(typeof contentComponentMap)[key]>;
};

export type SharedContentProps = {
    componentMap?: typeof contentComponentMap;
    children?: ContentItemProps[] | ContentItemProps | string;
};

export type ContentItemProps = {
    conditions?: ConditionType[];
    component: ComponentObjectType3;
} & SharedContentProps;
