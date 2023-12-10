import React, { useEffect, useState } from "react";
import { Navigation } from "../Navigation";
import PerspectiveViewProvider from "../../../../components/PerspectiveView/PerspectiveViewProvider";
import PerspectiveView from "../../../../components/PerspectiveView/PerspectiveView";
import Position from "../../../../components/PerspectiveView/Position";
import Paper, { PaperProps } from "../../../../components/print/Paper/Paper";
import { cardSizes } from "../../../../components/print/paperSizes";
import { PositionProps } from "../../../../components/perspectiveViewDeprecated/Position";
import ActorCard from "../worldBuilder/content/ActorCard";
import WorldBuilder from "../worldBuilder/WorldBuilder";
import PerspectiveBoard from "../../../../components/PerspectiveBoard/PerspectiveBoard";
import PerspectiveBoardProvider from "../../../../components/PerspectiveBoard/PerspectiveBoardProvider";
import { PerspectiveBoardDebug } from "../../../../components/PerspectiveBoard/PerspectiveBoardDebug";
import ComponentPanel from "../worldBuilder/controls/ComponentPanel";

const actorCardSize: keyof typeof cardSizes = "Tarot";
const [actorCardWidth, actorCardHeight] = cardSizes[actorCardSize].points;

export default function WorldBuilderRoute() {
    const [isNavigationVisible, setIsNavigationVisible] = useState(true);

    useEffect(() => {
        let timeout: number;
        if (isNavigationVisible) {
            timeout = setTimeout(() => {
                setIsNavigationVisible(false);
            }, 2000);
        }
        return () => clearTimeout(timeout);
    }, [isNavigationVisible]);
    return (
        <div className="w-full h-full bg-black overflow-hidden">
            <div
                className="absolute left-0 top-0 right-0 z-40 transition-all duration-300 ease-in-out hover:!translate-x-0"
                style={{ transform: isNavigationVisible ? "translateY(0%)" : "translateY(-100%)" }}
            >
                <Navigation className="relative left-0 top-0 right-0" />
                <button
                    className="absolute right-0 top-[100%] translate-y-2 -mt-40 z-30 text-xl pt-40 pb-2 px-4 rounded-tr-none rounded-br-none rounded-tl-none font-bold bg-[rgba(255,255,255,0.5)] border-none outline-none text-black focus:outline-0"
                    onClick={() => setIsNavigationVisible((isNavigationVisible) => !isNavigationVisible)}
                >
                    ☰
                </button>
            </div>
            <div className="w-screen h-screen select-none bg-black overflow-hidden">
                <PerspectiveViewProvider>
                    <PerspectiveBoardProvider>
                        <PerspectiveView showControls>
                            <WorldBuilder />
                        </PerspectiveView>
                        <PerspectiveBoardDebug className="fixed right-2 bottom-[500px] max-h-[400px] max-w-[400px] overflow-auto print:hidden text-xs text-slate-800 bg-slate-100 border-2 border-slate-500 rounded-md p-2" />
                        <ComponentPanel className="absolute left-0 bottom-0 p-4 bg-black bg-opacity-50 border-t-2 border-r-2 border-black border-opacity-25 rounded-tr-md" />
                    </PerspectiveBoardProvider>
                </PerspectiveViewProvider>
            </div>
        </div>
    );
}
