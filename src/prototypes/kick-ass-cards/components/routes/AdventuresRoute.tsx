import { Navigation } from "../Navigation";
import Text, { H1 } from "../content/Text";
import FirebaseAuth, { useAuth } from "../../../../services/Firebase/FirebaseAuth";
import ToggleData from "../../../../components/DataToggle";

export default function AdventuresRoute() {
    const { isSignedIn, user } = useAuth();

    return (
        <>
            <Navigation />
            <div className="print:m-0 w-full text-kac-iron px-2 py-5 md:px-10 bg-white">
                <H1>Adventures</H1>

                {isSignedIn && (
                    <FirebaseAuth>
                        <Text color="warning" variant="body" className="self-center font-bold">
                            Some Adventures might be hidden until you sign in.
                        </Text>
                    </FirebaseAuth>
                )}
                <ToggleData data={user} />
            </div>
        </>
    );
}
