import { Navigation } from "../Navigation";
import ButtonWithConfirmation from "../content/ButtonWithConfirmation";
import { deleteDocument } from "../../services/firestoreController";
import { useParams } from "react-router-dom";
import { adventuresPath } from "./routes";
import Document from "../adventures/Document";
import ErrorMessage, { ErrorBoundaryErrorMessage } from "../adventures/ErrorMessage";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ErrorBoundary from "../../../../components/ErrorBoundary";

export default function DocumentRoute() {
    const { adventureId, documentId } = useParams<"adventureId" | "documentId">();

    const removeFaultyAdventureDocument = () => {
        if (adventureId && documentId) {
            deleteDocument(`${adventuresPath}/${adventureId}/contents`, documentId);
        } else {
            console.warn("adventureId or documentId not found", { adventureId, documentId });
        }
    };

    return (
        <>
            <Navigation />
            {!adventureId && <ErrorMessage heading="⚠ Invalid Adventure Id" body={`"${adventureId}"`} />}
            {!documentId && <ErrorMessage heading="⚠ Invalid Document Id" body={`"${documentId}"`} />}
            {adventureId && documentId && (
                <DndProvider backend={HTML5Backend}>
                    <ErrorBoundary
                        ErrorComponent={ErrorBoundaryErrorMessage}
                        extraErrorProps={{
                            children: (
                                <>
                                    {adventureId && (
                                        <div>
                                            <ButtonWithConfirmation
                                                onClick={removeFaultyAdventureDocument}
                                                variant="solid"
                                                color="danger"
                                                size="sm"
                                                className="ml-4"
                                            >
                                                Remove faulty document with id "{documentId}" from adventure with id "
                                                {adventureId}"
                                            </ButtonWithConfirmation>
                                        </div>
                                    )}
                                </>
                            ),
                        }}
                    >
                        <Document adventureId={adventureId} documentId={documentId} />
                    </ErrorBoundary>
                </DndProvider>
            )}
        </>
    );
}
