import { UserResource } from "@clerk/types";
import { createDocument, deleteDocument, getDocMeta, useQuery } from "../../../services/firestoreController";
import { GameDocType } from "./types";
import { useMemo } from "react";
import { collection, DocumentData, FirestoreError, or, Query, query, where } from "firebase/firestore";
import db from "../../../../../services/Firebase/cloudFirestore";
import { createNewGameData } from "./factories";

export const firestoreRootPath = "playOnlineGames";

export const createGame = async (user: UserResource, partialData?: Partial<GameDocType>) => {
    const meta = getDocMeta(user);
    const name = meta?.author?.displayName ? `${meta.author.displayName}'s game` : "Anonymous game";
    const data = { ...createNewGameData(), name, meta, ...partialData };
    return createDocument(firestoreRootPath, data);
};

export const deleteGame = async (gameId: string) => {
    await deleteDocument(firestoreRootPath, gameId);
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
