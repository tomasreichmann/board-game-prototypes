import Text, { H1, H5 } from "../content/Text";
import {
    AdventureDocumentDocType,
    ContentItemDnDResultType,
    ContentItemType,
    checkWriteAccess,
    collectionWithDb,
    createAdventureDocumentContent,
    deleteDocument,
    updateDocumentFields,
    useAdventure,
    useAdventureDocument,
    useQuery,
} from "../../services/firestoreController";
import ToggleData from "../../../../components/DataToggle";
import { twMerge } from "tailwind-merge";
import ContentItem from "./ContentItem";
import React, { useCallback, useMemo, useState } from "react";
import ContentDrop from "./ContentDrop";
import ErrorMessage from "./ErrorMessage";
import PendingTimer from "../../../../components/PendingTimer";
import { orderBy, query } from "firebase/firestore";
import Form, { getDefaultsFromSchema, getFormSchemaFromJsonSchema } from "../content/Form";
import contentFormSchemas from "./contentFormSchemas";
import { AnyRecord } from "../../../../utils/simpleTypes";
import ButtonWithConfirmation from "../content/ButtonWithConfirmation";
import Icon from "../Icon";
import SignedOutWarning from "./SignedOutWarning";
import { useUser } from "@clerk/clerk-react";
import Button from "../content/Button";
import { adventuresPath } from "../routes/routes";
import ClerkUser from "../../../../services/Clerk/ClerkUser";
import { AdventureFormType, adventureFormJsonSchema } from "./adventureFormSchema";
import { JSONSchemaType } from "ajv";
import { documentFormJsonSchema } from "./documentFormSchema";
import ContentItemList from "./ContentItemList";

export type AdventureDocumentFormType = Omit<AdventureDocumentDocType, "id" | "meta" | "contents">;

export const DocumentContent = ({
    adventureId,
    documentId,
    isEditing,
}: {
    adventureId: string;
    documentId: string;
    isEditing?: boolean;
}) => {
    const [editingPath, setEditingPath] = useState<string | undefined>();

    const contentsCollectionPath = ["adventures", adventureId, "contents", documentId, "contents"].join("/");
    const contentsRef = useMemo(
        () => query(collectionWithDb(contentsCollectionPath), orderBy("order")),
        [adventureId, documentId]
    );
    const { data: contentsWithoutType, error: contentsError } = useQuery(contentsRef);

    const removeContentItem = (id: string) => {
        deleteDocument(contentsCollectionPath, id);
    };

    const contents = contentsWithoutType as ContentItemType[] | undefined;
    const firstOrder = contents?.[0]?.order ?? 1;
    const prependFirstOrder = firstOrder - 1;

    return (
        <>
            {contentsError && <ErrorMessage heading="⚠ Error fetching document content" body={contentsError.message} />}
            {!contentsError && !contents && (
                <PendingTimer>
                    <Text className="text-center">Fetching content</Text>
                </PendingTimer>
            )}

            {contents?.length === 0 && (
                <Text
                    variant="body"
                    color="body"
                    className="text-lg mt-4 text-center font-bold text-kac-steel-dark py-8"
                >
                    No content yet
                </Text>
            )}

            <ContentDrop path={contentsCollectionPath} mode="prepend" order={prependFirstOrder} />

            {contents && (contents?.length ?? 0) > 0 && (
                <div className="flex flex-col gap-4">
                    {contents.map((content, index, contents) => (
                        <div
                            key={String(content.id || index)}
                            className={twMerge(
                                "relative flex self-stretch flex-col md:flex-row gap-4 flex-wrap",
                                isEditing && "pb-4 mb-4 border-b-2 border-kac-steel-light"
                            )}
                        >
                            <ContentItem
                                {...content}
                                removeFaultyContentItem={() => removeContentItem(content.id)}
                                className="flex-1"
                            />
                            {isEditing && (
                                <Form
                                    className="flex-1 gap-0 max-w-[400px]"
                                    value={content.props}
                                    schema={
                                        content.type in contentFormSchemas
                                            ? contentFormSchemas[content.type as keyof typeof contentFormSchemas]
                                            : undefined
                                    }
                                    onChange={(value: AnyRecord) => {
                                        updateDocumentFields(contentsCollectionPath, content.id, "props", value);
                                    }}
                                >
                                    <div className="flex flex-row justify-between items-end pb-2 mb-2 border-b-2 border-kac-steel-light">
                                        <H5>{content.type}</H5>
                                        <ButtonWithConfirmation
                                            variant="outline"
                                            color="danger"
                                            confirmText="Delete content?"
                                            size="sm"
                                            type="button"
                                            className="self-end text-kac-fire-dark"
                                            onClick={() => removeContentItem(content.id)}
                                        >
                                            <Icon icon="trashCan" className="h-5" />
                                        </ButtonWithConfirmation>
                                    </div>
                                </Form>
                            )}
                            <ContentDrop
                                className="w-full"
                                path={[contentsCollectionPath, content.id].join("/")}
                                mode="append"
                                order={getOrderInBetween(content.order, contents[index + 1]?.order)}
                            />
                        </div>
                    ))}
                </div>
            )}
            <ToggleData buttonContent="Content data" initialCollapsed data={{ contents }} />
        </>
    );
};

const getOrderInBetween = (orderA?: number, orderB?: number) => {
    if (orderA === undefined) {
        if (orderB === undefined) {
            return 0;
        }
        return orderB - 256;
    }

    if (orderB === undefined) {
        return orderA + 256;
    }

    return (orderA + orderB) / 2;
};

export type DocumentProps = {
    className?: string;
    documentId: string;
    adventureId: string;
};

export default function Document({ className, documentId, adventureId }: DocumentProps) {
    const [isEditing, setIsEditing] = useState(false);
    const { adventure, adventureError } = useAdventure(adventureId);
    const { document, documentError, updateDocument, deleteDocument, claimDocument } = useAdventureDocument(
        adventureId,
        documentId
    );
    const { user } = useUser();

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

    if (adventureError) {
        return (
            <ErrorMessage
                className={twMerge("flex-1 flex flex-col justify-center items-center", className)}
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
                className={twMerge("flex-1 flex flex-col justify-center items-center", className)}
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
            <div className={twMerge("flex-1 flex flex-col justify-center items-center", className)}>
                <PendingTimer />
            </div>
        );
    }

    const hasWriteAccess = checkWriteAccess(adventure?.meta);
    const canClaim = user?.id && !adventure?.meta?.author;
    const adventurePath = [adventuresPath, adventureId].join("/");
    const defaultProps = getDefaultsFromSchema(
        documentFormJsonSchema as JSONSchemaType<any>
    ) as Partial<AdventureFormType>;
    const formSchema = getFormSchemaFromJsonSchema(documentFormJsonSchema as JSONSchemaType<any>);

    return (
        <div className={twMerge("flex-1 flex flex-col print:m-0 w-full text-kac-iron px-2 py-5 md:px-10 bg-white")}>
            <div className="flex flex-row gap-4 items-center mb-4">
                <div className="flex flex-row flex-wrap gap-2 items-baseline text-kac-steel-dark">
                    <Button href={adventuresPath} variant="text" color="secondary">
                        Adventures
                    </Button>
                    <span>/</span>
                    <Button href={adventurePath} variant="text" color="secondary">
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
                <div className="flex-1 flex flex-col pb-8">
                    <div className="flex flex-row flex-wrap gap-4 justify-between mb-8">
                        <H1>{document.name}</H1>
                        <div className="flex flex-row gap-4 items-center">
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
                                            claimDocument(user);
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
                        </div>
                    </div>

                    <DocumentContent adventureId={adventureId} documentId={documentId} isEditing={isEditing} />
                </div>
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
}
