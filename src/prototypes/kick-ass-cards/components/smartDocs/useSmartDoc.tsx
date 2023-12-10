import React, { useCallback, useState } from "react";
import { SmartDocContentItemType, SmartDocType, smartDocLSKeyPrefix } from "./smartDocs";
import { SmartDocElementType, getDefaultProps } from "./smartDocElementMap";
import immutableAssign from "immutable-assign";
import { get } from "lodash";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
import { v4 as uuid } from "uuid";

export type SmartDocStateType = SmartDocType;

export enum SmartDocActionTypeEnum {
    LoadDoc = "LoadDoc",
    SetContent = "SetContent",
}

export type SmartDocSetContentModeType = "prepend" | "append";

// Define the action types
type SmartDocActionType =
    | {
          type: SmartDocActionTypeEnum.SetContent;
          path: string;
          mode?: SmartDocSetContentModeType;
          element: SmartDocElementType<any>;
      }
    | { type: SmartDocActionTypeEnum.LoadDoc; doc: SmartDocStateType };

// Define the reducer function
const reducer = (state: SmartDocStateType | null, action: SmartDocActionType): SmartDocStateType | null => {
    if (action.type === SmartDocActionTypeEnum.LoadDoc) {
        // Handle action type 1
        return action.doc;
    }
    if (state === null) {
        console.warn("no doc loaded");
        return state;
    }
    if (action.type === SmartDocActionTypeEnum.SetContent) {
        // Handle action type 1
        const content: SmartDocContentItemType = {
            componentName: action.element.componentName,
            props: getDefaultProps(action.element.controls),
            id: uuid(),
        };

        return {
            ...state,
            content: immutableAssign(
                state.content,
                (content) => (action.path.length > 0 ? get(content, action.path) : content),
                (target) => {
                    if (action.mode === "prepend") {
                        return [content, ...target];
                    }
                    if (action.mode === "append") {
                        return [...target, content];
                    }
                    return content;
                }
            ),
        };
    }

    return state;
};

export type SmartDocPathContextType = {
    path: string | null;
    setPath: React.Dispatch<React.SetStateAction<string | null>>;
};
const SmartDocContext = React.createContext<SmartDocPathContextType | undefined>(undefined);

export const useSmartDocPath = () => {
    const context = React.useContext(SmartDocContext);
    if (!context) {
        throw new Error("useMyContext must be used within a MyContextProvider");
    }
    return context;
};

export const useSmartDoc = () => {
    const { path } = useSmartDocPath();
    const [state, setSmartDocLS] = useLocalStorage<SmartDocType>(path);

    const dispatch = useCallback<React.Dispatch<SmartDocActionType>>(
        (action) => {
            const newState = reducer(state, action) || null;
            setSmartDocLS(newState);
        },
        [state, setSmartDocLS]
    );

    return { state: state, dispatch };
};

export const SmartDocPathContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [path, setPath] = useState<string | null>(null);

    return <SmartDocContext.Provider value={{ path, setPath }}>{children}</SmartDocContext.Provider>;
};
