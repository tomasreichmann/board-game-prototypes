import React, { PropsWithChildren, createContext, useContext, useReducer } from "react";
import { initialPerspectiveViewState, PerspectiveViewStateType } from "./perspectiveViewModel";
import perspectiveViewReducer, { PerspectiveViewActionType } from "./perspectiveViewReducer";

export type PerspectiveViewContextType = {
    state: PerspectiveViewStateType;
    dispatch: (action: PerspectiveViewActionType) => void;
};

const initialContext: PerspectiveViewContextType = {
    state: initialPerspectiveViewState,
    dispatch: () => {},
};

const PerspectiveViewContext = createContext(initialContext);

export const usePerspectiveView = () => {
    return useContext(PerspectiveViewContext);
};

export type PerspectiveViewProviderProps = PropsWithChildren<{}>;

const PerspectiveViewProvider = ({ children }: PerspectiveViewProviderProps) => {
    const [state, dispatch] = useReducer(perspectiveViewReducer, initialPerspectiveViewState);

    return <PerspectiveViewContext.Provider value={{ state, dispatch }}>{children}</PerspectiveViewContext.Provider>;
};

export default PerspectiveViewProvider;
