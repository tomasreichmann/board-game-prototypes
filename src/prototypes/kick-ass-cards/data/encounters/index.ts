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
        campaign: "Ledová pomsta",
        title: "LP-c0-a0-Info",
    },
    "LP-c1-a1-Navrat": {
        slug: "LP-c1-a1-Navrat",
        path: "LP-c1-a1-Navrat",
        campaign: "Ledová pomsta",
        title: "LP-c1-a1-Navrat",
    },
    "LP-c1-a2-Oslava": {
        slug: "LP-c1-a2-Oslava",
        path: "LP-c1-a2-Oslava",
        campaign: "Ledová pomsta",
        title: "LP-c1-a2-Oslava",
    },
    "LP-c1-a3-Partys-over": {
        slug: "LP-c1-a3-Partys-over",
        path: "LP-c1-a3-Partys-over",
        campaign: "Ledová pomsta",
        title: "LP-c1-a3-Partys-over",
    },
};
