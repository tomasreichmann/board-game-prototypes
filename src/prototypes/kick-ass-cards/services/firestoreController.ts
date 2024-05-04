import {
    addDoc,
    deleteDoc,
    collection,
    doc,
    updateDoc,
    onSnapshot,
    DocumentData,
    UpdateData,
    FirestoreError,
    DocumentReference,
    Query,
    FieldPath,
} from "firebase/firestore";
import db from "../../../services/Firebase/cloudFirestore";
import { useCallback, useEffect, useMemo, useState } from "react";
import { auth } from "../../../services/Firebase/firebase";
import { UserResource } from "@clerk/types";

export enum DocStatusEnum {
    Draft = "Draft",
    Published = "Published",
    Deleted = "Deleted",
}

export type UserMetaType = {
    uid: string | null;
    displayName: string | null;
    photoURL: string | null;
};

export type DocMetaType = {
    createdAt?: Date;
    author?: UserMetaType;
    isPublic?: boolean;
    status?: DocStatusEnum;
    usersWithReadAccess?: UserMetaType[];
    usersWithWriteAccess?: UserMetaType[];
};

const getDocMeta = (user: UserResource) => {
    const author = getUserMeta(user);
    return {
        createdAt: new Date(),
        author,
        isPublic: false,
        status: DocStatusEnum.Published, // TODO: change to Draft
        usersWithReadAccess: [author],
        usersWithWriteAccess: [author],
    };
};

const getUserMeta = (user: UserResource) => {
    const uid = user ? user.id : null;
    const displayName = user ? user.fullName : null;
    const imageUrl = user ? user.imageUrl : null;
    return { uid, displayName, imageUrl };
};

export const checkReadAccess = (meta?: DocMetaType, user = auth.currentUser) => {
    if (!meta || !meta.usersWithReadAccess) {
        return false;
    }
    return meta.usersWithReadAccess.some((u) => u.uid === user?.uid);
};

export const checkWriteAccess = (meta?: DocMetaType, user = auth.currentUser) => {
    if (!meta || !meta.usersWithWriteAccess) {
        return false;
    }
    return meta.usersWithWriteAccess.some((u) => u.uid === user?.uid);
};

export const createDocument = async (path: string, data: DocumentData = {}) => {
    try {
        const docRef = await addDoc(collection(db, path), data);
        console.log("Document written with ID: ", docRef.id);
        return docRef;
    } catch (e) {
        console.error("Error adding document: ", e);
        return Promise.reject(e);
    }
};

export const claimDocument = async (path: string, docId: string, user: UserResource) => {
    try {
        const author = getUserMeta(user);
        await updateDocumentFields(
            path,
            docId,
            "meta.author",
            author,
            "meta.usersWithWriteAccess",
            [author],
            "meta.usersWithReadAccess",
            [author]
        );
    } catch (e) {
        console.error("Error claiming document: ", e);
        return Promise.reject(e);
    }
};

export const deleteDocument = async (path: string, docId: string) => {
    try {
        await deleteDoc(doc(db, path, docId));
    } catch (e) {
        console.error("Error deleting document: ", e);
        return Promise.reject(e);
    }
};

export const updateDocument = async (path: string, docId: string, data: UpdateData<DocumentData>) => {
    try {
        await updateDoc(doc(db, path, docId), data);
    } catch (e) {
        console.error("Error updating document: ", e);
        return Promise.reject(e);
    }
};

export const updateDocumentFields = async (
    path: string,
    docId: string,
    field: string | FieldPath,
    value: unknown,
    ...moreFieldsAndValues: unknown[]
) => {
    try {
        await updateDoc(doc(db, path, docId), field, value, ...moreFieldsAndValues);
    } catch (e) {
        console.error("Error updating document fields: ", e);
        return Promise.reject(e);
    }
};

export const createAdventure = async (user: UserResource, partialData?: Partial<AdventureDocType>) => {
    const meta = getDocMeta(user);
    const name = meta.author.displayName ? `${meta.author.displayName}'s adventure` : "Anonymous adventure";
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
    const name = meta.author.displayName ? `${meta.author.displayName}'s document` : "Anonymous document";
    const data = { name, meta, ...partialData };
    return createDocument(["adventures", adventureId, "contents"].join("/"), data);
};

export const getAdventure = async (adventureId: string) => {
    try {
        return await doc(db, "adventures", adventureId);
    } catch (e) {
        console.error("Error getting document: ", e);
        return Promise.reject(e);
    }
};

export const useDocument = (
    ref: DocumentReference<DocumentData, DocumentData> | Query<DocumentData, DocumentData> | undefined,
    notFoundErrorMessage = "Error getting document"
) => {
    const [data, setData] = useState<DocumentData>();
    const [error, setError] = useState<FirestoreError>();

    useEffect(() => {
        setError(undefined);
        setData(undefined);
        if (!ref) {
            return;
        }
        let unsubscribe: Function = () => undefined;
        if (ref.type === "document") {
            unsubscribe = onSnapshot(
                ref,
                (snapshot) => {
                    const data = snapshot.data();
                    if (!data) {
                        setError({ name: "Not found", code: "not-found", message: notFoundErrorMessage });
                    }
                    setData({ ...snapshot.data(), id: snapshot.id });
                },
                (error) => {
                    setError(error);
                }
            );
        } else {
            unsubscribe = onSnapshot(
                ref,
                (snapshot) => {
                    const data: DocumentData[] = [];
                    console.log("snapshot", snapshot);
                    snapshot.forEach((doc) => {
                        const docData = doc.data();
                        data.push({ ...docData, id: doc.id });
                    });
                    setData(data);
                },
                (error) => {
                    setError(error);
                }
            );
        }
        return () => unsubscribe();
    }, [ref]);

    return { data, error };
};

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
    contents?: any[];
    meta?: DocMetaType;
};

export enum ContentItemTypeEnum {
    Mdx = "Mdx",
    Image = "Image",
    Heading = "Heading",
    List = "List",
}

export type ContentItemType = {
    id: string;
    type: string;
    props: any;
};

export const useAdventure = (adventureId: string | undefined) => {
    const docRef = useMemo(() => (adventureId ? doc(db, "adventures", adventureId) : undefined), [adventureId]);
    const { data, error } = useDocument(docRef, `Adventure with id "${adventureId}" does not exist`);

    const update = useCallback(
        async (data: UpdateData<DocumentData>) => {
            if (!adventureId) {
                return;
            }
            await updateDocument("adventures", adventureId, data);
        },
        [adventureId]
    );

    const remove = useCallback(async () => {
        if (!adventureId) {
            return;
        }
        await deleteAdventure(adventureId);
    }, [adventureId]);

    return {
        adventure: data as AdventureDocType | undefined,
        adventureError: error,
        updateAdventure: update,
        deleteAdventure: remove,
    };
};

export const useAdventureDocument = (adventureId: string | undefined, documentId: string | undefined) => {
    const collectionPath = ["adventures", adventureId, "contents"].join("/");
    const docPath = [collectionPath, documentId].join("/");
    const docRef = useMemo(() => (adventureId ? doc(db, docPath) : undefined), [adventureId, documentId]);
    const { data, error } = useDocument(
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

    return {
        document: data as AdventureDocumentDocType | undefined,
        documentError: error,
        updateDocument: update,
        deleteDocument: remove,
    };
};

const adventuresCollection = collection(db, "adventures");
export const useAdventures = () => {
    const { data, error } = useDocument(adventuresCollection);

    return { adventures: data as AdventureDocType[] | undefined, adventuresError: error };
};
