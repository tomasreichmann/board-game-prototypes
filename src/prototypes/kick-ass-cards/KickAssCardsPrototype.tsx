import "./KickAssCardsPrototype.css";
import { Outlet } from "react-router-dom";
import PrintRoute from "./routes/PrintRoute";
import EncountersRoute from "./routes/EncountersRoute";
import { Button } from "react-daisyui";
import Icon from "./components/Icon";
import { PropsWithChildren } from "react";
import { RouteDefinition } from "../../routeTypes";
import InfoRoute from "./routes/InfoRoute";
import EncounterRoute from "./routes/EncounterRoute";
import ScreenRoute from "./routes/ScreenRoute";

export const kickAssCardsPath = "/kick-ass-cards";

export const kickAssCardsSubRoutes: RouteDefinition[] = [
    {
        name: "Kick Ass Cards",
        path: kickAssCardsPath + "/",
        Component: InfoRoute,
    },
    {
        name: "Print",
        path: kickAssCardsPath + "/print",
        Component: PrintRoute,
    },
    {
        name: "Encounters",
        path: kickAssCardsPath + "/encounters",
        Component: EncountersRoute,
        children: [
            {
                name: "Encounter",
                path: kickAssCardsPath + "/encounters/:encounterSlug",
                Component: EncounterRoute,
            },
        ],
    },
    {
        name: "Screen",
        path: kickAssCardsPath + "/screen",
        Component: ScreenRoute,
    },
];

export default function KickAssCards({ children }: PropsWithChildren) {
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
                <div className="top-0 flex flex-row flex-wrap gap-x-4 gap-y-2 text-kac-bone">
                    <h1 className="font-kacLogo text-3xl min-w-fit flex-1">
                        <a
                            href={kickAssCardsPath}
                            className="text-inherit font-inherit inline-flex flex-row flex-wrap hover:text-kac-bone-light transition-colors"
                        >
                            <Icon icon="kickAssCards" className="h-10" />
                            Kick Ass Cards
                        </a>
                    </h1>
                    <div className="flex flex-row flex-wrap gap-4 items-center">
                        <Button href={kickAssCardsPath + "/print"} size="xs" color="secondary">
                            Print
                        </Button>
                        <Button href={kickAssCardsPath + "/encounters"} size="xs" color="secondary">
                            Encounters
                        </Button>
                        <Button href={kickAssCardsPath + "/screen"} size="xs" color="secondary">
                            Screen
                        </Button>
                        <Button href="/" size="xs" color="secondary">
                            Prototypes
                        </Button>
                    </div>
                </div>
            </div>
            <Outlet />
            {children}
        </div>
    );
}
