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
import LlmJobRoute2 from "./routes/LlmJobRoute2";

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
        name: "LLM Job 2",
        path: "/llm-job-2",
        Component: LlmJobRoute2,
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

export const navRoutes = routes.filter((route) => !route?.hideFromNav);

const routeStructure = createRouteElementsFromObject(routes);

export default routeStructure;
