import React from "react";
import { twMerge } from "tailwind-merge";
import useGameContext from "../model/GameContext";
import { SceneEnum } from "./sceneModel";
import MainMenuScene from "../mainMenu/MainMenuScene";
import ToggleData from "../../../../../components/DataToggle";
import DialogScene from "../dialog/DialogScene";
import { VisibilityEnum } from "../model/gameState";
import LocationScene from "../location/LocationScene";
import { GameActionTypeEnum } from "../reducer/GameActionTypeEnum";

export type SceneRouterProps = React.PropsWithChildren<{
    className?: string;
    scene?: SceneEnum;
}>;

export default function SceneRouter({ className, children }: SceneRouterProps) {
    const { state, dispatch } = useGameContext();
    const { mainMenuVisibility, dialogVisibility, locationVisibility } = state;
    return (
        <>
            <MainMenuScene
                className={twMerge(
                    "absolute left-0 top-0 w-full h-full duration-1000 z-[6]",
                    mainMenuVisibility === VisibilityEnum.Hidden && "opacity-0 pointer-events-none",
                    mainMenuVisibility === VisibilityEnum.Visible && "opacity-100",
                    className
                )}
            />
            {mainMenuVisibility === VisibilityEnum.Hidden && (
                <button
                    className={twMerge(
                        "absolute top-5 right-20 z-[5] font-mmHeading text-xl px-4 py-2 font-bold text-amber-100 hover:scale-125 focus:scale-125 text-left bg-[rgba(0,0,0,0.5)] focus:outline-0 focus:border-0 outline-0 border-0 origin-top-right transform-gpu transition-transform duration-200",
                        className
                    )}
                    onClick={() => dispatch({ type: GameActionTypeEnum.Common, showScene: SceneEnum.MainMenu })}
                >
                    MENU
                </button>
            )}
            <DialogScene
                className={twMerge(
                    "absolute left-0 top-0 w-full h-full z-[4] duration-1000",
                    dialogVisibility === VisibilityEnum.Hidden && "opacity-0 pointer-events-none",
                    dialogVisibility === VisibilityEnum.Visible && "opacity-100",
                    className
                )}
            />
            <LocationScene
                className={twMerge(
                    "absolute left-0 top-0 w-full h-full z-[3] duration-1000",
                    locationVisibility === VisibilityEnum.Hidden && "opacity-0 pointer-events-none",
                    locationVisibility === VisibilityEnum.Visible && "opacity-100",
                    className
                )}
            />
            {children}
            <ToggleData
                data={state}
                initialCollapsed
                className="absolute bottom-10 right-10 max-w-[800px] max-h-[400px] z-10"
            />
        </>
    );
}
