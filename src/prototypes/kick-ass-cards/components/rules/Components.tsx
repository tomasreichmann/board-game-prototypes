import { Body, H1, H2, H3 } from "./Text";
import { OutcomeCardBackFace } from "../gameComponents/OutcomeCard";
import outcomes, { outcomeMap } from "../../data/outcomeDeck";
import Scaled from "@/components/Scaled/Scaled";
import StuntCard, { StuntCardBackFace } from "../gameComponents/StuntCard";
import stunts from "../../data/stunts-en-deck";
import { EffectCardBackFace } from "../gameComponents/EffectCard";
import { effectMap } from "../../data/effects-deck-en";
import { CounterCardBackFace } from "../gameComponents/CounterCard";
import { countersMap } from "../../data/counters-deck";
import Icon from "../Icon";

export default function Components() {
    console.log(outcomes);
    const playerCount = 4;
    const stuntList = Object.values(stunts).filter(
        (stunt) =>
            stunt.count > 0 && ["Universal", "Spy", "Ranger", "Brawler", "Scholar", "Mystic"].includes(stunt.deck)
    );
    const effectList = Object.values(effectMap)
        .filter((effect) => effect.count > 0)
        .map((effect) => ({ ...effect, count: effect.count * playerCount }));
    const effectCount = effectList.reduce((acc, effect) => acc + effect.count, 0);
    const counterCount = Object.values(countersMap).filter((item) => item.count > 0).length;
    return (
        <>
            <H1>Components</H1>
            <div className="flex flex-row gap-2 mt-2">
                <Scaled scale={0.25}>
                    <OutcomeCardBackFace size="54x86" />
                </Scaled>
                <Body className="flex-1">
                    <strong>{playerCount}×&nbsp;Outcome Card Decks:</strong>
                    <br />
                    {Object.values(outcomeMap).map(({ title, count }, index, items) => (
                        <>
                            {count}×&nbsp;{title}
                            {index < items.length - 1 ? ", " : ""}
                        </>
                    ))}
                </Body>
            </div>
            <div className="flex flex-row gap-2 mt-2">
                <Scaled scale={0.25}>
                    <EffectCardBackFace size="54x86" />
                </Scaled>
                <Body className="flex-1">
                    <strong>{effectCount}×&nbsp;Effect Cards:</strong>
                    <br />
                    {effectList.map(({ title, count }, index, items) => (
                        <>
                            {count}×&nbsp;{title}
                            {index < items.length - 1 ? ", " : ""}
                        </>
                    ))}
                </Body>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-row gap-2 mt-2">
                    <Scaled scale={0.25}>
                        <StuntCardBackFace size="54x86" />
                    </Scaled>
                    <Body className="flex-1">
                        <strong>{stuntList.length}×&nbsp;Stunt Cards</strong>
                    </Body>
                </div>
                <div className="flex flex-row gap-2 mt-2">
                    <Scaled scale={0.25}>
                        <CounterCardBackFace size="54x86" />
                    </Scaled>
                    <Body className="flex-1">
                        <strong>{counterCount}×&nbsp;Counter Cards</strong>
                    </Body>
                </div>
            </div>
            <Body mt Component="div">
                <div className="h-full flex flex-row flex-wrap justify-center content-center items-center">
                    <strong>Dice:</strong>&ensp; 2×
                    <Icon icon="d4" className={"w-8 h-8 mr-2"} />
                    2×
                    <Icon icon="d6" className={"w-8 h-8 mr-2"} />
                    2×
                    <Icon icon="d10" className={"w-8 h-8"} />
                </div>
            </Body>
            <Body mt Component="div">
                <strong>{playerCount}×&nbsp;Player helper cards</strong>
            </Body>
            <H2 mt>Card Overview</H2>
            <div className="flex flex-row gap-2 mt-2">
                <Scaled scale={0.9}>
                    <StuntCard
                        {...stuntList.find((stunt) => stunt.deck === "Spy")!}
                        size="54x86"
                        className="shadow-md print:rounded rounded overflow-hidden"
                    />
                </Scaled>
                <div className="relative">
                    <H3 Component="div" className="relative absolute left-2 top-0 whitespace-nowrap">
                        <div className="absolute -top-1 -left-7 rotate-[-20deg] text-gray-500 text-2xl">←</div>
                        Type Icon
                    </H3>
                    <H3 Component="div" className="relative absolute -left-1 top-9 whitespace-nowrap">
                        <div className="absolute -top-4 -left-7 rotate-[20deg] text-gray-500 text-2xl">←</div>
                        Deck
                    </H3>
                    <H3 Component="div" className="relative absolute left-0 top-40 whitespace-nowrap">
                        <div className="absolute -top-2 -left-7 text-gray-500 text-2xl">←</div>
                        Title
                    </H3>
                    <H3 Component="div" className="relative absolute left-0 top-48 whitespace-nowrap">
                        <div className="absolute -top-2 -left-7 text-gray-500 text-2xl">←</div>
                        Prerequisite
                    </H3>
                    <H3 Component="div" className="relative absolute left-0 top-60 whitespace-nowrap">
                        <div className="absolute -top-2 -left-7 text-gray-500 text-2xl">←</div>
                        Effect
                    </H3>
                </div>
            </div>
        </>
    );
}
