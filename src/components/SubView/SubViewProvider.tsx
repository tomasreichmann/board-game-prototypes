import React, { PropsWithChildren, createContext, useContext, useReducer } from "react";
import { initialSubViewState, SubViewStateType } from "./subViewModel";
import subViewReducer, { SubViewActionType } from "./subViewReducer";

export type SubViewContextType = {
    state: SubViewStateType;
    dispatch: (action: SubViewActionType) => void;
};

const initialContext: SubViewContextType = {
    state: initialSubViewState,
    dispatch: () => {},
};

const SubViewContext = createContext(initialContext);

export const useSubView = () => {
    return useContext(SubViewContext);
};

export type SubViewProviderProps = PropsWithChildren<{}>;

const SubViewProvider = ({ children }: SubViewProviderProps) => {
    const [state, dispatch] = useReducer(subViewReducer, initialSubViewState);

    return <SubViewContext.Provider value={{ state, dispatch }}>{children}</SubViewContext.Provider>;
};

export default SubViewProvider;
