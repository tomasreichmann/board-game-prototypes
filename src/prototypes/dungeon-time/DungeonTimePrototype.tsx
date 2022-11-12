import "./DungeonTimePrototype.css";
import { ActionType } from "./types";
import { Button, Checkbox } from "react-daisyui";
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
import Icon, { iconMap, IconType } from "./components/Icon";
import Toggle from "../../components/Toggle";
import universalPaperSizes, { cardSizes } from "../../components/print/paperSizes";
import RelicsPages from "./components/print/RelicsPages";
import Playtesters from "./components/Playtesters";
import Credits from "./components/Credits";
import RulesPages from "./components/print/RulesPages";
import Paper from "../../components/print/Paper/Paper";
import clsx from "clsx";
import Changelog from "./components/Changelog";
import ActionCardBack from "./components/gameComponents/ActionCardBack";

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

const sections = [
    { slug: "changelog", label: "Changelog", Component: Changelog, isVisibleByDefault: true },
    { slug: "rules", label: "Rules", Component: RulesPages, isVisibleByDefault: true },
    { slug: "stages", label: "Stages", Component: StagesPages, isVisibleByDefault: true },
    { slug: "characters", label: "Characters", Component: CharactersPages, isVisibleByDefault: true },
    { slug: "enemies", label: "Enemies", Component: EnemyPages, isVisibleByDefault: true },
    { slug: "enemyIntents", label: "Enemy Intents", Component: EnemyIntentPages, isVisibleByDefault: true },
    {
        slug: "battleEncounters",
        label: "Battle Encounters",
        Component: BattleEncounterPages,
        isVisibleByDefault: true,
    },
    { slug: "consumables", label: "Consumables", Component: ConsumablesPages, isVisibleByDefault: true },
    { slug: "relics", label: "Relics", Component: RelicsPages, isVisibleByDefault: true },
    { slug: "actions", label: "Actions", Component: ActionCardPages, isVisibleByDefault: true },
];

export default function DungeonTimePrototype() {
    const [, setRerenderCount] = useState(0);

    const [sectionVisibility, setSectionVisibility] = useState(
        sections.map(({ isVisibleByDefault }) => isVisibleByDefault)
    );

    const refreshData = () => {
        clearSheetDataCache();
        setTimeout(() => {
            setRerenderCount((count) => count + 1);
        }, 1000);
    };

    return (
        <div
            className="h-screen print:h-full w-screen relative overflow-auto bg-acid-5 print:bg-white text-lightning-1 flex flex-col items-stretch"
            data-theme="DungeonTimePrototype"
        >
            <div
                className="sticky top-0 left-0 z-50 py-1 md:py-5 px-2 md:px-10 bg-opacity-90 print:hidden"
                style={{
                    background:
                        "linear-gradient(to bottom, rgb(255 254 235 / var(--tw-bg-opacity)) 80%, transparent 100%)",
                }}
            >
                <div className="top-0 flex flex-row gap-4 justify-between text-blood-2">
                    <h1 className="font-dtHeading text-2xl flex flex-row flex-wrap min-w-fit">
                        <Icon icon="warlordHelmet" className="h-8" />
                        &ensp;Dungeon Time
                    </h1>
                    <div className="flex flex-row justify-end gap-x-2 gap-y-1 content-end flex-wrap-reverse items-center">
                        <Button onClick={refreshData} size="xs" color="primary">
                            Refresh Data
                        </Button>
                        <Button href="/" size="xs" color="info">
                            Prototypes
                        </Button>
                    </div>
                </div>
                <div className="flex flex-row justify-start gap-x-2 gap-y-0 mb-5 content-start items-center flex-wrap ">
                    {sections.map(({ label, slug }, sectionIndex) => {
                        return (
                            <div key={slug} className="flex flex-row gap-x-1 content-start items-center flex-wrap">
                                <a
                                    href={"#" + slug}
                                    className="underline hover:no-underline text-fire-1 hover:text-fire-2"
                                    onClick={() =>
                                        setSectionVisibility((sectionVisibility) => {
                                            const newSectionVisibility = [...sectionVisibility];
                                            newSectionVisibility[sectionIndex] = true;
                                            return newSectionVisibility;
                                        })
                                    }
                                >
                                    {label}
                                </a>
                                <Checkbox
                                    size="sm"
                                    checked={sectionVisibility[sectionIndex]}
                                    onClick={() =>
                                        setSectionVisibility((sectionVisibility) => {
                                            const newSectionVisibility = [...sectionVisibility];
                                            newSectionVisibility[sectionIndex] = !newSectionVisibility[sectionIndex];
                                            return newSectionVisibility;
                                        })
                                    }
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="px-2 pb-2 md:px-10 md:pb-10 print:p-0">
                <div>
                    <Toggle buttonContent="Show Icons" initialCollapsed>
                        <div className="flex flex-row flex-wrap gap-2 p-8 bg-white rounded-md shadow-lg mb-2">
                            {Object.keys(iconMap).map((iconKey) => (
                                <div key={iconKey} className="flex flex-col gap-1 items-center">
                                    <Icon icon={iconKey as IconType} className="h-8" />
                                    <div className="text-sm">{iconKey}</div>
                                </div>
                            ))}
                        </div>
                    </Toggle>
                    <Toggle buttonContent="Show Card Sizes" initialCollapsed>
                        <div className="flex flex-row flex-wrap gap-5 mb-2">
                            {(Object.keys(cardSizes) as (keyof typeof cardSizes)[])
                                .sort(
                                    (a, b) =>
                                        cardSizes[a].mm[0] * 1000 +
                                        cardSizes[a].mm[1] -
                                        (cardSizes[b].mm[0] * 1000 + cardSizes[b].mm[1])
                                )
                                .map((cardSizeName) => (
                                    <Paper
                                        size={cardSizeName}
                                        key={cardSizeName}
                                        className={clsx(
                                            "flex flex-col gap-1 items-center justify-center bg-white rounded-md shadow-md",
                                            cardSizeName === "Circle" && "rounded-full"
                                        )}
                                    >
                                        <div className="text-sm">{cardSizes[cardSizeName].mm.join(" x ")}mm</div>
                                        <div className="text-sm">
                                            A4:{" "}
                                            {Math.floor(universalPaperSizes.A4.mm[0] / cardSizes[cardSizeName].mm[0])} x{" "}
                                            {Math.floor(universalPaperSizes.A4.mm[1] / cardSizes[cardSizeName].mm[1])}
                                        </div>
                                        <div className="text-sm">{cardSizeName}</div>
                                    </Paper>
                                ))}
                        </div>
                    </Toggle>
                </div>

                <div className="flex gap-5 flex-wrap print:block max-w-screen">
                    {sections.map(({ Component, slug }, sectionIndex) => {
                        return (
                            sectionVisibility[sectionIndex] && (
                                <ErrorBoundary key={slug}>
                                    <div className="w-full flex gap-5 flex-wrap print:block relative">
                                        <div id={slug} className="absolute -top-32" />
                                        <Component />
                                    </div>
                                </ErrorBoundary>
                            )
                        );
                    })}
                </div>

                <div className="flex flex-row flex-wrap gap-2 p-10 bg-stone-700">
                    <ActionCardBack />
                </div>
                <Playtesters />
                <Credits />
            </div>
        </div>
    );
}
