import { Navigation } from "../Navigation";
import ErrorBoundary from "../../../../components/ErrorBoundary";
import { ErrorBoundaryErrorMessage } from "../adventures/ErrorMessage";
import PlayOnline from "../playOnline/components/PlayOnline";

export default function PlayOnlineRoute() {
    return (
        <>
            <Navigation />
            <ErrorBoundary ErrorComponent={ErrorBoundaryErrorMessage}>
                <PlayOnline />
            </ErrorBoundary>
        </>
    );
}
