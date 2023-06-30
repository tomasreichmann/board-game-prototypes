import { createContext, useContext, useEffect, useReducer } from "react";
import { AssetType, OutcomeType } from "../../types";
import gameReducer, { GameActionType } from "./reducer/gameReducer";
import { DialogIdType, DialogStateType, FlagMapType } from "./dialog/dialogModel";
import { SceneEnum } from "./scenes/sceneModel";

export type GameScheduledActionType = {
    id?: number;
    action: GameActionType;
    delayMs: number;
};

export type GameScheduledActionsType = {
    scheduledActions?: Required<GameScheduledActionType>[];
};

export type StateType = {
    scene: SceneEnum;
    regionId?: string;
    locationId?: string;
    dialogId?: DialogIdType;
    dialog?: DialogStateType;
    hand: OutcomeType[];
    flagMap: FlagMapType;
    inventory: AssetType[];
    scheduledActions: Required<GameScheduledActionType>[];
    lastScheduledActionId: number;
};

const initialState: StateType = {
    scene: SceneEnum.MainMenu,
    flagMap: {},
    hand: [],
    inventory: [],
    dialogId: undefined,
    scheduledActions: [],
    lastScheduledActionId: -1,
};

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
