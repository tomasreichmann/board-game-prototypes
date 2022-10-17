import { range } from "lodash";
import ToggleData from "../../../../components/DataToggle";
import PrintMarkerCorners from "../../../../components/print/PrintMarker/PrintMarkerCorners";
import PrintPage from "../../../../components/print/PrintPage/PrintPage";
import EncounterCard from "../gameComponents/EncounterCard";

const encounters = import.meta.glob("../../data/encounters/kjb/*.md", { eager: true });

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

const keys = Object.keys(encounters);

export default function EncounterCardPages() {
    return (
        <>
            <ToggleData data={keys.map((key) => encounters[key])} />
            {/*encounters.map((pageIndex) => (
                <PrintPage key={"page-" + pageIndex} marginsInMm={[10, 10]}>
                    
                </PrintPage>
            ))*/}
        </>
    );
}
