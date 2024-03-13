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
import { characters, clocks, defaultClockProps, items } from "../../data/encounters/LP-common-en";
import { outcomeMap } from "../../data/outcomeDeck";
import { effectMap } from "../../data/effects-deck-en";

export default function InfoRoute() {
    return (
        <>
            <Navigation />
            <div className="mt-4 print:m-0 w-full text-kac-iron p-2 md:px-10 bg-white">
                <div className="flex flex-col gap-4 lg:flex-row items-start">
                    <div className="flex flex-col gap-4 flex-1 max-w-xl">
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
                                    <ActorCard {...characters.security_robots} />,
                                    <ActorCard {...characters.endless_swarm_of_spore_drones} />,
                                    <Clock {...defaultClockProps} {...clocks.suspicion_of_security_robots} />,
                                ]}
                            />
                            <div className="w-full flex flex-row items-center my-4 max-w-[700px] self-center">
                                <Deck
                                    className="w-[300px] h-[250px]"
                                    items={[
                                        <OutcomeCardBackFace className="drop-shadow-md" />,
                                        <OutcomeCardBackFace className="drop-shadow-md" />,
                                        <OutcomeCardBackFace className="drop-shadow-md" />,
                                        <OutcomeCardBackFace className="drop-shadow-md" />,
                                        <OutcomeCardBackFace className="drop-shadow-md" />,
                                        <OutcomeCardBackFace className="drop-shadow-md" />,
                                        <OutcomeCardBackFace className="drop-shadow-md" />,
                                    ]}
                                />
                                <Hand
                                    className="flex-1 max-w-[400px] h-[300px] z-10"
                                    items={[
                                        <OutcomeCard key="0" {...outcomeMap.success} />,
                                        <OutcomeCard key="1" {...outcomeMap.fumble} />,
                                        <OutcomeCard key="2" {...outcomeMap.special} />,
                                    ]}
                                />
                            </div>
                            <Spread
                                className="w-full max-w-[1000px] h-[250px]"
                                items={[
                                    <EffectCard key="wound" {...effectMap.wound} />,
                                    <EffectCard key="complication" {...effectMap.complication} />,
                                    <AssetCard key="rapid_regen" {...items.rapid_regen} />,
                                    <AssetCard key="rage" {...items.rage} />,
                                    <AssetCard key="medi_gel" {...items.medi_gel} />,
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
