import { encountersMap, EnounterDefinition } from "../../data/encounters";
import { Outlet, useParams } from "react-router-dom";
import getCompareFnByStringKey from "../../../../utils/getCompareFnByStringKey";
import { kickAssCardsPath } from "./routes";
import { Navigation } from "../Navigation";

const groupByCampaign = (encMap: typeof encountersMap) => {
    const campaignsMap: {
        [key: string]: {
            title: string;
            encounters: EnounterDefinition[];
        };
    } = {};
    Object.values(encMap).forEach((encounter) => {
        const campaignName = encounter.campaign || "One-shots";
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
};

const encountersByCampaign = groupByCampaign(encountersMap);

const getPrevNextEncounters = (
    currentSlug: string,
    encountersByCampaign: {
        title: string;
        encounters: EnounterDefinition[];
    }[]
) => {
    let currentEncounterIndex: number = -2;
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
};

export default function EncounterRoute() {
    const { encounterSlug } = useParams<"encounterSlug">();
    const [prevEncounter, nextEncounter] = encounterSlug
        ? getPrevNextEncounters(encounterSlug, encountersByCampaign)
        : [];
    const encounterList = (
        <div className="flex gap-5 flex-wrap print:block max-w-screen px-2 md:px-10 mx-auto">
            {Object.values(encountersByCampaign).map((campaign) => {
                return (
                    <div className="my-5" key={campaign.title}>
                        <h2 className="text-kac-bone-light font-kacHeading">{campaign.title}</h2>
                        <ul className="list-disc pl-5">
                            {campaign.encounters.map(({ title, slug }) => {
                                const uri = kickAssCardsPath + "/encounters/" + slug;
                                return (
                                    <li key={slug}>
                                        <a href={uri}>{title}</a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
    const prevNext = (prevEncounter || nextEncounter) && (
        <div className="w-full text-kac-iron p-4 bg-white container mx-auto flex flex-row justify-between">
            {prevEncounter ? (
                <a className="font-bold" href={kickAssCardsPath + "/encounters/" + prevEncounter.slug}>
                    {prevEncounter.title}
                </a>
            ) : (
                <div />
            )}
            {nextEncounter ? (
                <a className="font-bold" href={kickAssCardsPath + "/encounters/" + nextEncounter.slug}>
                    {nextEncounter.title}
                </a>
            ) : (
                <div />
            )}
        </div>
    );
    return (
        <>
            <Navigation />
            {encounterList}
            {prevNext}
            <Outlet />
            {prevNext}
            {encounterSlug && encounterList}
        </>
    );
}
