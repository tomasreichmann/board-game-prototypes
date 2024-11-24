import React, { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import useGame from "./useGame";
import { GameStateEnum } from "./types";
import { usePerspectiveView } from "../../../../components/PerspectiveView/PerspectiveViewProvider";
import { PerspectiveViewActionTypeEnum } from "../../../../components/PerspectiveView/perspectiveViewReducer";
import { clamp } from "lodash";
import { useAuth } from "@clerk/clerk-react";
import ContentItem from "./ContentItem";
import useContentItems from "./useContentItems";

export type PerspectiveBoardProps = {
    className?: string;
    gameId?: string;
};

function PerspectiveBoard({ className, gameId }: PerspectiveBoardProps) {
    const { game, error, clearError, dispatch } = useGame(gameId);
    const { dispatch: viewDispatch, state: viewState } = usePerspectiveView();
    const contentItems = useContentItems(game);

    useEffect(() => {
        if (game?.viewState) {
            console.log("viewState changed", game.viewState);
            viewDispatch({
                type: PerspectiveViewActionTypeEnum.Updater,
                payload: () => ({
                    ...game.viewState,
                }),
            });
        }
    }, [game?.viewState]);

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
            {contentItems.map((contentProps) => (
                <ContentItem key={contentProps.id} {...contentProps} />
            ))}
        </div>
    );
}

export default React.memo(PerspectiveBoard);
