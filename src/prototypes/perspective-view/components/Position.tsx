import React, { CSSProperties, PropsWithChildren, useEffect, useReducer } from "react";
import perspectiveViewReducer, { PerspectiveViewActionTypeEnum } from "../model/perspectiveViewReducer";
import { initialState } from "../../kick-ass-cards/components/machimagika/model/gameState";
import { usePerspectiveView } from "./PerspectiveViewProvider";
import { PerspectiveViewStateType } from "../model/perspectiveViewModel";
import interpolate from "../utils/interpolate";

// import "./KickAssCardsPrototype.css";

export type PositionProps = PropsWithChildren<{
    x: number;
    y: number;
    z: number;
}>;

const getStyle = (state: PerspectiveViewStateType, { x, y, z }: PositionProps): CSSProperties => {
    const zDelta = state.stage.z + z;
    const distanceToFocalPoint = Math.abs(zDelta);
    const blurIntensity = 5;
    const blur =
        distanceToFocalPoint <= state.lens.depthOfField
            ? 0
            : ((distanceToFocalPoint - state.lens.depthOfField) / state.lens.depthOfField) * blurIntensity;
    const backgroundDropOffStart = 10;
    const backgroundDropOffEnd = 20;
    const blurOpacity = interpolate(blur, backgroundDropOffStart, backgroundDropOffEnd, 1, 0);
    const foregroundDropOffStart = 3;
    const foregroundDropOffEnd = 6;
    const foregroundOpacity =
        zDelta > state.lens.depthOfField && blur > foregroundDropOffStart
            ? interpolate(blur, foregroundDropOffStart, foregroundDropOffEnd, 1, 0)
            : 1;
    const opacity = Math.min(blurOpacity, foregroundOpacity);
    const display = opacity === 0 ? "none" : "block";

    return {
        left: x,
        top: y,
        translate: `0 0 ${z}px`,
        filter: `blur(${blur}px)`,
        opacity,
        display,
    };
};

export default function Position(props: PositionProps) {
    const { z, children } = props;
    const { state } = usePerspectiveView();
    return (
        <div className="Position absolute" style={getStyle(state, props)}>
            {children}
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">{z}</span>
        </div>
    );
}
