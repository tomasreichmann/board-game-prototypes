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
    deleteField,
} from "firebase/firestore";
import db from "../../../services/Firebase/cloudFirestore";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { auth } from "../../../services/Firebase/firebase";
import { UserResource } from "@clerk/types";
import { AnyRecord } from "../../../utils/simpleTypes";
import { defaultMdxComponentMap } from "../components/content/MdxArticle";
import { ContentDropProps } from "../components/adventures/ContentDrop";

export const collectionWithDb = (path: string) => collection(db, path);

export enum DocStatusEnum {
    Draft = "Draft",
    Published = "Published",
    Deleted = "Deleted",
}

export type UserMetaType = {
    uid: string | null;
    displayName: string | null;
    imageUrl: string | null;
};

export type DocMetaType = {
    createdAt?: number;
    author?: UserMetaType;
    isPublic?: boolean;
    status?: DocStatusEnum;
    usersWithReadAccess?: UserMetaType[];
    usersWithWriteAccess?: UserMetaType[];
};

const getDocMeta = (user: UserResource) => {
    const author = getUserMeta(user);
    return {
        createdAt: Date.now(),
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

const replaceUndefinedProperties = <T>(data: T): T => {
    if (typeof data === "object") {
        const containsUndefinedValues = Object.values(data as Object).some((value) => value === undefined);
        return (
            containsUndefinedValues
                ? Object.fromEntries(Object.entries(data as Object).filter(([, value]) => value !== undefined))
                : data
        ) as T;
    }
    if (Array.isArray(data)) {
        const containsUndefinedValues = data.some((value) => value === undefined);
        if (containsUndefinedValues) {
            return data.filter((item) => item !== undefined).map((item) => replaceUndefinedProperties(item)) as T;
        }
        return data;
    }
    return data;
};

export const updateDocument = async (path: string, docId: string, data: UpdateData<DocumentData>) => {
    try {
        const filteredData = replaceUndefinedProperties(data);
        await updateDoc(doc(db, path, docId), filteredData);
    } catch (e) {
        console.error("Error updating document: ", e);
        return Promise.reject(e);
    }
};

export const updateDocumentFields = async (
    path: string,
    docId: string,
    field: string | FieldPath,
    value: unknown = deleteField(),
    ...moreFieldsAndValues: unknown[]
) => {
    try {
        const allFields = [field, value, ...moreFieldsAndValues].map((fieldOrValue, index) => {
            const isValue = index % 2 === 1;
            if (isValue) {
                if (fieldOrValue === undefined) {
                    return deleteField();
                }
                if (typeof fieldOrValue === "object") {
                    return replaceUndefinedProperties(fieldOrValue as Object);
                }
                return fieldOrValue;
            }
            return fieldOrValue;
        });
        const [normField, normValue, ...normMoreFieldsAndValues] = allFields;
        await updateDoc(doc(db, path, docId), normField as string | FieldPath, normValue, ...normMoreFieldsAndValues);
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

export const useQuery = <Ref extends DocumentReference<DocumentData, DocumentData> | Query<DocumentData, DocumentData>>(
    ref: Ref | undefined,
    notFoundErrorMessage = "Error getting document"
) => {
    type DocumentWithIdType = DocumentData & { id: string };
    type DataType = Ref["type"] extends "document" ? DocumentWithIdType : DocumentWithIdType[];
    const [data, setData] = useState<DataType>();
    const [error, setError] = useState<FirestoreError>();

    const rerenderRef = useRef({ roundedTime: Math.floor(Date.now() / 1000), count: 0 });

    useEffect(() => {
        setError(undefined);
        setData(undefined);
        if (rerenderRef.current.roundedTime !== Math.floor(Date.now() / 1000)) {
            rerenderRef.current.roundedTime = Math.floor(Date.now() / 1000);
            rerenderRef.current.count = 1;
        } else {
            rerenderRef.current.count += 1;
        }
        if (rerenderRef.current.count > 10) {
            throw new Error("Too many re-renders. Check ref reference integrity");
        }

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
                    setData({ ...snapshot.data(), id: snapshot.id } as unknown as DataType);
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
                    snapshot.forEach((doc) => {
                        const docData = doc.data();
                        data.push({ ...docData, id: doc.id });
                    });
                    setData(data as unknown as DataType);
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
    const docRef = useMemo(() => (adventureId ? doc(db, docPath) : undefined), [adventureId, documentId]);
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
