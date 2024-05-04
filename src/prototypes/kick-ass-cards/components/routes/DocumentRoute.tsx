import { Navigation } from "../Navigation";
import Text, { H5 } from "../content/Text";
import ToggleData from "../../../../components/DataToggle";
import ButtonWithConfirmation from "../content/ButtonWithConfirmation";
import {
    checkWriteAccess,
    claimDocument,
    deleteAdventure,
    useAdventure,
    useAdventureDocument,
} from "../../services/firestoreController";
import { useParams } from "react-router-dom";
import { adventuresPath } from "./routes";
import PendingTimer from "../../../../components/PendingTimer";
import { useUser } from "@clerk/clerk-react";
import ClerkUser from "../../../../services/Clerk/ClerkUser";
import SignedOutWarning from "../adventures/SignedOutWarning";
import Adventure, { AdventureFormType, adventureFormJsonSchema } from "../adventures/Adventure";
import { useCallback, useMemo, useState } from "react";
import Form, { getDefaultsFromSchema, getFormSchemaFromSchema } from "../content/Form";
import { JSONSchemaType } from "ajv";
import Document, { adventureDocumentFormJsonSchema } from "../adventures/Document";

const DocumentContent = () => {
    const [isEditing, setIsEditing] = useState(false);
    const { adventureId, documentId } = useParams<"adventureId" | "documentId">();
    const { user } = useUser();

    const { document, documentError, updateDocument, deleteDocument } = useAdventureDocument(adventureId, documentId);

    const hasWriteAccess = checkWriteAccess(document?.meta);
    const canClaim = user?.id && !document?.meta?.author;
    // const canAbandon = user?.id && adventure?.meta?.author?.uid === user?.id;
    const onChange = useCallback((data: Partial<AdventureFormType>) => {
        console.log(data);
        updateDocument(data);
    }, []);

    const documentFormData = useMemo(() => {
        if (!document) {
            return undefined;
        }
        const { id, meta, contents, ...documentFormData } = document;
        return documentFormData;
    }, [document]);

    if (!adventureId) {
        return (
            <div className="flex-1 flex flex-col gap-2 justify-center items-center p-8 bg-white">
                <H5 color="danger" className="text-center">
                    ⚠ Invalid Adventure Id
                </H5>
                <Text color="danger" variant="body" className="text-center">
                    "{adventureId}"
                </Text>
            </div>
        );
    }

    if (!documentId) {
        return (
            <div className="flex-1 flex flex-col gap-2 justify-center items-center p-8 bg-white">
                <H5 color="danger" className="text-center">
                    ⚠ Invalid Document Id
                </H5>
                <Text color="danger" variant="body" className="text-center">
                    "{documentId}"
                </Text>
            </div>
        );
    }

    if (documentError) {
        return (
            <div className="flex-1 flex flex-col gap-2 justify-center items-center p-8 bg-white">
                <H5 color="danger" className="text-center">
                    ⚠ Error loading an document with ID "{documentId}" in adventure with ID "{adventureId}"
                </H5>
                <Text color="danger" variant="body" className="text-center">
                    {documentError.message}
                </Text>
                <SignedOutWarning text="⚠ Some documents might be unavailable until you sign in." />
            </div>
        );
    }

    if (!document) {
        return (
            <div className="flex-1 flex flex-col gap-2 justify-center items-center">
                <PendingTimer />
            </div>
        );
    }

    const defaultProps = getDefaultsFromSchema(
        adventureDocumentFormJsonSchema as JSONSchemaType<any>
    ) as Partial<AdventureFormType>;
    const formSchema = getFormSchemaFromSchema(adventureDocumentFormJsonSchema as JSONSchemaType<any>);

    return (
        <div className="flex-1 flex flex-col print:m-0 w-full text-kac-iron px-2 py-5 md:px-10 bg-white">
            <div className="flex flex-row gap-4 items-center mb-4">
                {hasWriteAccess && (
                    <div className="flex flex-row gap-2">
                        <label className="inline-flex items-center cursor-pointer select-none">
                            <Text>Preview</Text>
                            <input
                                type="checkbox"
                                value=""
                                className="sr-only peer"
                                onChange={(event) => {
                                    setIsEditing(event.target.checked);
                                }}
                                checked={isEditing}
                            />
                            <div className="relative mx-2 w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            <Text>Edit</Text>
                        </label>
                    </div>
                )}
                {hasWriteAccess && (
                    <div className="flex flex-row gap-2">
                        <ButtonWithConfirmation
                            color="danger"
                            confirmText="Delete the whole adventure permanently, no backsies?"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                deleteDocument().then(() => {
                                    window.location.href = adventuresPath;
                                });
                            }}
                        >
                            Delete Adventure
                        </ButtonWithConfirmation>
                    </div>
                )}
                {canClaim && (
                    <div className="flex flex-row gap-2">
                        <ButtonWithConfirmation
                            color="danger"
                            size="sm"
                            onClick={() => {
                                claimDocument(["adventures", adventureId, "content"].join("/"), documentId, user);
                            }}
                        >
                            Claim
                        </ButtonWithConfirmation>
                    </div>
                )}
                <div className="flex-1" />
                <ClerkUser />
            </div>
            <SignedOutWarning text="⚠ Some features might be hidden until you sign in." />
            <div className="flex flex-col-reverse md:flex-row items-stretch gap-4">
                <Document className="flex-1" {...document} />

                {isEditing && documentFormData && (
                    <div className="flex flex-col gap-4 relative md:w-[20vw]">
                        <Form<AdventureFormType>
                            schema={formSchema}
                            value={documentFormData || defaultProps}
                            onChange={onChange}
                        />
                        <ToggleData data={{ adventureFormJsonSchema, formSchema, documentFormData }} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default function DocumentRoute() {
    return (
        <>
            <Navigation />
            <DocumentContent />
        </>
    );
}
