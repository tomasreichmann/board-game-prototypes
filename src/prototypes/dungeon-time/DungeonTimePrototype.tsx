import "./DungeonTimePrototype.css";
import { ActionType } from "./types";
import { Button, Checkbox, Form } from "react-daisyui";
import { clearSheetDataCache } from "./hooks/useSheetData";
import { useState } from "react";
import ActionCardPages from "./components/print/ActionCardPages";
import BattleEncounterPages from "./components/print/BattleEncounterPages";
import CharactersPages from "./components/print/CharactersPages";
import ConsumablesPages from "./components/print/ConsumablesPages";
import EnemyIntentPages from "./components/print/EnemyIntentPages";
import EnemyPages from "./components/print/EnemyPages";
import StagesPages from "./components/print/EncounterMapPage";
import ErrorBoundary from "../../components/ErrorBoundary";
import Icon, { iconMap, IconType } from "./components/Icon/Icon";
import Toggle from "../../components/Toggle";
import universalPaperSizes from "../../components/print/paperSizes";
import RelicsPages from "./components/print/RelicsPages";
import Playtesters from "./components/Playtesters";
import Credits from "./components/Credits";

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
    const [showPlayerCharacters, setShowPlayerCharacters] = useState(true);
    const [showActions, setShowActions] = useState(true);
    const [showEnemies, setShowEnemies] = useState(true);
    const [showEnemyIntents, setShowEnemyIntents] = useState(true);
    const [showBattleEncounters, setShowBattleEncounters] = useState(true);
    const [showConsumables, setShowConsumables] = useState(true);
    const [showRelics, setShowRelics] = useState(true);
    const [showStages, setShowStages] = useState(true);

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
            <div className="print:hidden flex flex-row gap-4 justify-between -m-10 mb-5 py-5 px-10 bg-acid-5 text-blood-2 ">
                <h1 className="font-dtHeading text-2xl flex flex-row flex-wrap min-w-fit">
                    <Icon icon="warlordHelmet" className="h-8" />
                    &ensp;Dungeon Time
                </h1>
                <div className="flex flex-row justify-end gap-x-2 gap-y-0 content-end flex-wrap-reverse items-center">
                    <Form.Label title="Player Characters">
                        <Checkbox
                            className="ml-1"
                            size="sm"
                            checked={showPlayerCharacters}
                            onClick={() => setShowPlayerCharacters((isVisible) => !isVisible)}
                        />
                    </Form.Label>
                    <Form.Label title="Encounter Map">
                        <Checkbox
                            className="ml-1"
                            checked={showStages}
                            onClick={() => setShowStages((isVisible) => !isVisible)}
                        />
                    </Form.Label>
                    <Form.Label title="Enemies">
                        <Checkbox
                            className="ml-1"
                            checked={showEnemies}
                            onClick={() => setShowEnemies((isVisible) => !isVisible)}
                        />
                    </Form.Label>
                    <Form.Label title="Enemy Intents">
                        <Checkbox
                            className="ml-1"
                            checked={showEnemyIntents}
                            onClick={() => setShowEnemyIntents((isVisible) => !isVisible)}
                        />
                    </Form.Label>
                    <Form.Label title="Battle Encounters">
                        <Checkbox
                            className="ml-1"
                            checked={showBattleEncounters}
                            onClick={() => setShowBattleEncounters((isVisible) => !isVisible)}
                        />
                    </Form.Label>
                    <Form.Label title="Consumables">
                        <Checkbox
                            className="ml-1"
                            checked={showConsumables}
                            onClick={() => setShowConsumables((isVisible) => !isVisible)}
                        />
                    </Form.Label>
                    <Form.Label title="Relics">
                        <Checkbox
                            className="ml-1"
                            checked={showRelics}
                            onClick={() => setShowRelics((isVisible) => !isVisible)}
                        />
                    </Form.Label>
                    <Form.Label title="Actions">
                        <Checkbox
                            className="ml-1"
                            checked={showActions}
                            onClick={() => setShowActions((isVisible) => !isVisible)}
                        />
                    </Form.Label>
                    <Button onClick={refreshData} size="sm" color="primary">
                        Refresh Data
                    </Button>
                    <Button onClick={rerender} size="sm" color="primary" variant="outline">
                        Rerender
                    </Button>
                </div>
            </div>

            <Toggle buttonContent="Show Icons" initialCollapsed>
                <div
                    className="flex flex-row flex-wrap gap-2 p-8 rounded-md shadow-md mb-2"
                    style={{ backgroundColor: "white" }}
                >
                    {Object.keys(iconMap).map((iconKey) => (
                        <div key={iconKey} className="flex flex-col gap-1 items-center">
                            <Icon icon={iconKey as IconType} className="h-8" />
                            <div className="text-sm">{iconKey}</div>
                        </div>
                    ))}
                </div>
            </Toggle>

            <div className="flex gap-5 flex-wrap print:block" style={{ minWidth: universalPaperSizes.A4.mm[0] + "mm" }}>
                {showStages && (
                    <ErrorBoundary>
                        <StagesPages />
                    </ErrorBoundary>
                )}
                {showPlayerCharacters && (
                    <ErrorBoundary>
                        <CharactersPages />
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
                {showBattleEncounters && (
                    <ErrorBoundary>
                        <BattleEncounterPages />
                    </ErrorBoundary>
                )}
                {showConsumables && (
                    <ErrorBoundary>
                        <ConsumablesPages />
                    </ErrorBoundary>
                )}
                {showRelics && (
                    <ErrorBoundary>
                        <RelicsPages />
                    </ErrorBoundary>
                )}
                {showActions && (
                    <ErrorBoundary>
                        <ActionCardPages />
                    </ErrorBoundary>
                )}
            </div>
            <Playtesters />
            <Credits />
        </div>
    );
}
