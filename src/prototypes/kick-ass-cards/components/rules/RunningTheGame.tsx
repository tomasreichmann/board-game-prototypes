import { Body, H1, H2 } from "./Text";

export default function RunningTheGame() {
    return (
        <>
            <H1>Running the Game</H1>
            + Interactive storytelling is at the heart of Mighty Decks. The Storyteller creates the world, while the players bring it to life through their characters and choices. Together, you’ll weave a tale of adventure, intrigue, and excitement.
            
            <Body mt>
                In Mighty Decks, the Storyteller doesn’t just control the world — they bring it to life. As the guide and narrator, you create a shared story where the players shape what happens through their choices, their actions… and their cards.
            </Body>
            <Body mt>
                Mighty Decks is designed for <strong>1–4 players and a Storyteller</strong>. Together, you’ll create
                gripping scenes, make bold choices, and face consequences shaped by clever card play, not chance. The
                game emphasizes storytelling, roleplay, and creative problem-solving, making it perfect for both new
                players and seasoned RPG groups.
            </Body>
            {/* TODO: Zespoda na krabici <H2 mt>What Makes Mighty Decks Unique?</H2>
            <Body mt>
                <strong>One Card System</strong> – Everything is represented by cards, no pencil needed. Using cards to decide success or failure makes the
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
                <strong>Minimal Prep, Maximum Action</strong> – With just one deck per player and a handful of effect
                and counter cards, you can get a session running in minutes.
            </Body> */}
            <H2 mt>What Do You Need to Play?</H2>
            <Body mt><strong>A Storyteller</strong> – your game’s narrator, world builder, and guide.</Body>
            <Body mt><strong>1–4 Players</strong> – each with a character idea (e.g.&nbsp;A space vampire monster-hunter) and their own Outcome deck. A table, a few counters (dice
            or tokens), and a vivid imagination. All included in the box!</Body>
            <Body mt><strong>Adventure</strong> – A ready-made adventure (a couple included in the box), or just a basic premise for a fun adventure (e.g.&nbsp;High school drama with superhero teenagers).</Body>
        </>
    );
}
