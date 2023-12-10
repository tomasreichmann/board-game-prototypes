import React, { PropsWithChildren, useEffect, useReducer } from "react";
import { PerspectiveViewActionTypeEnum } from "../../../components/PerspectiveViewX/perspectiveViewReducer";
import { usePerspectiveView } from "../../../components/PerspectiveViewX/PerspectiveViewProvider";
import Position, { PositionProps } from "../../../components/PerspectiveViewX/Position";
import useDragDelta from "../../../hooks/useDragDelta";
import DataPreview from "../../../components/DataPreview";
import { clamp } from "lodash";
import uuid from "../../../utils/uuid";

// import "./KickAssCardsPrototype.css";

const positionCount = 0;
const positions = Array(positionCount)
    .fill(0)
    .map(
        (): PositionProps => ({
            x: Math.floor(Math.random() * 1920),
            y: Math.floor(Math.random() * 1080),
            z: Math.floor(Math.random() * 2000 - 1000),
        })
    );

const imgSize = 200;

const getScaleFromZ = (z: number, perspective: number) => {
    return 1 - z / perspective;
};

export type MapSceneProps = PropsWithChildren<{
    width?: number;
    height?: number;
    backgroundUrl?: string;
}>;

export type MarkerType = {
    id: string;
    x: number;
    y: number;
    z: number;
    label: string;
    iconUrl?: string;
    linkUrl?: string;
};

export type MarkersStateType = {
    markers: MarkerType[];
    newMarker?: MarkerType;
};

export type MarkerActionType = {
    type: "Updater";
    payload: (state: MarkersStateType) => Partial<MarkersStateType>;
};

export const initialMarkersState: MarkersStateType = {
    markers: [],
};

export const markerReducer = (state: MarkersStateType, action: MarkerActionType): MarkersStateType => {
    console.log(action);
    if (action.type === "Updater") {
        return {
            ...state,
            ...action.payload(state),
        };
    }
    return state;
};

export default function MapScene({
    children,
    width = 2048,
    height = 2048,
    backgroundUrl = "/ISV/veledol.jpg",
}: MapSceneProps) {
    const { dispatch, state } = usePerspectiveView();
    const [{ markers, newMarker }, dispatchMarkers] = useReducer(markerReducer, initialMarkersState);

    useEffect(() => {
        dispatch({
            type: PerspectiveViewActionTypeEnum.Updater,
            payload: (state) => ({
                ...state,
                stage: { ...state.stage, width, height },
                lens: { ...state.lens, depthOfField: 1000 },
            }),
        });
    }, [width, height]);

    const { events, delta, isDragging } = useDragDelta();

    const dragDeltaScale = getScaleFromZ(state.stage.z, state.lens.perspective);

    useEffect(() => {
        dispatch({
            type: PerspectiveViewActionTypeEnum.Updater,
            payload: (state) => ({
                ...state,
                stage: {
                    ...state.stage,
                    x: state.stage.x + delta.x * dragDeltaScale,
                    y: state.stage.y + delta.y * dragDeltaScale,
                },
            }),
        });
    }, [delta]);

    const onWheel: React.WheelEventHandler<HTMLDivElement> = (event) => {
        dispatch({
            type: PerspectiveViewActionTypeEnum.Updater,
            payload: (state) => ({
                ...state,
                stage: { ...state.stage, z: clamp(state.stage.z - event.deltaY, -999, 999) },
            }),
        });
    };

    const onClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
        if (isDragging) {
            return;
        }
        dispatchMarkers({
            type: "Updater",
            payload: (state) => ({
                ...state,
                newMarker: {
                    id: uuid(),
                    x: Math.floor(event.nativeEvent.offsetX),
                    y: Math.floor(event.nativeEvent.offsetY),
                    z: 0,
                    label: "New Marker",
                },
            }),
        });
    };

    const saveMarker = () =>
        newMarker &&
        dispatchMarkers({
            type: "Updater",
            payload: (state) => ({
                ...state,
                newMarker: undefined,
                markers: [...state.markers, newMarker],
            }),
        });
    const deleteMarker = (id: string) =>
        dispatchMarkers({
            type: "Updater",
            payload: (state) => ({
                ...state,
                markers: state.markers.filter((marker) => marker.id !== id),
            }),
        });

    return (
        <div className="MapScene" style={state.stageStyle} onWheel={onWheel}>
            <Position
                x={0}
                y={0}
                z={0}
                width={width}
                height={height}
                onClick={onClick}
                {...events}
                style={{ backgroundImage: `url(${backgroundUrl})` }}
            />

            {markers.map(({ x, y, z, label, linkUrl, id }) => (
                <Position key={id} x={x} y={y} z={z} scale={getScaleFromZ(state.stage.z, state.lens.perspective)}>
                    <div className="absolute left-0 -top-[10px] -translate-x-1/2 text-center bg-transparent flex flex-col gap-1 items-center group drop-shadow-[0_0_4px_#000]">
                        <div className="w-[20px] h-[20px] border-2 border-kac-bone rounded-full"></div>
                        {linkUrl ? (
                            <a
                                href={linkUrl}
                                className="text-center leading-none text-lg p-2 min-w-[100px]" /* TODO useSideBar */
                            >
                                {label}
                            </a>
                        ) : (
                            <div className="text-center leading-none text-lg p-2 min-w-[100px]">{label}</div>
                        )}
                        <button
                            className="px-3 py-1 rounded-full bg-kac-blood transition-opacity opacity-0 group-hover:opacity-100"
                            onClick={() => deleteMarker(id)}
                        >
                            &times;
                        </button>
                    </div>
                </Position>
            ))}
            {newMarker && (
                <Position
                    key={newMarker.id}
                    x={newMarker.x}
                    y={newMarker.y}
                    z={newMarker.z}
                    scale={getScaleFromZ(state.stage.z, state.lens.perspective)}
                >
                    <div className="absolute left-0 -top-[10px] -translate-x-1/2 text-center bg-transparent flex flex-col gap-1 items-center">
                        <button className="px-3 py-1 rounded-full bg-kac-monster-dark" onClick={saveMarker}>
                            &#10003;
                        </button>
                        <input
                            className="text-center text-lg bg-transparent border-b-2 border-kac-bone focus:outline-none"
                            type="text"
                            value={newMarker.label}
                            autoFocus
                            onKeyDown={(event) => {
                                event.key === "Enter" && saveMarker();
                            }}
                            onChange={(event) =>
                                dispatchMarkers({
                                    type: "Updater",
                                    payload: (state) => ({
                                        ...state,
                                        newMarker: { ...newMarker, label: event.target.value },
                                    }),
                                })
                            }
                        />
                        <input
                            className="text-center text-lg bg-transparent border-b-2 border-kac-bone focus:outline-none"
                            type="text"
                            value={newMarker.linkUrl}
                            placeholder="/linkUrl"
                            onKeyDown={(event) => {
                                event.key === "Enter" && saveMarker();
                            }}
                            onChange={(event) =>
                                dispatchMarkers({
                                    type: "Updater",
                                    payload: (state) => ({
                                        ...state,
                                        newMarker: { ...newMarker, linkUrl: event.target.value },
                                    }),
                                })
                            }
                        />
                    </div>
                </Position>
            )}
            {children}
        </div>
    );
}
