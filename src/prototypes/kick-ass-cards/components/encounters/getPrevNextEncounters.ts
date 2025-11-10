import { EncounterDefinition } from "../../data/encounters";

export default function getPrevNextEncounters(
    currentSlug: string,
    encountersByCampaign: {
        title: string;
        encounters: EncounterDefinition[];
    }[]
) {
    let currentEncounterIndex = -2;
    const campaignMatch = encountersByCampaign.find((campaign) => {
        return campaign.encounters.some((encounter, encounterIndex) => {
            const isMatch = encounter.slug === currentSlug;
            if (isMatch) {
                currentEncounterIndex = encounterIndex;
            }
            return isMatch;
        });
    });
    if (!campaignMatch) {
        return [];
    }
    return [campaignMatch.encounters[currentEncounterIndex - 1], campaignMatch.encounters[currentEncounterIndex + 1]];
}
