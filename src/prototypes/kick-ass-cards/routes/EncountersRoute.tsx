import { Button, Checkbox } from "react-daisyui";
import { useState } from "react";
import ErrorBoundary from "../../../components/ErrorBoundary";
import Icon from "../components/Icon";
import Playtesters from "../components/Playtesters";
import Credits from "../components/Credits";
import EncounterCardPages from "../components/print/EncounterCardPages";

const defaultSectionVisibility = true;

const sections = [
    {
        slug: "Encounters",
        label: "Encounters",
        Component: EncounterCardPages,
        isVisibleByDefault: defaultSectionVisibility,
    },
];

export default function PrintRoute() {
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
