import { SignedOut, SignInButton } from "@clerk/clerk-react";
import Button from "../../controls/Button";
import { twMerge } from "tailwind-merge";

export type BigSignInButtonProps = {
    children?: React.ReactNode;
    className?: string;
};
export default function BigSignInButton({ className, children }: BigSignInButtonProps) {
    const content = children ?? (
        <>
            Sign in to
            <br />
            <span className="font-kacLogo font-bold text-4xl">START</span>
        </>
    );
    return (
        <SignedOut>
            <div className={twMerge("SignInButton flex-1 flex flex-col justify-center items-center", className)}>
                <SignInButton>
                    <div className="relative group">
                        <Button
                            variant="solid"
                            size="xl"
                            className="self-center font-kacHeading rounded-full aspect-square z-10 relative animate-breathe duration-1000 delay-5000 group-hover:bg-kac-monster group-hover:outline-none group-hover:paused group-hover:transition-transform"
                            onClick={() => {}}
                        >
                            {content}
                        </Button>
                        <div className="absolute left-1/2 top-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2">
                            <span className="absolute w-full h-full rounded-full aspect-square bg-kac-gold animate-ping duration-2000 group-hover:bg-kac-monster-light group-hover:duration-500 group-hover:delay-0"></span>
                        </div>
                    </div>
                </SignInButton>
            </div>
        </SignedOut>
    );
}
