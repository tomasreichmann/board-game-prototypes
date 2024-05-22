import { Navigation } from "../Navigation";
import { useParams } from "react-router-dom";
import Adventure from "../adventures/Adventure";
import ErrorBoundary from "../../../../components/ErrorBoundary";
import { ErrorBoundaryErrorMessage } from "../adventures/ErrorMessage";
import { deleteAdventure } from "../../services/firestoreController";
import ButtonWithConfirmation from "../controls/ButtonWithConfirmation";

export default function AdventureRoute() {
    const { adventureId } = useParams<"adventureId">();
    const removeFaultyAdventure = () => {
        if (adventureId) {
            deleteAdventure(adventureId);
        } else {
            console.warn("adventureId not found", { adventureId });
        }
    };
    return (
        <>
            <Navigation />
            <ErrorBoundary
                ErrorComponent={ErrorBoundaryErrorMessage}
                extraErrorProps={{
                    children: (
                        <>
                            {adventureId && (
                                <div>
                                    <ButtonWithConfirmation
                                        onClick={removeFaultyAdventure}
                                        variant="solid"
                                        color="danger"
                                        size="sm"
                                        className="ml-4"
                                    >
                                        Remove faulty adventure with id "{adventureId}"
                                    </ButtonWithConfirmation>
                                </div>
                            )}
                        </>
                    ),
                }}
            >
                <Adventure id={adventureId} />
            </ErrorBoundary>
        </>
    );
}
