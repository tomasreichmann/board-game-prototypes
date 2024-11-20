import { useUser } from "@clerk/clerk-react";
import ClerkUser from "../../../../services/Clerk/ClerkUser";
import Text, { H1, H4 } from "../content/Text";
import Button from "../controls/Button";
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
import { ActionTypeEnum } from "./types";
import useGame from "./useGame";
import DataToggle from "../../../../components/DataToggle";
import { OutcomeCardFlippable } from "../gameComponents/OutcomeCard";
import outcomes from "../../data/outcomeDeck";
import { outcomeCardSize } from "./createInitialBoard";
import ToggleCheckbox from "../controls/ToggleCheckbox";
import ContentItem from "./ContentItem";

export default function PlayOnlineGame() {
    const { user } = useUser();
    const { gameId } = useParams();
    const [isEditingMap, setIsEditingMap] = useState({} as { [key: string]: boolean | undefined });

    const { game, error, clearError, dispatch } = useGame(gameId);

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

    if (error) {
        return (
            <ErrorMessage
                className="flex-1 flex flex-col justify-center items-center"
                heading={<>⚠ Error loading an game with ID "{gameId}"</>}
                body={error.message}
            >
                <SignedOutWarning text="⚠ Some games might be unavailable until you sign in." />
                <DataToggle data={error} buttonContent="Show error details" initialCollapsed />
                {error.cause === "ignorable" && (
                    <Button onClick={clearError} color="danger">
                        Ignore
                    </Button>
                )}
                {error?.code === "not-found" && <CreateOrJoinGame className="flex-grow-0 mt-8" />}
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

    const Test = () => {
        const [isFlipped, setIsFlipped] = useState(false);
        return (
            <div className="w-full [perspective:500px]">
                <ToggleCheckbox checked={isFlipped} onChange={(e) => setIsFlipped(e.target.checked)} />
                <OutcomeCardFlippable {...outcomes[1]} style={outcomeCardSize} isFaceDown={isFlipped} />
                <OutcomeCardFlippable {...outcomes[5]} style={outcomeCardSize} isFaceDown={!isFlipped} />
            </div>
        );
    };

    const hasWriteAccess = checkWriteAccess(game?.meta);
    const canClaim = user?.id && !game?.meta?.author;
    const gameName = game?.name || `Game #${gameId}`;
    const isUserPlayer = game?.playerIds?.some((uid) => uid === user?.id);
    const isUserStoryteller = game?.storytellerIds?.some((uid) => uid === user?.id);
    const hasJoined = isUserStoryteller || isUserPlayer;

    return (
        <div className="flex-1 flex flex-col print:m-0 w-full text-kac-iron px-2 py-5 md:px-10 bg-white *:[transform-style:preserve-3d] [perspective:500px]">
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
                                    onChange: (e) =>
                                        dispatch({
                                            type: ActionTypeEnum.UpdateGame,
                                            updater: (game) => ({ ...game, name: e.target.value }),
                                        }),
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
                                    confirmText="Completely reset the game, no backsies?"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        dispatch({ type: ActionTypeEnum.ResetGame });
                                    }}
                                >
                                    Reset Game
                                </ButtonWithConfirmation>
                            </div>
                        )}
                        {hasWriteAccess && (
                            <div className="flex flex-row gap-2">
                                <ButtonWithConfirmation
                                    color="danger"
                                    confirmText="Permanently end the game, no backsies?"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        dispatch({ type: ActionTypeEnum.RemoveGame }).then(() => {
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
                                        dispatch({ type: ActionTypeEnum.ClaimGame, user });
                                    }}
                                >
                                    Claim
                                </ButtonWithConfirmation>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-row flex-wrap gap-2 items-baseline content-center min-h-[40px]">
                        {<H4>Storytellers</H4>}
                        {game?.storytellers?.map((userItem) => {
                            const isCurrentUser = userItem.uid === user?.id;
                            return (
                                <MetaUser key={userItem.uid} {...userItem} className={isCurrentUser ? "font-bold" : ""}>
                                    {isCurrentUser && (
                                        <Button
                                            variant="text"
                                            onClick={() =>
                                                user && dispatch({ type: ActionTypeEnum.LeaveGameAsStoryteller, user })
                                            }
                                        >
                                            Resign
                                        </Button>
                                    )}
                                </MetaUser>
                            );
                        })}
                        {!game?.storytellers?.length && <Text className="text-kac-steel">No storyteller yet</Text>}
                        {!hasJoined && (
                            <Button
                                variant="text"
                                disabled={!user}
                                onClick={() => user && dispatch({ type: ActionTypeEnum.JoinGameAsStoryteller, user })}
                            >
                                Join as a storyteller
                            </Button>
                        )}

                        {<H4 className="ml-4">Players</H4>}
                        {game?.players?.map((userItem) => {
                            const isCurrentUser = userItem.uid === user?.id;
                            return (
                                <MetaUser key={userItem.uid} {...userItem} className={isCurrentUser ? "font-bold" : ""}>
                                    {isCurrentUser && (
                                        <Button
                                            variant="text"
                                            onClick={() => dispatch({ type: ActionTypeEnum.LeaveGameAsPlayer, user })}
                                        >
                                            Resign
                                        </Button>
                                    )}
                                </MetaUser>
                            );
                        })}
                        {!game?.players?.length && <Text className="text-kac-steel">No players yet</Text>}
                        {!hasJoined && (
                            <Button
                                variant="text"
                                disabled={!user}
                                onClick={() => user && dispatch({ type: ActionTypeEnum.JoinGameAsPlayer, user })}
                            >
                                Join as a player
                            </Button>
                        )}
                    </div>
                    <br />
                    TODO: Start game
                    <br />
                    TODO: display hand and deck content
                    <div className="flex flex-row flex-wrap">
                        {Object.values(game?.layout?.deckMap || {})
                            .flatMap((layout) => layout.content)
                            .map((content) => (
                                <ContentItem key={content.id} {...content} />
                            ))}
                    </div>
                    <br />
                    TODO: calculate positions of layouts for each player
                    <br />
                    TODO: render layouts
                    <Test />
                    <br />
                    CONTENT
                    <Button
                        size="xl"
                        className="self-center"
                        color="success"
                        onClick={() => dispatch({ type: ActionTypeEnum.StartGame })}
                    >
                        START GAME
                    </Button>
                    <DataToggle
                        className="max-h-[400px]"
                        data={{ game, hasWriteAccess, canClaim, gameName, isUserPlayer, isUserStoryteller }}
                    />
                </div>
            </div>
        </div>
    );
}
