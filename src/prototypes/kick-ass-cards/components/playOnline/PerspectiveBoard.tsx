import React, { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import useGame from "./useGame";
import { GameStateEnum } from "./types";
import { usePerspectiveView } from "../../../../components/PerspectiveView/PerspectiveViewProvider";
import Position from "../../../../components/PerspectiveView/Position";
import { PerspectiveViewActionTypeEnum } from "../../../../components/PerspectiveView/perspectiveViewReducer";
import { clamp } from "lodash";
import { getCenterPan } from "../../../../components/PerspectiveView/utils";

export type PerspectiveBoardProps = {
    className?: string;
    gameId?: string;
};

const stageWidth = 1920;
const stageHeight = 1080;

function PerspectiveBoard({ className, gameId }: PerspectiveBoardProps) {
    const { game, error, clearError, dispatch } = useGame(gameId);
    const { dispatch: viewDispatch, state: viewState } = usePerspectiveView();

    useEffect(() => {
        const centerPan = getCenterPan(stageWidth, stageHeight, window.innerWidth, window.innerHeight);
        viewDispatch({
            type: PerspectiveViewActionTypeEnum.Updater,
            payload: (state) => ({
                ...state,
                stage: {
                    ...state.stage,
                    width: stageWidth,
                    height: stageHeight,
                    x: -centerPan.x,
                    // y: -centerPan.y,
                },
                lens: { ...state.lens, depthOfField: 1000 },
            }),
        });
    }, []);

    // when the game gets to inProgress, focus perspective view on defaultView position
    useEffect(() => {
        if (game?.state === GameStateEnum.Ready) {
            // const centerPan = getCenterPan(stageWidth, stageHeight, window.innerWidth, window.innerHeight);
            viewDispatch({
                type: PerspectiveViewActionTypeEnum.Updater,
                payload: (state) => ({
                    ...state,
                    stage: {
                        ...state.stage,
                        rotateX: 40,
                        y: -stageHeight * 0.25,
                        z: -1000,
                    },
                }),
            });
        }
    }, [game?.state]);

    const onWheel: React.WheelEventHandler<HTMLDivElement> = (event) => {
        viewDispatch({
            type: PerspectiveViewActionTypeEnum.Updater,
            payload: (state) => ({
                ...state,
                stage: { ...state.stage, z: clamp(state.stage.z - event.deltaY, -999, 999) },
            }),
        });
    };

    if (!game) {
        return null;
    }

    const isVisible = game.state !== GameStateEnum.Ready;

    const currentUserHandSize = {
        width: stageWidth,
        height: stageHeight / 3,
    };
    const currentUserHandProps = {
        id: "currentUserHand",
        children: "currentUserHand",
        className: "border-2 border-kac-gold-dark",
        x: 0,
        y: stageHeight,
        z: 0,
        transformOrigin: "top center",
        rotateX: -viewState.stage.rotateX,
        ...currentUserHandSize,
    };
    const currentUserTableSize = {
        width: stageWidth,
        height: stageHeight / 3,
    };
    const currentUserTableProps = {
        id: "currentUserTable",
        children: "currentUserTable",
        className: "border-2 border-kac-gold-dark",
        x: 0,
        y: stageHeight - currentUserTableSize.height,
        z: 0,
        ...currentUserTableSize,
    };

    const otherPlayerHandsSize = {
        width: stageWidth,
        height: stageHeight / 4,
    };
    const otherPlayerHandsProps = {
        id: "otherPlayerHands",
        children: "otherPlayerHands",
        className: "border-2 border-kac-cloth-dark",
        x: 0,
        y: -otherPlayerHandsSize.height,
        z: 0,
        transformOrigin: "bottom center",
        rotateX: -viewState.stage.rotateX,
        ...otherPlayerHandsSize,
    };
    const otherPlayerTablesSize = {
        width: stageWidth,
        height: stageHeight / 4,
    };
    const otherPlayerTablesProps = {
        id: "otherPlayerTables",
        children: "otherPlayerTables",
        className: "border-2 border-kac-cloth-dark",
        x: 0,
        y: 0,
        z: 0,
        ...otherPlayerTablesSize,
    };

    const centerTableSize = {
        width: stageWidth,
        height: stageHeight - currentUserTableSize.height - otherPlayerTablesSize.height,
    };
    const centerTableProps = {
        id: "centerTable",
        children: "centerTable",
        className: "border-2 border-kac-monster-dark",
        x: 0,
        y: otherPlayerTablesSize.height,
        z: 0,
        ...centerTableSize,
    };

    const rotateSizeCoefficient = 0.9;

    const defaultViewSize = {
        width: stageWidth * 1.25,
        height: stageHeight * rotateSizeCoefficient * 1.5,
    };
    const defaultViewProps = {
        id: "defaultView",
        children: "defaultView",
        className: "bg-kac-steel/25 border-2 border-kac-steel-dark",
        x: stageWidth / 2 - defaultViewSize.width / 2,
        y: 0,
        z: 0,
        rotateX: -40,
        ...defaultViewSize,
    };

    return (
        <div
            className={twMerge("PerspectiveBoard w-[1920px] h-[1080px]", !isVisible && "hidden", className)}
            style={viewState.stageStyle}
            onWheel={onWheel}
        >
            <Position
                id="background"
                x={0}
                y={0}
                z={-1}
                width={stageWidth}
                height={stageHeight}
                className="bg-kac-bone-dark"
                /* style={{ backgroundImage: `url(${backgroundUrl})`, backgroundSize: "1024px 1024px" }} */
            />
            <Position {...defaultViewProps} /* className="pointer-events-none" */ />
            <Position {...currentUserHandProps} />
            <Position {...currentUserTableProps} />
            <Position {...otherPlayerHandsProps} />
            <Position {...otherPlayerTablesProps} />
            <Position {...centerTableProps} />
        </div>
    );
}

export default React.memo(PerspectiveBoard);
