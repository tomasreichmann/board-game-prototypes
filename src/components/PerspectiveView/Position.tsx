import React, { CSSProperties, HTMLAttributes, PropsWithChildren, useEffect, useMemo, useReducer } from "react";
import { usePerspectiveView } from "./PerspectiveViewProvider";
import { PerspectiveViewStateType } from "./perspectiveViewModel";
import interpolate from "../../utils/interpolate";
import clsx from "clsx";

export type PositionType = {
    x: number;
    y: number;
    z: number;
    width?: number;
    height?: number;
    rotateX?: number;
    rotateY?: number;
    rotateZ?: number;
    scale?: number;
    transformOrigin?: CSSProperties["transformOrigin"];
};

export type DragDeltaType = {
    deltaX: number;
    deltaY: number;
    scaledDeltaX: number;
    scaledDeltaY: number;
};

export type PositionProps = PropsWithChildren<PositionType> & HTMLAttributes<HTMLDivElement>;

const getStyle = (
    state: PerspectiveViewStateType,
    { width, height, x, y, z, rotateX = 0, rotateY = 0, rotateZ = 0, scale = 1, transformOrigin, style }: PositionProps
): CSSProperties => {
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
        ...style,
        width,
        height,
        left: x,
        top: y,
        translate: `0 0 ${z}px`,
        transform: `translate3d(0, 0, ${z}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
        transformOrigin,
        filter: `blur(${blur}px)`,
        opacity,
        display,
    };
};

export default function Position(props: PositionProps) {
    const { x, y, z, width, height, rotateX, rotateY, rotateZ, scale, className, children, draggable, ...restProps } =
        props;
    const { state } = usePerspectiveView();

    const computedStyle = getStyle(state, props);

    if (computedStyle.display === "none") {
        return null;
    }
    return (
        <div className={clsx("Position absolute", className)} {...restProps} style={computedStyle}>
            {children}
        </div>
    );
}
