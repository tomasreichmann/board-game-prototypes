import { range } from "lodash";
import ToggleData from "../../../../components/DataToggle";
import PrintMarkerCorners from "../../../../components/print/PrintMarker/PrintMarkerCorners";
import PrintPage from "../../../../components/print/PrintPage/PrintPage";
import EncounterCard from "../gameComponents/EncounterCard";
import IntroEncounter from "../../data/encounters/kjb/act1-01-Intro.md";
import React from "react";
import Module from "module";

const encounterMap = (import.meta as any).glob("../../data/encounters/kjb/*.md", { eager: true }) as Record<
    string,
    { default: React.ComponentType<{}> }
>;

const copies = 2;

const blankEncounter = {
    name: "",
    occupation: "",
    specials: [],
    tricks: [],
    titles: [],
    wounds: [],
    assets: [],
    notes: "",
};

const encounterModules = Object.values(encounterMap);
console.log(IntroEncounter);
// <ToggleData data={encounterModules.map(encounterModules)} />
export default function EncounterCardPages() {
    return (
        <>
            {encounterModules.map((encounterModule, pageIndex) => (
                <article
                    key={"page-" + pageIndex}
                    className="w-full text-kac-iron p-4 bg-white flex-1 flex-shrink self-stretch"
                >
                    <div className="prose text-kac-iron max-w-none prose-headings:font-kacHeading prose-headings:text-kac-blood prose-a:text-kac-monster prose-strong:text-kac-iron-dark prose-blockquote:text-kac-iron-dark prose-em:text-kac-cloth prose-ul:[--tw-prose-bullets:rgb(123,0,29)]">
                        <encounterModule.default />
                    </div>
                </article>
            ))}
        </>
    );
}
