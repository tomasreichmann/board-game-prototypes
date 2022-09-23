import { chunk } from "lodash";
import { Button } from "react-daisyui";
import PrintMarkerCorners from "../../components/print/PrintMarker/PrintMarkerCorners";
import PrintPage from "../../components/print/PrintPage/PrintPage";
import ActionCard from "./components/ActionCard/ActionCard";
import "./DungeonTimePrototype.css";
import { useActions } from "./hooks/useActions";

export default function DungeonTimePrototype() {
    const { data: actions } = useActions();

    return (
        <div
            className="DungeonTimePrototype p-10 print:p-0 min-h-screen bg-acid-5 text-lightning-1"
            data-theme="DungeonTimePrototype"
        >
            <h1 className="font-dtHeading print:hidden text-lightning-3">
                Dungeon Time Prototype
            </h1>

            {chunk(actions, 3 * 3).map((actions) => (
                <PrintPage>
                    <div className="flex flex-wrap content-center items-center">
                        {actions.map((action, actionIndex) => (
                            <ActionCard
                                key={actionIndex}
                                {...action}
                                className="relative"
                            >
                                <PrintMarkerCorners />
                            </ActionCard>
                        ))}
                    </div>
                </PrintPage>
            ))}

            <pre className="h-80 overflow-auto print:hidden">
                {JSON.stringify(actions, null, 2)}
            </pre>
        </div>
    );
}
