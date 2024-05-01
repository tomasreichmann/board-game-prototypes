import { Navigation } from "../Navigation";
import Text, { H1, H5, H6 } from "../content/Text";
import ToggleData from "../../../../components/DataToggle";
import Button from "../content/Button";
import { createAdventure, useAdventures } from "../../services/firestoreController";
import { adventuresPath } from "./routes";
import { SignedIn, useUser } from "@clerk/clerk-react";
import ClerkUser from "../../../../services/Clerk/ClerkUser";
import SignedOutWarning from "../adventures/SignedOutWarning";

export default function AdventuresRoute() {
    const { user } = useUser();
    const { adventures, adventuresError } = useAdventures();

    const onCreateAdventure = () => {
        if (!user) {
            console.warn("User is not signed in");
            return;
        }
        createAdventure(user).then((docRef) => {
            window.location.assign(adventuresPath + "/" + docRef.id);
        });
    };

    return (
        <>
            <Navigation />
            <div className="print:m-0 w-full text-kac-iron px-2 py-5 md:px-10 bg-white">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-4 items-center">
                        <H1>Adventures</H1>
                        <SignedIn>
                            <Button color="success" size="sm" onClick={onCreateAdventure}>
                                Create
                            </Button>
                        </SignedIn>
                    </div>
                    <ClerkUser />
                </div>

                <SignedOutWarning text="⚠ Some Adventures might be hidden until you sign in." />

                {adventuresError && (
                    <>
                        <H5 color="danger" className="text-center">
                            {adventuresError.name}
                        </H5>

                        <Text color="warning" variant="body" className="text-center">
                            {adventuresError.message}
                        </Text>
                    </>
                )}

                {adventures && adventures.length === 0 && (
                    <H5 className="text-center" color="warning">
                        No Adventures yet
                    </H5>
                )}

                {adventures && adventures.length > 0 && (
                    <div className="flex flex-row flex-wrap gap-4 my-8">
                        {adventures.map((adventure) => (
                            <Button
                                key={adventure.id}
                                variant="outline"
                                color="info"
                                className="rounded-md bg-white shadow-md w-64 h-48 flex flex-col justify-end bg-cover p-0"
                                style={{
                                    backgroundImage: `url(${adventure.imageUri || "/kick-ass-docs/adventure.jpg"})`,
                                }}
                                href={adventuresPath + "/" + adventure.id}
                            >
                                <div className="flex flex-col bg-gradient-to-b from-white/0 to-50% to-white/90 p-4">
                                    <H6 className="text-ellipsis">{adventure.name || "Untitled Adventure"}</H6>
                                    {adventure.description && (
                                        <Text variant="body" className="text-sm">
                                            {adventure.description}
                                        </Text>
                                    )}
                                </div>
                            </Button>
                        ))}
                    </div>
                )}

                {adventures && <ToggleData data={adventures} />}

                <ToggleData data={user} />
            </div>
        </>
    );
}
