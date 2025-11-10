import { twMerge } from "tailwind-merge";
import { H1, H2 } from "../content/Text";
import DataPreview from "../../../../components/DataPreview";
import { useEffect, useState } from "react";
import SmartDocElementPanel from "./SmartDocElementPanel";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SmartDocContent from "./SmartDocContent";
import { useSmartDoc, useSmartDocPath } from "./useSmartDoc";
import { smartDocLSKeyPrefix } from "./smartDocs";

export type SmartDocProps = React.PropsWithChildren<{
    className?: string;
    path: string;
}>;

export default function SmartDoc({ className, path, children }: SmartDocProps) {
    const { setPath } = useSmartDocPath();

    useEffect(() => {
        setPath(smartDocLSKeyPrefix + path);
    }, [path]);

    // const [smartDocFileList] = useLocalStorage<SmartDocFileType[]>(smartDocsLSKey);
    const [isEditing, setIsEditing] = useState(false);
    const { state: smartDoc } = useSmartDoc();

    if (!smartDoc) {
        return (
            <div className={twMerge("SmartDoc flex flex-col gap-2", className)}>
                <H2 color="danger">Smart Doc &quot;{path}&quot; not found</H2>
                {children}
            </div>
        );
    }

    const { title } = smartDoc;

    return (
        <div className={twMerge("SmartDoc flex flex-col gap-2", className)}>
            <div className="flex flex-row justify-between">
                <H1>{title}</H1>
                <label className="flex flex-row items-top">
                    {isEditing ? "Editing" : "Preview"}&ensp;
                    <input
                        type="checkbox"
                        className="toggle"
                        checked={isEditing}
                        onChange={(event) => setIsEditing(event.target.checked)}
                    />
                </label>
            </div>
            <DndProvider backend={HTML5Backend}>
                <div className="flex flex-row gap-4">
                    <div className="flex-1 flex flex-col gap-2">
                        <SmartDocContent content={smartDoc.content} path="" isEditing={isEditing} />
                    </div>
                    {isEditing && <SmartDocElementPanel className="flex-1 max-w-[300px]" />}
                </div>
            </DndProvider>
            smartDoc:
            <DataPreview data={smartDoc} />
            {children}
        </div>
    );
}
