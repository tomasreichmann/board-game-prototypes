import getCompareFnByStringKey from "@/utils/getCompareFnByStringKey";
import { encountersMap, EncounterDefinition } from "../../data/encounters";

export default function groupByCampaign(encMap: typeof encountersMap) {
    const campaignsMap: {
        [key: string]: {
            title: string;
            encounters: EncounterDefinition[];
        };
    } = {};
    Object.values(encMap).forEach((encounter) => {
        const campaignName = encounter.campaign;
        if (!campaignName) {
            return;
        }
        if (!(campaignName in campaignsMap)) {
            campaignsMap[campaignName] = {
                title: campaignName,
                encounters: [],
            };
        }
        campaignsMap[campaignName].encounters.push(encounter);
    });
    return Object.values(campaignsMap)
        .sort(getCompareFnByStringKey("title"))
        .map((campaign) => {
            campaign.encounters.sort((a, b) => {
                const chapterA = a.chapter ?? Infinity;
                const chapterB = b.chapter ?? Infinity;
                return chapterA - chapterB || a.title.localeCompare(b.title);
            });
            return campaign;
        });
}
