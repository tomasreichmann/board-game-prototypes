import { ContentItemType, GameStateEnum } from "./types";

export const createNewGameData = () => ({
    state: GameStateEnum.Ready,
    contents: [] as ContentItemType[],
    players: [],
    playerIds: [],
    storytellers: [],
    storytellerIds: [],
});
