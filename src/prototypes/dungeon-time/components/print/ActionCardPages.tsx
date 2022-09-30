import { chunk } from "lodash";
import PrintMarkerCorners from "../../../../components/print/PrintMarker/PrintMarkerCorners";
import PrintPage from "../../../../components/print/PrintPage/PrintPage";
import ActionCard from "../ActionCard";
import { useActionDecks } from "../../hooks/useActions";
import { ActionType } from "../../types";
import DataToggle from "../../../../components/DataToggle";

const CARDS_PER_PAGE = 3 * 3;

const getUpgrades = (action: ActionType): ActionType[] => {
    return action.upgradeOptions || [];
};

const getUpgradesDeep = (action: ActionType): ActionType[] => {
    const upgrades = getUpgrades(action);
    return upgrades.reduce(
        (upgrades, upgrade) => {
            if ((upgrade.upgradeOptions || []).length > 0) {
                upgrades.push(...getUpgradesDeep(upgrade));
            }
            return upgrades;
        },
        [...upgrades]
    );
};

const getDeckUpgradesDeep = (actions: ActionType[]): ActionType[] => {
    return actions.reduce((upgrades, action) => {
        upgrades.push(...getUpgradesDeep(action));
        return upgrades;
    }, [] as ActionType[]);
};

export default function ActionCardPages() {
    const { data: actionDecks } = useActionDecks();

    const decks = actionDecks?.filter((deck) => deck.slug !== "generic") || [];

    const actionDeckUpgrades =
        decks.length > 0
            ? getDeckUpgradesDeep(decks.flatMap((deck) => deck.actions))
            : [];

    return (
        <>
            {decks.map(({ actions, name }) => (
                <>
                    {chunk(actions, CARDS_PER_PAGE).map(
                        (actions, actionsPageIndex) => (
                            <PrintPage
                                key={"action-deck-page-" + actionsPageIndex}
                            >
                                <div className="flex flex-wrap content-center items-center">
                                    {actions.map((action) => (
                                        <ActionCard
                                            key={action.slug}
                                            {...action}
                                            className="relative"
                                        >
                                            <PrintMarkerCorners />
                                        </ActionCard>
                                    ))}
                                    <h2 className="text-2xl font-dtHeading text-blood-3 w-full text-center">
                                        {name} {actionsPageIndex + 1}/
                                        {Math.ceil(
                                            actions.length / CARDS_PER_PAGE
                                        )}
                                    </h2>
                                </div>
                            </PrintPage>
                        )
                    )}
                </>
            ))}
            <DataToggle data={decks} initialCollapsed />
            {chunk(actionDeckUpgrades, CARDS_PER_PAGE).map(
                (actions, actionsPageIndex) => (
                    <PrintPage
                        key={"action-deck-upgrades-page-" + actionsPageIndex}
                    >
                        <div className="flex flex-wrap content-center items-center">
                            {actions.map((action) => (
                                <ActionCard
                                    key={action.slug}
                                    {...action}
                                    className="relative"
                                >
                                    <PrintMarkerCorners />
                                </ActionCard>
                            ))}
                            <h2 className="text-2xl font-dtHeading text-blood-3 w-full text-center">
                                Action Upgrades {actionsPageIndex + 1}/
                                {Math.ceil(
                                    actionDeckUpgrades.length / CARDS_PER_PAGE
                                )}
                            </h2>
                        </div>
                    </PrintPage>
                )
            )}
            <DataToggle data={actionDeckUpgrades} initialCollapsed />
        </>
    );
}
