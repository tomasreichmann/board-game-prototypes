import React, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import useGameContext from "../model/GameContext";
import ToggleData from "../../../../../components/DataToggle";
import { dialogMap } from "./dialogModel";
import ContentItem from "../content/ContentItem";

export type DialogSceneProps = React.PropsWithChildren<{
    className?: string;
}>;

export default function DialogScene({ className, children }: DialogSceneProps) {
    const {
        state: { dialog },
    } = useGameContext();
    const { dialogId, currentNodeId, history /*scene*/ } = dialog;
    if (!dialogId || !currentNodeId) {
        return null;
    }

    const dialogContent = dialogMap[dialogId];
    const currentNode = dialogContent && dialogContent.nodeMap[currentNodeId];

    if (!currentNode) {
        return null;
    }

    return (
        <div className={twMerge("DialogScene flex-1 relative w-full h-full", className)}>
            <div className="absolute -z-[3] w-full h-full">
                {dialogContent.backgroundContent?.map((content, contentIndex) => (
                    <ContentItem {...content} key={contentIndex} />
                ))}
            </div>
            <div className="absolute -z-[2] w-full h-full">
                {dialog.backgroundContent?.map((content, contentIndex) => (
                    <ContentItem {...content} key={contentIndex} />
                ))}
            </div>
            <div
                className="absolute -z-[1] w-full h-full"
                style={{
                    background: "linear-gradient(90deg, rgba(0,0,0,0.5) 50%, transparent 70%) ",
                }}
            />
            <div className="p-10 flex flex-col gap-4">
                <div
                    className="flex flex-col-reverse overflow-y-auto py-2 pr-[40%]"
                    style={{ scrollBehavior: "smooth" }}
                >
                    <div className="flex flex-col gap-4 ">
                        {currentNode &&
                            [...(history || []), ...currentNode.content].map((content, contentIndex) => {
                                const isHistory = contentIndex < (history?.length || 0);
                                const nonHistoryIndex = contentIndex - (history?.length || 0);
                                const componentKey = Object.keys(
                                    content.component
                                )[0] as keyof typeof content.component;
                                const component = {
                                    [componentKey]: {
                                        ...content.component[componentKey],
                                        className: twMerge(
                                            "text-xl transition-all ease-in-out duration-400",
                                            !isHistory && "animate-fadeIn fill-mode-both text-2xl transition-all"
                                        ),
                                        style: { animationDelay: isHistory ? "0s" : `${(nonHistoryIndex + 1) * 0.5}s` },
                                    },
                                };
                                return <ContentItem {...content} component={component} key={contentIndex} />;
                            })}
                    </div>
                </div>
                <ToggleData data={dialog} initialCollapsed />
                {children}
            </div>
        </div>
    );
}
