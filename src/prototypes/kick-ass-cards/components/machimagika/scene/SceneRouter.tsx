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
import { GameActionType } from "../reducer/gameReducer";
import EditorScene from "../editor/EditorScene";
import { isAnyOtherSceneVisible, isSceneVisible } from "../model/visibilityHelpers";

export type SceneRouterProps = React.PropsWithChildren<{
    className?: string;
    scene?: SceneEnum;
}>;

const toggleEditorAction: GameActionType = {
    type: GameActionTypeEnum.Common,
    toggleScene: SceneEnum.Editor,
};

export default function SceneRouter({ className, children }: SceneRouterProps) {
    const { state, dispatch } = useGameContext();
    const { mainMenuVisibility } = state;
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
            <div className="absolute top-5 right-20 z-[5] ">
                {isSceneVisible(state, SceneEnum.MainMenu) && (
                    <button
                        className={twMerge(
                            "font-mmHeading text-xl px-4 py-2 font-bold text-amber-100 hover:scale-125 focus:scale-125 text-left bg-[rgba(0,0,0,0.5)] focus:outline-0 focus:border-0 outline-0 border-0 origin-top-right transform-gpu transition-transform duration-200",
                            className
                        )}
                        onClick={() => dispatch({ type: GameActionTypeEnum.Common, showScene: SceneEnum.MainMenu })}
                    >
                        MENU
                    </button>
                )}
                {isSceneVisible(state, SceneEnum.Editor) && (
                    <button
                        className={twMerge(
                            "font-mmHeading text-xl px-4 py-2 font-bold text-amber-100 hover:scale-125 focus:scale-125 text-left bg-[rgba(0,0,0,0.5)] focus:outline-0 focus:border-0 outline-0 border-0 origin-top-right transform-gpu transition-transform duration-200",
                            className
                        )}
                        onClick={() =>
                            dispatch({
                                type: GameActionTypeEnum.Common,
                                hideScene: SceneEnum.MainMenu,
                                showScene: isAnyOtherSceneVisible(state, SceneEnum.Editor)
                                    ? undefined
                                    : SceneEnum.MainMenu,
                            })
                        }
                    >
                        ×
                    </button>
                )}
            </div>
            <EditorScene
                className={twMerge(
                    "absolute left-0 top-0 w-full h-full z-[4] duration-1000",
                    isSceneVisible(state, SceneEnum.Editor) ? "opacity-100" : "opacity-0 pointer-events-none",
                    className
                )}
            />
            <DialogScene
                className={twMerge(
                    "absolute left-0 top-0 w-full h-full z-[4] duration-1000",
                    isSceneVisible(state, SceneEnum.Dialog) ? "opacity-100" : "opacity-0 pointer-events-none",
                    className
                )}
            />
            <LocationScene
                className={twMerge(
                    "absolute left-0 top-0 w-full h-full z-[3] duration-1000",
                    isSceneVisible(state, SceneEnum.Location) ? "opacity-100" : "opacity-0 pointer-events-none",
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
