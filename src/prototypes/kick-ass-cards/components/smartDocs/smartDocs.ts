import { v4 as uuid } from "uuid";
import { SmartDocContentDropProps } from "./SmartDocContentDrop";

export const smartDocsLSKey = "SMART_DOCS";
export const smartDocLSKeyPrefix = "SMART_DOC_";

export type SmartDocFileType = { title: string; path: string; id: string };

export enum DragTypeEnum {
    Element = "Element",
}

export type DropType = SmartDocContentDropProps;

export type SmartDocContentItemType = {
    componentName: string;
    props: Record<string, any>;
    id: string;
};

export type SmartDocType = SmartDocFileType & {
    content: SmartDocContentItemType[];
};

export const createSmartDoc = (title: SmartDocFileType["title"], path: SmartDocFileType["path"]): SmartDocType => ({
    title,
    path,
    id: uuid(),
    content: [],
});
