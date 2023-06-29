import { twMerge } from "tailwind-merge";
import { defaultComponentMap } from "../../ContentItem";
import { DialogActionType, DialogConditionType } from "../GameContext";

export type BackgroundComponentType = "Image";

export const NormalizedDialogChildren = (props: DialogContentItemProps) => {
    if (typeof props.children === "object") {
        if (Array.isArray(props.children)) {
            return (
                <>
                    {props.children.map((child, index) => (
                        <DialogContentItem key={index} {...child} />
                    ))}
                </>
            );
        }
        return <DialogContentItem {...(props.children as DialogContentItemProps)} />;
    }
    return <>{props.children}</>;
};

export const Introspection = (props: DialogContentItemProps) => (
    <div className={twMerge("text-lg", props.className)}>
        <NormalizedDialogChildren {...props}>{props.children}</NormalizedDialogChildren>
    </div>
);
export const PcSpeech = (props: DialogContentItemProps) => (
    <div className={twMerge("text-lg", props.className)}>
        <NormalizedDialogChildren {...props}>{props.children}</NormalizedDialogChildren>
    </div>
);
export const NpcSpeech = (props: DialogContentItemProps) => (
    <div className={twMerge("text-lg", props.className)}>
        <NormalizedDialogChildren {...props}>{props.children}</NormalizedDialogChildren>
    </div>
);
export const Action = (props: DialogContentItemProps) => {
    // todo disptch action on click
    return (
        <div className={twMerge("text-lg", props.className)}>
            <NormalizedDialogChildren {...props}>{props.children}</NormalizedDialogChildren>
        </div>
    );
};

const dialogComponentMap = {
    Introspection,
    PcSpeech,
    NpcSpeech,
    Action,
};

export type DialogContentItemProps = {
    className?: string;
    conditions?: DialogConditionType[];
    action?: DialogActionType;
    componentMap?: typeof defaultComponentMap;
    component: "Introspection" | "PcSpeech" | "NpcSpeech" | "Action";
    children: DialogContentItemProps[] | string;
};

export default function DialogContentItem(props: DialogContentItemProps) {
    const { component, componentMap, conditions, ...restProps } = props;
    const Component = componentMap?.[component] ?? dialogComponentMap.Introspection;
    //todo conditions
    return (
        <>
            <Component {...props} />
        </>
    );
}
