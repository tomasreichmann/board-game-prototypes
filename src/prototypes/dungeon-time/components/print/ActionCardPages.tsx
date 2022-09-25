import { chunk } from "lodash";
import PrintMarkerCorners from "../../../../components/print/PrintMarker/PrintMarkerCorners";
import PrintPage from "../../../../components/print/PrintPage/PrintPage";
import ActionCard from "../ActionCard";
import { useActionDeck } from "../../hooks/useActions";
import { ActionType } from "../../types";
import DataToggle from "../../../../components/DataToggle";

const ACTION_CARDS_PER_PAGE = 3 * 3;

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
    const { data: actionDecks } = useActionDeck();

    const genericDeckActions =
        actionDecks?.find((deck) => deck.slug === "generic") || undefined;
    const genericActionDeckActions = genericDeckActions
        ? genericDeckActions.actions
        : [];
    const genericActionDeckUpgrades =
        genericActionDeckActions.length > 0
            ? getDeckUpgradesDeep(genericActionDeckActions)
            : [];

    return (
        <>
            {chunk(genericActionDeckActions, ACTION_CARDS_PER_PAGE).map(
                (actions, actionsPageIndex) => (
                    <PrintPage
                        key={"generic-action-deck-page-" + actionsPageIndex}
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
                                Generic Action Deck {actionsPageIndex + 1}/
                                {Math.ceil(
                                    genericActionDeckActions.length /
                                        ACTION_CARDS_PER_PAGE
                                )}
                            </h2>
                        </div>
                    </PrintPage>
                )
            )}
            <DataToggle data={genericActionDeckActions} initialCollapsed />
            {chunk(genericActionDeckUpgrades, ACTION_CARDS_PER_PAGE).map(
                (actions, actionsPageIndex) => (
                    <PrintPage
                        key={"generic-action-upgrades-page-" + actionsPageIndex}
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
                                Generic Action Upgrades {actionsPageIndex + 1}/
                                {Math.ceil(
                                    genericActionDeckUpgrades.length /
                                        ACTION_CARDS_PER_PAGE
                                )}
                            </h2>
                        </div>
                    </PrintPage>
                )
            )}
            <DataToggle data={genericActionDeckUpgrades} initialCollapsed />
        </>
    );
}
