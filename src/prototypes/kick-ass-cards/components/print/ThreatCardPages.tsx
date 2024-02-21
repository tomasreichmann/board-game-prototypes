import threatsData from "../../data/threats-en-deck";
import ThreatCard, { ThreatCardBackFace } from "../gameComponents/ThreatCard";
import ChunkedPages from "./ChunkedPages";

export default function ThreatCardPages() {
    return (
        <ChunkedPages
            Component={ThreatCard}
            BackFaceComponent={ThreatCardBackFace}
            frontFacePrintPageProps={{ bleedInMm: 0, contentClassName: "p-[3mm]" }}
            backFacePrintPageProps={{ bleedInMm: 0, contentClassName: "p-[3mm]" }}
            items={threatsData.map((item) => ({ ...item, bleedMm: 3, className: "relative -m-[3mm]" }))}
            itemsPerPage={4 * 4}
            label="Threats"
        />
    );
}
