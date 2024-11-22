import React, { PropsWithChildren, useEffect, useMemo } from "react";

import { clamp } from "lodash";
import { usePerspectiveView } from "../../../../components/PerspectiveView/PerspectiveViewProvider";
import { PerspectiveViewActionTypeEnum } from "../../../../components/PerspectiveView/perspectiveViewReducer";
import useDragDelta from "../../../../hooks/useDragDelta";
import uuid from "../../../../utils/uuid";
import Position from "../../../../components/PerspectiveView/Position";
import resolveRandom, { DeepRandomType } from "../../generators/resolveRandom";
import traitsData from "../../data/traits-cs-cleaned";
import getCardSize from "../../../../utils/getCardSize";
import PerspectiveBoard from "../../../../components/PerspectiveBoard/PerspectiveBoard";
import ContentItem from "./content/ContentItem";
import { usePerspectiveBoard } from "../../../../components/PerspectiveBoard/PerspectiveBoardProvider";
import { PerspectiveBoardActionTypeEnum } from "../../../../components/PerspectiveBoard/perspectiveBoardReducer";
import {
    BoardContentItemType,
    BoardContentItemTypeEnum,
} from "../../../../components/PerspectiveBoard/perspectiveBoardModel";
import { getCenterPan } from "../../../../components/PerspectiveView/utils";
import { getScaleFromZ, moveContentTo } from "../../../../components/PerspectiveBoard/utils";
import randomUniqueItems from "../../../../utils/randomUniqueItems";
import { ActorCardEditableProps } from "./content/ActorCard";

// import "./KickAssCardsPrototype.css";
const gapSize = 10;

export type WorldSceneProps = PropsWithChildren<{
    width?: number;
    height?: number;
    backgroundUrl?: string;
}>;

const getTraits = (count: DeepRandomType<number>) => {
    const countResolved = resolveRandom(count) as number;
    return randomUniqueItems(traitsData, countResolved);
};

const tarotCardSize = getCardSize("Tarot", "px");
const miniCardSize = getCardSize("Mini US game", "px");
const sizeMap = {
    Tarot: tarotCardSize,
    Mini: miniCardSize,
    Actor: tarotCardSize,
    Trait: miniCardSize,
};

const strahdCardItem = {
    type: BoardContentItemTypeEnum.Single as const,
    position: { x: 0, y: 0, z: 0, width: sizeMap.Actor.width, height: sizeMap.Actor.height, draggable: true },
    component: {
        id: "strahd",
        width: sizeMap.Actor.width,
        height: sizeMap.Actor.height,
        componentName: "ActorCardEditable",
        props: {
            editing: true,
            preview: true,
            onEditToggle: () => {},
            onChange: () => {},
            props: {
                className: "z-20",
                name: "Count Strahd von Zarovich",
                currentPower: 10,
                imageUri: "/ISV/minis/vampire1.jpg",
            },
        } as ActorCardEditableProps,
    },
};

const traitSpreadItem: BoardContentItemType = {
    type: BoardContentItemTypeEnum.Spread,
    position: {
        x: 0,
        y: 0,
        z: 0,
        width: traitsData.length * (sizeMap.Trait.width + gapSize) - gapSize,
        height: sizeMap.Trait.height,
    },
    components: traitsData.map((trait) => ({
        id: uuid(),
        width: sizeMap.Trait.width,
        height: sizeMap.Trait.height,
        componentName: "TraitCard",
        props: trait,
    })),
};

const fullHd = {
    width: 1920,
    height: 1080,
};

export default function WorldScene({
    children,
    width = fullHd.width * 4,
    height = fullHd.height * 4,
    backgroundUrl = "/wood3.jpg",
}: WorldSceneProps) {
    const { dispatch: viewDispatch, state: viewState } = usePerspectiveView();
    const { dispatch: boardDispatch, state: boardState } = usePerspectiveBoard();

    const centerPan = useMemo(() => getCenterPan(width, height, window.innerWidth, window.innerHeight), []);

    useEffect(() => {
        viewDispatch({
            type: PerspectiveViewActionTypeEnum.Updater,
            payload: (state) => ({
                ...state,
                stage: {
                    ...state.stage,
                    width,
                    height,
                    x: -centerPan.x,
                    y: -centerPan.y,
                },
                lens: { ...state.lens, depthOfField: 1000 },
            }),
        });
    }, [width, height]);

    const { events, delta, isDragging } = useDragDelta();

    const dragDeltaScale = getScaleFromZ(viewState.stage.z, viewState.lens.perspective);

    useEffect(() => {
        if (delta.x === 0 && delta.y === 0) {
            return;
        }
        viewDispatch({
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
        viewDispatch({
            type: PerspectiveViewActionTypeEnum.Updater,
            payload: (state) => ({
                ...state,
                stage: { ...state.stage, z: clamp(state.stage.z - event.deltaY, -999, 999) },
            }),
        });
    };

    useEffect(() => {
        const strahdCardContent = moveContentTo(
            {
                ...strahdCardItem,
                component: {
                    ...strahdCardItem.component,
                    props: {
                        ...strahdCardItem.component.props,
                        onEditToggle: () => {
                            boardDispatch({
                                type: PerspectiveBoardActionTypeEnum.ContentUpdater,
                                payload: {
                                    componentId: "strahd",
                                    updater: (component) => {
                                        return {
                                            ...component,
                                            props: {
                                                ...component.props,
                                                editing: !component.props.editing,
                                            },
                                        };
                                    },
                                },
                            });
                        },
                        onChange: (prop: keyof ActorCardEditableProps, value: any) => {
                            console.log({ prop, value });
                            boardDispatch({
                                type: PerspectiveBoardActionTypeEnum.ContentUpdater,
                                payload: {
                                    componentId: "strahd",
                                    updater: (component) => {
                                        return {
                                            ...component,
                                            props: {
                                                ...component.props,
                                                props: {
                                                    ...component.props.props,
                                                    [prop]: value,
                                                },
                                            },
                                        };
                                    },
                                },
                            });
                        },
                    },
                },
            },
            { x: centerPan.x + gapSize, y: centerPan.y + gapSize }
        );

        const traitsSpreadContent = moveContentTo(traitSpreadItem, {
            x: centerPan.x + gapSize,
            y: strahdCardContent.position.y + gapSize,
        });

        boardDispatch({
            type: PerspectiveBoardActionTypeEnum.Updater,
            payload: (state) => ({
                ...state,
                content: [strahdCardContent, traitsSpreadContent],
            }),
        });
    }, []);

    return (
        <div className="WorldScene" style={viewState.stageStyle} onWheel={onWheel} {...events}>
            <Position
                id="background"
                x={0}
                y={0}
                z={-1}
                width={width}
                height={height}
                style={{ backgroundImage: `url(${backgroundUrl})`, backgroundSize: "1024px 1024px" }}
            />

            {/*  
            <Position x={0} y={0} z={0}>
                <ActorCard name="Count Strahd von Zarovich" currentPower={10} imageUri="/ISV/minis/vampire1.jpg" />
            </Position>
            {traits.map((trait, traitIndex) => (
                <Position
                    x={
                        0 +
                        getCardSize("Tarot", "px", DPI).width +
                        gapSize +
                        traitIndex * (gapSize + getCardSize("Mini US game", "px", DPI).width)
                    }
                    y={0}
                    z={0}
                >
                    <TraitCard key={trait.male} trait={trait} />
                </Position>
            ))} */}
            <PerspectiveBoard ContentItem={ContentItem} showDebug />
            {children}
        </div>
    );
}
