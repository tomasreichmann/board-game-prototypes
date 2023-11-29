import React, { PropsWithChildren, useEffect, useReducer } from "react";
import { initialPerspectiveViewState } from "../model/perspectiveViewModel";
import perspectiveViewReducer, { PerspectiveViewActionTypeEnum } from "../model/perspectiveViewReducer";
import DataPreview from "../../../components/DataPreview";
import useMeasure from "react-use-measure";
import TestScene from "./TestScene";
import { usePerspectiveView } from "./PerspectiveViewProvider";

import "./PerspectiveView.css";

export default function PerspectiveView({ children }: PropsWithChildren) {
    const { state, dispatch } = usePerspectiveView();
    const [frameRef, frameRect] = useMeasure({ debounce: 100 });

    useEffect(() => {
        dispatch({
            type: PerspectiveViewActionTypeEnum.Updater,
            payload: (state) => ({ frame: { ...state.frame, width: frameRect.width, height: frameRect.height } }),
        });
    }, [frameRect]);

    return (
        <div className="PerspectiveView w-full h-screen print:h-auto relative overflow-hidden border-2 border-kac-steel-dark ">
            <div
                className="Frame absolute w-full h-full left-0 top-0 border-2 border-kac-cloth-dark [perspective:1000px] [transform-style:preserve-3d]"
                ref={frameRef}
                style={state.frameStyle}
            >
                <TestScene />
            </div>
            <div className="Controls absolute right-2 bottom-2 w-[400px] p-4 bg-[rgba(255,255,255,0.25)]">
                <label className="flex flex-col">
                    <span className="font-bold text-kac-steel">stage X</span>
                    <input
                        type="range"
                        onChange={(event) => {
                            dispatch({
                                type: PerspectiveViewActionTypeEnum.Updater,
                                payload: (state) => ({
                                    ...state,
                                    stage: {
                                        ...state.stage,
                                        x: parseFloat(event.target.value),
                                    },
                                }),
                            });
                        }}
                        value={state.stage.x}
                        min={-state.stage.width}
                        max={state.stage.width}
                    />
                </label>
                <label className="flex flex-col">
                    <span className="font-bold text-kac-steel">stage Y</span>
                    <input
                        type="range"
                        onChange={(event) => {
                            dispatch({
                                type: PerspectiveViewActionTypeEnum.Updater,
                                payload: (state) => ({
                                    ...state,
                                    stage: {
                                        ...state.stage,
                                        y: parseFloat(event.target.value),
                                    },
                                }),
                            });
                        }}
                        value={state.stage.y}
                        min={-state.stage.height}
                        max={state.stage.height}
                    />
                </label>
                <label className="flex flex-col">
                    <span className="font-bold text-kac-steel">stage Z</span>
                    <input
                        type="range"
                        onChange={(event) => {
                            dispatch({
                                type: PerspectiveViewActionTypeEnum.Updater,
                                payload: (state) => ({
                                    ...state,
                                    stage: {
                                        ...state.stage,
                                        z: parseFloat(event.target.value),
                                    },
                                }),
                            });
                        }}
                        value={state.stage.z}
                        min={-1000}
                        max={1000}
                    />
                </label>
                <label className="flex flex-col">
                    <span className="font-bold text-kac-steel">rotateX</span>
                    <input
                        type="range"
                        onChange={(event) => {
                            dispatch({
                                type: PerspectiveViewActionTypeEnum.Updater,
                                payload: (state) => ({
                                    ...state,
                                    stage: {
                                        ...state.stage,
                                        rotateX: parseFloat(event.target.value),
                                    },
                                }),
                            });
                        }}
                        value={state.stage.rotateX}
                        min={-180}
                        max={180}
                    />
                </label>
                <label className="flex flex-col">
                    <span className="font-bold text-kac-steel">rotateY</span>
                    <input
                        type="range"
                        onChange={(event) => {
                            dispatch({
                                type: PerspectiveViewActionTypeEnum.Updater,
                                payload: (state) => ({
                                    ...state,
                                    stage: {
                                        ...state.stage,
                                        rotateY: parseFloat(event.target.value),
                                    },
                                }),
                            });
                        }}
                        value={state.stage.rotateY}
                        min={-180}
                        max={180}
                    />
                </label>
                <label className="flex flex-col">
                    <span className="font-bold text-kac-steel">rotateZ</span>
                    <input
                        type="range"
                        onChange={(event) => {
                            dispatch({
                                type: PerspectiveViewActionTypeEnum.Updater,
                                payload: (state) => ({
                                    ...state,
                                    stage: {
                                        ...state.stage,
                                        rotateZ: parseFloat(event.target.value),
                                    },
                                }),
                            });
                        }}
                        value={state.stage.rotateZ}
                        min={-180}
                        max={180}
                    />
                </label>
                <label className="flex flex-col">
                    <span className="font-bold text-kac-steel">perspective</span>
                    <input
                        type="range"
                        onChange={(event) => {
                            dispatch({
                                type: PerspectiveViewActionTypeEnum.Updater,
                                payload: (state) => ({
                                    ...state,
                                    lens: {
                                        ...state.lens,
                                        perspective: parseFloat(event.target.value),
                                    },
                                }),
                            });
                        }}
                        value={state.lens.perspective}
                        min={0}
                        max={2000}
                    />
                </label>
                <label className="flex flex-col">
                    <span className="font-bold text-kac-steel">depthOfField</span>
                    <input
                        type="range"
                        onChange={(event) => {
                            dispatch({
                                type: PerspectiveViewActionTypeEnum.Updater,
                                payload: (state) => ({
                                    ...state,
                                    lens: {
                                        ...state.lens,
                                        depthOfField: parseFloat(event.target.value),
                                    },
                                }),
                            });
                        }}
                        value={state.lens.depthOfField}
                        min={0}
                        max={1000}
                    />
                </label>
                <label className="flex flex-col">
                    <span className="font-bold text-kac-steel">scale</span>
                    <input
                        type="range"
                        onChange={(event) => {
                            dispatch({
                                type: PerspectiveViewActionTypeEnum.Updater,
                                payload: (state) => ({
                                    ...state,
                                    stage: {
                                        ...state.stage,
                                        scale: parseFloat(event.target.value),
                                    },
                                }),
                            });
                        }}
                        value={state.stage.scale}
                        step={0.1}
                        min={0.1}
                        max={10}
                    />
                </label>
                <DataPreview data={state} />
            </div>
            {children}
        </div>
    );
}
