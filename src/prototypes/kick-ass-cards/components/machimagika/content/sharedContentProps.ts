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

type ComponentPropsType<C extends keyof typeof contentComponentMap> = PropsType<(typeof contentComponentMap)[C]>;
type ComponentMultipleObjectType<C extends keyof typeof contentComponentMap> = {
    [key in C]: Omit<ComponentPropsType<C>, "componentMap">;
};
type Values<T> = T[keyof T];
type OneProperty<T, K extends keyof T> = Pick<T, K>;
type UnionOfOneProperties<T> = Values<{ [K in keyof T]: OneProperty<T, K> }>;
type ComponentObjectType = UnionOfOneProperties<ComponentMultipleObjectType<keyof typeof contentComponentMap>>;
type ComponentObjectType2 = Partial<ComponentMultipleObjectType<keyof typeof contentComponentMap>>;

export type SharedContentProps = {
    componentMap?: typeof contentComponentMap;
    children?: ContentItemProps[] | ContentItemProps | string;
};

export type ContentItemProps = {
    conditions?: ConditionType[];
    component: ComponentObjectType2;
} & SharedContentProps;
