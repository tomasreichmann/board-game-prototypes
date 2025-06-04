import { encountersByCampaign } from "../../data/encounters";
import { mightyDecksPath } from "../routes/routes";

export default function EncounterList({ campaign }: { campaign?: string }) {
    const campaigns = Object.values(encountersByCampaign);
    const filteredCampaigns = campaign ? campaigns.filter((c) => c.title === campaign) : campaigns;
    return (
        <div className="flex gap-5 flex-wrap print:block max-w-screen px-2 md:px-10 mx-auto">
            {filteredCampaigns.map((campaign) => {
                return (
                    <div className="my-5" key={campaign.title}>
                        <h2 className="text-kac-bone-light font-kacHeading">{campaign.title}</h2>
                        <ul className="list-disc pl-5">
                            {campaign.encounters.map(({ title, slug }) => {
                                const uri = mightyDecksPath + "/encounters/" + slug;
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
}
