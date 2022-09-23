import { chunk } from "lodash";
import { Button } from "react-daisyui";
import PrintMarkerCorners from "../../components/print/PrintMarker/PrintMarkerCorners";
import PrintPage from "../../components/print/PrintPage/PrintPage";
import ActionCard from "./components/ActionCard/ActionCard";
import "./DungeonTimePrototype.css";
import { useActionDeck } from "./hooks/useActions";

export default function DungeonTimePrototype() {
    const { data: actionDecks } = useActionDeck();

    const genericDeckActions =
        actionDecks?.find((deck) => deck.slug === "generic") || undefined;
    const actions = genericDeckActions ? genericDeckActions.actions : [];

    return (
        <div
            className="DungeonTimePrototype p-10 print:p-0 min-h-screen bg-acid-5 text-lightning-1"
            data-theme="DungeonTimePrototype"
        >
            <h1 className="font-dtHeading print:hidden text-lightning-3">
                Dungeon Time Prototype
            </h1>

            <div className="flex gap-5 flex-wrap">
                {chunk(actions, 3 * 3).map((actions, actionsPageIndex) => (
                    <PrintPage key={actionsPageIndex}>
                        <div className="flex flex-wrap content-center items-center">
                            <h2 className="text-2xl font-dtHeading text-blood-3 w-full">
                                Generic Deck
                            </h2>
                            {actions.map((action, actionIndex) => (
                                <ActionCard
                                    key={action.slug}
                                    {...action}
                                    className="relative"
                                >
                                    <PrintMarkerCorners />
                                </ActionCard>
                            ))}
                        </div>
                    </PrintPage>
                ))}
            </div>

            <pre className="h-80 overflow-auto print:hidden">
                {JSON.stringify(actions, null, 2)}
            </pre>
        </div>
    );
}
