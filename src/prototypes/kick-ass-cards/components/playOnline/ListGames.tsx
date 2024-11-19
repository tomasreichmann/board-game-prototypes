import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/clerk-react";
import Text, { H2, H3, H4 } from "../content/Text";
import Button from "../controls/Button";
import { useYourGames } from "./firestorePlayOnlineController";
import { playOnlineGamePath } from "../routes/routes";
import { twMerge } from "tailwind-merge";
import ErrorMessage from "../adventures/ErrorMessage";
import MetaUser from "../adventures/MetaUser";
import { GameDocType } from "./types";
import Image from "../Image";
import mergePath from "../../../../utils/mergePath";
import PendingTimer from "../../../../components/PendingTimer";

export const GameItem = ({
    className,
    name,
    imageUri = "/public/KAC/d20.png",
    storytellers,
    players,
    meta,
    id,
}: GameDocType & { className?: string }) => {
    const hasPlayers = players && players.length > 0;
    const hasStorytellers = storytellers && storytellers.length > 0;
    const href = mergePath(playOnlineGamePath, id);
    return (
        <article className={twMerge("flex flex-col gap-2 p-4 rounded-md bg-kac-bone-light/25", className)}>
            <Button href={href} variant={"text"}>
                <Image src={imageUri} className="w-full aspect-[16/9] rounded-sm bg-kac-steel" objectFit="cover" />
            </Button>
            <div className="flex flex-row justify-between items-baseline gap-2">
                <H3 className="leading-tight font-bold">
                    <Button variant="text" href={href} className="font-bold">
                        {name}
                    </Button>
                </H3>
                <Text size="sm" className="ml-4 text-kac-steel-dark">
                    {meta?.createdAt && new Date(meta?.createdAt).toDateString()}
                </Text>
            </div>
            {hasPlayers ||
                (hasStorytellers && (
                    <div className="flex flex-row flex-wrap gap-2">
                        {hasStorytellers && <H4>Storytellers</H4>}
                        {storytellers?.map((user) => (
                            <MetaUser {...user} />
                        ))}
                        {hasPlayers && <H4>Players</H4>}
                        {storytellers?.map((user) => (
                            <MetaUser {...user} />
                        ))}
                    </div>
                ))}
        </article>
    );
};

export default function ListGames({ className }: { className?: string }) {
    const { user } = useUser();
    const { yourGames, yourGamesError } = useYourGames(user?.id);

    return (
        <div className={twMerge("flex-1 flex flex-col justify-center items-center", className)}>
            <SignedOut>
                <div className="flex-1 flex flex-col justify-center items-center">
                    <SignInButton>
                        <Button variant="solid" size="md" className="self-center" onClick={() => {}}>
                            Sign in
                        </Button>
                    </SignInButton>
                </div>
            </SignedOut>

            <SignedIn>
                <div className="flex-1 flex flex-col justify-center items-stretch gap-4 self-center">
                    <H2 className="self-center text-center">Your games</H2>
                    {yourGamesError && (
                        <ErrorMessage
                            className="flex-1 flex flex-col justify-center items-center"
                            heading="⚠ Error loading your games"
                            body={yourGamesError.message}
                        ></ErrorMessage>
                    )}
                    {!yourGamesError && !yourGames && (
                        <div className="flex-1 flex flex-col justify-center items-center">
                            <PendingTimer />
                        </div>
                    )}
                    {yourGames && (
                        <div className="self-center flex flex-row flex-wrap gap-4">
                            {yourGames.length === 0 && (
                                <div className="text-center text-sm">
                                    Create a new game or join an existing game to see it here.
                                </div>
                            )}
                            {yourGames.length > 0 && (
                                <div className="flex flex-row justify-center gap-4 flex-wrap">
                                    {yourGames.map((game) => (
                                        <GameItem key={game.id} {...game} className="max-w-[400px]" />
                                    ))}
                                </div>
                            )}
                            {/* <DataPreview data={yourGames} /> */}
                        </div>
                    )}
                </div>
            </SignedIn>
        </div>
    );
}
