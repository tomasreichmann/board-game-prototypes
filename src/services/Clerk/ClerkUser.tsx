import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import Button from "../../prototypes/kick-ass-cards/components/controls/Button";
import { noop } from "lodash";

export default function ClerkUser({ children }: { children?: React.ReactNode }) {
    return (
        <>
            <SignedOut>
                {children}
                <SignInButton>
                    <Button variant="solid" size="md" className="self-center" onClick={noop}>
                        Sign in with Clerk
                    </Button>
                </SignInButton>
            </SignedOut>
            <SignedIn>
                <UserButton showName userProfileMode="modal" />
                {children}
            </SignedIn>
        </>
    );
}
