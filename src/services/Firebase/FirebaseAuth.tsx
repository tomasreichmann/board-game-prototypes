import { PropsWithChildren, useEffect, useState } from "react";
import { auth } from "./firebase";
import {
    GoogleAuthProvider,
    signInWithPopup,
    AuthProvider,
    EmailAuthProvider,
    OAuthCredential, // Keep
    User,
} from "firebase/auth";
import Button from "../../prototypes/kick-ass-cards/components/content/Button";
import { twMerge } from "tailwind-merge";
import Text from "../../prototypes/kick-ass-cards/components/content/Text";

export const signOut = () => {
    auth.signOut();
};

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            setUser(authUser);
        });

        return () => unsubscribe();
    }, []);

    return { user, isSignedIn: user !== null, signOut };
};

export type FirebaseAuthProps = PropsWithChildren<{
    className?: string;
    successAuthRedirectUri?: string;
    withGoogle?: boolean;
    withEmail?: boolean;
    googleAuthButtonContent?: JSX.Element;
    emailAuthButtonContent?: JSX.Element;
    signOutContent?: JSX.Element;
}>;

export const authWithProvider = (provider: AuthProvider) => {
    return signInWithPopup(auth, provider)
        .then((result) => {
            /** @type {OAuthCredential} */
            console.info("login successful", result);
            return result;
        })
        .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.error("Login error", { errorCode, errorMessage, email, credential });
            // ...
            return Promise.reject(error);
        });
};
export const authWithGoogle = () => authWithProvider(new GoogleAuthProvider());
export const authWithEmail = () => authWithProvider(new EmailAuthProvider());

const defaultGoogleAuthButtonContent = (
    <>
        <svg
            className="w-6 h-6 inline-block"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 48 48"
        >
            <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
        </svg>
        &ensp;Sign in with Google
    </>
);
const defaultEmailAuthButtonContent = (
    <>
        <svg
            className="w-6 h-6 inline-block"
            xmlns="http://www.w3.org/2000/svg"
            width="800px"
            height="800px"
            viewBox="0 0 48 48"
        >
            <rect y="6" width="48" height="36" rx="2" ry="2" fill="#38b1e7" />
            <path
                d="M47.84,40.56A2.11,2.11,0,0,1,46,41.9L2,42H2A2,2,0,0,1,.15,40.78a2,2,0,0,1,.44-2.16L17.88,21.73a9.23,9.23,0,0,1,12.56.07L47.4,38.41A2,2,0,0,1,47.84,40.56Z"
                fill="#299acc"
            />
            <path
                d="M47.84,7.44A2.11,2.11,0,0,0,46,6.1L2,6H2A2,2,0,0,0,.15,7.22,2,2,0,0,0,.59,9.38L17.88,26.27a9.23,9.23,0,0,0,12.56-.07L47.4,9.59A2,2,0,0,0,47.84,7.44Z"
                fill="#6ac1e7"
            />
        </svg>
        &ensp;Sign in with Email
    </>
);
const defaultSignOutContent = <>Sign Out</>;

export default function FirebaseAuth({
    className,
    successAuthRedirectUri,
    googleAuthButtonContent = defaultGoogleAuthButtonContent,
    emailAuthButtonContent = defaultEmailAuthButtonContent,
    signOutContent = defaultSignOutContent,
    children,
}: FirebaseAuthProps) {
    const [error, setError] = useState<Error | null>(null);
    const { user, signOut } = useAuth();

    if (user === null) {
        return (
            <div className={twMerge("flex flex-row gap-4 flex-wrap", className)}>
                {children}
                <Button
                    variant="outline"
                    onClick={() => {
                        setError(null);
                        authWithGoogle()
                            .then(() => {
                                if (successAuthRedirectUri) {
                                    window.location.href = successAuthRedirectUri;
                                }
                            })
                            .catch(setError);
                    }}
                >
                    {googleAuthButtonContent}
                </Button>
                <Button
                    variant="outline"
                    onClick={() => {
                        setError(null);
                        authWithEmail()
                            .then(() => {
                                if (successAuthRedirectUri) {
                                    window.location.href = successAuthRedirectUri;
                                }
                            })
                            .catch(setError);
                    }}
                >
                    {emailAuthButtonContent}
                </Button>
                {error && (
                    <Text variant="body" color="danger">
                        {error?.message}
                    </Text>
                )}
            </div>
        );
    }

    return (
        <div className={twMerge("flex flex-row gap-4", className)}>
            {children}
            <Button variant="solid" color="secondary" onClick={() => signOut()}>
                {signOutContent}
            </Button>
        </div>
    );
}
