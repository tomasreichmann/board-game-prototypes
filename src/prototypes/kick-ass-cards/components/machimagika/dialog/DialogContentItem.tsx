import { twMerge } from "tailwind-merge";
import { defaultComponentMap } from "../../ContentItem";
import { DialogActionType, DialogConditionType } from "./dialogModel";
import useGameContext from "../GameContext";
import {
    AddScheduledActionActionType,
    DialogActionGameActionType,
    GameActionType,
    GameActionTypeEnum,
} from "../reducer/gameReducer";
import { CSSProperties } from "react";
import AnimateText from "../typography/AnimateText";

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
    /*if (typeof props.children === "string") {
        return <AnimateText>{props.children}</AnimateText>;
    }*/
    return <>{props.children}</>;
};

export const Introspection = ({ className, style, children, ...restProps }: DialogContentItemProps) => (
    <div className={twMerge("transition-all", className)} style={style}>
        <NormalizedDialogChildren {...restProps}>{children}</NormalizedDialogChildren>
    </div>
);
export const PcSpeech = ({ className, style, children, ...restProps }: DialogContentItemProps) => (
    <div className={twMerge("transition-all", className)} style={style}>
        <NormalizedDialogChildren {...restProps}>{children}</NormalizedDialogChildren>
    </div>
);
export const NpcSpeech = ({ className, style, children, ...restProps }: DialogContentItemProps) => (
    <div className={twMerge("transition-all", className)} style={style}>
        <NormalizedDialogChildren {...restProps}>{children}</NormalizedDialogChildren>
    </div>
);
export const Action = ({ className, style, children, action, ...restProps }: DialogContentItemProps) => {
    const { dispatch } = useGameContext();

    const content = (
        <>
            ▶&ensp;<NormalizedDialogChildren {...restProps}>{children}</NormalizedDialogChildren>{" "}
            <span className="font-normal">(&gt; #{action?.changeNodeId})</span>
        </>
    );
    // todo dispatch action on click
    if (action?.isSelected === true) {
        return (
            <div
                className={twMerge(
                    "font-mmHeading font-bold text-amber-100 scale-125 origin-left transform-gpu transition-transform duration-200 self-start",
                    className
                )}
                style={style}
            >
                {content}
            </div>
        );
    }
    if (action?.isSelected === false) {
        return (
            <div
                className={twMerge(
                    "font-mmHeading font-bold text-amber-100 origin-left transform-gpu transition-transform duration-200 self-start",
                    className
                )}
                style={style}
            >
                {content}
            </div>
        );
    }

    if (!action) {
        return null;
    }

    const actionItem: DialogActionGameActionType = { type: GameActionTypeEnum.DialogAction, ...action };
    const delayedActionItem = action?.delayMs
        ? ({
              type: GameActionTypeEnum.AddScheduledActions,
              addScheduledActions: [{ action: actionItem, delayMs: action.delayMs }],
          } as AddScheduledActionActionType)
        : actionItem;

    delayedActionItem;

    return (
        <button
            className={twMerge(
                "font-mmHeading font-bold text-amber-100 hover:scale-125  focus:scale-125 bg-transparent focus:outline-0 focus:border-0 p-0 outline-0 border-0 origin-left transform-gpu transition-transform duration-200 self-start",
                className
            )}
            style={style}
            onClick={() => action && dispatch(delayedActionItem)}
        >
            {content}
        </button>
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
    style?: CSSProperties;
    conditions?: DialogConditionType[];
    action?: DialogActionType;
    componentMap?: typeof defaultComponentMap;
    component: "Introspection" | "PcSpeech" | "NpcSpeech" | "Action";
    children: DialogContentItemProps[] | string;
};

export default function DialogContentItem(props: DialogContentItemProps) {
    const { component, componentMap = dialogComponentMap, conditions, ...restProps } = props;
    const Component = componentMap?.[component] ?? dialogComponentMap.Introspection;
    //todo conditions
    return (
        <>
            <Component {...props} {...restProps} />
        </>
    );
}
