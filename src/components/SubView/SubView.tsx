import React, { CSSProperties, PropsWithChildren, useEffect, useState } from "react";
import useMeasure from "react-use-measure";
import useDragDelta from "../../hooks/useDragDelta";
import DataPreview from "../DataPreview";
import clsx from "clsx";
import { divide } from "lodash";

export type SubViewProps = PropsWithChildren<{
    showDebug?: boolean;
    initialOpen?: boolean;
    initialPosition?: SubViewPosition;
    initialSize?: number;
    minSize?: number;
    positionOptions?: SubViewPosition[];
    closable?: boolean;
    resizable?: boolean;
    contentAside?: React.ReactNode;
}>;

export enum SubViewPosition {
    Left = "Left",
    Right = "Right",
    Top = "Top",
    Bottom = "Bottom",
}

const dragAreaHorizontalStyle = { top: -50, left: 0, right: 0, bottom: -50 };
const dragAreaVerticalStyle = { top: 0, left: -50, right: -50, bottom: 0 };

export default function SubView({
    children,
    contentAside,
    initialOpen = true,
    initialPosition = SubViewPosition.Right,
    initialSize = 200,
    minSize = 50,
    closable = true,
    resizable = true,
}: SubViewProps) {
    const [state, setState] = useState({ size: initialSize, position: initialPosition, isOpen: initialOpen });
    const [ref, { width, height }] = useMeasure({ debounce: 50 });
    const { events, delta, isDragging } = useDragDelta({ minDistanceX: 0 });

    const isMobile = width < 768;
    const { position, size } = state;

    useEffect(() => {
        if (isDragging && resizable) {
            if (isMobile) {
                setState((state) => ({ ...state, size: state.size - delta.y }));
            } else {
                setState((state) => ({ ...state, size: state.size - delta.x }));
            }
        }
    }, [delta, isDragging, resizable]);
    return (
        <div
            ref={ref}
            className={clsx(
                "SubView flex-1 min-w-full min-h-full flex items-stretch",
                position === SubViewPosition.Left && "flex-row-reverse",
                position === SubViewPosition.Right && "flex-row",
                position === SubViewPosition.Top && "flex-col-reverse",
                position === SubViewPosition.Bottom && "flex-col"
            )}
            style={{ "--size": state.size + "px" } as CSSProperties}
        >
            <div className="relative flex-1">
                {children}
                <DataPreview data={state} />
                <DataPreview data={delta} />
            </div>
            <div
                className="relative p-2 rounded-sm hover:bg-slate-500 hover:bg-opacity-50 flex items-center justify-center cursor-row-resize md:cursor-col-resize select-none z-50"
                {...(resizable ? events : {})}
            >
                {isDragging && (
                    <div
                        className="absolute z-50"
                        style={
                            position === SubViewPosition.Top || position === SubViewPosition.Bottom
                                ? dragAreaHorizontalStyle
                                : dragAreaVerticalStyle
                        }
                    />
                )}

                {position === SubViewPosition.Right && (
                    <span className="hidden md:inline w-4 text-center">{size > minSize ? "⋮" : "<"}</span>
                )}
                {position === SubViewPosition.Left && (
                    <span className="hidden md:inline w-4 text-center">{size > minSize ? "⋮" : ">"}</span>
                )}
                {position === SubViewPosition.Top && (
                    <span className="hidden md:inline h-4 text-center">{size > minSize ? "…" : "⌄"}</span>
                )}
                {position === SubViewPosition.Bottom && (
                    <span className="hidden md:inline h-4 text-center">{size > minSize ? "…" : "⌃"}</span>
                )}
            </div>
            {contentAside && size > minSize && (
                <div className="relative h-[var(--size)] md:h-auto md:w-[var(--size)]">
                    {contentAside}
                    {closable && (
                        <button
                            className="absolute top-0 right-0 px-2 py-0 rounded-sm appearance-none border-2 border-slate-300 bg-slate-500 bg-opacity-50 hover:bg-slate-500 hover:bg-opacity-25 cursor-pointer text-xl"
                            onClick={() => setState((state) => ({ ...state, size: 0 }))}
                        >
                            &times;
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
