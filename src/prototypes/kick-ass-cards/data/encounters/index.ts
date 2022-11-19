/*export const encounterMap = (import.meta as any).glob("../../data/encounters/kjb/*.md", { eager: true }) as Record<
    string,
    { default: React.ComponentType<{}> }
>;*/
// export const encounterModules = Object.values(encounterMap);
const KJB = "Království Jediné Bohyně";
export type EnounterDefinition = {
    path: string;
    slug: string;
    campaign?: string;
    title: string;
};
export const encountersMap: { [key: string]: EnounterDefinition } = {
    "KJB-act1-01-Intro": {
        slug: "KJB-act1-01-Intro",
        path: "KJB-act1-01-Intro",
        campaign: KJB,
        title: "Akt 1 - Úvod",
    },
    test: {
        slug: "test",
        path: "test",
        campaign: KJB,
        title: "Test",
    },
};
