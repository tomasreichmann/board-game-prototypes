import React from "react";
import { Button, Checkbox } from "react-daisyui";
import { useState } from "react";
import ErrorBoundary from "../../../components/ErrorBoundary";
import Icon, { iconMap, IconType } from "../components/Icon";
import Toggle from "../../../components/Toggle";
import universalPaperSizes, { cardSizes } from "../../../components/print/paperSizes";
import Playtesters from "../components/Playtesters";
import Credits from "../components/Credits";
import Paper from "../../../components/print/Paper/Paper";
import clsx from "clsx";
import Changelog from "../components/Changelog";
import OutcomeCardPages from "../components/print/OutcomeCardPages";
import ColorList from "../components/ColorList";
import PlayerCharacterCardPages from "../components/print/PlayerCharacterCardPages";
import AssetCardPages from "../components/print/AssetCardPages";
import ActorCardPages from "../components/print/ActorCardPages";
import ClockPages from "../components/print/ClockPages";
import PlayerBoxPages from "../components/print/PlayerBoxPages";

const defaultSectionVisibility = true;

const sections = [
    {
        slug: "Player Character Card".replace(" ", "-"),
        label: "Player Character Card",
        Component: PlayerCharacterCardPages,
        isVisibleByDefault: defaultSectionVisibility,
    },
    { slug: "Outcomes", label: "Outcomes", Component: OutcomeCardPages, isVisibleByDefault: defaultSectionVisibility },
    { slug: "Actors", label: "Actors", Component: ActorCardPages, isVisibleByDefault: defaultSectionVisibility },
    { slug: "Clocks", label: "Clocks", Component: ClockPages, isVisibleByDefault: defaultSectionVisibility },
    { slug: "Assets", label: "Assets", Component: AssetCardPages, isVisibleByDefault: defaultSectionVisibility },
    { slug: "Boxes", label: "Boxes", Component: PlayerBoxPages, isVisibleByDefault: defaultSectionVisibility },
];

export default function PrintRoute() {
    const [sectionVisibility, setSectionVisibility] = useState(
        sections.map(({ isVisibleByDefault }) => isVisibleByDefault)
    );

    return (
        <>
            <div className="flex flex-row justify-start mt-2 gap-x-4 gap-y-0 mb-5 content-start items-center flex-wrap ">
                {sections.map(({ label, slug }, sectionIndex) => {
                    return (
                        <div key={slug} className="flex flex-row gap-x-1 content-start items-center flex-wrap text-md">
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
            <div className="pb-2 md:pb-10 print:p-0">
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
            ,
        </>
    );
}
