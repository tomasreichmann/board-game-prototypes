import { useUser } from "@clerk/clerk-react";
import ClerkUser from "../../../../services/Clerk/ClerkUser";
import Text, { H1, H4 } from "../content/Text";
import Button from "../controls/Button";
import { useGame } from "./firestorePlayOnlineController";
import { checkWriteAccess } from "../../services/firestoreController";
import { useParams } from "react-router-dom";
import ErrorMessage from "../adventures/ErrorMessage";
import SignedOutWarning from "../adventures/SignedOutWarning";
import PendingTimer from "../../../../components/PendingTimer";
import ButtonWithConfirmation from "../controls/ButtonWithConfirmation";
import copyToClipboard from "../../../../utils/copyToClipboard";
import DataPreview from "../../../../components/DataPreview";
import { playOnlinePath } from "../routes/routes";
import CreateOrJoinGame from "./CreateOrJoinGame";
import InputToggle from "../controls/InputToggle";
import { useState } from "react";
import MetaUser from "../adventures/MetaUser";

export default function PlayOnlineGame() {
    const { user } = useUser();
    const { gameId } = useParams();
    const [isEditingMap, setIsEditingMap] = useState({} as { [key: string]: boolean | undefined });

    const {
        game,
        gameError,
        updateGame,
        removeGame,
        claimGame,
        joinGameAsPlayer,
        leaveGameAsPlayer,
        joinGameAsStoryteller,
        leaveGameAsStoryteller,
    } = useGame(gameId);

    if (!gameId) {
        return (
            <ErrorMessage
                className="flex-1 flex flex-col justify-center items-center"
                heading="⚠ Invalid Game Id"
                body={`"${gameId}"`}
            >
                <CreateOrJoinGame className="flex-grow-0 mt-8" />
            </ErrorMessage>
        );
    }

    if (gameError) {
        return (
            <ErrorMessage
                className="flex-1 flex flex-col justify-center items-center"
                heading={<>⚠ Error loading an game with ID "{gameId}"</>}
                body={gameError.message}
            >
                <SignedOutWarning text="⚠ Some games might be unavailable until you sign in." />
                <CreateOrJoinGame className="flex-grow-0 mt-8" />
            </ErrorMessage>
        );
    }

    if (!game) {
        return (
            <div className="flex-1 flex flex-col justify-center items-center">
                <PendingTimer />
            </div>
        );
    }

    const hasWriteAccess = checkWriteAccess(game?.meta);
    const canClaim = user?.id && !game?.meta?.author;
    const gameName = game?.name || `Game #${gameId}`;
    const isUserPlayer = game?.playerIds?.some((uid) => uid === user?.id);
    const isUserStoryteller = game?.storytellerIds?.some((uid) => uid === user?.id);

    return (
        <div className="flex-1 flex flex-col print:m-0 w-full text-kac-iron px-2 py-5 md:px-10 bg-white">
            <div className="flex flex-row gap-4 items-center mb-4">
                <div className="flex flex-row flex-wrap gap-2 items-baseline text-kac-steel-dark">
                    <Button href={playOnlinePath} variant="text" color="secondary">
                        Play Online
                    </Button>
                    <span>/</span>
                    <Text className="text-kac-iron">{gameName}</Text>
                </div>
                <div className="flex-1" />
                <ClerkUser />
            </div>
            <SignedOutWarning text="⚠ Some features might be hidden until you sign in." />
            <div className="flex-1 flex flex-col-reverse md:flex-row items-stretch gap-4">
                <div className="flex-1 flex flex-col pb-8">
                    <div className="flex flex-row gap-4">
                        <H1 className="flex-1">
                            <InputToggle
                                isEditing={(hasWriteAccess && isEditingMap["name"]) || false}
                                onIsEditingChange={(isEditing) => setIsEditingMap({ ...isEditingMap, name: isEditing })}
                                inputProps={{
                                    value: gameName,
                                    type: "text",
                                    onChange: (e) => updateGame({ name: e.target.value }),
                                }}
                                toggleCheckboxProps={{
                                    labelFalse: "",
                                    labelTrue: "🖉",
                                }}
                            >
                                {gameName}
                            </InputToggle>
                        </H1>
                        <Button
                            onClick={(e: any) =>
                                copyToClipboard(gameId).then(() => {
                                    const cls = "after:hidden";
                                    e.target.classList.remove(cls);
                                    setTimeout(() => {
                                        e?.target?.classList.add(cls);
                                    }, 3000);
                                })
                            }
                            color="secondary"
                            className="after:hidden after:content-['_✅']"
                        >
                            Copy Game Code
                        </Button>
                        {hasWriteAccess && (
                            <div className="flex flex-row gap-2">
                                <ButtonWithConfirmation
                                    color="danger"
                                    confirmText="Permanently end the game, no backsies?"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        removeGame().then(() => {
                                            window.location.href = playOnlinePath;
                                        });
                                    }}
                                >
                                    End Game
                                </ButtonWithConfirmation>
                            </div>
                        )}
                        {canClaim && (
                            <div className="flex flex-row gap-2">
                                <ButtonWithConfirmation
                                    color="danger"
                                    size="sm"
                                    onClick={() => {
                                        claimGame(user);
                                    }}
                                >
                                    Claim
                                </ButtonWithConfirmation>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-row flex-wrap gap-2">
                        {<H4>Storytellers</H4>}
                        {game?.storytellers?.map((user) => (
                            <MetaUser {...user} />
                        ))}
                        {!isUserStoryteller && (
                            <Button variant="text" disabled={!user} onClick={() => user && joinGameAsStoryteller(user)}>
                                Join as a storyteller
                            </Button>
                        )}
                    </div>
                    <div className="flex flex-row flex-wrap gap-2">
                        {<H4>Players</H4>}
                        {game?.players?.map((user) => (
                            <MetaUser {...user} />
                        ))}
                    </div>
                    <br />
                    TODO: Sign up as a player
                    <br />
                    TODO: Sign out as a player
                    <br />
                    TODO: Sign up as a storyteller
                    <br />
                    TODO: Sign out as a storyteller
                    <br />
                    CONTENT
                    <DataPreview data={game} />
                </div>
            </div>
        </div>
    );
}
