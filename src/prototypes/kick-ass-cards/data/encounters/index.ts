import groupByCampaign from "../../components/encounters/groupByCampaing";

export type EncounterDefinition = {
    path: string;
    slug: string;
    campaign?: string;
    title: string;
};

const KJB = "Království Jediné Bohyně";
const LP = "Ledová pomsta";
const LP_EN = "Cold Revenge";
const ISV = "In Sanguine Veritas";
const TOH = "Throne of Hawthorne";
const B139 = "B-day #139 LARP";
const TTT = "Trauma Team Troubles";
const ML = "Matečná žíla";
const PH = "Příběhy Husitů";
const OS = "One-shots";

const makeEncounterDefinition = (key: string, title: string, campaign: string, imageUri?: string) => ({
    [key]: {
        slug: key,
        path: key,
        campaign,
        title,
        imageUri,
    },
});

export const encountersMap: { [key: string]: EncounterDefinition } = {
    ...makeEncounterDefinition("index", "Featured Encounters", ""),
    ...makeEncounterDefinition("index-cs", "Vybraná Dobrodružství", ""),
    ...makeEncounterDefinition("KJB-act1-01-Intro", "Akt 1 - Úvod", KJB),

    ...makeEncounterDefinition("PZZ-akt1-Intro", "PZZ-akt1-Intro", "Pomsta ze záhrobí"),

    ...makeEncounterDefinition("LP-c0-a0-Info", "Info", LP),
    ...makeEncounterDefinition("LP-c1-a1-Navrat", "Návrat", LP),
    ...makeEncounterDefinition("LP-c1-a2-Oslava", "Oslava", LP),
    ...makeEncounterDefinition("LP-c1-a3-Partys-over", "Party-over", LP),
    ...makeEncounterDefinition("LP-c1-a4-Na-ulici", "Na ulici", LP),
    ...makeEncounterDefinition("LP-c1-a5-Odlet", "Odlet", LP),
    ...makeEncounterDefinition("LP-c2-a1-Vysadek", "Výsadek", LP),
    ...makeEncounterDefinition("LP-c2-a2-Sporova-lod", "Spórová loď", LP),

    ...makeEncounterDefinition("LP-en-c0-a0-Info", "Info", LP_EN),
    ...makeEncounterDefinition("LP-en-c1-a1-Return", "Return", LP_EN),
    ...makeEncounterDefinition("LP-en-c1-a2-Celebration", "Celebration", LP_EN),
    ...makeEncounterDefinition("LP-en-c1-a3-Partys-over", "Party's Over", LP_EN),
    ...makeEncounterDefinition("LP-en-c1-a4-On-the-street", "On The Street", LP_EN),
    ...makeEncounterDefinition("LP-en-c1-a5-Boarding", "Boarding", LP_EN),
    ...makeEncounterDefinition("LP-en-c2-a1-Departure", "Departure", LP_EN),
    ...makeEncounterDefinition("LP-en-c2-a2-Spore-ship", "Spore Ship", LP_EN),

    ...makeEncounterDefinition("ISV-c0-a0-Prequel-GM-Info", "Prequel - Informace pro vypravěče", ISV),
    ...makeEncounterDefinition("ISV-c0-a1-Prequel", "Prequel", ISV),
    ...makeEncounterDefinition("ISV-c1-a0-Info", "Info", ISV),

    ...makeEncounterDefinition("TOH-c0-a0-GM-Info", "GM Info", TOH),
    ...makeEncounterDefinition("TOH-c1-a1-Audience-with-the-king", "Audience with the king", TOH),
    ...makeEncounterDefinition("TOH-c1-a2-On-The-Road-to-Spice", "On the Road to Špice", TOH),

    ...makeEncounterDefinition("B139-info-cs", "Info", B139),
    ...makeEncounterDefinition("B139-rules-cs", "Pravidla", B139),

    ...makeEncounterDefinition("TTT-info", "Info", TTT),

    ...makeEncounterDefinition("ML-cs-c0-Info", "Info", ML),
    ...makeEncounterDefinition("ML-cs-c1-Slavnosti-stribra", "Slavnosti stříbra", ML),

    ...makeEncounterDefinition("PH-cs-stiny-klastera", "Stíny Kláštera", PH),
    ...makeEncounterDefinition("PH-en-penance-in-blood", "Penance in Blood", PH),
    ...makeEncounterDefinition("PH-en-though-shalt-not-prank", "Though Shalt Not Prank", PH),
    ...makeEncounterDefinition("PH-cs-nenapalis-blizniho-sveho", "Nenapálíš bližního svého", PH),
    ...makeEncounterDefinition("PH-en-the-hidden-hand-of-strahov-info", "The Hidden Hand of Strahov - Info", PH),
    ...makeEncounterDefinition("PH-en-the-hidden-hand-of-strahov-scenes", "The Hidden Hand of Strahov - Scenes", PH),

    ...makeEncounterDefinition("OS-en-drink-till-your-luck-runs-out", "Drink Till Your Luck Runs Out", OS),
    ...makeEncounterDefinition("OS-cs-pij-nez-se-karta-obrati", "Pij, než se karta obrátí", OS),

    ...makeEncounterDefinition("OS-en-low-key-heroes", "Low-key Heroes", OS),

    ...makeEncounterDefinition("OS-en-radicare-rapid-rescue", "RadiCare Rapid Rescue", OS),
};

export const encountersByCampaign = groupByCampaign(encountersMap);
