import React, { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import useGame from "../hooks/useGame";
import { GameStateEnum } from "../model/types";
import { usePerspectiveView } from "../../../../../components/PerspectiveView/PerspectiveViewProvider";
import { PerspectiveViewActionTypeEnum } from "../../../../../components/PerspectiveView/perspectiveViewReducer";
import ContentItem from "./ContentItem";
import useContentItems, { stripMetaPropsFromContentItem } from "../hooks/useContentItems";

export type PerspectiveBoardProps = {
    className?: string;
    gameId?: string;
};

function PerspectiveBoard({ className, gameId }: PerspectiveBoardProps) {
    const { game, error, clearError, dispatch } = useGame(gameId);
    const { dispatch: viewDispatch, state: viewState } = usePerspectiveView();
    const contentItems = useContentItems(game, dispatch);

    const contentItemsRef = React.useRef(contentItems);
    contentItemsRef.current = contentItems;
    const isContentItemsReady = contentItemsRef.current?.length > 0;

    const focusAt = game?.focus?.at;
    const focusMode = game?.focus?.mode;
    const stageWidth = game?.stageWidth ?? 1920;
    const stageHeight = game?.stageHeight ?? 1080;
    const defaultPerspective = 1000;
    const defaultDepthOfField = 1000;

    useEffect(() => {
        if (focusAt && focusMode && isContentItemsReady) {
            console.log("focus changed", focusAt, focusMode);
            const position = contentItemsRef.current?.find((c) => c.id === focusAt);
            if (!position) {
                console.error("focus position not found", { focusAt, focusMode });
                return;
            }
            const {
                x = 0,
                y = 0,
                z = 0,
                rotateX = 0,
                rotateY = 0,
                rotateZ = 0,
                width: focusWidth = 100,
                height: focusHeight = 100,
            } = position.positionProps;
            console.log("focus position", { x, y, z, rotateX, rotateY, rotateZ, focusWidth, focusHeight });
            viewDispatch({
                type: PerspectiveViewActionTypeEnum.Refocus,
                payload: {
                    mode: focusMode,
                    focusWidth,
                    focusHeight,
                    stageWidth,
                    stageHeight,
                    x,
                    y,
                    z,
                    rotateX,
                    rotateY,
                    rotateZ,
                    depthOfField: defaultPerspective,
                    perspective: defaultDepthOfField,
                },
            });
        }
    }, [
        focusAt,
        focusMode,
        stageWidth,
        stageHeight,
        viewState.frame.height,
        viewState.frame.width,
        isContentItemsReady,
    ]);

    /*     const onWheel: React.WheelEventHandler<HTMLDivElement> = (event) => {
        viewDispatch({
            type: PerspectiveViewActionTypeEnum.Updater,
            payload: (state) => ({
                ...state,
                stage: { ...state.stage, z: clamp(state.stage.z - event.deltaY, -999, 999) },
            }),
        });
    }; */

    if (!game) {
        return null;
    }

    const isVisible = game.state !== GameStateEnum.Ready;

    return (
        <div
            className={twMerge("PerspectiveBoard", !isVisible && "hidden", className)}
            style={viewState.stageStyle}
            /* onWheel={onWheel} */
        >
            {contentItems.map((contentProps) => {
                const props = stripMetaPropsFromContentItem(contentProps);
                return <ContentItem key={contentProps.id} {...props} isDebugging={game.isDebugging} />;
            })}
        </div>
    );
}

export default React.memo(PerspectiveBoard);
