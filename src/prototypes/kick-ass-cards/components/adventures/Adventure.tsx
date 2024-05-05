import Text, { H5 } from "../content/Text";
import {
    AdventureDocType,
    AdventureDocumentDocType,
    checkWriteAccess,
    collectionWithDb,
    createAdventureDocument,
    useQuery,
} from "../../services/firestoreController";
import { JSONSchemaType } from "ajv";
import ToggleData from "../../../../components/DataToggle";
import Heading from "../Heading";
import { twMerge } from "tailwind-merge";
import Button from "../content/Button";
import { useUser } from "@clerk/clerk-react";
import { adventuresPath } from "../routes/routes";
import SignedOutWarning from "./SignedOutWarning";
import { useMemo } from "react";
import Icon from "../Icon";
import MetaUser from "./MetaUser";

export type AdventureProps = {
    className?: string;
    controls?: React.ReactNode;
} & AdventureDocType;

export default function Adventure(props: AdventureProps) {
    const { id, className, name, description, meta, imageUri, controls } = props;

    const contentsRef = useMemo(() => collectionWithDb(`adventures/${id}/contents`), [id]);
    const { user } = useUser();
    const { data: contentsWithoutType, error: contentsError } = useQuery(contentsRef);
    const contents = contentsWithoutType as AdventureDocumentDocType[] | undefined;

    const hasWriteAccess = checkWriteAccess(meta);

    const createContent = () => {
        if (user) {
            createAdventureDocument(id, user).then((docRef) => {
                window.location.assign([adventuresPath, id, "docs", docRef.id].join("/"));
            });
        }
    };

    return (
        <div className={twMerge("flex flex-col pb-8", className)}>
            <Heading
                heading={name}
                imageUri={imageUri}
                headingClassName="text-left"
                contentWrapperClassName="absolute left-0 bottom-0 right-0 flex flex-row justify-between items-end px-8 pb-4 pt-8 text-left bg-gradient-to-b from-black/0 via-20% via-black/30 to-35% to-black/40 text-kac-steel-light"
            >
                <div className="flex flex-row gap-4">{controls}</div>
            </Heading>

            {description && (
                <Text variant="body" color="body" className="text-lg mt-4 lg:columns-2 xl:columns-3">
                    {description}
                </Text>
            )}

            {contentsError && (
                <div className="flex-1 flex flex-col gap-2 justify-center items-center p-8 bg-white">
                    <H5 color="danger" className="text-center">
                        ⚠ Error loading content of adventure with ID "{id}"
                    </H5>
                    <Text color="danger" variant="body" className="text-center">
                        {contentsError.message}
                    </Text>
                    <SignedOutWarning text="⚠ Some content might be unavailable until you sign in." />
                </div>
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
            <div className="grid md:grid-cols-[repeat(auto-fill,minmax(500px,1fr))] gap-4 mt-4">
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
                            href={[adventuresPath, id, "docs", docId].join("/")}
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
            </div>
        </div>
    );
}
