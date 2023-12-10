import React, { PropsWithChildren, useEffect } from "react";
import { usePerspectiveBoard } from "./PerspectiveBoardProvider";
import { BoardPositionItemType } from "./perspectiveBoardModel";
import DataPreview from "../DataPreview";
import { PerspectiveBoardActionTypeEnum } from "./perspectiveBoardReducer";
import { DragDeltaType } from "../PerspectiveViewX/Position";

export type ContentItemProps = BoardPositionItemType & { draggable?: boolean };

export type PerspectiveBoardProps = React.PropsWithChildren<{
    showDebug?: boolean;
    ContentItem: React.ComponentType<ContentItemProps>;
}>;

export default function PerspectiveBoard({ children, ContentItem, showDebug }: PerspectiveBoardProps) {
    const { state, dispatch } = usePerspectiveBoard();

    const getOnDrag =
        (id: string) =>
        ({ scaledDeltaX, scaledDeltaY }: DragDeltaType) => {
            dispatch({
                type: PerspectiveBoardActionTypeEnum.Updater,
                payload: (state) => ({
                    positionItems: state.positionItems.map((item) => {
                        if (item.id === id) {
                            item.x;
                            return {
                                ...item,
                                x: item.x + scaledDeltaX,
                                y: item.y + scaledDeltaY,
                            };
                        }
                        return item;
                    }),
                }),
            });
        };

    return (
        <>
            {state.positionItems.map((item) => (
                <ContentItem key={item.id} {...item} />
            ))}
            {showDebug && (
                <DataPreview data={state} className="absolute right-2 bottom-2 p-2 bg-white bg-opacity-90 text-black" />
            )}
            {children}
        </>
    );
}
