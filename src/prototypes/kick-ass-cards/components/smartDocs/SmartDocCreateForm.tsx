import { twMerge } from "tailwind-merge";
import { smartDocsPath } from "../../routes";
import { useState } from "react";
import { kebabCase } from "lodash";
import DataPreview from "../../../../components/DataPreview";
import Input from "../content/Input";
import Button from "../content/Button";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
import { SmartDocFileType, SmartDocType, createSmartDoc, smartDocLSKeyPrefix, smartDocsLSKey } from "./smartDocs";

export type SmartDocCreateFormProps = React.PropsWithChildren<{
    className?: string;
}>;

export default function SmartDocCreateForm({ className, children }: SmartDocCreateFormProps) {
    const [smartDocFile, setDocFile] = useState<Pick<SmartDocFileType, "title" | "path">>({
        title: "New doc",
        path: "",
    });
    const [, setSmartDocsFileList] = useLocalStorage<SmartDocFileType[]>(smartDocsLSKey);
    const newPath = smartDocFile.path || kebabCase(smartDocFile.title);

    const [smartDoc, setSmartDoc] = useLocalStorage<SmartDocType>(smartDocLSKeyPrefix + newPath);

    const saveDoc = () => {
        const newSmartDoc = createSmartDoc(smartDocFile.title, newPath);
        setSmartDocsFileList((smartDocsFileList) => {
            const newValue: SmartDocFileType[] = [...(smartDocsFileList || []), newSmartDoc];
            return newValue;
        });
        setSmartDoc(newSmartDoc);
        window.location.href = smartDocsPath + "/" + newSmartDoc.path;
    };

    return (
        <div className={twMerge("SmartDocCreateForm flex flex-col gap-2 items-start", className)}>
            <Input
                label="title"
                type="text"
                value={smartDocFile.title}
                color="primary"
                onChange={(event: { target: { value: string } }) =>
                    setDocFile({ ...smartDocFile, title: event.target.value || "" })
                }
            />
            <Input
                label="path"
                type="text"
                value={newPath}
                //error={smartDoc !== null && "Path already in use"}
                onChange={(event: { target: { value: string } }) =>
                    setDocFile({ ...smartDocFile, path: event.target.value })
                }
            />
            <Button variant="solid" color="primary" onClick={saveDoc} disabled={smartDoc !== null}>
                Create
            </Button>
            {children}
        </div>
    );
}
