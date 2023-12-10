import React, { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";
import { RouteDefinition } from "../../routeTypes";
import PerspectiveView from "../../components/PerspectiveViewX/PerspectiveView";
import PerspectiveViewProvider from "../../components/PerspectiveViewX/PerspectiveViewProvider";
import MapScene from "./components/MapScene";
import TestScene from "./components/TestScene";

// import "./KickAssCardsPrototype.css";

const scenes = ["MapScene", "TestScene"];

export default function PerspectiveViewPrototype({ children }: PropsWithChildren) {
    const [scene, setScene] = React.useState("MapScene");
    return (
        <div
            className="h-screen print:h-auto relative flex flex-col items-stretch overflow-auto bg-black print:bg-white text-kac-steel-light print:text-kac-steel-dark font-kacBody"
            data-theme="KickAssCardsPrototype"
        >
            <div className="flex flex-row items-start gap-1">
                <a
                    key={scene}
                    href="/"
                    className="px-3 py-1 rounded-sm bg-kac-cloth-dark decoration-none text-white hover:text-white"
                >
                    🏠
                </a>
                {scenes.map((scene) => (
                    <button key={scene} className="px-3 py-1 rounded-sm bg-kac-blood" onClick={() => setScene(scene)}>
                        {scene}
                    </button>
                ))}
            </div>
            <PerspectiveViewProvider key={scene}>
                <PerspectiveView showDebug showControls>
                    {scene === "MapScene" && <MapScene />}
                    {scene === "TestScene" && <TestScene />}
                </PerspectiveView>
            </PerspectiveViewProvider>
            <Outlet />
            {children}
        </div>
    );
}

export const perspectiveViewPrototypeRoute: RouteDefinition = {
    name: "Perspective View",
    Component: PerspectiveViewPrototype,
    path: "/perspective-view",
    children: [],
};
