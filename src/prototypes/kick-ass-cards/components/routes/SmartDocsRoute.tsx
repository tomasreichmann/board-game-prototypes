import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
import DataPreview from "../../../../components/DataPreview";
import SmartDocList from "../smartDocs/SmartDocList";
import { H2 } from "../content/Text";
import Button from "../controls/Button";
import SmartDocCreateForm from "../smartDocs/SmartDocCreateForm";
import { SmartDocFileType, smartDocLSKeyPrefix, smartDocsLSKey } from "../smartDocs/smartDocs";
import { Navigation } from "../Navigation";

export default function SmartDocsRoute() {
    const [isCreateDocShown, setIsCreateDocShown] = useState(false);
    const [smartDocFileList] = useLocalStorage<SmartDocFileType[]>(smartDocsLSKey);
    const smartDocFiles = smartDocFileList || [];

    return (
        <>
            <Navigation />
            <div className="print:m-0 w-full text-kac-iron px-2 py-5 md:px-10 bg-white">
                <>
                    <div className="flex flex-row gap-4 justify-between">
                        {smartDocFiles.length === 0 ? <H2>No Smart Docs created yet</H2> : <H2>Smart Docs</H2>}
                        <Button onClick={() => setIsCreateDocShown((isCreateDocShown) => !isCreateDocShown)}>
                            Create
                        </Button>
                    </div>
                    {isCreateDocShown && <SmartDocCreateForm />}
                    <SmartDocList smartDocs={smartDocFiles} />
                </>
                smartDocFiles:
                <DataPreview data={smartDocFiles} />
            </div>
        </>
    );
}
