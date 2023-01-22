import "./KickAssCardsPrototype.css";
import { Outlet } from "react-router-dom";
import ComponentsRoute from "./routes/ComponentsRoute";
import EncountersRoute from "./routes/EncountersRoute";
import { Button } from "react-daisyui";
import Icon from "./components/Icon";
import { PropsWithChildren } from "react";
import { RouteDefinition } from "../../routeTypes";
import InfoRoute from "./routes/InfoRoute";
import EncounterRoute from "./routes/EncounterRoute";
import ScreenRoute from "./routes/ScreenRoute";
import PrintRoute from "./routes/PrintRoute";

export const kickAssCardsPath = "/kick-ass-cards";

export const kickAssCardsScreenStorageKey = "kick-ass-cards-screen";
export const kickAssCardsPrintStorageKey = "kick-ass-cards-print";

export const kickAssCardsSubRoutes: RouteDefinition[] = [
    {
        name: "Kick Ass Cards",
        path: kickAssCardsPath + "/",
        Component: InfoRoute,
    },
    {
        name: "Components",
        path: kickAssCardsPath + "/components",
        Component: ComponentsRoute,
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
    {
        name: "Print",
        path: kickAssCardsPath + "/print",
        Component: PrintRoute,
    },
];

export default function KickAssCards({ children }: PropsWithChildren) {
    return (
        <div
            className="h-screen print:h-auto relative flex flex-col items-stretch overflow-auto bg-kac-blood-dark print:bg-white text-kac-steel-light print:text-kac-steel-dark font-kacBody"
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
                        {kickAssCardsSubRoutes.slice(1).map(({ name, path }) => (
                            <Button key={path} href={path} size="xs" color="secondary">
                                {name}
                            </Button>
                        ))}
                        <Button href="/" size="xs" color="info">
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
