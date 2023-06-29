import React, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import useGameContext from "../GameContext";
import { GameActionTypeEnum } from "../gameReducer";
import ToggleData from "../../../../../components/DataToggle";
import ContentItem from "../../ContentItem";
import DialogContentItem from "../dialog/DialogContentItem";
import { ContentType } from "../../../types";

export type MenuItemProps = React.PropsWithChildren<
    {
        className?: string;
        autoFocus?: boolean;
    } & HTMLAttributes<HTMLButtonElement>
>;

export const MenuItem = ({ children, className, ...restProps }: MenuItemProps) => {
    return (
        <button
            tabIndex={0}
            {...restProps}
            className={twMerge(
                "text-amber-100 text-3xl font-mmHeading hover:scale-150  focus:scale-150 bg-transparent focus:outline-0 focus:border-0 p-0 outline-0 border-0 origin-left transform-gpu transition-transform duration-200",
                className
            )}
        >
            {children}
        </button>
    );
};
export type DialogSceneProps = React.PropsWithChildren<{
    className?: string;
}>;

export default function DialogScene({ className, children }: DialogSceneProps) {
    const {
        dispatch,
        state: { dialog },
    } = useGameContext();
    if (!dialog) {
        return null;
    }

    const { currentNodeId, nodeMap, history, scene } = dialog;

    const currentNode = nodeMap[currentNodeId];

    return (
        <div className={twMerge("relative w-full h-full p-10", className)}>
            {currentNode &&
                currentNode.content.map((content, contentIndex) => (
                    <DialogContentItem {...content} key={contentIndex} />
                ))}
            <ToggleData data={dialog} initialCollapsed />
            {children}
        </div>
    );
}
