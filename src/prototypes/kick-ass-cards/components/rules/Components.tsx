import React from "react";
import Text, { Body, H1, H2, Title } from "./Text";
import Page from "./Page";
import Spread from "../layout/Spread";
import Hand from "../layout/Hand";
import OutcomeCard from "../gameComponents/OutcomeCard";
import outcomes, { outcomeMap } from "../../data/outcomeDeck";
import Scaled from "@/components/Scaled/Scaled";

export default function Components() {
    return (
        <>
            <H1>Components</H1>
            <Body mt>
                Welcome to Mighty Decks, a fast-paced tabletop roleplaying system where drama unfolds one card at a
                time. Whether you're engaging in thrilling combat, navigating tense social standoffs, or solving
                mysteries under pressure, Mighty Decks turns every challenge into a dramatic moment — without the need
                for dice, complex stats, or math-heavy mechanics.
            </Body>
            <Body mt>
                Mighty Decks is designed for <strong>1–4 players and a Storyteller</strong>. Together, you’ll create
                gripping scenes, make bold choices, and face consequences shaped by clever card play, not chance. The
                game emphasizes storytelling, roleplay, and creative problem-solving, making it perfect for both new
                players and seasoned RPG groups.
            </Body>
            <Body mt className="bg-kac-iron/10 p-2 rounded-md flex flex-col items-center justify-center text-center aspect-[5/2]">
                📷 Suggested Image: A small group of friends laughing around a table with cards in hand, dice off to the
                side unused. A few thematic cards like “Success,” “Fumble,” and “Distress” are visible.
            </Body>
            <H2 mt>What Makes Mighty Decks Unique?</H2>
            <Body mt>
                <strong>One Card System</strong> – Everything is represented by cards, no pencil needed. This makes the
                game more balanced and gives players more control over when to succeed and when it's fun to fail.
            </Body>
            <Body mt>
                <strong>Setting-Neutral</strong> – The game supports fantasy, sci-fi, historical, or completely
                improvised settings.
            </Body>
            <Body mt>
                <strong>Narrative-First</strong> – The system supports action, social play, stealth, crafting, survival,
                moral conflict, and more — all through collaborative storytelling.
            </Body>
            <Body mt>
                <strong>Minimal Prep, Maximum Action</strong> – With just one deck per player and a handful of reference
                cards for conditions and counters, you can get a session running in minutes.
            </Body>
  {/*           <Scaled scale={0.5}>
                <Hand
                    offsetXmodifier={1.5}
                    className="h-[95mm] w-[180mm]"
                    items={[
                        <OutcomeCard key="" {...outcomeMap.success} />,
                        <OutcomeCard key="" {...outcomeMap.partial} />,
                        <OutcomeCard key="" {...outcomeMap.fumble} />,
                        <OutcomeCard key="" {...outcomeMap.special} />,
                        <OutcomeCard key="" {...outcomeMap.chaos} />,
                    ]}
                />
            </Scaled> */}
            <H2 mt>What Do You Need to Play?</H2>
            <Body mt><strong>A Storyteller</strong> – your game’s narrator, world builder, and guide.</Body>
            <Body mt><strong>1–4 Players</strong> – each with a character idea (e.g.&nbsp;A space vampire monster-hunter) and their own Outcome deck. A table, a few counters (dice
            or tokens), and a vivid imagination. All included in the box!</Body>
            <Body mt><strong>Adventure</strong> – A ready-made adventure (a couple included in the box), or just a basic premise for a fun adventure (e.g.&nbsp;High school drama with superhero teenagers).</Body>
        </>
    );
}
