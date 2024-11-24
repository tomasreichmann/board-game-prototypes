import { uniqueId } from "lodash";
import uuid from "../../../../utils/uuid";
import { GameDocType, GameStateEnum } from "./types";
import { UserResource } from "@clerk/types";

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

export const createFakeUser = (user: UserResource): UserResource => {
    const postfix = uniqueId();
    return { ...user, id: `fake-${user.id}-${postfix}`, fullName: `Fake ${user.fullName} ${postfix}` };
};
