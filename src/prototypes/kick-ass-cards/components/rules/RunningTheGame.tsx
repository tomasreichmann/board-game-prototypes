import Scaled from "@/components/Scaled/Scaled";
import { effectMap } from "../../data/effects-deck-en";
import { outcomeMap } from "../../data/outcomeDeck";
import EffectCard from "../gameComponents/EffectCard";
import OutcomeCard from "../gameComponents/OutcomeCard";
import Hand from "../layout/Hand";
import { Body, H1, H2, H3, Quote } from "./Text";
import { RulesTwoPageLayout } from "./RulesPrintPage";
import { stuntMap } from "../../data/stunts-en-deck";
import CounterCard from "../gameComponents/CounterCard";
import { countersMap } from "../../data/counters-deck";
import Setup from "./Setup";

export default function RunningTheGame() {
    const cardClassName = "shadow-lg print:rounded-lg rounded-lg overflow-hidden";
    return (
        <RulesTwoPageLayout
            startingPageNumber={3}
            pages={[
                <Setup />,
                <>
                    <H1>Running the Game</H1>
                    <Body>
                        Mighty Decks is a system for interactive storytelling. The Storyteller tells the story and
                        describes the world in which it takes place, while the players bring it to life through their
                        choices and role-playing.
                    </Body>

                    <H2 mt>Starting a New Adventure</H2>
                    <Body mt>
                        Players, at the beginning of the adventure,{" "}
                        <strong>shuffle your Outcome Deck and draw 3 cards</strong> in you hand.
                    </Body>
                    <Body mt>
                        If you draw 3 Fumble cards, shuffle all the Outcome cards again and draw a new hand of 3 cards.
                    </Body>

                    <Body mt>
                        Storyteller, read the <strong>Storyteller Summary</strong> for your Adventure. The summary
                        explains what is the plot of the Adventure, what characters there are and their motivation. This
                        includes spoilers, so do not read this to the players.
                    </Body>

                    <H2 mt>Introducing a New Scene</H2>
                    <Body>
                        An adventure consists of several Scenes. A Scene is a basic building block of an Adventure.
                        Scenes keep the game focused, dramatic and centered on what matters most - the story of the
                        characters and choices they make.
                    </Body>
                    <Body mt>There are many types of scenes:</Body>
                    <Body>
                        Scenes with high tension like combat, stealth, social interaction, difficult moral choices.
                    </Body>
                    <Body>Lower tension Scenes like exploration, travel, investigation, transition, down-time.</Body>

                    <Body mt>
                        Storyteller, <strong>introduce the scene with a vivid description</strong> of the environment,
                        how players got there and why, who else is present. Mention important details the characters can
                        see, hear, smell and feel.
                        <br />
                        Lastly, <strong>prompt players to action</strong> with an open-ended question: e.g. "How do you
                        want to get through?", "Where will you start looking for the clues?", "Who do you want to talk
                        to first?"{" "}
                    </Body>
                    <Body mt>Players can now react, ask questions and describe what their characters want to do.</Body>
                </>,
                <>
                    <H2>Roleplaying</H2>
                    <Body>
                        Each player plays a role of a character in the story. Like a brave knight, cautious thief or
                        fearless superhero.
                    </Body>
                    {/* <Body mt>They can pick some character traits and flaws. </Body> */}
                    <Body mt>
                        When the Storyteller asks what their character does, they describe what they are doing, or even
                        act it out and speak from the first person perspective. This is not required, but may greatly
                        enhance their immersion and experience.
                    </Body>

                    <H2 mt>Playing Outcome Cards</H2>
                    <Body>
                        If a player wants to do something risky, uncertain or dramatically important, the Storyteller
                        asks the player to play an Outcome card from their hand. Actions like attacking, defending,
                        convincing a stubborn NPC usually require playing an Outcome Card.
                    </Body>
                    <Body mt>
                        The player choses a card from their hand and plays it on the table. Depending on the card, the
                        Storyteller interprets the result.
                    </Body>
                    <Body mt>
                        Sometimes, more than one action may be required to finish a task. In that case, the Outcome
                        cards list how much progress toward a goal each card gives. This is called Effect.
                    </Body>

                    <Body mt>
                        <strong>Success</strong>: The action succeeded or +2 Effect toward a goal.
                    </Body>
                    <Body mt>
                        <strong>Partial-success</strong>: Only part of the action succeeded, it succeeded with
                        complication, or +1 Effect toward a goal.
                    </Body>
                    <Body mt>
                        <strong>Fumble</strong>: Action failed, or -1 Effect toward a goal. 3x Fumble causes Catastrophe
                        (see Catastrophe)
                    </Body>
                    <Body mt>
                        <strong>Chaos</strong>: Something completely different than the intended action happened. You
                        cannot use this for defense.
                    </Body>
                    <Body mt>
                        <strong>Special action</strong>: Action succeeded better than expected, or +3 Effect. You can
                        only use it on actions that are the area of expertise of your character, or loosely related to
                        one of your Stunts.
                    </Body>

                    <Body mt>
                        The Player then draws cards from their Outcome deck up to their hand limit (usually 3 cards
                        total).
                    </Body>
                    <Body mt>
                        If there are no more cards in player's Outcome deck, the player makes a new Outcome Deck by
                        shuffling their Outcome discard pile face down.
                    </Body>

                    <Hand
                        className="mt-4 h-32"
                        offsetXmodifier={0.5}
                        items={Object.values(outcomeMap).map((outcome) => (
                            <div
                                style={{
                                    width: 54 * 0.2 + "mm",
                                    height: 86 * 0.2 + "mm",
                                    transform: "scale(0.2)",
                                    transformOrigin: "left top",
                                }}
                                key={outcome.slug}
                            >
                                <OutcomeCard className={cardClassName} size="54x86" {...outcome} />
                            </div>
                        ))}
                    />
                    {/* <div className="mt-4 h-32 flex flex-row" >{Object.values(outcomeMap).map(outcome => <Scaled  scale={0.25} key={outcome.slug}><OutcomeCard {...outcome} /></Scaled>)} </div> */}
                </>,
                <>
                    <H3>Example playing an Outcome card</H3>
                    <Quote>
                        <strong>Player:</strong> I want to swing on a chandelier, do a back flip, and kick the zombie in
                        the face.
                    </Quote>
                    <Quote>
                        <strong>Storyteller:</strong> Play an Outcome card to see, how did it go.
                    </Quote>
                    <Quote>
                        <strong>Player:</strong> Plays a <strong>Partial Success</strong>.
                    </Quote>
                    <Quote>
                        <strong>Storyteller:</strong> You managed to swing on the chandelier, did a back flip and kicked
                        at the zombie, but you only hit it in the shoulder. You didn't kill it, but it stumbled and fell
                        to the ground.
                    </Quote>

                    <H3 mt>Catastrophe (Tragedy?)</H3>
                    <Body>
                        If a player draws an Outcome card and has in their hand <strong>3 or more Fumble cards</strong>{" "}
                        (or only Fumble cards in case they have less than 3 cards), the player immediately announces a
                        Catastrophe.
                        <br />
                        They discard their hand and draw a new hand.
                    </Body>
                    <Body mt>
                        The Storyteller then explains what terrible tragedy happened to the player's character. The
                        Catastrophe should not outright end their story but cause as much trouble as playing all the
                        Fumble cards at once. It provides drama and prevents players from playing only good Outcome
                        cards.
                    </Body>

                    <Body mt>
                        Do not let a player play an Outcome card when there is no risk or challenge involved. Especially
                        when they just want to get rid of a <strong>Fumble</strong> card.
                    </Body>
                </>,
                <>
                    <H2>Effect cards</H2>
                    <Body>
                        The Storyteller may decide to give the player one or more Effect cards as result of the player's
                        action and Outcome card played. They place the cards on the table in front of them. The Effect
                        cards help track different character statuses, injury, and penalties.
                    </Body>
                    <Body mt>There are several types of Effect cards:</Body>

                    <div className="flex flex-row gap-2 mt-4">
                        <div>
                            <H3>Injury</H3>
                            <Body>It represents a physical injury sustained by the character.</Body>
                            <Body mt>
                                A character has to spend an action treating their (or other character's wounds) to
                                discard as many Injury cards as the Effect of their Outcome Card played.
                            </Body>
                            <Body mt>
                                If a character has <strong>4 Injury cards, they receive the Dying Effect</strong> card
                                and they cannot get any more Injury cards this until the start of their next turn.
                            </Body>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Scaled key={effectMap.injury.slug} scale={0.5}>
                                <EffectCard {...effectMap.injury} className={cardClassName} size="54x86" />
                            </Scaled>
                        </div>
                    </div>

                    <div className="flex flex-row gap-2 mt-4">
                        <div>
                            <H3>Dying</H3>
                            <Body>A character that has the 4 Injury cards falls to the ground and is Dying.</Body>
                            <Body mt>
                                <strong>
                                    Until healed, they can only defend, address their wounds, crawl away from danger, or
                                    sacrifice themselves.
                                </strong>
                            </Body>
                            <Body mt>
                                The <strong>Sacrifice</strong> action allows a player character to{" "}
                                <strong>
                                    move and attack or interact as if playing the Special Action (+3 Effect), then
                                    immediately die
                                </strong>
                                . They get to describe how their character heroically sacrificed themselves. If the
                                player wants to continue playing, they have to create a new character, or if the
                                Storyteller allows it, take over a non-player character.
                            </Body>
                            <Body mt>
                                If a character that already <strong>has the Dying Effect for at least one round</strong>{" "}
                                should receive another Injury, the player{" "}
                                <strong>must play the Sacrifice action</strong>.
                            </Body>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Scaled key={effectMap.unconscious.slug} scale={0.5}>
                                <EffectCard
                                    {...effectMap.unconscious}
                                    className={cardClassName}
                                    size="54x86"
                                    title="Dying"
                                />
                            </Scaled>
                        </div>
                    </div>
                </>,
                <>
                    <div className="flex flex-row gap-2">
                        <div>
                            <H3>Distress</H3>
                            <Body>It represents character's psychological stress.</Body>
                            <Body mt>
                                A character has to spend an action relaxing themselves or another character to discard
                                as many Distress cards as the Effect of their Outcome Card played.
                            </Body>
                            <Body mt>
                                If a character has{" "}
                                <strong>3 or more Distress cards, they receive the Panicked Effect</strong> card until
                                they get rid of enough Distress cards to have less than 3.
                            </Body>
                            <Body mt>
                                If a character has{" "}
                                <strong>
                                    4 or more Distress cards, they receive the Hopeless Effect card until they get rid
                                    of enough Distress cards to have less than 4.
                                </strong>
                            </Body>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Scaled key={effectMap.distress.slug} scale={0.5}>
                                <EffectCard {...effectMap.distress} className={cardClassName} size="54x86" />
                            </Scaled>
                        </div>
                    </div>

                    <div className="flex flex-row gap-2 mt-4">
                        <div>
                            <H3>Panicked</H3>
                            <Body>A character that has 3 or more Distress cards is Panicked.</Body>
                            <Body mt>
                                When a character receives the Panicked card, they shuffle their hand into their Outcome
                                Deck.
                            </Body>
                            <Body mt>
                                A Panicked character can no longer play Outcome cards from the hand and has to play the
                                top card of the Outcome Deck instead. Invalid cards, like defending with a Chaos Outcome
                                card, are discarded, draw another card instead.
                            </Body>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Scaled key={effectMap.panicked.slug} scale={0.5}>
                                <EffectCard {...effectMap.panicked} className={cardClassName} size="54x86" />
                            </Scaled>
                        </div>
                    </div>

                    <div className="flex flex-row gap-2 mt-4">
                        <div>
                            <H3>Hopeless</H3>
                            <Body>
                                A character that has 4 or more Distress cards is Hopeless. They cannot get any more
                                Distress cards.
                            </Body>
                            <Body mt>
                                A Hopeless character can no longer act on their turn besides, they can only defend
                                themselves, run away or surrender.
                            </Body>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Scaled key={effectMap.hopeless.slug} scale={0.5}>
                                <EffectCard {...effectMap.hopeless} className={cardClassName} size="54x86" />
                            </Scaled>
                        </div>
                    </div>
                </>,
                <>
                    <div className="flex flex-row gap-2">
                        <div>
                            <H3>Boost</H3>
                            <Body>
                                A character may receive the Boost Effect card when they spend time preparing, when they
                                get into an advantageous position or when they are helped by another character.
                            </Body>
                            <Body mt>
                                The Boost card adds a one time +1 bonus to the next Outcome card's Effect except Fumble
                                and Chaos or an extra move action. Discard the Boost when applied.
                            </Body>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Scaled key={effectMap.boost.slug} scale={0.5}>
                                <EffectCard {...effectMap.boost} className={cardClassName} size="54x86" />
                            </Scaled>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 mt-4">
                        <div>
                            <H3>Complication</H3>
                            <Body>
                                A character may receive the Complication Effect card when they play a Partial Success,
                                as a result of inadequate defense, due to hazards or when in a disadvantageous position.
                            </Body>
                            <Body mt>
                                The Complication card adds a one time -1 penalty to the next Outcome card's Effect
                                except Chaos. Discard the Complication when applied. A character can spend an action
                                with at least a Partial Success Outcome card to get rid of it.
                            </Body>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Scaled key={effectMap.complication.slug} scale={0.5}>
                                <EffectCard {...effectMap.complication} className={cardClassName} size="54x86" />
                            </Scaled>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 mt-4">
                        <div>
                            <H3>Hindered</H3>
                            <Body>
                                A character may receive the Hindered Effect card when they are slowed by something. For
                                example when carrying something heavy or wading through mud.
                            </Body>
                            <Body mt>
                                The Hindered card limits the character to either move or take another action, not both
                                in one turn. The effect usually lasts until the original reason for receiving the card
                                is addressed.
                            </Body>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Scaled key={effectMap.hindered.slug} scale={0.5}>
                                <EffectCard {...effectMap.hindered} className={cardClassName} size="54x86" />
                            </Scaled>
                        </div>
                    </div>
                </>,
                <>
                    <div className="flex flex-row gap-2 mt-4">
                        <div>
                            <H3>Stuck</H3>
                            <Body>
                                A character may receive the Stuck Effect card when they are grappled, trapped or
                                otherwise cannot move.
                            </Body>
                            <Body mt>
                                The Stuck card forbids the character from moving. The effect usually lasts until the
                                original reason for receiving the card is addressed.
                            </Body>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Scaled key={effectMap.stuck.slug} scale={0.5}>
                                <EffectCard {...effectMap.stuck} className={cardClassName} size="54x86" />
                            </Scaled>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 mt-4">
                        <div>
                            <H3>Freezing</H3>
                            <Body>
                                A character may receive the Freezing Effect card when they are being threatened by cold.
                                Each character can have a maximum of 2 Freezing cards at a time.
                            </Body>
                            <Body mt>
                                If a character has 2 Freezing cards at the end of their round, they receive a Distress
                                card.
                            </Body>
                            <Body mt>
                                If a character would receive a Burning card when they have a Freezing card discard a
                                Freezing card instead.
                            </Body>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Scaled key={effectMap.freezing.slug} scale={0.5}>
                                <EffectCard {...effectMap.freezing} className={cardClassName} size="54x86" />
                            </Scaled>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 mt-4">
                        <div>
                            <H3>Burning</H3>
                            <Body>
                                A character may receive the Burning Effect card when they are being threatened by heat
                                or flame. Each character can have a maximum of 2 Burning cards at a time.
                            </Body>
                            <Body mt>
                                If a character has 2 Burning cards at the end of their round, they receive an Injury
                                card.
                            </Body>
                            <Body mt>
                                If a character would receive a Freezing card when they have a Burning card discard a
                                Burning card instead.
                            </Body>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Scaled key={effectMap.burning.slug} scale={0.5}>
                                <EffectCard {...effectMap.burning} className={cardClassName} size="54x86" />
                            </Scaled>
                        </div>
                    </div>
                </>,
                <>
                    <div className="flex flex-row gap-2">
                        <div>
                            <H2>Stunts</H2>
                            <Body>
                                Stunts are special abilities or actions that characters can perform to gain an advantage
                                or enhance their gameplay. Players can pick some (usually 2) at the beginning of a new
                                adventure or as a reward for finishing a scene.
                            </Body>
                            <Body mt>
                                At the beginning of a scene, the Storyteller may pick as many Stunt Cards as there are
                                players and place them on the table. During the scene, players may try to fulfill the
                                prerequisites on the cards to immediately receive them and gain their benefits.
                            </Body>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Scaled key={stuntMap.stalker.slug} scale={0.5}>
                                <EffectCard {...stuntMap.stalker} className={cardClassName} size="54x86" />
                            </Scaled>
                        </div>
                    </div>

                    <Body mt>
                        The effect of the stunt is more important than rules that they modify. The Storyteller may
                        interpret the effect of the Stunt card in a way that fits the story and the character's actions.
                    </Body>
                    <Body mt>Players can also use their stunts as a basis for the Special Action.</Body>

                    <div className="flex flex-row gap-2">
                        <div>
                            <H2 mt>Using Counters</H2>
                            <Body>
                                For complex scenes, the Storyteller may introduce a Counter. A counter represents
                                progress towards a goal, a countdown towards a threat, or tracks resources.
                            </Body>
                            <Body mt>
                                The Storyteller places a Counter card on the table and adds one or more dice on it. The
                                total of the face values shows the Counter's current value. The dice used may indicate
                                the maximum possible value of the Counter (e.g. D4: 1 to 4, 2x D6: 2 to 12).
                            </Body>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Scaled key={countersMap.danger.slug} scale={0.5}>
                                <CounterCard {...countersMap.danger} className={cardClassName} size="54x86" />
                            </Scaled>
                        </div>
                    </div>

                    <Body mt>
                        The Storyteller explains what player actions move the counter up or down, or when it ticks up or
                        down on its own (e.g. every turn, every round). They also give players some idea of what may
                        happen when it reaches its maximum or minimum.
                    </Body>
                </>,
                <>
                    <H2>Turn-based Play</H2>
                    <Body>
                        When the situation escalates and time is of the essence, the Storyteller may decide to switch to
                        turn-based play.
                    </Body>
                    <Body mt>
                        The Storyteller may place Actor cards representing other characters in the scene in front of the
                        players.
                    </Body>
                    <Body mt>
                        Each round, players take turns in clockwise order starting with the player on the left of the
                        Storyteller.
                    </Body>
                    <Body mt>
                        Every turn, a player can move and perform an action (in any order), like attacking, using an
                        item, casting a spell, etc.
                    </Body>
                    <Body mt>
                        If there are Actor cards in front of this player, they take their turn now (move and/or action).
                        The Storyteller decides what they do.
                    </Body>
                    <Body mt>
                        If the player is threatened, they can defend by playing an Outcome card from their hand to
                        reduce its negative effects.
                    </Body>
                    <Body mt>
                        When the situation is resolved or deescalates, the Storyteller can end the turn-based play.
                    </Body>
                    <Body mt className="bg-kac-iron/10 p-2 rounded-md flex flex-col items-center justify-center text-center aspect-[1/2]">
                        📷 Example of a game table with Counter, Actor and players and a sequence of play
                    </Body>
                </>,
                <>
                    <H2 mt>Tension</H2>
                    <Body>
                        Tension refers to the level of excitement, risk, and uncertainty present in a scene. It helps
                        create a dynamic flow between moments of calm and moments of intensity.
                    </Body>
                    <Body mt>
                        Low tension scenes are more relaxed and allow players to focus on roleplaying, character
                        development, and exploration. These scenes are great for winding down after high-stakes
                        encounters and allow for interaction without immediate danger.
                    </Body>
                    <Body mt>
                        High tension scenes, on the other hand, involve challenges, risks, and often require turn-based
                        play. These scenes may include combat, hazards, or other dramatic events that push players to
                        make strategic decisions and use their resources effectively.
                    </Body>
                    <Body mt>
                        Balancing tension is key to maintaining engagement and pacing in the game. Alternating between
                        high and low tension scenes creates a rhythm that keeps players invested and ensures the game
                        doesn't feel monotonous or overwhelming.
                    </Body>
                    <H3 mt>Tips</H3>
                    <Body>
                        Avoid having players play Outcome cards when there is no risk of failure or no meaningful
                        challenge.
                    </Body>
                    <Body mt>
                        If players take too long in a low tension scene, move the story forward by introducing new
                        threats or events.
                    </Body>
                </>,
                <>
                    <H2>Scene Resolution</H2>
                    <Body>
                        The Storyteller narrates the end of the scene, when the scene goal is resolved or the players
                        decide to leave. The adventure either continues with the next scene or concludes.
                    </Body>
                    <Body mt>The Storyteller may allow players to pick an additional Stunt as a reward.</Body>
                    <Body mt>
                        The players' Outcome decks, hands, and Effect cards (such as Injury or Distress) carry over to
                        the next scene.
                    </Body>

                    <H2 mt>Ending the Session</H2>
                    <Body>
                        It's best to end the session at the end of a scene, ending on a high note when the party
                        achieved something significant or on a cliffhanger.
                    </Body>

                    <H3 mt>Saving the Game</H3>
                    <Body>You can take a photo of the whole table and share it with the other players.</Body>

                    <H3 mt>Finishing an Adventure</H3>
                    <Body>
                        Celebrate and reflect on the outcome of the adventure. Players can describe how their characters
                        reacted to the events, what they did after and what they took away from the adventure.
                    </Body>
                    <Body mt>
                        Why not start a new adventure and continue playing with the same characters. Or rather try
                        something new?
                    </Body>
                </>,
                <>
                    <pre className="white-space-pre-wrap text-xs max-w-full">{`

TODO: FAQ
TODO: Storyteller guide
TODO: Writing your own adventure
         `}</pre>
                </>,
            ]}
        />
    );
}
