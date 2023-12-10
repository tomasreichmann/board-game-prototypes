import React, { PropsWithChildren, useEffect } from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { useSubView } from "./SubViewProvider";

import "./SubView.css";
import routeStructure from "../../routes";

export default function SubViewRouter() {
    const { state } = useSubView();
    const history = createBrowserHistory();
    return null;
    useEffect(() => {
        if (state.uri) {
            history.push(state.uri);
        }
    }, [state.uri]);
}
