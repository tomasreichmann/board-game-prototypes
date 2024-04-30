import React from "react";

export type RouteDefinition = {
    Component: React.ComponentType<React.PropsWithChildren>;
    path: string;
    name: string;
    hideFromNav?: boolean;
    children?: RouteDefinition[];
};
