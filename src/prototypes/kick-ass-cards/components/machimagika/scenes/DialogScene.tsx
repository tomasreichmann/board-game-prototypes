import React, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import useGameContext from "../GameContext";
import ToggleData from "../../../../../components/DataToggle";
import DialogContentItem from "../dialog/DialogContentItem";

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
                "text-amber-100 text-3xl font-mmHeading hover:scale-150  focus:scale-150 bg-transparent focus:outline-0 focus:border-0 p-0 outline-0 border-0 origin-left transform-gpu transition-transform",
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
        state: { dialog },
    } = useGameContext();
    if (!dialog) {
        return null;
    }

    const { currentNodeId, nodeMap, history /*scene*/ } = dialog;

    const currentNode = nodeMap[currentNodeId];

    return (
        <div className={twMerge("relative w-full h-full p-10 flex flex-col gap-4", className)}>
            {currentNode &&
                [...(history || []), ...currentNode.content].map((content, contentIndex) => {
                    const isHistory = contentIndex < (history?.length || 0);
                    const nonHistoryIndex = contentIndex - (history?.length || 0);
                    return (
                        <DialogContentItem
                            className={twMerge(
                                "text-md transition-all ease-in-out duration-400",
                                !isHistory && "animate-fadeIn fill-mode-both text-xl transition-all"
                            )}
                            style={{ animationDelay: isHistory ? "0s" : `${nonHistoryIndex * 0.5}s` }}
                            {...content}
                            key={contentIndex}
                        />
                    );
                })}
            <ToggleData data={dialog} initialCollapsed />
            {children}
        </div>
    );
}
