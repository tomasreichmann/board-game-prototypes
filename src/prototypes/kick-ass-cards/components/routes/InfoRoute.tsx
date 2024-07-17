import React from "react";
import Playtesters from "../Playtesters";
import Credits from "../Credits";
import Hand from "../layout/Hand";
import AssetCard from "../gameComponents/AssetCard";
import Spread from "../layout/Spread";
import EffectCard from "../gameComponents/EffectCard";
import OutcomeCard, { OutcomeCardBackFace } from "../gameComponents/OutcomeCard";
import ActorCard from "../gameComponents/ActorCard";
import Clock from "../Clock";
import MdxArticle from "../layout/MdxArticle";
import homeInfoMdx from "../../articles/homeInfo.mdx";
import { Navigation } from "../Navigation";
import Deck from "../layout/Deck";
import { actors, clocks, defaultClockProps } from "../../data/encounters/LP-common-en";
import { actors as tohActors } from "../../data/encounters/TOH-common-en";
import { outcomeMap } from "../../data/outcomeDeck";
import { effectMap } from "../../data/effects-deck-en";
import { cardSizes } from "../../../../components/print/paperSizes";
import CounterCard from "../gameComponents/CounterCard";
import { assetMap } from "../../data/assets-en-deck";

const largeCardSize = "54x86" as const;
const defaultCardSize = "Mini European" as const;
const defaultClassName =
    "rounded-lg overflow-hidden not-prose relative drop-shadow-md print:drop-shadow-none print:filter-none";
const defaultCardProps = {
    className: defaultClassName,
    size: defaultCardSize,
};
const defaultActorCardProps = {
    ...defaultCardProps,
    size: largeCardSize,
};

actors;

export default function InfoRoute() {
    return (
        <>
            <Navigation />
            <div className="flex-1 mt-4 print:m-0 w-full text-kac-iron p-2 md:px-10 bg-white">
                <div className="flex flex-col gap-4 lg:flex-row items-start">
                    <div className="flex flex-col gap-4 flex-1 max-w-xl pb-8">
                        <MdxArticle mdx={homeInfoMdx} className="mt-4" />
                        <Playtesters />
                        <Credits />
                    </div>
                    <div
                        className="mb-10 preserve3d flex-1 min-w[400px] self-stretch lg:self-start scale-75 my-[-25vw] mx-[-25vw] sm:scale-100 sm:m-0 "
                        style={{ perspective: 500 }}
                    >
                        <div
                            className="flex flex-col -gap-10 items-center "
                            style={{ transform: "rotate3d(1, 0, 0, 5deg)", transformOrigin: "50% 100%" }}
                        >
                            <Spread
                                className="w-full max-w-[700px] h-[350px]"
                                items={[
                                    <ActorCard {...tohActors.milaSzeptava} {...defaultActorCardProps} />,
                                    <ActorCard
                                        imageUri="/KAC/actors/medieval/bandit.png"
                                        name="bandit"
                                        threat="Attacks with a bow or dagger for 1 Effect"
                                        reward="Lockpick set"
                                        toughness={2}
                                        deck="medieval"
                                        {...defaultActorCardProps}
                                    />,
                                    <CounterCard
                                        icon="/KAC/counters/morale.png"
                                        title="Bandits Defeated"
                                        current={0}
                                        total={4}
                                        reward="Bandits run away"
                                        note="Ticks up by 1 when a bandit is defeated"
                                        {...defaultActorCardProps}
                                    />,
                                ]}
                            />
                            <div className="w-full flex flex-row items-center my-4 max-w-[700px] self-center">
                                <Deck
                                    style={{
                                        height: cardSizes[defaultCardSize].mm[1] + "mm",
                                        width: cardSizes[defaultCardSize].mm[0] + "mm",
                                    }}
                                    items={[
                                        <OutcomeCardBackFace {...defaultCardProps} />,
                                        <OutcomeCardBackFace {...defaultCardProps} />,
                                        <OutcomeCardBackFace {...defaultCardProps} />,
                                        <OutcomeCardBackFace {...defaultCardProps} />,
                                        <OutcomeCardBackFace {...defaultCardProps} />,
                                        <OutcomeCardBackFace {...defaultCardProps} />,
                                        <OutcomeCardBackFace {...defaultCardProps} />,
                                    ]}
                                />
                                <Hand
                                    className="flex-1 z-40"
                                    style={{
                                        height: cardSizes[defaultCardSize].mm[1] * 1.25 + "mm",
                                        width: cardSizes[defaultCardSize].mm[0] * 4 + "mm",
                                        marginTop: "5mm",
                                    }}
                                    items={[
                                        <OutcomeCard key="0" {...outcomeMap.success} {...defaultCardProps} />,
                                        <OutcomeCard key="1" {...outcomeMap.fumble} {...defaultCardProps} />,
                                        <OutcomeCard key="2" {...outcomeMap.special} {...defaultCardProps} />,
                                    ]}
                                />
                            </div>
                            <Spread
                                className="w-full max-w-[1000px] mb-[5mm]"
                                style={{
                                    height: cardSizes[defaultCardSize].mm[1] + "mm",
                                    width: cardSizes[defaultCardSize].mm[0] * 3 + "mm",
                                }}
                                items={[
                                    <EffectCard key="wound" {...effectMap.wound} {...defaultCardProps} />,
                                    <EffectCard key="distress" {...effectMap.distress} {...defaultCardProps} />,
                                    <EffectCard key="complication" {...effectMap.complication} {...defaultCardProps} />,
                                ]}
                            />
                            <Spread
                                className="w-full max-w-[1000px]"
                                style={{
                                    height: cardSizes[defaultCardSize].mm[1] + "mm",
                                    width: cardSizes[defaultCardSize].mm[0] * 3 + "mm",
                                }}
                                items={[
                                    <AssetCard {...assetMap.longsword} {...defaultCardProps} />,
                                    <AssetCard {...assetMap.gambeson} {...defaultCardProps} />,
                                    <AssetCard {...assetMap.grappling_hook} {...defaultCardProps} />,
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
