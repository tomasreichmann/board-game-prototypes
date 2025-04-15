import { Body, H1, H2, H3 } from "./Text";
import { outcomeMap } from "../../data/outcomeDeck";

export default function Setup() {
    const outcomeList = Object.values(outcomeMap);
    const outcomeCount = outcomeList.reduce((acc, outcome) => acc + outcome.count, 0);
    return (
        <>
            <H1>Game Setup</H1>
            <Body>Pick one person to be the Storyteller. They guide the players throughout the adventure.</Body>

            <H2 mt>Pick an Adventure to Play</H2>
            <Body>If this is your first time playing, we recommend you to pick one of the starting adventures from the box.</Body>
            <Body mt>If you want to run your own adventure, see <strong>Creating Your Own Adventure</strong> for tips. It is where this system shines.</Body>
            <Body mt>Read the introduction part of the adventure to give players some idea on what to expect.</Body>

            <H2 mt>Setup the cards</H2>
            <Body>Start by setting up each player's Outcome decks and preparing Effect cards for the Storyteller.</Body>
            <H3 mt>Prepare an Outcome deck for each player</H3>
            <Body>
                Shuffle a deck of {outcomeCount} Outcome cards: {outcomeList.map(({ title, count }, index, items) => (
                        <>
                            {count}×&nbsp;{title}
                            {index < items.length - 1 ? ", " : ""}
                        </>
                    ))}. Place it face down in front of each player. This is their Outcome deck.
            </Body>
            <H3 mt>Prepare starting Stunt cards</H3>
            <Body><strong>Stunts are traits that make your characters unique</strong>, they modify specific rules or actions for your character, influence your play-style or give your character an interesting flavor.</Body>
            <Body mt>Storyteller, prepare a deck of Stunt cards relevant to the adventure you are about to play.</Body>
            <Body mt>Players, each pick 2&nbsp;Stunt cards from the deck and place them face up in front of you.</Body>

            <H3 mt>Prepare your Effect cards</H3>
            <Body>Storyteller, place the box with Effect cards in front of you for easy access.</Body>
            
            <Body mt className="bg-kac-iron/10 p-2 rounded-md flex flex-col items-center justify-center text-center aspect-[5/2]">
                📷 Simple diagram showing a “starting table” with zones for Actors, Counters, Player cards.
            </Body>

            <Body mt>Now you are ready to start the game.</Body>
            <Body mt>See the <strong>Running a Game as a Storyteller</strong> and <strong>Player Tips</strong> respectively.</Body>
        </>
    );
}
