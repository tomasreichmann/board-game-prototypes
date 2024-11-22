import React, { PropsWithChildren, useEffect } from "react";
import { PerspectiveViewStateType, initialPerspectiveViewState } from "./perspectiveViewModel";
import { PerspectiveViewActionTypeEnum } from "./perspectiveViewReducer";
import DataPreview from "../DataPreview";
import useMeasure from "react-use-measure";
import { usePerspectiveView } from "./PerspectiveViewProvider";

import "./PerspectiveView.css";
import resolveValueOrGetter from "../../utils/resolveValueOrGetter";

export type ControlItemProps = {
    id: string;
    label: React.ReactNode;
    updater: (state: PerspectiveViewStateType, value: number) => Partial<PerspectiveViewStateType>;
    getter: (state: PerspectiveViewStateType) => number;
    min: number | ((state: PerspectiveViewStateType) => number);
    max: number | ((state: PerspectiveViewStateType) => number);
    step?: number;
};

export const ControlItem = ({ id, label, updater, getter, min, max, step = 1 }: ControlItemProps) => {
    const { state, dispatch } = usePerspectiveView();
    const value = getter(state);
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value);
        if (value !== getter(state)) {
            dispatch({
                type: PerspectiveViewActionTypeEnum.Updater,
                payload: (state) => updater(state, value),
            });
        }
    };
    return (
        <div className="flex flex-row gap-2 items-start">
            <label className="flex flex-col flex-1">
                <span className="font-bold text-kac-iron">{label}</span>
                <input
                    id={id}
                    type="range"
                    onChange={onChange}
                    value={value}
                    min={resolveValueOrGetter(min, [state])}
                    max={resolveValueOrGetter(max, [state])}
                    step={step}
                />
            </label>
            <button
                className="text-kac-steel bg-kac-curse-dark font-bold px-3 py-1 rounded-sm border-0"
                onClick={() =>
                    dispatch({
                        type: PerspectiveViewActionTypeEnum.Updater,
                        payload: (state) => updater(state, getter(initialPerspectiveViewState)),
                    })
                }
            >
                ↺
            </button>
        </div>
    );
};

const controlItems: ControlItemProps[] = [
    {
        id: "X",
        label: "X",
        updater: (state, value) => ({
            ...state,
            stage: {
                ...state.stage,
                x: value,
            },
        }),
        getter: (state) => state.stage.x,
        min: (state) => -state.stage.width,
        max: (state) => state.stage.width,
    },
    {
        id: "Y",
        label: "Y",
        updater: (state, value) => ({
            ...state,
            stage: {
                ...state.stage,
                y: value,
            },
        }),
        getter: (state) => state.stage.y,
        min: (state) => -state.stage.height,
        max: (state) => state.stage.height,
    },
    {
        id: "Z",
        label: "Z",
        updater: (state, value) => ({
            ...state,
            stage: {
                ...state.stage,
                z: value,
            },
        }),
        getter: (state) => state.stage.z,
        min: -1000,
        max: 1000,
    },
    {
        id: "rotateX",
        label: "Rotate X",
        updater: (state, value) => ({
            ...state,
            stage: {
                ...state.stage,
                rotateX: value,
            },
        }),
        getter: (state) => state.stage.rotateX,
        min: -180,
        max: 180,
    },
    {
        id: "rotateY",
        label: "Rotate Y",
        updater: (state, value) => ({
            ...state,
            stage: {
                ...state.stage,
                rotateY: value,
            },
        }),
        getter: (state) => state.stage.rotateY,
        min: -180,
        max: 180,
    },
    {
        id: "rotateZ",
        label: "Rotate Z",
        updater: (state, value) => ({
            ...state,
            stage: {
                ...state.stage,
                rotateZ: value,
            },
        }),
        getter: (state) => state.stage.rotateZ,
        min: -180,
        max: 180,
    },
    {
        id: "perspective",
        label: "Perspective",
        updater: (state, value) => ({
            ...state,
            lens: {
                ...state.lens,
                perspective: value,
            },
        }),
        getter: (state) => state.lens.perspective,
        min: 0,
        max: 2000,
    },
    {
        id: "depthOfField",
        label: "Depth Of Field",
        updater: (state, value) => ({
            ...state,
            lens: {
                ...state.lens,
                depthOfField: value,
            },
        }),
        getter: (state) => state.lens.depthOfField,
        min: 0,
        max: 1000,
    },
    {
        id: "scale",
        label: "Scale",
        updater: (state, value) => ({
            ...state,
            stage: {
                ...state.stage,
                scale: value,
            },
        }),
        getter: (state) => state.stage.scale,
        step: 0.1,
        min: 0.1,
        max: 10,
    },
];

export type PerspectiveViewProps = PropsWithChildren<{
    showControls?: boolean;
    showDebug?: boolean;
}>;

export default function PerspectiveView({ children, showControls, showDebug }: PerspectiveViewProps) {
    const { state, dispatch } = usePerspectiveView();
    const [frameRef, frameRect] = useMeasure({ debounce: 100 });

    useEffect(() => {
        dispatch({
            type: PerspectiveViewActionTypeEnum.Updater,
            payload: (state) => ({ frame: { ...state.frame, width: frameRect.width, height: frameRect.height } }),
        });
    }, [frameRect.width, frameRect.height]);

    return (
        <div className="PerspectiveView w-full h-full print:h-auto relative overflow-hidden">
            <div
                className="Frame absolute w-full h-full left-0 top-0 [transform-style:preserve-3d]"
                ref={frameRef}
                style={state.frameStyle}
            >
                {children}
            </div>
            {(showControls || showDebug) && (
                <div className="absolute right-2 bottom-2 w-[400px] p-4 bg-[rgba(255,255,255,0.25)] flex flex-col gap-2 max-h-full z-[999]">
                    {showControls && controlItems.map((control) => <ControlItem key={control.id} {...control} />)}

                    {showDebug && <DataPreview data={state} className="flex-1 flex-shrink overflow-auto" />}
                </div>
            )}
        </div>
    );
}
