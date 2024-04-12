import IndexRoute from "./routes/IndexRoute";
import SettingsRoute from "./routes/SettingsRoute";
import prototypes from "./prototypes/prototypes";
import ErrorBoundary from "./components/ErrorBoundary";

import { RouteDefinition } from "./routeTypes";
import { Route } from "react-router-dom";
import LlmRoute from "./routes/LlmRoute";
import SDRoute from "./routes/SDRoute";
import LlmJobRoute from "./routes/LlmJobRoute";
import AiHordeRoute from "./routes/AiHordeRoute";

const createRouteElementsFromObject = (routeDefinitions: RouteDefinition[]) => {
    return routeDefinitions.map(({ path, Component, children }) => (
        <Route
            key={path}
            {...{
                path,
                element: (
                    <ErrorBoundary>
                        <Component />
                    </ErrorBoundary>
                ),
                children: children?.length ? createRouteElementsFromObject(children) : [],
            }}
        />
    ));
};

export const routes: RouteDefinition[] = [
    {
        name: "Board Game Prototypes",
        path: "/",
        Component: IndexRoute,
    },
    ...prototypes,
    {
        name: "LLM",
        path: "/llm",
        Component: LlmRoute,
    },
    {
        name: "LLM Job",
        path: "/llm-job",
        Component: LlmJobRoute,
    },
    {
        name: "SD",
        path: "/sd",
        Component: SDRoute,
    },
    {
        name: "AI Horde",
        path: "/ai-horde",
        Component: AiHordeRoute,
    },
    {
        name: "Settings",
        path: "/settings",
        Component: SettingsRoute,
    },
];

const routeStructure = createRouteElementsFromObject(routes);

export default routeStructure;
