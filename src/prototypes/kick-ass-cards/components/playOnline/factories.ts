import { GameDocType, GameStateEnum } from "./types";

export const createNewGameData = (): Omit<GameDocType, "id"> => {
    return {
        layout: {
            handMap: {},
            deckMap: {},
            spreadMap: {},
            debug: [],
        },
        state: GameStateEnum.Ready,
        players: [],
        playerIds: [],
        storytellers: [],
        storytellerIds: [],
    };
};
