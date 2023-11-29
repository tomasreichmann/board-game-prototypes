import React, { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";
import { RouteDefinition } from "../../routeTypes";
import PerspectiveView from "./components/PerspectiveView";
import PerspectiveViewProvider from "./components/PerspectiveViewProvider";

// import "./KickAssCardsPrototype.css";

export default function PerspectiveViewPrototype({ children }: PropsWithChildren) {
    return (
        <div
            className="h-screen print:h-auto relative flex flex-col items-stretch overflow-auto bg-kac-blood-dark print:bg-white text-kac-steel-light print:text-kac-steel-dark font-kacBody"
            data-theme="KickAssCardsPrototype"
        >
            <PerspectiveViewProvider>
                <PerspectiveView />
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
