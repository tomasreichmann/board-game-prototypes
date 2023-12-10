import React, { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";
import { RouteDefinition } from "../../routeTypes";

import SubViewExamples from "./components/SubViewExamples";
import SubViewProvider from "../../components/SubView/SubViewProvider";
import SubView from "../../components/SubView/SubView";

// import "./KickAssCardsPrototype.css";

export default function SubViewPrototype({ children }: PropsWithChildren) {
    return (
        <div
            className="h-screen print:h-auto relative flex flex-col items-stretch overflow-auto bg-black print:bg-white text-kac-steel-light print:text-kac-steel-dark font-kacBody"
            data-theme="KickAssCardsPrototype"
        >
            <SubViewProvider>
                <div className="p-8">
                    <h1 className="text-3xl">Sub View Prototype</h1>
                    <p>The SubView Component allows opening other routes in a side panel or overlay</p>
                </div>
                <SubViewExamples />
            </SubViewProvider>
            <Outlet />
            {children}
        </div>
    );
}

export const subViewPrototypeRoute: RouteDefinition = {
    name: "Sub View",
    Component: SubViewPrototype,
    path: "/sub-view",
    children: [],
};
