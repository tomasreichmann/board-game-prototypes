import { LinkListProps } from "../../components/content/LinkList";
import groupByCampaign from "../../components/encounters/groupByCampaing";
import { encountersMap as generatedEncountersMap } from "./encounters.generated";
import { encountersPath } from "../../components/routes/routes";

export type EncounterDefinition = {
    path: string;
    slug: string;
    campaign?: string;
    chapter?: number;
    title: string;
    imageUri?: string;
};

const modules = import.meta.glob("./**/*.mdx", {
    eager: false, // keep lazy by default
});

export async function loadEncounter(pathWithoutExtension: string) {
    const key = `./${pathWithoutExtension}.mdx`;
    const loader = modules[key];
    if (!loader) {
        throw new Error(`Encounter not found: ${key}. Available keys: ${Object.keys(modules).join(", ")}`);
    }
    return loader().then((mod: any) => mod);
}

export const encountersMap = generatedEncountersMap as Record<string, EncounterDefinition>;

export const encountersByCampaign = groupByCampaign(encountersMap);

const encounterList = Object.keys(encountersMap)
    .sort()
    .map((encounterSlug) => {
        const { path, title, chapter, campaign } = encountersMap[encounterSlug as keyof typeof encountersMap];
        return { slug: encounterSlug, path, title, chapter, campaign };
    });

type ChapterDirectoryType = EncounterDefinition[][];
type CampaignDirectoryType = Record<string, ChapterDirectoryType>;

export const campaignDirectory: CampaignDirectoryType = encounterList.reduce((campaignDirectory, encounter) => {
    const { chapter, campaign } = encounter;
    if (chapter === undefined || campaign === undefined) {
        return campaignDirectory;
    }
    campaignDirectory[campaign] = campaignDirectory[campaign] || [];
    campaignDirectory[campaign][chapter] = campaignDirectory[campaign][chapter] || [];
    campaignDirectory[campaign][chapter].push(encounter);
    return campaignDirectory;
}, {} as CampaignDirectoryType);

export const getOtherChapterEncounters = (currentPath: string) => {
    const encounterMatch = encounterList.find((e) => e.path === currentPath);
    if (
        !encounterMatch ||
        !encounterMatch.campaign ||
        encounterMatch.chapter === undefined ||
        !campaignDirectory[encounterMatch.campaign][encounterMatch.chapter]
    ) {
        return [];
    }
    const { campaign, chapter } = encounterMatch;
    return campaignDirectory[campaign][chapter].filter((e) => e.path !== currentPath);
};

const getRelativePath = (path: string) => stripFileExtension(path.replace(/^.*\/data\/encounters\//, ""));

const stripFileExtension = (path: string) => path.replace(/\.[^/.]+$/, "");

const getRootPath = (relativePath: string) => encountersPath + "/" + relativePath.replace(/^\.\//, "");

export const getOtherChapterEncounterLinks = (currentPath: string): LinkListProps["links"] => {
    const relativePath = getRelativePath(currentPath);
    const otherChapterEncounters = getOtherChapterEncounters(relativePath);

    return otherChapterEncounters.map((encounter) => {
        return { href: getRootPath(encounter.path), children: encounter.title };
    });
};

export const getCampaignChapterEncounters = (campaign: string, chapter: number): LinkListProps["links"] => {
    if (!campaignDirectory[campaign] || !campaignDirectory[campaign][chapter]) {
        return [];
    }
    return campaignDirectory[campaign][chapter].map((encounter) => ({
        href: getRootPath(encounter.path),
        children: encounter.title,
    }));
};
