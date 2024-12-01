import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/clerk-react";
import { H2 } from "../../content/Text";
import Button from "../../controls/Button";
import Input from "../../controls/Input";
import { createGame } from "../model/firestorePlayOnlineController";
import { useState } from "react";
import { playOnlineGamePath } from "../../routes/routes";
import { twMerge } from "tailwind-merge";
import ListGames from "./ListGames";
import BigSignInButton from "./BigSignInButton";

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
            <BigSignInButton />
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
