import { LinkListProps } from "../../components/content/LinkList";
import groupByCampaign from "../../components/encounters/groupByCampaing";
import { encountersMap as generatedEncountersMap } from "./encounters.generated";

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

export const encountersMap: { [key: string]: EncounterDefinition } = generatedEncountersMap;

export const encountersByCampaign = groupByCampaign(encountersMap);

import kebabCaseToTitleCase from "@/utils/kebabCaseToTitleCase";
import { encountersPath } from "../../components/routes/routes";

const getFileNameFromPath = (path: string) => {
    return (path.split("/").pop() || "").replace(".mdx", "");
};

const getChapterFromFilename = (fileName: string) => {
    const match = fileName.match(/^c(\d+)-/);
    if (!match) {
        return undefined;
    }
    return parseInt(match[1], 10);
};

const getTitleFromFilename = (fileName: string) => {
    const isIndex = fileName.toLowerCase() === "index";
    const [, ...fileNameFragments] = isIndex ? ["c0", "Intro"] : fileName.split("-");
    return kebabCaseToTitleCase(fileNameFragments.join("-"));
};

const encounterList = Object.keys(modules)
    .sort()
    .map((path) => {
        const campaignFolderMatch = path.match(/\.\/(.*)\/(.*)/);
        const campaignFolder = campaignFolderMatch ? campaignFolderMatch[1] : undefined;
        const campaign = campaignFolder ? kebabCaseToTitleCase(campaignFolder) : undefined;
        const fileName = getFileNameFromPath(path); // E.g. "c1-transport-in-distress"
        const chapter = getChapterFromFilename(fileName);
        const title = getTitleFromFilename(fileName);
        return { slug: path, path, fileName, title, chapter, campaign };
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

const getRelativePath = (path: string) =>
    `./${path.replace(/^.*\/data\/encounters\//, "").replace(/\.mdx.*$/, "")}.mdx`;

const stripFileExtension = (path: string) => path.replace(/\.[^/.]+$/, "");

const getRootPath = (relativePath: string) => encountersPath + "/" + relativePath.replace(/^\.\//, "");

export const getOtherChapterEncounterLinks = (currentPath: string): LinkListProps["links"] => {
    const relativePath = getRelativePath(currentPath);
    const otherChapterEncounters = getOtherChapterEncounters(relativePath);

    return otherChapterEncounters.map((encounter) => {
        return { href: getRootPath(stripFileExtension(encounter.path)), children: encounter.title };
    });
};
