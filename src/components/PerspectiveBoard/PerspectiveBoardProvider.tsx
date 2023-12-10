import React, { PropsWithChildren, createContext, useContext, useReducer } from "react";
import { initialPerspectiveBoardState, PerspectiveBoardStateType } from "./perspectiveBoardModel";
import perspectiveBoardReducer, { PerspectiveBoardActionType } from "./perspectiveBoardReducer";

export type PerspectiveBoardContextType = {
    state: PerspectiveBoardStateType;
    dispatch: (action: PerspectiveBoardActionType) => void;
};

const initialContext: PerspectiveBoardContextType = {
    state: initialPerspectiveBoardState,
    dispatch: () => {},
};

const PerspectiveBoardContext = createContext(initialContext);

export const usePerspectiveBoard = () => {
    return useContext(PerspectiveBoardContext);
};

export type PerspectiveBoardProviderProps = PropsWithChildren<{
    initialContent?: PerspectiveBoardStateType["content"];
}>;

const PerspectiveBoardProvider = ({ initialContent = [], children }: PerspectiveBoardProviderProps) => {
    const [state, dispatch] = useReducer(perspectiveBoardReducer, {
        ...initialPerspectiveBoardState,
        content: initialContent,
    });

    return <PerspectiveBoardContext.Provider value={{ state, dispatch }}>{children}</PerspectiveBoardContext.Provider>;
};

export default PerspectiveBoardProvider;
