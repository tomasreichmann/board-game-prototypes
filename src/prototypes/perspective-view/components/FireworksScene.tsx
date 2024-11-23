import React, { PropsWithChildren, useEffect, useMemo, useRef, useState } from "react";
import { PerspectiveViewActionTypeEnum } from "../../../components/PerspectiveView/perspectiveViewReducer";
import { usePerspectiveView } from "../../../components/PerspectiveView/PerspectiveViewProvider";
import Position, { PositionProps } from "../../../components/PerspectiveView/Position";
import { PerspectiveViewStateType } from "../../../components/PerspectiveView/perspectiveViewModel";
import interpolate from "../../../utils/interpolate";
import { clamp } from "lodash";

// import "./KickAssCardsPrototype.css";

const getRandomRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
};

const positionCount = 100;
const positions = Array(positionCount)
    .fill(0)
    .map(
        (_, index): PositionProps => ({
            id: index.toString(),
            x: Math.floor(Math.random() * 1920),
            y: Math.floor(Math.random() * 1080),
            z: Math.floor(Math.random() * 2000 - 1000),
        })
    );

const imgSize = 200;

export type FireworksSceneProps = PropsWithChildren<{
    fps?: number;
    durationMs?: number;
}>;

export type ArcVector = { x: number; y: number; z: number; xDelta: number; yDelta: number; rotateY: number };

const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

const getInitialConstants = (state: PerspectiveViewStateType) => {
    const explosionSize = 200;
    const launchVector = {
        x: state.stage.width / 2,
        y: state.stage.height,
        z: 0,
        xDelta: getRandomRange(-100, 100),
        yDelta: getRandomRange(-state.stage.height * 0.6, -state.stage.height * 0.8),
        rotateY: getRandomRange(-15, 15),
    };
    const explosionVectorCount = 10;
    const explosionVectors = Array(explosionVectorCount)
        .fill(0)
        .map((): ArcVector => {
            return {
                x: launchVector.x + launchVector.xDelta - explosionSize / 2,
                y: launchVector.y + launchVector.yDelta - explosionSize / 2,
                z: launchVector.z,
                xDelta: getRandomRange(explosionSize / 2, explosionSize),
                yDelta: getRandomRange(-explosionSize / 2, explosionSize / 2),
                rotateY: getRandomRange(-180, 180),
            };
        });
    return {
        launchVector,
        explosionVectors,
        explosionSize,
    };
};

function easeOutQuad(x: number): number {
    return 1 - (1 - x) * (1 - x);
}

const getArcPath = ({ x, y, xDelta, yDelta }: ArcVector) => {
    return `M ${x} ${y} C ${x} ${y + yDelta}, ${x + xDelta} ${y + yDelta}, ${x + xDelta} ${y + yDelta}`;
};
const getExplosionArcPath = ({ x, y, xDelta, yDelta }: ArcVector) => {
    return `M ${x} ${y} C ${x} ${y + yDelta}, ${x + xDelta} ${y + yDelta}, ${x + xDelta} ${y + yDelta}`;
};

export default function FireworksScene({ children, fps = 30, durationMs = 4000 }: FireworksSceneProps) {
    const { dispatch, state } = usePerspectiveView();
    const [frame, setFrame] = useState(0);

    const passCount = useRef(0);
    const initialConstants = useRef(getInitialConstants(state));
    const maxFrame = Math.ceil((durationMs / 1000) * fps);

    useEffect(() => {
        dispatch({
            type: PerspectiveViewActionTypeEnum.Updater,
            payload: (state) => ({ ...state, stage: { ...state.stage, width: 1920, height: 1080 } }),
        });
    }, []);

    useEffect(() => {
        let saveState = { ...state };
        const interval = setInterval(() => {
            requestAnimationFrame(() => {
                setFrame((frame) => {
                    const newFrame = frame + 1;
                    passCount.current = passCount.current + 1;
                    if (newFrame >= maxFrame) {
                        initialConstants.current = getInitialConstants(saveState);
                    }
                    return newFrame % maxFrame;
                });
            });
        }, 1000 / fps);
        return () => {
            clearInterval(interval);
        };
    }, [state, initialConstants, passCount, maxFrame]);

    const arcPath = useMemo(() => getArcPath(initialConstants.current.launchVector), [initialConstants]);
    const launchProgress = clamp(interpolate(frame, 0, fps * 2, 0, 1), 0, 1);
    const launchStrokeProgress = easeOutQuad(launchProgress);
    const pathLength =
        getDistance(
            initialConstants.current.launchVector.x,
            initialConstants.current.launchVector.y,
            initialConstants.current.launchVector.x + initialConstants.current.launchVector.xDelta,
            initialConstants.current.launchVector.y + initialConstants.current.launchVector.yDelta
        ) * 1.2;
    const explosionProgress = clamp(interpolate(frame, fps * 2, fps * 4, 0, 1), 0, 1);
    const explosionStrokeProgress = easeOutQuad(explosionProgress);
    const explosionPaths = useMemo(() => {
        return initialConstants.current.explosionVectors.map((explosionVector) => {
            return getExplosionArcPath({
                ...explosionVector,
                x: initialConstants.current.explosionSize / 2,
                y: initialConstants.current.explosionSize / 2,
            });
        });
    }, [initialConstants.current]);

    return (
        <div className="FireworksScene w-[1920px] h-[1080px] border-2 border-kac-fire-light" style={state.stageStyle}>
            Frame: {frame}
            <br />
            launchProgress: {launchProgress}
            <br />
            state.stage.width: {state.stage.width}
            <Position
                id={"launch_" + passCount.current}
                key={"launch_" + passCount.current}
                x={0}
                y={0}
                z={0}
                // rotateY={initialConstants.current.launchVector.rotateY}
                width={1920}
                height={1080}
            >
                <svg className="w-full h-full border-2 border-fuchsia-950" viewBox="0 0 1920 1080">
                    <path
                        d={arcPath}
                        style={{
                            strokeDasharray: pathLength,
                            strokeDashoffset: pathLength * (1 - launchStrokeProgress),
                        }}
                        fill="none"
                        stroke="white"
                        strokeWidth="5"
                    />
                </svg>
            </Position>
            {initialConstants.current.explosionVectors.map((explosionVector, index) => (
                <Position
                    id={"explosion_" + passCount.current + "_" + index}
                    key={"explosion_" + passCount.current + "_" + index}
                    x={explosionVector.x}
                    y={explosionVector.y}
                    z={explosionVector.z}
                    // rotateY={explosionVector.rotateY}
                    width={initialConstants.current.explosionSize}
                    height={initialConstants.current.explosionSize}
                >
                    <svg
                        className="w-full h-full border-2 border-fuchsia-950"
                        viewBox={
                            "0 0 " +
                            initialConstants.current.explosionSize +
                            " " +
                            initialConstants.current.explosionSize
                        }
                    >
                        <path
                            d={explosionPaths[index]}
                            style={{
                                strokeDasharray: pathLength,
                                strokeDashoffset: pathLength * (1 - explosionStrokeProgress),
                            }}
                            fill="none"
                            stroke="white"
                            strokeWidth="5"
                        />
                    </svg>
                </Position>
            ))}
            {children}
        </div>
    );
}
