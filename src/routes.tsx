import IndexRoute from "./routes/IndexRoute/IndexRoute";
import prototypes from "./prototypes/prototypes";
import ErrorBoundary from "./components/ErrorBoundary";
import { RouteDefinition } from "./routeTypes";
import { Route, Routes } from "react-router-dom";

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

const routes: RouteDefinition[] = [
    {
        name: "Home",
        path: "/",
        Component: IndexRoute,
    },
    ...prototypes,
];

const routeStructure = createRouteElementsFromObject(routes);

export default routeStructure;
