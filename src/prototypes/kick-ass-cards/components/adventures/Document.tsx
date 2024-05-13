import Text, { H1, H5 } from "../content/Text";
import {
    AdventureDocumentDocType,
    ContentItemDnDResultType,
    ContentItemDragObjectType,
    ContentItemDropResultType,
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
import SignedOutWarning from "./SignedOutWarning";
import { useUser } from "@clerk/clerk-react";
import Button from "../content/Button";
import { adventuresPath } from "../routes/routes";
import ClerkUser from "../../../../services/Clerk/ClerkUser";
import { AdventureFormType, adventureFormJsonSchema } from "./adventureFormSchema";
import { JSONSchemaType } from "ajv";
import { documentFormJsonSchema } from "./documentFormSchema";
import ContentItemList from "./ContentItemList";
import EditableWrapper from "./EditableWrapper";
import { useDrag, useDrop } from "react-dnd";

export type AdventureDocumentFormType = Omit<AdventureDocumentDocType, "id" | "meta" | "contents">;

export type DocumentContentItemProps = ContentItemType & {
    nextContent?: ContentItemType;
    prevContent?: ContentItemType;
    isEditingMode?: boolean;
    isSelected?: boolean;
    isDraggingItem?: boolean;
    contentsCollectionPath: string;
    onEditToggle?: () => void;
    onMoveDrop?: (result: ContentItemDnDResultType) => void;
    setEditingPath: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const DocumentContentItem = ({
    isEditingMode = false,
    isSelected = false,
    nextContent,
    prevContent,
    contentsCollectionPath,
    onEditToggle,
    onMoveDrop,
    setEditingPath,
    ...content
}: DocumentContentItemProps) => {
    const { type, id, order, props } = content;
    const [{ isDragging: isDraggingThisItem }, dragRef] = useDrag<
        ContentItemDragObjectType,
        ContentItemDropResultType,
        { isDragging: boolean; handlerId: string | symbol | null }
    >(
        () => ({
            type: "any",
            item: content,
            end: (item, monitor) => {
                const dropResult = monitor.getDropResult<ContentItemDnDResultType>(); // TODO Target type
                if (item && dropResult) {
                    console.log("ContentItemLabel drop", item, dropResult);
                    onMoveDrop?.({ ...item, ...dropResult });
                }
            },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
                handlerId: monitor.getHandlerId(),
            }),
        }),
        [type]
    );

    const removeContentItem = (id: string) => {
        deleteDocument(contentsCollectionPath, id);
    };

    const schema = type in contentFormSchemas ? contentFormSchemas[type as keyof typeof contentFormSchemas] : undefined;

    const propsWithDrops = useMemo(() => {
        if (!isEditingMode || !schema) {
            return props;
        }
        const reactNodeProperties = Object.entries(schema || {})?.filter(([, property]) => property?.isReactNode);
        const dropProps =
            reactNodeProperties.length > 0
                ? Object.fromEntries(
                      reactNodeProperties.map(([key]) => [
                          key,
                          <React.Fragment key={key}>
                              <ContentDrop
                                  className="min-w-8 min-h-8"
                                  key={key}
                                  path={[contentsCollectionPath, id, key].join("/")}
                                  mode="insert"
                                  order={0}
                              />
                              {props[key]} {/* TODO: this likely needs to be recursive somehow */}
                          </React.Fragment>,
                      ])
                  )
                : {};

        return {
            ...props,
            ...dropProps,
        };
    }, [props, schema, isEditingMode]);
    const contentItemElement = (
        <ContentItem
            {...content}
            props={propsWithDrops}
            removeFaultyContentItem={() => removeContentItem(id)}
            className="flex-1"
        />
    );

    return (
        <div
            className={twMerge(
                "relative flex self-stretch flex-col md:flex-row gap-4 flex-wrap items-start justify-between"
            )}
        >
            {isEditingMode ? (
                <EditableWrapper
                    name={type}
                    onToggleEdit={() =>
                        setEditingPath((prevPath) =>
                            [contentsCollectionPath, id].join("/") === prevPath
                                ? undefined
                                : [contentsCollectionPath, id].join("/")
                        )
                    }
                    onDelete={() => removeContentItem(id)}
                    isSelected={isSelected}
                    dragRef={dragRef}
                >
                    {contentItemElement}
                </EditableWrapper>
            ) : (
                contentItemElement
            )}
            {isSelected && schema && (
                <Form
                    className="flex-1 gap-0 max-w-[400px] overflow-auto min-h-[400px] max-h-svh"
                    value={props}
                    schema={schema}
                    onChange={(value: AnyRecord) => {
                        updateDocumentFields(contentsCollectionPath, id, "props", value);
                    }}
                ></Form>
            )}

            {isEditingMode && (
                <ContentDrop
                    className={twMerge("w-full", isDraggingThisItem && "opacity-0 pointer-events-none")}
                    path={[contentsCollectionPath, id].join("/")}
                    mode="append"
                    order={getOrderInBetween(order, nextContent?.order)}
                />
            )}
        </div>
    );
};

export const DocumentContent = ({
    adventureId,
    documentId,
    isEditing,
    editingPath,
    setEditingPath,
}: {
    adventureId: string;
    documentId: string;
    isEditing?: boolean;
    editingPath?: string;
    setEditingPath: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
    const contentsCollectionPath = ["adventures", adventureId, "contents", documentId, "contents"].join("/");
    const contentsRef = useMemo(
        () => query(collectionWithDb(contentsCollectionPath), orderBy("order")),
        [adventureId, documentId]
    );
    const { data: contentsWithoutType, error: contentsError } = useQuery(contentsRef);

    const contents = contentsWithoutType as ContentItemType[] | undefined;
    const firstOrder = contents?.[0]?.order ?? 1;
    const prependFirstOrder = firstOrder - 1;

    const onMoveDrop = useCallback(
        (result: ContentItemDnDResultType) => {
            const { id, order, mode, path } = result;
            if (!adventureId || !documentId) {
                console.warn("adventureId or documentId not found", {
                    adventureId,
                    documentId,
                });
                return;
            }
            if (mode === "insert") {
                console.log("insert mode not supported yet", result);
                const pathFragments = path.split("/");
                const contentsCollectionPathLength = contentsCollectionPath.split("/").length;
                const contentsCollectionPathFailsafe = pathFragments.slice(0, contentsCollectionPathLength).join("/");
                if (contentsCollectionPathFailsafe !== contentsCollectionPath) {
                    console.warn("content path not found", {
                        pathFragments,
                        contentsCollectionPathFailsafe,
                        contentsCollectionPath,
                    });
                    return;
                }
                const contentId = pathFragments[contentsCollectionPathLength];
                if (!contentId) {
                    console.warn("contentId not found", {
                        pathFragments,
                        contentsCollectionPathFailsafe,
                        contentsCollectionPath,
                    });
                    return;
                }
                const innerPath = pathFragments.slice(contentsCollectionPathLength + 1).join("/");
                if (!innerPath) {
                    console.warn("innerPath not found", {
                        pathFragments,
                        contentsCollectionPathFailsafe,
                        contentsCollectionPath,
                    });
                    return;
                }
                updateDocumentFields(contentsCollectionPath, id, innerPath, order);
                return;
            }
            updateDocumentFields(contentsCollectionPath, id, "order", order);
        },
        [adventureId, documentId, contentsCollectionPath]
    );

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

            {isEditing && <ContentDrop path={contentsCollectionPath} mode="prepend" order={prependFirstOrder} />}

            {contents && (contents?.length ?? 0) > 0 && (
                <div className="flex flex-col gap-4">
                    {contents.map((content, index, contents) => {
                        const contentPath = [contentsCollectionPath, content.id].join("/");
                        return (
                            <DocumentContentItem
                                key={content.id}
                                {...content}
                                contentsCollectionPath={contentsCollectionPath}
                                setEditingPath={setEditingPath}
                                isEditingMode={isEditing}
                                onEditToggle={() => setEditingPath(contentPath)}
                                onMoveDrop={onMoveDrop}
                                isSelected={isEditing && editingPath === contentPath}
                                nextContent={contents[index + 1]}
                                prevContent={contents[index - 1]}
                            />
                        );
                    })}
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
    const [editingPath, setEditingPath] = useState<string | undefined>();
    const { adventure, adventureError } = useAdventure(adventureId);
    const { document, documentError, updateDocument, deleteDocument, claimDocument } = useAdventureDocument(
        adventureId,
        documentId
    );
    const { user } = useUser();

    const contentsCollectionPath = ["adventures", adventureId, "contents", documentId, "contents"].join("/");

    const onNewContentDrop = useCallback(
        (result: ContentItemDnDResultType) => {
            const { type, order, mode, path } = result;
            if (!adventureId || !documentId) {
                console.warn("adventureId or documentId not found", {
                    adventureId,
                    documentId,
                });
                return;
            }
            const newContentItem = { type, props: {}, order, name: type };
            if (mode === "insert") {
                console.log("insert mode not supported yet", result);
                const pathFragments = path.split("/");
                const contentsCollectionPathLength = contentsCollectionPath.split("/").length;
                const contentsCollectionPathFailsafe = pathFragments.slice(0, contentsCollectionPathLength).join("/");
                if (contentsCollectionPathFailsafe !== contentsCollectionPath) {
                    console.warn("content path not found", {
                        pathFragments,
                        contentsCollectionPathFailsafe,
                        contentsCollectionPath,
                    });
                    return;
                }
                const contentId = pathFragments[contentsCollectionPathLength];
                if (!contentId) {
                    console.warn("contentId not found", {
                        pathFragments,
                        contentsCollectionPathFailsafe,
                        contentsCollectionPath,
                    });
                    return;
                }
                const innerPath = pathFragments.slice(contentsCollectionPathLength + 1).join("/");
                if (!innerPath) {
                    console.warn("innerPath not found", {
                        pathFragments,
                        contentsCollectionPathFailsafe,
                        contentsCollectionPath,
                    });
                    return;
                }
                console.log("updateDocumentFields", { path, pathFragments, contentsCollectionPathFailsafe });
                updateDocumentFields(contentsCollectionPath, contentId, innerPath, newContentItem);
                // TODO: Set array path
                // TODO: Set deep editing path
                return;
            }
            createAdventureDocumentContent(adventureId, documentId, newContentItem).then((docRef) => {
                console.log("new content created", docRef.id, [contentsCollectionPath, docRef.id].join("/"));
                setEditingPath([contentsCollectionPath, docRef.id].join("/"));
            });
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

                    <DocumentContent
                        adventureId={adventureId}
                        documentId={documentId}
                        isEditing={isEditing}
                        editingPath={editingPath}
                        setEditingPath={setEditingPath}
                    />
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
                        <ContentItemList onDrop={onNewContentDrop} />
                    </div>
                )}
            </div>
        </div>
    );
}
