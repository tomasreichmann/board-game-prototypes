import { GameStateEnum } from "./types";

export const createNewGameData = () => ({
    state: GameStateEnum.Ready,
    contents: [],
});
