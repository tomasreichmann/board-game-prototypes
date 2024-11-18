import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import routeStructure from "./routes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route
                    path="/kick-ass-cards*"
                    element={<Navigate to={window.location.pathname.replace("/kick-ass-cards", "/mighty-decks")} />}
                />
                {routeStructure}
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
