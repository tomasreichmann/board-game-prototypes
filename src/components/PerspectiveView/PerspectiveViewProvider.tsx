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

const calculateStyle = (state: PerspectiveViewStateType): PerspectiveViewStateType => {
    return {
        ...state,
        stageStyle: {
            ...state.stageStyle,
            width: state.stage.width,
            height: state.stage.height,
            transform: `translate3d(${state.stage.x}px, ${state.stage.y}px, ${state.stage.z}px) rotateX(${state.stage.rotateX}deg) rotateY(${state.stage.rotateY}deg) rotateZ(${state.stage.rotateZ}deg) scale3d(${state.stage.scale}, ${state.stage.scale}, ${state.stage.scale})`,
        },
        frameStyle: {
            perspective: state.lens.perspective,
        },
    };
};

const PerspectiveViewProvider = ({ children }: PerspectiveViewProviderProps) => {
    const [state, dispatch] = useReducer(perspectiveViewReducer, initialPerspectiveViewState);

    return (
        <PerspectiveViewContext.Provider value={{ state: calculateStyle(state), dispatch }}>
            {children}
        </PerspectiveViewContext.Provider>
    );
};

export default PerspectiveViewProvider;
