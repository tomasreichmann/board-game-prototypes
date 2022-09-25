import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import "./index.css";
import IndexRoute from "./routes/IndexRoute/IndexRoute";
import prototypes from "./prototypes/prototypes";
import ErrorBoundary from "./components/ErrorBoundary";

const routes = [
    {
        path: "/",
        element: <IndexRoute />,
    },
    ...prototypes.map(({ path, Component }) => ({
        path,
        element: (
            <ErrorBoundary>
                <Component />
            </ErrorBoundary>
        ),
    })),
];

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
