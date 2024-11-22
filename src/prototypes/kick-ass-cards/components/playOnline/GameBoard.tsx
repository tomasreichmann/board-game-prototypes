import React from "react";
import { twMerge } from "tailwind-merge";
import useGame from "./useGame";
import Button from "../controls/Button";
import { ActionTypeEnum, GameStateEnum } from "./types";
import useMeasure from "react-use-measure";
import PerspectiveView from "../../../../components/PerspectiveView/PerspectiveView";
import PerspectiveViewProvider from "../../../../components/PerspectiveView/PerspectiveViewProvider";
import PerspectiveBoard from "./PerspectiveBoard";

export type GameBoardProps = {
    className?: string;
    gameId?: string;
};

function GameBoard({ className, gameId }: GameBoardProps) {
    const { game, error, clearError, dispatch } = useGame(gameId);
    const [ref, { width, height }] = useMeasure();

    if (!game) {
        return null;
    }

    return (
        <div className={twMerge("GameBoard w-full h-full bg-kac-steel", className)} ref={ref}>
            <Button
                size="xl"
                className={twMerge(
                    "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50",
                    game.state !== GameStateEnum.Ready && "opacity-0 duration-600"
                )}
                color="success"
                onClick={() => dispatch({ type: ActionTypeEnum.StartGame })}
            >
                START GAME
            </Button>
            <PerspectiveViewProvider>
                <PerspectiveView showControls={true} showDebug={true}>
                    <PerspectiveBoard gameId={gameId} />
                </PerspectiveView>
            </PerspectiveViewProvider>
        </div>
    );
}

export default React.memo(GameBoard);
