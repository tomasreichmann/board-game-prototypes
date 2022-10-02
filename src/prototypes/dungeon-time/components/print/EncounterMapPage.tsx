import PrintPage from "../../../../components/print/PrintPage/PrintPage";
import DataToggle from "../../../../components/DataToggle";
import EncounterMap from "../gameComponents/EncounterMap";
import { useStages } from "../../hooks/useStages";
import PrintMarkerCorners from "../../../../components/print/PrintMarker/PrintMarkerCorners";

export default function EncounterMapPage() {
    const { data = [] } = useStages();

    return (
        <>
            <PrintPage className="relative">
                <EncounterMap stages={data} className="relative flex-shrink h-full w-min self-start">
                    <PrintMarkerCorners />
                </EncounterMap>
            </PrintPage>
            <div className="w-full">
                <DataToggle data={data} initialCollapsed />
            </div>
        </>
    );
}
