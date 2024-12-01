import { doc, FirestoreError } from "firebase/firestore";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import db from "../../../../../services/Firebase/cloudFirestore";
import { firestoreRootPath } from "../model/firestorePlayOnlineController";
import { useQuery } from "../../../services/firestoreController";
import { ActionType, GameDocType } from "../model/types";
import gameDispatcher from "../model/gameDispatcher";

export type DispatchType = (action: ActionType) => Promise<void | GameDocType | Error>;

export default function useGame(gameId: string | undefined) {
    const [error, setError] = useState<FirestoreError | undefined>(undefined);
    const docRef = useMemo(() => (gameId ? doc(db, firestoreRootPath, gameId) : undefined), [gameId]);
    const { data: game, error: queryError } = useQuery(docRef, `Game with id "${gameId}" does not exist`) as {
        data: GameDocType | undefined;
        error: FirestoreError | undefined;
    };

    useEffect(() => {
        setError(queryError);
    }, [queryError]);

    const clearError = useCallback(() => setError(undefined), []);

    const gameRef = useRef(game);
    useEffect(() => {
        gameRef.current = game;
    }, [game]);

    const dispatch = useCallback(async (action: ActionType) => {
        const game = gameRef.current;
        if (!game) {
            console.error("Game not loaded");
            return new Error("Game not loaded");
        }
        return gameDispatcher(firestoreRootPath, game, action)?.catch((error) => {
            setError(error as FirestoreError);
        });
    }, []);

    return {
        game,
        error,
        clearError,
        dispatch,
    };
}
