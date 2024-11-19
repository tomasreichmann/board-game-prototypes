import { UserResource } from "@clerk/types";
import {
    claimDocument,
    createDocument,
    deleteDocument,
    getDocMeta,
    updateDocument,
    useQuery,
} from "../../services/firestoreController";
import { GameDocType } from "./types";
import { useCallback, useMemo } from "react";
import {
    collection,
    collectionGroup,
    doc,
    DocumentData,
    FirestoreError,
    or,
    orderBy,
    Query,
    query,
    UpdateData,
    where,
} from "firebase/firestore";
import db from "../../../../services/Firebase/cloudFirestore";
import { auth } from "../../../../services/Firebase/firebase";
import { createNewGameData } from "./factories";

const firestoreRootPath = "playOnlineGames";

export const createGame = async (user: UserResource, partialData?: Partial<GameDocType>) => {
    const meta = getDocMeta(user);
    const name = meta?.author?.displayName ? `${meta.author.displayName}'s game` : "Anonymous game";
    const data = { ...createNewGameData(), name, meta, ...partialData };
    return createDocument(firestoreRootPath, data);
};

export const deleteGame = async (gameId: string) => {
    await deleteDocument(firestoreRootPath, gameId);
};

export const useGame = (gameId: string | undefined) => {
    const docRef = useMemo(() => (gameId ? doc(db, firestoreRootPath, gameId) : undefined), [gameId]);
    const { data, error } = useQuery(docRef, `Game with id "${gameId}" does not exist`) as {
        data: GameDocType | undefined;
        error: FirestoreError | undefined;
    };

    const updateGame = useCallback(
        async (data: UpdateData<DocumentData>) => {
            if (!gameId) {
                return;
            }
            await updateDocument(firestoreRootPath, gameId, data);
        },
        [gameId]
    );

    const removeGame = useCallback(async () => {
        if (!gameId) {
            return;
        }
        await deleteGame(gameId);
    }, [gameId]);

    const claimGame = useCallback(
        async (user: UserResource) => {
            if (!gameId || auth.currentUser === null) {
                return;
            }
            await claimDocument(firestoreRootPath, gameId, user);
        },
        [gameId]
    );

    const joinGameAsPlayer = useCallback(
        async (user: UserResource) => {
            if (!gameId) {
                return;
            }
            await updateDocument(firestoreRootPath, gameId, {
                ...data,
                players: [...(data?.players || []), user.id],
                playerIds: [...(data?.playerIds || []), user.id],
            });
        },
        [gameId]
    );

    const leaveGameAsPlayer = useCallback(
        async (user: UserResource) => {
            if (!gameId) {
                return;
            }
            await updateDocument(firestoreRootPath, gameId, {
                ...data,
                players: data?.players?.filter((userItem) => userItem.uid !== user.id) || [],
                playerIds: data?.playerIds?.filter((id) => id !== user.id) || [],
            });
        },
        [gameId]
    );

    const joinGameAsStoryteller = useCallback(
        async (user: UserResource) => {
            if (!gameId) {
                return;
            }
            await updateDocument(firestoreRootPath, gameId, {
                ...data,
                storytellers: [...(data?.storytellers || []), user.id],
                storytellerIds: [...(data?.storytellerIds || []), user.id],
            });
        },
        [gameId]
    );

    const leaveGameAsStoryteller = useCallback(
        async (user: UserResource) => {
            if (!gameId) {
                return;
            }
            await updateDocument(firestoreRootPath, gameId, {
                ...data,
                storytellers: data?.storytellers?.filter((userItem) => userItem.uid !== user.id) || [],
                storytellerIds: data?.storytellerIds?.filter((id) => id !== user.id) || [],
            });
        },
        [gameId]
    );

    return {
        game: data as GameDocType | undefined,
        gameError: error,
        updateGame,
        removeGame,
        claimGame,
        joinGameAsPlayer,
        leaveGameAsPlayer,
        joinGameAsStoryteller,
        leaveGameAsStoryteller,
    };
};

export const gamesCollection = collection(db, firestoreRootPath);

export const useYourGames = (uid?: string) => {
    const queryRef = useMemo(() => {
        if (!uid) {
            return undefined;
        }
        return query(
            collection(db, firestoreRootPath),
            or(
                where("meta.author.uid", "==", uid),
                where("storytellers", "array-contains", uid),
                where("players", "array-contains", uid),
                where("usersWithWriteAccessIds", "array-contains", uid),
                where("usersWithReadAccessIds", "array-contains", uid)
            )
            /* orderBy("meta.createdAt", "desc") */
        ) as Query<DocumentData & GameDocType, DocumentData & GameDocType>;
    }, [uid]);
    const { data: yourGames, error: yourGamesError } = useQuery(queryRef, "You didn't join any games yet") as {
        data: GameDocType[] | undefined;
        error: FirestoreError | undefined;
    };
    return { yourGames, yourGamesError };
};
