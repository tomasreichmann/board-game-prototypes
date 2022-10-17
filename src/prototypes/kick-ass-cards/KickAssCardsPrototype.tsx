import "./KickAssCardsPrototype.css";
import { Button, Checkbox } from "react-daisyui";
import { useState } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import Icon, { iconMap, IconType } from "./components/Icon";
import Toggle from "../../components/Toggle";
import universalPaperSizes, { cardSizes } from "../../components/print/paperSizes";
import Playtesters from "./components/Playtesters";
import Credits from "./components/Credits";
import Paper from "../../components/print/Paper/Paper";
import clsx from "clsx";
import Changelog from "./components/Changelog";
import OutcomeCardPages from "./components/print/OutcomeCardPages";
import ColorList from "./components/ColorList";
import PlayerCharacterCardPages from "./components/print/PlayerCharacterCardPages";
import AssetCardPages from "./components/print/AssetCardPages";

const sections = [
    { slug: "changelog", label: "Changelog", Component: Changelog, isVisibleByDefault: true },
    { slug: "assets", label: "Assets", Component: AssetCardPages, isVisibleByDefault: true },
    {
        slug: "player-character-card",
        label: "Player Character Card",
        Component: PlayerCharacterCardPages,
        isVisibleByDefault: true,
    },
    { slug: "outcomes", label: "Outcomes", Component: OutcomeCardPages, isVisibleByDefault: true },
];

export default function KickAssCards() {
    const [sectionVisibility, setSectionVisibility] = useState(
        sections.map(({ isVisibleByDefault }) => isVisibleByDefault)
    );

    return (
        <div
            className="h-screen print:h-full w-screen relative overflow-auto bg-kac-blood-dark print:bg-white text-kac-steel-light print:text-kac-steel-dark flex flex-col items-stretch font-kacBody"
            data-theme="KickAssCardsPrototype"
        >
            <div
                className="sticky top-0 left-0 z-50 py-1 md:py-5 px-2 md:px-10 bg-opacity-90 bg-blend-multiply print:hidden"
                style={{
                    background:
                        "linear-gradient(to bottom, rgb(84 20 35 / var(--tw-bg-opacity)) 80%, transparent 100%)",
                }}
            >
                <div className="top-0 flex flex-row gap-4 justify-between text-kac-bone">
                    <h1 className="font-kacHeading text-3xl flex flex-row flex-wrap min-w-fit">
                        <Icon icon="kickAssCards" className="h-10" />
                        Kick Ass Cards
                    </h1>
                    <Button href="/" size="xs" color="secondary">
                        Prototypes
                    </Button>
                </div>
                <div className="flex flex-row justify-start gap-x-4 gap-y-0 mb-5 content-start items-center flex-wrap ">
                    {sections.map(({ label, slug }, sectionIndex) => {
                        return (
                            <div
                                key={slug}
                                className="flex flex-row gap-x-1 content-start items-center flex-wrap text-md"
                            >
                                <a
                                    href={"#" + slug}
                                    className="underline hover:no-underline text-kac-monster hover:text-kac-monster-light"
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
                                    color="secondary"
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
                    <Toggle buttonContent="Show Colors" initialCollapsed>
                        <ColorList />
                    </Toggle>
                    <Toggle buttonContent="Show Icons" initialCollapsed>
                        <div className="flex flex-row flex-wrap gap-2 p-8 bg-white text-kac-iron rounded-md shadow-lg mb-2">
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
                                            "flex flex-col gap-1 items-center justify-center bg-white text-kac-iron-light rounded-md shadow-md",
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
                <Playtesters />
                <Credits />
            </div>
        </div>
    );
}
