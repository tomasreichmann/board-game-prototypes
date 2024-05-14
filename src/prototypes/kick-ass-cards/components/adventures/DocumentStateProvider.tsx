import React from "react";
import documentStateReducer, { DocumentStateActionType, DocumentStateType, initialState } from "./documentStateReducer";

export type DocumentStateContextType = {
    state: DocumentStateType;
    dispatch: React.Dispatch<DocumentStateActionType>;
};

export const initialContext = {
    state: initialState,
    dispatch: () => {},
};

export const DocumentStateContext = React.createContext<DocumentStateContextType>(initialContext);

// DocumentStateProvider
export const DocumentStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [state, dispatch] = React.useReducer(documentStateReducer, initialContext);

    return <DocumentStateContext.Provider value={{ state, dispatch }}>{children}</DocumentStateContext.Provider>;
};

// useDocumentState
export const useDocumentState = () => {
    const context = React.useContext(DocumentStateContext);
    if (!context) {
        throw new Error("useDocumentState must be used within a DocumentStateProvider");
    }
    return context;
};
