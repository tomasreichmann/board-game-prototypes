import { chunk, mapKeys, mapValues } from "lodash";
import PrintMarkerCorners from "../../../../components/print/PrintMarker/PrintMarkerCorners";
import PrintPage from "../../../../components/print/PrintPage/PrintPage";
import ActionCard from "../gameComponents/ActionCard";
import { useActionDecks } from "../../hooks/useActions";
import { ActionType } from "../../types";
import DataToggle from "../../../../components/DataToggle";
import countByProperty from "../../utils/countByProperty";

const CARDS_PER_PAGE = 3 * 3;
const MAX_IDENTICAL_UPGRADES = 4;

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

    const allActionDeckUpgrades =
        decks.length > 0
            ? getDeckUpgradesDeep(decks.flatMap((deck) => deck.actions))
            : [];

    const cardTypeCounts = countByProperty(allActionDeckUpgrades, "sourceSlug");
    const cardsOfTypeLimits = mapValues(cardTypeCounts, (cardCount) =>
        Math.min(cardCount, MAX_IDENTICAL_UPGRADES)
    );
    const cardsOfTypeLeft = { ...cardsOfTypeLimits };

    const unsortedActionDeckUpgrades = allActionDeckUpgrades.reduce(
        (actionDeckUpgrades, action) => {
            const { sourceSlug } = action;
            if (cardsOfTypeLeft[sourceSlug] > 0) {
                const slug =
                    sourceSlug +
                    "-" +
                    (cardsOfTypeLimits[sourceSlug] -
                        cardsOfTypeLeft[sourceSlug]);
                cardsOfTypeLeft[sourceSlug]--;
                actionDeckUpgrades.push({
                    ...action,
                    slug,
                });
            }
            return actionDeckUpgrades;
        },
        [] as ActionType[]
    );

    const actionDeckUpgrades = [...unsortedActionDeckUpgrades].sort((a, b) => {
        return (
            unsortedActionDeckUpgrades.findIndex(
                (action) => action.sourceSlug === a.sourceSlug
            ) -
            unsortedActionDeckUpgrades.findIndex(
                (action) => action.sourceSlug === b.sourceSlug
            )
        );
    });

    return (
        <>
            <div className="flex flex-row justify-start w-full print:hidden gap-2">
                <DataToggle
                    data={cardTypeCounts}
                    buttonContent="Total Upgrade Cards by type"
                    initialCollapsed
                />
                <DataToggle
                    data={cardsOfTypeLimits}
                    buttonContent="Filtered Upgrade Cards by type"
                    initialCollapsed
                />
            </div>
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
            <DataToggle
                data={decks}
                initialCollapsed
                className="print:hidden flex flex-col w-full items-start relative"
            />
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
            <div className="w-full">
                <DataToggle data={actionDeckUpgrades} initialCollapsed />
            </div>
        </>
    );
}
