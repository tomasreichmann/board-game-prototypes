import React, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import useGameContext from "../model/GameContext";
import { GameActionType, GameActionTypeEnum } from "../reducer/gameReducer";
import { SceneEnum } from "../scene/sceneModel";
import Image from "../content/Image";

export type MenuItemProps = React.PropsWithChildren<
    {
        className?: string;
        autoFocus?: boolean;
    } & HTMLAttributes<HTMLButtonElement>
>;

export const MenuItem = ({ children, className, ...restProps }: MenuItemProps) => {
    return (
        <button
            tabIndex={0}
            {...restProps}
            className={twMerge(
                "text-amber-100 text-3xl font-mmHeading hover:scale-150  focus:scale-150 bg-transparent focus:outline-0 focus:border-0 p-0 outline-0 border-0 origin-left transform-gpu transition-transform duration-200",
                className
            )}
        >
            {children}
        </button>
    );
};
export type MainMenuSceneProps = React.PropsWithChildren<{
    className?: string;
}>;

const newGameAction: GameActionType = {
    type: GameActionTypeEnum.Common,
    showScene: SceneEnum.Dialog,
    updateDialog: {
        dialogId: "newGame",
        currentNodeId: "start",
    },
};

export default function MainMenuScene({ className, children }: MainMenuSceneProps) {
    const {
        dispatch,
        state: {},
    } = useGameContext();
    return (
        <div className={twMerge("relative w-full h-full", className)}>
            <Image className="w-full h-full object-cover" src="/MM/mainMenuBackground.png" alt="Main Menu Background" />
            <div className="absolute left-20 top-40 bottom-40 flex flex-col justify-center gap-20">
                <h1 className="text-amber-100 text-5xl font-mmHeading uppercase">MACHIMAGIKA</h1>
                <div className="flex-col items-start flex gap-10">
                    <MenuItem onClick={() => dispatch(newGameAction)}>New game</MenuItem>
                    {/* <MenuItem autoFocus>Continue</MenuItem>
                    <MenuItem>Load game</MenuItem>
                    <MenuItem>Options</MenuItem>
                    <MenuItem>Credits</MenuItem>
                    <MenuItem>Quit</MenuItem> */}
                </div>
            </div>
            {children}
        </div>
    );
}
