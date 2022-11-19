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
};
