import threatsData from "../../data/threats-en-deck";
import ThreatCard, { ThreatCardBackFace } from "../gameComponents/ThreatCard";
import ChunkedPages from "./ChunkedPages";

export default function ThreatCardPages() {
    return (
        <ChunkedPages
            Component={ThreatCard}
            BackFaceComponent={ThreatCardBackFace}
            items={threatsData}
            itemsPerPage={4 * 4}
            label="Threats"
        />
    );
}
