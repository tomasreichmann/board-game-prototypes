/*export const encounterMap = (import.meta as any).glob("../../data/encounters/kjb/*.md", { eager: true }) as Record<
    string,
    { default: React.ComponentType<{}> }
>;*/
// export const encounterModules = Object.values(encounterMap);
export type EnounterDefinition = {
    path: string;
    slug: string;
    campaign?: string;
    title: string;
};

const KJB = "Království Jediné Bohyně";
const LP = "Ledová pomsta";
const LP_EN = "Cold Revenge";
const ISV = "In Sanguine Veritas";

const makeEncounterDefinition = (key: string, title: string, campaign: string) => ({[key]: {
    slug: key,
    path: key,
    campaign,
    title,
}});

export const encountersMap: { [key: string]: EnounterDefinition } = {
    "KJB-act1-01-Intro": {
        slug: "KJB-act1-01-Intro",
        path: "KJB-act1-01-Intro",
        campaign: KJB,
        title: "Akt 1 - Úvod",
    },

    "PZZ-akt1-Intro": {
        slug: "PZZ-akt1-Intro",
        path: "PZZ-akt1-Intro",
        campaign: "Pomsta ze záhrobí",
        title: "PZZ-akt1-Intro",
    },

    "LP-c0-a0-Info": {
        slug: "LP-c0-a0-Info",
        path: "LP-c0-a0-Info",
        campaign: LP,
        title: "LP-c0-a0-Info",
    },
    "LP-c1-a1-Navrat": {
        slug: "LP-c1-a1-Navrat",
        path: "LP-c1-a1-Navrat",
        campaign: LP,
        title: "LP-c1-a1-Navrat",
    },
    "LP-c1-a2-Oslava": {
        slug: "LP-c1-a2-Oslava",
        path: "LP-c1-a2-Oslava",
        campaign: LP,
        title: "LP-c1-a2-Oslava",
    },
    "LP-c1-a3-Partys-over": {
        slug: "LP-c1-a3-Partys-over",
        path: "LP-c1-a3-Partys-over",
        campaign: LP,
        title: "LP-c1-a3-Partys-over",
    },
    "LP-c1-a4-Na-ulici": {
        slug: "LP-c1-a4-Na-ulici",
        path: "LP-c1-a4-Na-ulici",
        campaign: LP,
        title: "LP-c1-a4-Na-ulici",
    },
    "LP-c1-a5-Odlet": {
        slug: "LP-c1-a5-Odlet",
        path: "LP-c1-a5-Odlet",
        campaign: LP,
        title: "LP-c1-a5-Odlet",
    },
    "LP-c2-a1-Vysadek": {
        slug: "LP-c2-a1-Vysadek",
        path: "LP-c2-a1-Vysadek",
        campaign: LP,
        title: "LP-c2-a1-Vysadek",
    },
    "LP-c2-a2-Sporova-lod": {
        slug: "LP-c2-a2-Sporova-lod",
        path: "LP-c2-a2-Sporova-lod",
        campaign: LP,
        title: "LP-c2-a2-Sporova-lod",
    },

    "LP-en-c0-a0-Info": {
        slug: "LP-en-c0-a0-Info",
        path: "LP-en-c0-a0-Info",
        campaign: LP_EN,
        title: "LP-en-c0-a0-Info",
    },
    "LP-en-c1-a1-Return": {
        slug: "LP-en-c1-a1-Return",
        path: "LP-en-c1-a1-Return",
        campaign: LP_EN,
        title: "LP-en-c1-a1-Return",
    },
    "LP-en-c1-a2-Celebration": {
        slug: "LP-en-c1-a2-Celebration",
        path: "LP-en-c1-a2-Celebration",
        campaign: LP_EN,
        title: "LP-en-c1-a2-Celebration",
    },
    "LP-en-c1-a3-Partys-over": {
        slug: "LP-en-c1-a3-Partys-over",
        path: "LP-en-c1-a3-Partys-over",
        campaign: LP_EN,
        title: "LP-en-c1-a3-Partys-over",
    },
    "LP-en-c1-a4-On-the-street": {
        slug: "LP-en-c1-a4-On-the-street",
        path: "LP-en-c1-a4-On-the-street",
        campaign: LP_EN,
        title: "LP-en-c1-a4-On-the-street",
    },
    "LP-en-c1-a5-Departure": {
        slug: "LP-en-c1-a5-Departure",
        path: "LP-en-c1-a5-Departure",
        campaign: LP_EN,
        title: "LP-en-c1-a5-Departure",
    },
    "LP-en-c2-a1-Boarding": {
        slug: "LP-en-c2-a1-Boarding",
        path: "LP-en-c2-a1-Boarding",
        campaign: LP_EN,
        title: "LP-en-c2-a1-Boarding",
    },
    "LP-en-c2-a2-Spore-ship": {
        slug: "LP-en-c2-a2-Spore-ship",
        path: "LP-en-c2-a2-Spore-ship",
        campaign: LP_EN,
        title: "LP-en-c2-a2-Spore-ship",
    },
    ...makeEncounterDefinition('ISV-c0-a1-Prequel', "Prequel", ISV),
    ...makeEncounterDefinition('ISV-c1-a0-Info', "Info", ISV),
};
console.log("encountersMap", encountersMap)