import React from "react";
import Playtesters from "../Playtesters";
import Credits from "../Credits";
import Hand from "../layout/Hand";
import AssetCard from "../gameComponents/AssetCard";
import Spread from "../layout/Spread";
import EffectCard from "../gameComponents/EffectCard";
import OutcomeCard from "../gameComponents/OutcomeCard";
import ActorCard from "../gameComponents/ActorCard";
import Clock from "../Clock";
import MdxArticle from "../layout/MdxArticle";
import homeInfoMdx from "../../articles/homeInfo.mdx";
import { Navigation } from "../Navigation";
import Deck from "../layout/Deck";

export default function InfoRoute() {
    return (
        <>
            <Navigation />
            <div className="mt-4 print:m-0 w-full text-kac-iron p-4 bg-white container">
                <MdxArticle mdx={homeInfoMdx} className="mt-4" />
                <div className="mb-10 preserve3d" style={{ perspective: 500 }}>
                    <div
                        className="flex flex-col -gap-10 items-center "
                        style={{ transform: "rotate3d(1, 0, 0, 5deg)", transformOrigin: "50% 100%" }}
                    >
                        <Deck
                            className="w-full max-w-[600px] h-[350px]"
                            items={[
                                <ActorCard
                                    name="robo-bezpečáci"
                                    size="US game"
                                    className="not-prose drop-shadow-md print:drop-shadow-none print:filter-none"
                                    imageUri="/LP/ScrattCZ_two_sci-fi_crowds_of_angry_humanoids_shouting_at_each__70560736-bf42-4734-a7e3-f55f7450352b.png"
                                    imagePosition="center 30%"
                                    toughness={6}
                                    threat="Skenování - efektivita +1&nbsp;v zóně. Dezintegrátor 2x&nbsp;Zranění."
                                    reward="1x&nbsp;Desintegrátor, 1x&nbsp;Přetaktovací baterie"
                                    notes="-1 Efekt proti střelbě a konvenčním zbraním na blízko"
                                />,
                                <ActorCard
                                    size="US game"
                                    imageUri="/LP/ScrattCZ_croud_of_sci-fi_floral_zombies_invading_a_futuristic_c_ec55d41e-04de-4a50-b3a5-7691310dda21.png"
                                    imagePosition="center top"
                                    className="not-prose drop-shadow-md print:drop-shadow-none print:filter-none"
                                    name="Nekončící dav spórových dronů"
                                    threat="Sápavý výpad: 1x Zranění"
                                    notes="Infekce: při Selhání obrany -> Spórová nákaza"
                                />,
                                <Clock
                                    className="not-prose drop-shadow-md print:drop-shadow-none"
                                    size="US game"
                                    title="Podezření robo-bezpečáků"
                                    current={0}
                                    total={4}
                                    threat="Palba"
                                    reward="Průchod k airlocku"
                                />,
                            ]}
                        />
                        <Spread
                            className="w-full max-w-[600px] h-[350px]"
                            items={[
                                <ActorCard
                                    name="robo-bezpečáci"
                                    size="US game"
                                    className="not-prose  "
                                    imageUri="/LP/ScrattCZ_two_sci-fi_crowds_of_angry_humanoids_shouting_at_each__70560736-bf42-4734-a7e3-f55f7450352b.png"
                                    imagePosition="center 30%"
                                    toughness={6}
                                    threat="Skenování - efektivita +1&nbsp;v zóně. Dezintegrátor 2x&nbsp;Zranění."
                                    reward="1x&nbsp;Desintegrátor, 1x&nbsp;Přetaktovací baterie"
                                    notes="-1 Efekt proti střelbě a konvenčním zbraním na blízko"
                                />,
                                <ActorCard
                                    size="US game"
                                    imageUri="/LP/ScrattCZ_croud_of_sci-fi_floral_zombies_invading_a_futuristic_c_ec55d41e-04de-4a50-b3a5-7691310dda21.png"
                                    imagePosition="center top"
                                    className="not-prose drop-shadow-md print:drop-shadow-none print:filter-none"
                                    name="Nekončící dav spórových dronů"
                                    threat="Sápavý výpad: 1x Zranění"
                                    notes="Infekce: při Selhání obrany -> Spórová nákaza"
                                />,
                                <Clock
                                    className="not-prose drop-shadow-md print:drop-shadow-none"
                                    size="US game"
                                    title="Podezření robo-bezpečáků"
                                    current={0}
                                    total={4}
                                    threat="Palba"
                                    reward="Průchod k airlocku"
                                />,
                            ]}
                        />
                        <Hand
                            className="w-full max-w-[400px] h-[300px] z-10"
                            items={[
                                <OutcomeCard
                                    key="0"
                                    slug="success"
                                    title="Úspěch"
                                    icon="bullseye"
                                    description="Uspěl jsi (+2&ensp;Efekt)."
                                />,
                                <OutcomeCard
                                    key="1"
                                    slug="partial"
                                    title="Částečný úspěch"
                                    icon="dodge"
                                    description="Částečně jsi uspěl (+1 Efekt nebo Úspěch + Komplikace)."
                                />,
                                <OutcomeCard
                                    key="2"
                                    slug="fumble"
                                    title="Selhání"
                                    icon="knockout"
                                    description="Nepodařilo se ti to."
                                />,
                            ]}
                        />
                        <Spread
                            className="w-full max-w-[900px] h-[250px]"
                            items={[
                                <EffectCard
                                    key="wound"
                                    title="Zranění"
                                    icon="drop"
                                    effect="-1 Vědomí. Nepřátelé ho mohou využít pro +1 Efekt proti tobě. Vyleč se k odstranění."
                                />,
                                <EffectCard
                                    key="complication"
                                    title="Komplikace"
                                    icon="stickyBoot"
                                    effect="Komplikace ti ztěžuje život. Příští akce má -1 Efekt, poté odstraň."
                                />,
                                <AssetCard
                                    title="Rapid-regen"
                                    icon="/LP/icons/syringe-2.png"
                                    effect="Vyléčí instantně všechna organická zranění. Tkáň může zmutovat (+1&nbsp;zkáza)"
                                    key="0"
                                />,
                                <AssetCard
                                    title="Rage"
                                    icon="/LP/icons/syringe.png"
                                    effect="+1&nbsp;efekt na akce síly a útoku na blízko na 3&nbsp;kola"
                                    key="2"
                                />,
                                <AssetCard
                                    title="Medi-gel"
                                    icon="/LP/icons/injection.png"
                                    effect="-1&nbsp;organické Zranění"
                                    key="3"
                                />,
                            ]}
                        />
                    </div>
                </div>
                <Playtesters />
                <Credits />
            </div>
        </>
    );
}
