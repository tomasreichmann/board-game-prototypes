import { encountersByCampaign } from "../../data/encounters";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { mightyDecksPath } from "./routes";
import { Navigation } from "../Navigation";
import EncounterList from "../encounters/EncounterList";
import getPrevNextEncounters from "../encounters/getPrevNextEncounters";

export default function EncountersRoute() {
    const { encounterSlug } = useParams<"encounterSlug">();
    const [prevEncounter, nextEncounter] = encounterSlug
        ? getPrevNextEncounters(encounterSlug, encountersByCampaign)
        : [];

    if (!encounterSlug) {
        return <Navigate to={mightyDecksPath + "/encounters/index"} replace />;
    }

    const prevNext = (prevEncounter || nextEncounter) && (
        <div className="w-full text-kac-iron p-4 bg-white container mx-auto flex flex-row justify-between">
            {prevEncounter ? (
                <a className="font-bold" href={mightyDecksPath + "/encounters/" + prevEncounter.slug}>
                    {prevEncounter.title}
                </a>
            ) : (
                <div />
            )}
            {nextEncounter ? (
                <a className="font-bold" href={mightyDecksPath + "/encounters/" + nextEncounter.slug}>
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
            {prevNext}
            <Outlet />
            {prevNext}
            <EncounterList />
        </>
    );
}
