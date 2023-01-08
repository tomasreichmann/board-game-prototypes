import { encountersMap, EnounterDefinition } from "../data/encounters";
import { Outlet } from "react-router-dom";
import { kickAssCardsPath } from "../KickAssCardsPrototype";
import getCompareFnByStringKey from "../../../utils/getCompareFnByStringKey";

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

export default function EncounterRoute() {
    return (
        <>
            <div className="flex gap-5 flex-wrap print:block max-w-screen">
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
            <Outlet />
        </>
    );
}
