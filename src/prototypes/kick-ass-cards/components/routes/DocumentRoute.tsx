import { Navigation } from "../Navigation";
import Text from "../content/Text";
import ToggleData from "../../../../components/DataToggle";
import ButtonWithConfirmation from "../content/ButtonWithConfirmation";
import {
    ContentItemDnDResultType,
    checkWriteAccess,
    claimDocument,
    createAdventureDocumentContent,
    useAdventure,
    useAdventureDocument,
} from "../../services/firestoreController";
import { useParams } from "react-router-dom";
import { adventuresPath } from "./routes";
import PendingTimer from "../../../../components/PendingTimer";
import { useUser } from "@clerk/clerk-react";
import ClerkUser from "../../../../services/Clerk/ClerkUser";
import SignedOutWarning from "../adventures/SignedOutWarning";
import { AdventureFormType, adventureFormJsonSchema } from "../adventures/adventureFormSchema";
import { useCallback, useMemo, useState } from "react";
import Form, { getDefaultsFromSchema, getFormSchemaFromJsonSchema } from "../content/Form";
import { JSONSchemaType } from "ajv";
import Document from "../adventures/Document";
import Button from "../content/Button";
import ErrorMessage from "../adventures/ErrorMessage";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { documentFormJsonSchema } from "../adventures/documentFormSchema";
import ContentItemList from "../adventures/ContentItemList";

const DocumentContent = () => {
    const [isEditing, setIsEditing] = useState(false);
    const { adventureId, documentId } = useParams<"adventureId" | "documentId">();
    const { user } = useUser();

    const { adventure, adventureError } = useAdventure(adventureId);
    const { document, documentError, updateDocument, deleteDocument } = useAdventureDocument(adventureId, documentId);

    const hasWriteAccess = checkWriteAccess(document?.meta);
    const canClaim = user?.id && !document?.meta?.author;
    // const canAbandon = user?.id && adventure?.meta?.author?.uid === user?.id;
    const onChange = useCallback((data: Partial<AdventureFormType>) => {
        console.log(data);
        updateDocument(data);
    }, []);

    const onDrop = useCallback(
        (result: ContentItemDnDResultType) => {
            const { type, order } = result;
            if (!adventureId || !documentId) {
                console.warn("adventureId or documentId not found", {
                    adventureId,
                    documentId,
                });
                return;
            }
            createAdventureDocumentContent(adventureId, documentId, { type, props: {}, order });
        },
        [adventureId, documentId]
    );

    const documentFormData = useMemo(() => {
        if (!document) {
            return undefined;
        }
        const { id, meta, contents, ...documentFormData } = document;
        return documentFormData;
    }, [document]);

    if (!adventureId) {
        return <ErrorMessage heading="⚠ Invalid Adventure Id" body={`"${adventureId}"`} />;
    }

    if (!documentId) {
        return <ErrorMessage heading="⚠ Invalid Document Id" body={`"${documentId}"`} />;
    }

    if (adventureError) {
        return (
            <ErrorMessage
                heading={<>⚠ Error loading an adventure with ID "{adventureId}"</>}
                body={adventureError.message}
            >
                <SignedOutWarning text="⚠ Some adventures might be unavailable until you sign in." />
            </ErrorMessage>
        );
    }

    if (documentError) {
        return (
            <ErrorMessage
                heading={
                    <>
                        ⚠ Error loading a document with ID "{documentId}" in an adventure with ID "{adventureId}"
                    </>
                }
                body={documentError.message}
            >
                <SignedOutWarning text="⚠ Some documents might be unavailable until you sign in." />
            </ErrorMessage>
        );
    }

    if (!document) {
        return (
            <div className="flex-1 flex flex-col gap-2 justify-center items-center">
                <PendingTimer />
            </div>
        );
    }

    const path = `adventures/${adventureId}/contents/${documentId}`;

    const defaultProps = getDefaultsFromSchema(
        documentFormJsonSchema as JSONSchemaType<any>
    ) as Partial<AdventureFormType>;
    const formSchema = getFormSchemaFromJsonSchema(documentFormJsonSchema as JSONSchemaType<any>);

    return (
        <div className="flex-1 flex flex-col print:m-0 w-full text-kac-iron px-2 py-5 md:px-10 bg-white">
            <div className="flex flex-row gap-4 items-center mb-4">
                <div className="flex flex-row gap-2 items-baseline text-kac-steel-dark">
                    <Button href={adventuresPath} variant="text" color="secondary">
                        Adventures
                    </Button>
                    <span>/</span>
                    <Button href={adventuresPath} variant="text" color="secondary">
                        {adventure?.name || adventureId}
                    </Button>
                    <span>/</span>
                    <Text className="text-kac-iron">{document.name || documentId}</Text>
                </div>
                <div className="flex-1" />
                <ClerkUser />
            </div>
            <SignedOutWarning text="⚠ Some features might be hidden until you sign in." />
            <div className="flex flex-col-reverse md:flex-row items-stretch gap-8">
                <Document
                    className="flex-1"
                    path={path}
                    isEditing={isEditing}
                    {...document}
                    adventureId={adventureId}
                    controls={
                        <>
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
                                        Delete Document
                                    </ButtonWithConfirmation>
                                </div>
                            )}
                            {canClaim && (
                                <div className="flex flex-row gap-2">
                                    <ButtonWithConfirmation
                                        color="danger"
                                        size="sm"
                                        onClick={() => {
                                            claimDocument(
                                                ["adventures", adventureId, "content"].join("/"),
                                                documentId,
                                                user
                                            );
                                        }}
                                    >
                                        Claim
                                    </ButtonWithConfirmation>
                                </div>
                            )}
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
                        </>
                    }
                />

                {isEditing && documentFormData && (
                    <div className="flex flex-col gap-4 relative md:w-[20vw]">
                        <Form<AdventureFormType>
                            schema={formSchema}
                            value={documentFormData || defaultProps}
                            onChange={onChange}
                        />
                        <ToggleData
                            buttonContent="Form Data"
                            initialCollapsed
                            data={{ adventureFormJsonSchema, formSchema, documentFormData }}
                        />
                        <ContentItemList onDrop={onDrop} />
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
            <DndProvider backend={HTML5Backend}>
                <DocumentContent />
            </DndProvider>
        </>
    );
}
