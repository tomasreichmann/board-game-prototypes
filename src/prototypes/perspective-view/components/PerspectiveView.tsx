import React, { PropsWithChildren, useEffect, useReducer } from "react";
import { initialPerspectiveViewState } from "../model/perspectiveViewModel";
import perspectiveViewReducer, { PerspectiveViewActionTypeEnum } from "../model/perspectiveViewReducer";
import DataPreview from "../../../components/DataPreview";
import useMeasure from "react-use-measure";
import TestScene from "./TestScene";
import { usePerspectiveView } from "./PerspectiveViewProvider";

// import "./KickAssCardsPrototype.css";

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
        <div className="w-full h-screen print:h-auto relative overflow-hidden border-2 border-kac-steel-dark">
            <div
                className="Frame absolute w-full h-full left-0 top-0 border-2 border-kac-cloth-dark"
                ref={frameRef}
                style={state.frameStyle}
            >
                <TestScene />
            </div>
            <div className="Controls absolute right-2 bottom-2 w-[400px] p-4 bg-[rgba(255,255,255,0.25)]">
                <label className="flex flex-col">
                    <span className="font-bold text-kac-steel">Stage X</span>
                    <input
                        type="range"
                        onChange={(event) => {
                            dispatch({
                                type: PerspectiveViewActionTypeEnum.Updater,
                                payload: (state) => ({
                                    ...state,
                                    stage: {
                                        ...state.stage,
                                        x: (parseFloat(event.target.value) / 100) * state.stage.width,
                                    },
                                }),
                            });
                        }}
                        min={-100}
                        max={100}
                    />
                </label>
                <label className="flex flex-col">
                    <span className="font-bold text-kac-steel">Stage Y</span>
                    <input
                        type="range"
                        onChange={(event) => {
                            dispatch({
                                type: PerspectiveViewActionTypeEnum.Updater,
                                payload: (state) => ({
                                    ...state,
                                    stage: {
                                        ...state.stage,
                                        y: (parseFloat(event.target.value) / 100) * state.stage.height,
                                    },
                                }),
                            });
                        }}
                        min={-100}
                        max={100}
                    />
                </label>
                <label className="flex flex-col">
                    <span className="font-bold text-kac-steel">Scale</span>
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
