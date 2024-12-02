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
import { useEffect, useRef, useState } from "react";
import { auth } from "../../../services/Firebase/firebase";
import { UserResource } from "@clerk/types";

export const getPath = (...path: string[]) => [...path].join("/");

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
    usersWithReadAccessIds?: UserMetaType["uid"][];
    usersWithWriteAccess?: UserMetaType[];
    usersWithWriteAccessIds?: UserMetaType["uid"][];
};

export const getDocMeta = (user: UserResource) => {
    const author = getUserMeta(user);
    const meta: DocMetaType = {
        createdAt: Date.now(),
        author,
        isPublic: false,
        status: DocStatusEnum.Published, // TODO: change to Draft
        usersWithReadAccessIds: [author.uid],
        usersWithReadAccess: [author],
        usersWithWriteAccess: [author],
        usersWithWriteAccessIds: [author.uid],
    };
    return meta;
};

export const getUserMeta = (user: UserResource) => {
    const uid = user ? user.id : null;
    const displayName = user ? user.fullName : null;
    const imageUrl = user ? user.imageUrl : null;
    return { uid, displayName, imageUrl };
};

export const checkReadAccess = (meta?: DocMetaType, user = auth.currentUser) => {
    if (!meta || !meta.usersWithReadAccess) {
        return false;
    }
    return meta.usersWithReadAccess.some((u) => u.uid === user?.uid) || meta.isPublic;
};

export const checkWriteAccess = (meta?: DocMetaType, user = auth.currentUser) => {
    if (!meta || !meta.usersWithWriteAccess) {
        return false;
    }
    return meta.usersWithWriteAccess.some((u) => u.uid === user?.uid);
};

export const createDocument = async (path: string, data: DocumentData = {}) => {
    try {
        const docRef = await addDoc(collection(db, path), replaceUndefinedProperties(data));
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

export const replaceUndefinedProperties = <T>(data: T): T => {
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
