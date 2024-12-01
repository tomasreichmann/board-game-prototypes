import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/clerk-react";
import { H2 } from "../../content/Text";
import Button from "../../controls/Button";
import Input from "../../controls/Input";
import { createGame } from "../model/firestorePlayOnlineController";
import { useState } from "react";
import { playOnlineGamePath } from "../../routes/routes";
import { twMerge } from "tailwind-merge";
import ListGames from "./ListGames";

export default function CreateOrJoinGame({ className }: { className?: string }) {
    const { user } = useUser();

    const [joinCode, setJoinCode] = useState("");

    const handleCreateGame = () => {
        if (user) {
            createGame(user).then((docRef) => {
                window.location.assign([playOnlineGamePath, docRef.id].join("/"));
            });
        } else {
            console.warn("User is not signed in");
        }
    };

    const handleJoinGame = () => {
        window.location.assign([playOnlineGamePath, joinCode].join("/"));
    };

    return (
        <div className={twMerge("flex-1 flex flex-col justify-center items-center", className)}>
            <SignedOut>
                <div className="flex-1 flex flex-col justify-center items-center">
                    <SignInButton>
                        <div className="relative group">
                            <Button
                                variant="solid"
                                size="xl"
                                className="self-center font-kacHeading rounded-full aspect-square z-10 relative animate-breathe duration-1000 delay-5000 group-hover:bg-kac-monster group-hover:outline-none group-hover:paused group-hover:transition-transform"
                                onClick={() => {}}
                            >
                                Sign in to
                                <br />
                                <span className="font-kacLogo font-bold text-4xl">START</span>
                            </Button>
                            <div className="absolute left-1/2 top-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2">
                                <span className="absolute w-full h-full rounded-full aspect-square bg-kac-gold animate-ping duration-2000 group-hover:bg-kac-monster-light group-hover:duration-500 group-hover:delay-0"></span>
                            </div>
                        </div>
                    </SignInButton>
                </div>
            </SignedOut>
            <SignedIn>
                <div className="flex flex-col justify-center items-stretch gap-8 self-center py-4 sm:flex-row">
                    <Button variant="solid" color="success" size="xl" onClick={handleCreateGame}>
                        Create a Game
                    </Button>
                    <div className="flex flex-col gap-4 items-center p-4 bg-kac-bone/25 rounded-md max-w-[400px]">
                        <H2 className="text-kac-gold-darker">Join Game by Code</H2>
                        <div className="flex flex-row items-end gap-2">
                            <Input
                                type="text"
                                placeholder="####"
                                className="flex-1 text-lg"
                                value={joinCode}
                                onChange={(e) => setJoinCode(e.target.value)}
                            ></Input>
                            <Button variant="solid" className="self-center" onClick={handleJoinGame}>
                                Join
                            </Button>
                        </div>
                    </div>
                </div>
                <ListGames className="flex-grow-0 mt-8" />
            </SignedIn>
        </div>
    );
}
