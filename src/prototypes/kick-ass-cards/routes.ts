import ComponentsRoute from "./components/routes/ComponentsRoute";
import EncounterRoute from "./components/routes/EncounterRoute";
import EncountersRoute from "./components/routes/EncountersRoute";
import InfoRoute from "./components/routes/InfoRoute";
import MachimagikaRoute from "./components/routes/PlayRoute";
import PrintRoute from "./components/routes/PrintRoute";
import ScreenRoute from "./components/routes/ScreenRoute";
import PlaygroundRoute from "./components/routes/PlaygroundRoute";
import SmartDocsRoute from "./components/routes/SmartDocsRoute";

import { RouteDefinition } from "../../routeTypes";
import SmartDocRoute from "./components/routes/SmartDocRoute";
import WorldBuilderRoute from "./components/routes/WorldBuilderRoute";
import SettingsRoute from "./components/routes/SettingsRoute";

export const kickAssCardsPath = "/kick-ass-cards";
export const kickAssCardsScreenStorageKey = "kick-ass-cards-screen";
export const kickAssCardsPrintStorageKey = "kick-ass-cards-print";
export const smartDocsPath = kickAssCardsPath + "/smart-docs";

export const sidebarPath = "__sidebar";

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
        name: "Smart Doc",
        path: smartDocsPath + "/:path",
        Component: SmartDocRoute,
    },
    {
        name: "Smart Docs",
        path: smartDocsPath,
        Component: SmartDocsRoute,
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
        name: "Playground",
        path: kickAssCardsPath + "/playground",
        Component: PlaygroundRoute,
    },
    {
        name: "World Builder",
        path: kickAssCardsPath + "/world-builder",
        Component: WorldBuilderRoute,
    },
    {
        name: "Machimagika",
        path: kickAssCardsPath + "/machimagika",
        Component: MachimagikaRoute,
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
        name: "Settings",
        path: kickAssCardsPath + "/settings",
        Component: SettingsRoute,
    },
];
