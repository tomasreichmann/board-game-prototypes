import { useCallback, useMemo } from "react";
import { AnyRecord } from "../../../utils/simpleTypes";
import { defaultMdxComponentMap } from "../components/content/MdxArticle";
import { ContentDropProps } from "../components/adventures/ContentDrop";
import {
    claimDocument,
    createDocument,
    deleteDocument,
    DocMetaType,
    getDocMeta,
    updateDocument,
    useQuery,
} from "./firestoreController";
import { collection, doc, DocumentData, UpdateData } from "firebase/firestore";
import { UserResource } from "@clerk/types";
import db from "../../../services/Firebase/cloudFirestore";
import { auth } from "../../../services/Firebase/firebase";

export type AdventureDocType = {
    id: string;
    name?: string;
    description?: string;
    imageUri?: string;
    contents?: AdventureDocumentDocType[];
    meta?: DocMetaType;
};

export type AdventureDocumentDocType = {
    id: string;
    name?: string;
    contents?: ContentItemType[];
    meta?: DocMetaType;
};

export type ContentItemTypeType = keyof typeof defaultMdxComponentMap;

export type ContentItemType = {
    id: string;
    type: ContentItemTypeType;
    props: AnyRecord;
    order: number;
    name: string;
};

export type ContentItemDragObjectType = ContentItemType;
export type ContentItemDropResultType = {
    mode?: ContentDropProps["mode"];
    path: string;
    order: number;
};

export type ContentItemDnDResultType = ContentItemDragObjectType & ContentItemDropResultType;

export const useAdventure = (adventureId: string | undefined) => {
    const adventuresPath = "adventures";
    const docRef = useMemo(() => (adventureId ? doc(db, adventuresPath, adventureId) : undefined), [adventureId]);
    const { data, error } = useQuery(docRef, `Adventure with id "${adventureId}" does not exist`);

    const update = useCallback(
        async (data: UpdateData<DocumentData>) => {
            if (!adventureId) {
                return;
            }
            await updateDocument(adventuresPath, adventureId, data);
        },
        [adventureId]
    );

    const remove = useCallback(async () => {
        if (!adventureId) {
            return;
        }
        await deleteAdventure(adventureId);
    }, [adventureId]);

    const claim = useCallback(
        async (user: UserResource) => {
            if (!adventureId || auth.currentUser === null) {
                return;
            }
            await claimDocument(adventuresPath, adventureId, user);
        },
        [adventureId]
    );

    return {
        adventure: data as AdventureDocType | undefined,
        adventureError: error,
        updateAdventure: update,
        deleteAdventure: remove,
        claimAdventure: claim,
    };
};

export const useAdventureDocument = (adventureId: string | undefined, documentId: string | undefined) => {
    const collectionPath = ["adventures", adventureId, "contents"].join("/");
    const docPath = [collectionPath, documentId].join("/");
    const docRef = useMemo(() => (adventureId ? doc(db, docPath) : undefined), [adventureId, documentId, doc]);
    const { data, error } = useQuery(
        docRef,
        `Document with id "${adventureId}" within adventure with id "${adventureId}" does not exist`
    );

    const update = useCallback(
        async (data: UpdateData<DocumentData>) => {
            if (!adventureId || !documentId) {
                return;
            }
            await updateDocument(collectionPath, documentId, data);
        },
        [adventureId, documentId, collectionPath]
    );

    const remove = useCallback(async () => {
        if (!adventureId || !documentId) {
            return;
        }
        await deleteDocument(collectionPath, documentId);
    }, [adventureId, documentId, collectionPath]);

    const claim = useCallback(
        async (user: UserResource) => {
            if (!adventureId || !documentId || auth.currentUser === null) {
                return;
            }
            await claimDocument(collectionPath, documentId, user);
        },
        [collectionPath, adventureId, documentId]
    );

    return {
        document: data as AdventureDocumentDocType | undefined,
        documentError: error,
        updateDocument: update,
        deleteDocument: remove,
        claimDocument: claim,
    };
};

const adventuresCollection = collection(db, "adventures");
export const useAdventures = () => {
    const { data, error } = useQuery(adventuresCollection);

    return { adventures: data as AdventureDocType[] | undefined, adventuresError: error };
};

export const createAdventure = async (user: UserResource, partialData?: Partial<AdventureDocType>) => {
    const meta = getDocMeta(user);
    const name = meta?.author?.displayName ? `${meta.author.displayName}'s adventure` : "Anonymous adventure";
    const data = { name, meta, ...partialData };
    return createDocument("adventures", data);
};

export const deleteAdventure = async (adventureId: string) => {
    return deleteDocument("adventures", adventureId);
};

export const updateAdventure = async (adventureId: string, data: UpdateData<DocumentData>) => {
    return updateDocument("adventures", adventureId, data);
};

export const createAdventureDocument = async (
    adventureId: string,
    user: UserResource,
    partialData?: Partial<AdventureDocumentDocType>
) => {
    const meta = getDocMeta(user);
    const name = meta?.author?.displayName ? `${meta.author.displayName}'s document` : "Anonymous document";
    const data = { name, meta, ...partialData };
    return createDocument(["adventures", adventureId, "contents"].join("/"), data);
};

export const createAdventureDocumentContent = async (
    adventureId: string,
    documentId: string,
    contentItem: Omit<ContentItemType, "id">
) => {
    const collectionPath = ["adventures", adventureId, "contents", documentId, "contents"].join("/");
    return createDocument(collectionPath, contentItem);
};

export const getAdventure = async (adventureId: string) => {
    try {
        return await doc(db, "adventures", adventureId);
    } catch (e) {
        console.error("Error getting document: ", e);
        return Promise.reject(e);
    }
};
