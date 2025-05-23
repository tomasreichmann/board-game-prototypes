import { uniqueId } from "lodash";
import { GameDocType, GameStateEnum } from "./types";
import { UserResource } from "@clerk/types";

export const createNewGameData = (): Omit<GameDocType, "id"> => {
    return {
        isDebugging: false,
        layouts: [],
        state: GameStateEnum.Ready,
        players: [],
        playerIds: [],
        storytellers: [],
        storytellerIds: [],
        focus: undefined,
    };
};

export const createFakeUser = (user: UserResource): UserResource => {
    const postfix = uniqueId();
    return { ...user, id: `fake-${user.id}-${postfix}`, fullName: `Fake ${user.fullName} ${postfix}` };
};
