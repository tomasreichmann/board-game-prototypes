import Text, { H5 } from "../content/Text";
import {
    AdventureDocType,
    AdventureDocumentDocType,
    checkWriteAccess,
    collectionWithDb,
    createAdventureDocument,
    useAdventure,
    useQuery,
} from "../../services/firestoreController";
import { JSONSchemaType } from "ajv";
import ToggleData from "../../../../components/DataToggle";
import Heading from "../Heading";
import { twMerge } from "tailwind-merge";
import Button from "../controls/Button";
import { useUser } from "@clerk/clerk-react";
import { adventuresPath } from "../routes/routes";
import SignedOutWarning from "./SignedOutWarning";
import { useCallback, useMemo, useState } from "react";
import Icon from "../Icon";
import MetaUser from "./MetaUser";
import { AdventureFormType, adventureFormJsonSchema } from "./adventureFormSchema";
import ErrorMessage from "./ErrorMessage";
import PendingTimer from "../../../../components/PendingTimer";
import ButtonWithConfirmation from "../controls/ButtonWithConfirmation";
import Form, { getDefaultsFromSchema, getFormSchemaFromJsonSchema } from "../controls/Form";
import ClerkUser from "../../../../services/Clerk/ClerkUser";
import Mdx from "../content/Mdx";
import Article from "../content/Article";

export const DocumentList = ({ adventureId }: { adventureId: string }) => {
    const contentsRef = useMemo(() => collectionWithDb(`adventures/${adventureId}/contents`), [adventureId]);
    const { data: contentsWithoutType, error: contentsError } = useQuery(contentsRef);
    const contents = contentsWithoutType as AdventureDocumentDocType[] | undefined;

    if (contentsError) {
        return (
            <ErrorMessage
                heading={`⚠ Error loading content of adventure with ID ${adventureId}`}
                body={contentsError.message}
                className="flex-1 flex flex-col gap-2 justify-center items-center p-8 bg-white"
            >
                <SignedOutWarning text="⚠ Some content might be unavailable until you sign in." />
            </ErrorMessage>
        );
    }

    return (
        <>
            {!contents?.length && (
                <Text
                    variant="body"
                    color="body"
                    className="text-lg text-center font-bold text-kac-steel-dark py-8 col-span-full"
                >
                    No documents yet
                </Text>
            )}
            {contents?.map(({ id: docId, name, meta }) => (
                <div key={docId} className="flex flex-row items-baseline gap-2">
                    <Button
                        href={[adventuresPath, adventureId, "docs", docId].join("/")}
                        variant="text"
                        color="primary"
                        size="lg"
                        className="font-bold"
                    >
                        <Icon icon="scrollQuill" className="h-6 w-6 inline-block align-middle mr-1" />
                        {name}
                    </Button>
                    {meta?.createdAt && <Text>Created {new Date(meta?.createdAt).toLocaleDateString()}</Text>}
                    by
                    {meta?.author && <MetaUser {...meta.author} />}
                </div>
            ))}
        </>
    );
};

export type AdventureProps = {
    id?: string;
    className?: string;
};

export default function Adventure({ id: adventureId, className }: AdventureProps) {
    const [isEditing, setIsEditing] = useState(false);
    const { user } = useUser();
    const { adventure, adventureError, updateAdventure, deleteAdventure, claimAdventure } = useAdventure(adventureId);

    // const canAbandon = user?.id && adventure?.meta?.author?.uid === user?.id;
    const onChange = useCallback((data: Partial<AdventureFormType>) => {
        console.log(data);
        updateAdventure(data);
    }, []);

    const adventureFormData = useMemo(() => {
        if (!adventure) {
            return undefined;
        }
        const { id: adventureId, meta, contents, ...adventureFormData } = adventure;
        return adventureFormData;
    }, [adventure]);

    if (!adventureId) {
        return (
            <ErrorMessage
                className="flex-1 flex flex-col justify-center items-center"
                heading="⚠ Invalid Adventure Id"
                body={`"${adventureId}"`}
            />
        );
    }

    if (adventureError) {
        return (
            <ErrorMessage
                className="flex-1 flex flex-col justify-center items-center"
                heading={<>⚠ Error loading an adventure with ID "{adventureId}"</>}
                body={adventureError.message}
            >
                <SignedOutWarning text="⚠ Some adventures might be unavailable until you sign in." />
            </ErrorMessage>
        );
    }

    if (!adventure) {
        return (
            <div className="flex-1 flex flex-col justify-center items-center">
                <PendingTimer />
            </div>
        );
    }

    const hasWriteAccess = checkWriteAccess(adventure?.meta);
    const canClaim = user?.id && !adventure?.meta?.author;

    const { name, description, imageUri } = adventure;

    const defaultProps = getDefaultsFromSchema(
        adventureFormJsonSchema as JSONSchemaType<any>
    ) as Partial<AdventureFormType>;
    const formSchema = getFormSchemaFromJsonSchema(adventureFormJsonSchema as JSONSchemaType<any>);

    const createContent = () => {
        if (user) {
            createAdventureDocument(adventureId, user).then((docRef) => {
                window.location.assign([adventuresPath, adventureId, "docs", docRef.id].join("/"));
            });
        }
    };

    return (
        <div
            className={twMerge(
                "flex-1 flex flex-col print:m-0 w-full text-kac-iron px-2 py-5 md:px-10 bg-white",
                className
            )}
        >
            <div className="flex flex-row gap-4 items-center mb-4">
                <div className="flex flex-row flex-wrap gap-2 items-baseline text-kac-steel-dark">
                    <Button href={adventuresPath} variant="text" color="secondary">
                        Adventures
                    </Button>
                    <span>/</span>
                    <Text className="text-kac-iron">{adventure?.name || adventureId}</Text>
                </div>
                <div className="flex-1" />
                <ClerkUser />
            </div>
            <SignedOutWarning text="⚠ Some features might be hidden until you sign in." />
            <div className="flex-1 flex flex-col-reverse md:flex-row items-stretch gap-4">
                <div className="flex-1 flex-col pb-8">
                    <Heading
                        heading={name}
                        imageUri={imageUri}
                        headingClassName="text-left"
                        contentWrapperClassName="absolute left-0 bottom-0 right-0 flex flex-row flex-wrap justify-between items-end px-8 pb-4 pt-8 text-left bg-gradient-to-b from-black/0 via-20% via-black/30 to-35% to-black/40 text-kac-steel-light"
                    >
                        <div className="flex flex-row justify-end gap-4">
                            {hasWriteAccess && (
                                <div className="flex flex-row gap-2">
                                    <ButtonWithConfirmation
                                        color="danger"
                                        confirmText="Delete the whole adventure permanently, no backsies?"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            deleteAdventure().then(() => {
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
                                            claimAdventure(user);
                                        }}
                                    >
                                        Claim
                                    </ButtonWithConfirmation>
                                </div>
                            )}
                            {hasWriteAccess && (
                                <div className="flex flex-row gap-2">
                                    <label className="inline-flex items-center cursor-pointer select-none">
                                        <Text color="inherit">Preview</Text>
                                        <input
                                            type="checkbox"
                                            checked={isEditing}
                                            className="sr-only peer"
                                            onChange={(event) => {
                                                setIsEditing(event.target.checked);
                                            }}
                                        />
                                        <div className="relative mx-2 w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                        <Text color="inherit">Edit</Text>
                                    </label>
                                </div>
                            )}
                        </div>
                    </Heading>

                    {description && (
                        <Article className="text-lg mt-4 lg:columns-2 xl:columns-3">
                            <Mdx mdxString={description} />
                        </Article>
                    )}

                    {hasWriteAccess && (
                        <Button
                            variant="solid"
                            color="primary"
                            className="mt-4 flex flex-row gap-2 items-center self-start"
                            onClick={createContent}
                        >
                            <Icon icon="scrollQuill" className="h-6 w-6 inline-block align-middle" />
                            Create new document
                        </Button>
                    )}
                    {adventureId !== undefined && (
                        <div className="grid md:grid-cols-[repeat(auto-fit,minmax(500px,1fr))] gap-4 mt-4">
                            <DocumentList adventureId={adventureId} />
                        </div>
                    )}
                </div>

                {isEditing && adventureFormData && (
                    <div className="flex flex-col gap-4 relative md:w-[20vw] md:min-w-[200px]">
                        <Form<AdventureFormType>
                            schema={formSchema}
                            value={adventureFormData || defaultProps}
                            onChange={onChange}
                        />
                        <ToggleData
                            data={{ adventureFormJsonSchema, formSchema, adventureFormData }}
                            initialCollapsed
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
