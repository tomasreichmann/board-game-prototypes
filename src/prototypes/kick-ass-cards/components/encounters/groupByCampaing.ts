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
        console.log("Encounter:", encounter);
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
        .sort(getCompareFnByStringKey("name"))
        .map((campaign) => {
            campaign.encounters.sort(getCompareFnByStringKey("name"));
            return campaign;
        });
}
