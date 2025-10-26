import React, { useReducer } from "react";
import { EffectBoardStateType, EffectBoardAction } from "../model/effectBoardStateTypes";
import { getInitialEffectBoardState, initialEffectBoardState } from "../model/initialEffectBoardState";

export const EffectBoardContext = React.createContext<[EffectBoardStateType, React.Dispatch<EffectBoardAction>]>(
    null as any
);

const effectBoardReducer = (state: EffectBoardStateType, action: EffectBoardAction): EffectBoardStateType => {
    if (action.type === "addEffect") {
        return { ...state, effectMap: { ...state.effectMap, [action.effect.slug]: action.effect } };
    }
    if (action.type === "removeEffect") {
        const newEffectMap = { ...state.effectMap };
        delete newEffectMap[action.slug];
        return { ...state, effectMap: newEffectMap };
    }
    if (action.type === "updateEffect") {
        return { ...state, effectMap: { ...state.effectMap, [action.effect.slug]: action.effect } };
    }
    if (action.type === "playEffect") {
        return { ...state, activeEffect: action.effect };
    }
    if (action.type === "reset") {
        return getInitialEffectBoardState();
    }
    return state;
};

export const EffectBoardProvider = ({ children }: React.PropsWithChildren) => {
    const [state, dispatch] = useReducer(effectBoardReducer, initialEffectBoardState);

    return <EffectBoardContext.Provider value={[state, dispatch]}>{children}</EffectBoardContext.Provider>;
};

export const useEffectBoard = () => {
    const context = React.useContext(EffectBoardContext);
    if (!context) {
        throw new Error("useEffectBoard must be used within EffectBoardProvider");
    }
    const [state, dispatch] = context;
    return { state, dispatch };
};
