import { GameDocType, GameStateEnum } from "./types";

export const createNewGameData = (): Omit<GameDocType, "id"> => ({
    layout: {
        handMap: {},
        deckMap: {},
        spreadMap: {},
    },
    state: GameStateEnum.Ready,
    players: [],
    playerIds: [],
    storytellers: [],
    storytellerIds: [],
    perspectiveBoard: {},
});
