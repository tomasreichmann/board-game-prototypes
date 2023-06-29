import React from "react";
import { twMerge } from "tailwind-merge";
import useGameContext, { SceneEnum } from "../GameContext";
import MainMenuScene from "./MainMenuScene";
import ToggleData from "../../../../../components/DataToggle";
import DialogScene from "./DialogScene";

export type SceneRouterProps = React.PropsWithChildren<{
    className?: string;
    scene?: SceneEnum;
}>;

const sceneComponentMap = {
    [SceneEnum.MainMenu]: MainMenuScene,
    [SceneEnum.Dialog]: DialogScene,
};

export default function SceneRouter({ className, children }: SceneRouterProps) {
    const { state } = useGameContext();
    const { scene } = state;
    const Scene = sceneComponentMap[scene as keyof typeof sceneComponentMap] || sceneComponentMap[SceneEnum.MainMenu];
    return (
        <Scene className={twMerge("relative w-full h-full", className)}>
            {children} <ToggleData data={state} className="absolute bottom-10 right-10 max-w-[800px] max-h-[400px]" />
        </Scene>
    );
}
