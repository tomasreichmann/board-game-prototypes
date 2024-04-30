import { Navigation } from "../Navigation";
import Text, { H1, H5 } from "../content/Text";
import ToggleData from "../../../../components/DataToggle";
import ButtonWithConfirmation from "../content/ButtonWithConfirmation";
import { checkWriteAccess, claimDocument, deleteAdventure, useAdventure } from "../../services/firestoreController";
import { useParams } from "react-router-dom";
import { adventuresPath } from "./routes";
import PendingTimer from "../../../../components/PendingTimer";
import { SignedOut, useUser } from "@clerk/clerk-react";
import ClerkUser from "../../../../services/Clerk/ClerkUser";

const AdventureContent = () => {
    const { adventureId } = useParams<"adventureId">();
    const { isSignedIn, user } = useUser();

    const { adventure, adventureError } = useAdventure(adventureId);

    const hasWriteAccess = checkWriteAccess(adventure?.meta);
    const canClaim = user?.id && !adventure?.meta?.author;
    const canAbandon = user?.id && adventure?.meta?.author?.uid === user?.id;

    const notSignedContent = !isSignedIn && (
        <SignedOut>
            <Text color="warning" variant="body" className="self-center font-bold">
                Some features might be hidden until you sign in.
            </Text>
        </SignedOut>
    );

    if (!adventureId) {
        return (
            <div className="flex-1 flex flex-col gap-2 justify-center items-center">
                <H5 color="danger" className="text-center">
                    ⚠ Invalid Adventure Id
                </H5>
                <Text color="danger" variant="body" className="text-center">
                    "{adventureId}"
                </Text>
            </div>
        );
    }

    if (adventureError) {
        return (
            <div className="flex-1 flex flex-col gap-2 justify-center items-center">
                <H5 color="danger" className="text-center">
                    ⚠ Error loading an Adventure with ID "{adventureId}"
                </H5>
                <Text color="danger" variant="body" className="text-center">
                    {adventureError.message}
                </Text>
                {notSignedContent}
            </div>
        );
    }

    if (!adventure) {
        return (
            <div className="flex-1 flex flex-col gap-2 justify-center items-center">
                <PendingTimer />
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-4 items-center">
                    <H1>{adventure?.name}</H1>

                    {hasWriteAccess && (
                        <div className="flex flex-row gap-2">
                            <ButtonWithConfirmation
                                color="danger"
                                confirmText="Delete permanently?"
                                size="sm"
                                onClick={() => {
                                    deleteAdventure(adventureId);
                                    window.location.assign(adventuresPath);
                                }}
                            >
                                Delete
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
                </div>
                <ClerkUser />
            </div>
            {notSignedContent}
            <ToggleData data={adventure} />
        </>
    );
};

export default function AdventureRoute() {
    return (
        <>
            <Navigation />
            <div className="flex-1 flex flex-col print:m-0 w-full text-kac-iron px-2 py-5 md:px-10 bg-white">
                <AdventureContent />
            </div>
        </>
    );
}
