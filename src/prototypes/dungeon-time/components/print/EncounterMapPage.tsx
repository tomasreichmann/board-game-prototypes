import { chunk } from "lodash";
import PrintMarkerCorners from "../../../../components/print/PrintMarker/PrintMarkerCorners";
import PrintPage from "../../../../components/print/PrintPage/PrintPage";
import DataToggle from "../../../../components/DataToggle";
import EncounterMap from "../gameComponents/EncounterMap";
import { useStages } from "../../hooks/useStages";

export default function EncounterMapPage() {
    const { data = [] } = useStages();

    return (
        <>
            <PrintPage>
                <EncounterMap stages={data} className="relative">
                    <PrintMarkerCorners />
                </EncounterMap>
            </PrintPage>
            <div className="w-full">
                <DataToggle data={data} initialCollapsed />
            </div>
        </>
    );
}
