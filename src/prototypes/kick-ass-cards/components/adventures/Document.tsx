import Text, { H1, H5 } from "../content/Text";
import {
    AdventureDocumentDocType,
    ContentItemType,
    collectionWithDb,
    deleteDocument,
    updateDocument,
    updateDocumentFields,
    useQuery,
} from "../../services/firestoreController";
import ToggleData from "../../../../components/DataToggle";
import { twMerge } from "tailwind-merge";
import ContentItem from "./ContentItem";
import React, { useMemo } from "react";
import ContentDrop from "./ContentDrop";
import ErrorMessage from "./ErrorMessage";
import PendingTimer from "../../../../components/PendingTimer";
import { orderBy, query } from "firebase/firestore";
import Form from "../content/Form";
import contentFormSchemas from "./contentFormSchemas";
import { AnyRecord } from "../../../../utils/simpleTypes";
import ButtonWithConfirmation from "../content/ButtonWithConfirmation";
import Icon from "../Icon";

export type AdventureDocumentFormType = Omit<AdventureDocumentDocType, "id" | "meta" | "contents">;

export type DocumentProps = {
    className?: string;
    controls?: React.ReactNode;
    path: string;
    adventureId: string;
    isEditing?: boolean;
} & AdventureDocumentDocType;

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

export default function Document(props: DocumentProps) {
    const { adventureId, id: documentId, path, className, name, controls, isEditing } = props;

    const contentsRef = useMemo(
        () => query(collectionWithDb(`adventures/${adventureId}/contents/${documentId}/contents`), orderBy("order")),
        [adventureId, documentId]
    );
    const { data: contentsWithoutType, error: contentsError } = useQuery(contentsRef);

    const removeContentItem = (id: string) => {
        deleteDocument(`adventures/${adventureId}/contents/${documentId}/contents`, id);
    };

    const contents = contentsWithoutType as ContentItemType[] | undefined;

    const firstOrder = contents?.[0]?.order ?? 1;
    const prependFirstOrder = firstOrder - 1;

    return (
        <div className={twMerge("flex flex-col pb-8", className)}>
            <div className="flex flex-row gap-4 justify-between mb-8">
                <H1>{name}</H1>
                <div className="flex flex-row gap-4 items-center">{controls}</div>
            </div>

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

            <ContentDrop path={`${path}/contents`} mode="prepend" order={prependFirstOrder} />

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
                                    className="flex-1 gap-0"
                                    value={content.props}
                                    schema={
                                        content.type in contentFormSchemas
                                            ? contentFormSchemas[content.type as keyof typeof contentFormSchemas]
                                            : undefined
                                    }
                                    onChange={(value: AnyRecord) => {
                                        updateDocumentFields(
                                            `adventures/${adventureId}/contents/${documentId}/contents`,
                                            content.id,
                                            "props",
                                            value
                                        );
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
                                path={`${path}/contents/${content.id}`}
                                mode="append"
                                order={getOrderInBetween(content.order, contents[index + 1]?.order)}
                            />
                        </div>
                    ))}
                </div>
            )}

            <ToggleData buttonContent="Content data" initialCollapsed data={{ contents }} />
        </div>
    );
}
