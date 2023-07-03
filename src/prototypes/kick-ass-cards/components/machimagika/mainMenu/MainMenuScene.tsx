import React, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import useGameContext from "../model/GameContext";
import { GameActionType } from "../reducer/gameReducer";
import { GameActionTypeEnum } from "../reducer/GameActionTypeEnum";
import { SceneEnum } from "../scene/sceneModel";
import Image from "../content/Image";
import Evaporation from "../effect/Evaporation";
import { VisibilityEnum } from "../model/gameState";

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
                "text-mm-steel text-3xl font-mmHeading hover:text-mm-steel-light focus:text-mm-steel-light hover:scale-150  focus:scale-150 bg-transparent focus:outline-0 focus:border-0 p-0 outline-0 border-0 origin-left transform-gpu transition-transform duration-200",
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
    type: GameActionTypeEnum.NewGame,
};

const hideMenuAction: GameActionType = {
    type: GameActionTypeEnum.Common,
    hideScene: SceneEnum.MainMenu,
};

export default function MainMenuScene({ className, children }: MainMenuSceneProps) {
    const {
        dispatch,
        state: { mainMenuVisibility, inventoryVisibility, dialogVisibility, locationVisibility, regionVisibility },
    } = useGameContext();
    const isAnyOtherSceneVisible = inventoryVisibility || dialogVisibility || locationVisibility || regionVisibility;
    return (
        <div className={twMerge("MainMenuScene relative w-full h-full", className)}>
            <Image className="w-full h-full object-cover" src="/MM/mainMenuBackground.png" alt="Main Menu Background" />
            <div className="absolute left-20 top-40 bottom-40 flex flex-col justify-center gap-20">
                <div className="relative">
                    <h1 className="relative text-mm-steel text-5xl font-mmHeading uppercase z-[2]">MACHIMAGIKA</h1>
                    <Evaporation className="absolute z-[0]" disabled={mainMenuVisibility === VisibilityEnum.Hidden} />
                </div>
                <div className="flex-col items-start flex gap-10">
                    <MenuItem onClick={() => dispatch(newGameAction)}>New game</MenuItem>
                    {/* <MenuItem autoFocus>Continue</MenuItem>
                    <MenuItem>Load game</MenuItem>
                    <MenuItem>Options</MenuItem>
                    <MenuItem>Credits</MenuItem>
                    <MenuItem>Quit</MenuItem> */}
                </div>
            </div>
            {isAnyOtherSceneVisible && (
                <button
                    onClick={() => dispatch(hideMenuAction)}
                    className="absolute top-5 right-20 z-[5] font-mmHeading text-xl px-4 py-2 font-bold text-amber-100 hover:scale-125 focus:scale-125 text-left bg-[rgba(0,0,0,0.5)] focus:outline-0 focus:border-0 outline-0 border-0 origin-top-right transform-gpu transition-transform duration-200"
                >
                    ×
                </button>
            )}
            {children}
        </div>
    );
}
