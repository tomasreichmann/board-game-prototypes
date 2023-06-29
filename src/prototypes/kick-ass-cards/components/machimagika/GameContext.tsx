import { createContext, useContext, useReducer } from "react";
import { AssetType, ContentType, OutcomeType } from "../../types";
import gameReducer, { GameActionType } from "./gameReducer";
import { BackgroundComponentType, DialogContentItemProps } from "./dialog/DialogContentItem";
import newGameDialog from "./dialogs/newGameDialog";

export enum SceneEnum {
    MainMenu = "MainMenu",
    Region = "Region",
    Location = "Location",
    Dialog = "Dialog",
    Inventory = "Inventory",
}

export type DialogConditionType = {
    selector: string;
    value?: any;
    minValue?: number;
    maxValue?: number;
};

export type DialogActionBaseType = {
    children: DialogContentItemProps[];
    setFlags?: Partial<FlagMapType>;
};

export type DialogActionType = {
    changeNodeId?: string;
    setFlags?: Partial<FlagMapType>;
    backgroundContent?: ContentType<BackgroundComponentType>[];
} & Partial<Pick<StateType, "scene" | "regionId" | "locationId" | "dialogId">>;

export type DialogNodeType = {
    id: string;
    content: DialogContentItemProps[];
};
export type DialogNodeMapType = { [key: string]: DialogNodeType };

export type DialogStateType = {
    id: string;
    currentNodeId: string;
    scene?: ContentType<BackgroundComponentType>[];
    nodeMap: DialogNodeMapType;
    history?: DialogContentItemProps[];
};

export type FlagMapType = {
    finishedDeFragmentation?: boolean;
};

export const dialogMap = {
    newGame: newGameDialog,
};

export type StateType = {
    scene: SceneEnum;
    regionId?: string;
    locationId?: string;
    dialogId?: keyof typeof dialogMap;
    dialog?: DialogStateType;
    hand: OutcomeType[];
    flagMap: FlagMapType;
    inventory: AssetType[];
};

const initialState: StateType = {
    scene: SceneEnum.MainMenu,
    flagMap: {},
    hand: [],
    inventory: [],
    dialogId: undefined,
};

const GameContext = createContext({
    state: initialState,
    dispatch: (action: GameActionType) => console.log("Dispatch not ready", action),
});

export const GameContextProvider = ({ children }: React.PropsWithChildren) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);
    return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>;
};

export default function useGameContext() {
    return useContext(GameContext);
}
