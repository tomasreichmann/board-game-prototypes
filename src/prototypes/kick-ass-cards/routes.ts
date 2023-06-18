import ComponentsRoute from "./components/routes/ComponentsRoute";
import EncounterRoute from "./components/routes/EncounterRoute";
import EncountersRoute from "./components/routes/EncountersRoute";
import InfoRoute from "./components/routes/InfoRoute";
import PlayRoute from "./components/routes/PlayRoute";
import PrintRoute from "./components/routes/PrintRoute";
import ScreenRoute from "./components/routes/ScreenRoute";

import { RouteDefinition } from "../../routeTypes";

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
    {
        name: "Play",
        path: kickAssCardsPath + "/play",
        Component: PlayRoute,
    },
];
