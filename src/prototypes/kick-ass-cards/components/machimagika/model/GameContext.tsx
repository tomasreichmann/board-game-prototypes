import { createContext, useContext, useEffect, useReducer } from "react";
import gameReducer, { GameActionType } from "../reducer/gameReducer";
import { initialState } from "./gameState";

const GameContext = createContext({
    state: initialState,
    dispatch: (action: GameActionType) => console.log("Dispatch not ready", action),
});

export const GameContextProvider = ({ children }: React.PropsWithChildren) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);
    useEffect(() => {
        if (state.scheduledActions.length > 0) {
            state.scheduledActions.forEach((nextAction) => {
                setTimeout(() => {
                    dispatch({ ...nextAction.action, resolveScheduledActions: [nextAction.id] });
                }, nextAction.delayMs);
            });
            // return () => clearTimeout(timeoutId);
        }
        return;
    }, [state.scheduledActions]);
    return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>;
};

export default function useGameContext() {
    return useContext(GameContext);
}
