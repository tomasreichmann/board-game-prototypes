import { useState } from "react";
import { Button, Checkbox, Form } from "react-daisyui";
import ErrorBoundary from "../../components/ErrorBoundary";
import ActionCardPages from "./components/print/ActionCardPages";
import EnemyIntentPages from "./components/print/EnemyIntentPages";
import EnemyPages from "./components/print/EnemyPages";
import { clearSheetDataCache } from "./hooks/useSheetData";
import { ActionType } from "./types";
import "./DungeonTimePrototype.css";

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

export default function DungeonTimePrototype() {
    const [, setRerenderCount] = useState(0);
    const [showActions, setShowActions] = useState(true);
    const [showEnemies, setShowEnemies] = useState(true);
    const [showEnemyIntents, setShowEnemyIntents] = useState(true);

    const refreshData = () => {
        clearSheetDataCache();
        setRerenderCount((count) => count + 1);
    };
    const rerender = () => {
        setRerenderCount((count) => count + 1);
    };

    return (
        <div
            className="p-10 print:p-0 min-h-screen bg-acid-5 print:bg-white text-lightning-1"
            data-theme="DungeonTimePrototype"
        >
            <div className="print:hidden mb-5 flex flex-row gap-4 justify-between">
                <h1 className="font-dtHeading text-lightning-3">
                    Dungeon Time Prototype
                </h1>
                <div className="flex flex-row justify-end gap-x-2 gap-y-1 content-end flex-wrap-reverse items-center">
                    <Form.Label title="Actions">
                        <Checkbox
                            className="ml-1"
                            checked={showActions}
                            onClick={() =>
                                setShowActions((isVisible) => !isVisible)
                            }
                        />
                    </Form.Label>
                    <Form.Label title="Enemies">
                        <Checkbox
                            className="ml-1"
                            checked={showEnemies}
                            onClick={() =>
                                setShowEnemies((isVisible) => !isVisible)
                            }
                        />
                    </Form.Label>
                    <Form.Label title="Enemy Intents">
                        <Checkbox
                            className="ml-1"
                            checked={showEnemyIntents}
                            onClick={() =>
                                setShowEnemyIntents((isVisible) => !isVisible)
                            }
                        />
                    </Form.Label>
                    <Button onClick={refreshData} size="sm" color="primary">
                        Refresh Data
                    </Button>
                    <Button
                        onClick={rerender}
                        size="sm"
                        color="primary"
                        variant="outline"
                    >
                        Rerender
                    </Button>
                </div>
            </div>

            <div className="flex gap-5 flex-wrap print:block">
                {showActions && (
                    <ErrorBoundary>
                        <ActionCardPages />
                    </ErrorBoundary>
                )}
                {showEnemies && (
                    <ErrorBoundary>
                        <EnemyPages />
                    </ErrorBoundary>
                )}
                {showEnemyIntents && (
                    <ErrorBoundary>
                        <EnemyIntentPages />
                    </ErrorBoundary>
                )}
            </div>
        </div>
    );
}
