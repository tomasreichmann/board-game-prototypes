import { Navigation } from "../Navigation";
import Text, { H5 } from "../content/Text";
import ToggleData from "../../../../components/DataToggle";
import ButtonWithConfirmation from "../content/ButtonWithConfirmation";
import {
    checkWriteAccess,
    claimDocument,
    collectionWithDb,
    deleteAdventure,
    useAdventure,
    useQuery,
} from "../../services/firestoreController";
import { useParams } from "react-router-dom";
import { adventuresPath } from "./routes";
import PendingTimer from "../../../../components/PendingTimer";
import { useUser } from "@clerk/clerk-react";
import ClerkUser from "../../../../services/Clerk/ClerkUser";
import SignedOutWarning from "../adventures/SignedOutWarning";
import Adventure from "../adventures/Adventure";
import { useCallback, useMemo, useState } from "react";
import Form, { getDefaultsFromSchema, getFormSchemaFromJsonSchema } from "../content/Form";
import { JSONSchemaType } from "ajv";
import { collection, query } from "firebase/firestore";
import { AdventureFormType, adventureFormJsonSchema } from "../adventures/adventureFormSchema";
import Button from "../content/Button";
import ErrorMessage from "../adventures/ErrorMessage";

const AdventureContent = () => {
    const [isEditing, setIsEditing] = useState(false);
    const { adventureId } = useParams<"adventureId">();
    const { user } = useUser();

    const { adventure, adventureError, updateAdventure } = useAdventure(adventureId);

    const hasWriteAccess = checkWriteAccess(adventure?.meta);
    const canClaim = user?.id && !adventure?.meta?.author;
    // const canAbandon = user?.id && adventure?.meta?.author?.uid === user?.id;
    const onChange = useCallback((data: Partial<AdventureFormType>) => {
        console.log(data);
        updateAdventure(data);
    }, []);

    const adventureFormData = useMemo(() => {
        if (!adventure) {
            return undefined;
        }
        const { id, meta, contents, ...adventureFormData } = adventure;
        return adventureFormData;
    }, [adventure]);

    if (!adventureId) {
        return <ErrorMessage heading="⚠ Invalid Adventure Id" body={`"${adventureId}"`} />;
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

    if (!adventure) {
        return (
            <div className="flex-1 flex flex-col gap-2 justify-center items-center">
                <PendingTimer />
            </div>
        );
    }

    const defaultProps = getDefaultsFromSchema(
        adventureFormJsonSchema as JSONSchemaType<any>
    ) as Partial<AdventureFormType>;
    const formSchema = getFormSchemaFromJsonSchema(adventureFormJsonSchema as JSONSchemaType<any>);

    return (
        <div className="flex-1 flex flex-col print:m-0 w-full text-kac-iron px-2 py-5 md:px-10 bg-white">
            <div className="flex flex-row gap-4 items-center mb-4">
                <div className="flex flex-row gap-2 items-baseline text-kac-steel-dark">
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
            <div className="flex flex-col-reverse md:flex-row items-stretch gap-4">
                <Adventure
                    className="flex-1"
                    {...adventure}
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
                                            deleteAdventure(adventureId).then(() => {
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
                                            claimDocument("adventures", adventureId, user);
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
                                            value=""
                                            className="sr-only peer"
                                            onChange={(event) => {
                                                setIsEditing(event.target.checked);
                                            }}
                                            checked={isEditing}
                                        />
                                        <div className="relative mx-2 w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                        <Text color="inherit">Edit</Text>
                                    </label>
                                </div>
                            )}
                        </>
                    }
                />

                {isEditing && adventureFormData && (
                    <div className="flex flex-col gap-4 relative md:w-[20vw]">
                        <Form<AdventureFormType>
                            schema={formSchema}
                            value={adventureFormData || defaultProps}
                            onChange={onChange}
                        />
                        <ToggleData data={{ adventureFormJsonSchema, formSchema, adventureFormData }} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default function AdventureRoute() {
    return (
        <>
            <Navigation />
            <AdventureContent />
        </>
    );
}
