import { ClerkProvider as ClerkContextProvider, useAuth } from "@clerk/clerk-react";
import { neobrutalism } from "@clerk/themes";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import { useEffect } from "react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export const ClerkFirebaseIntegration = ({ children }: { children: React.ReactNode }) => {
    const { getToken } = useAuth();

    useEffect(() => {
        const signInWithClerk = async () => {
            try {
                const token = await getToken({ template: "integration_firebase" });
                if (token) {
                    const userCredentials = await signInWithCustomToken(auth, token || "");
                    // The userCredentials.user object can call the methods of
                    // the Firebase platform as an authenticated user.
                    console.log("User:", userCredentials.user);
                }
            } catch (error) {
                console.error(error);
            }
        };
        signInWithClerk();
    }, []);

    return <>{children}</>;
};

export default function ClerkProvider({ children }: { children: React.ReactNode }) {
    if (!PUBLISHABLE_KEY) {
        console.error(new Error("Missing Publishable Key"));
        return <>{children}</>;
    }

    return (
        <ClerkContextProvider
            publishableKey={PUBLISHABLE_KEY}
            appearance={{
                baseTheme: neobrutalism,
                elements: {
                    userButtonOuterIdentifier: "text-md font-normal font-kacBody",
                },
            }}
        >
            <ClerkFirebaseIntegration>{children}</ClerkFirebaseIntegration>
        </ClerkContextProvider>
    );
}
