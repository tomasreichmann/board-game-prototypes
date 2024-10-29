import ComponentsRoute from "./ComponentsRoute";
import EncounterRoute from "./EncounterRoute";
import EncountersRoute from "./EncountersRoute";
import InfoRoute from "./InfoRoute";
import MachimagikaRoute from "./PlayRoute";
import PrintRoute from "./PrintRoute";
import ScreenRoute from "./ScreenRoute";
import PlaygroundRoute from "./PlaygroundRoute";
/* import SmartDocsRoute from "./SmartDocsRoute";
import SmartDocRoute from "./SmartDocRoute"; */

import { RouteDefinition } from "../../../../routeTypes";
import WorldBuilderRoute from "./WorldBuilderRoute";
import SettingsRoute from "./SettingsRoute";
import AdventuresRoute from "./AdventuresRoute";
import AdventureRoute from "./AdventureRoute";
import DocumentRoute from "./DocumentRoute";
import PreparingTheGameRoute from "./PreparingTheGameRoute";
import GenerateComponentRoute from "./GenerateComponentRoute";

export const mightyDecksPath = "/mighty-decks";
export const mightyDecksScreenStorageKey = "mighty-decks-screen";
export const mightyDecksPrintStorageKey = "mighty-decks-print";
export const smartDocsPath = mightyDecksPath + "/smart-docs";
export const adventuresPath = mightyDecksPath + "/adventures";

export const sidebarPath = "__sidebar";

export const mightyDecksSubRoutes: RouteDefinition[] = [
    {
        name: "Mighty Decks",
        path: mightyDecksPath + "/",
        hideFromNav: true,
        Component: InfoRoute,
    },
    {
        name: "Preparing the Game",
        path: mightyDecksPath + "/preparing-the-game",
        Component: PreparingTheGameRoute,
    },
    {
        name: "Components",
        path: mightyDecksPath + "/components",
        Component: ComponentsRoute,
    },
    {
        name: "Generate Component",
        path: mightyDecksPath + "/generate-component",
        Component: GenerateComponentRoute,
    },
    {
        name: "Adventure",
        path: adventuresPath + "/:adventureId/docs/:documentId",
        hideFromNav: true,
        Component: DocumentRoute,
    },
    {
        name: "Adventure",
        path: adventuresPath + "/:adventureId",
        hideFromNav: true,
        Component: AdventureRoute,
    },
    {
        name: "Adventures",
        path: adventuresPath,
        Component: AdventuresRoute,
    },
    /* {
        name: "Smart Doc",
        path: smartDocsPath + "/:path",
        hideFromNav: true,
        Component: SmartDocRoute,
    },
    {
        name: "Smart Docs",
        path: smartDocsPath,
        Component: SmartDocsRoute,
    }, */
    {
        name: "Screen",
        path: mightyDecksPath + "/screen",
        Component: ScreenRoute,
    },
    {
        name: "Print",
        path: mightyDecksPath + "/print",
        Component: PrintRoute,
    },
    {
        name: "Playground",
        path: mightyDecksPath + "/playground",
        Component: PlaygroundRoute,
    },
    {
        name: "World Builder",
        path: mightyDecksPath + "/world-builder",
        Component: WorldBuilderRoute,
    },
    {
        name: "Machimagika",
        path: mightyDecksPath + "/machimagika",
        Component: MachimagikaRoute,
    },
    {
        name: "Encounters",
        path: mightyDecksPath + "/encounters",
        Component: EncountersRoute,
        children: [
            {
                name: "Encounter",
                path: mightyDecksPath + "/encounters/:encounterSlug",
                Component: EncounterRoute,
            },
        ],
    },
    {
        name: "Settings",
        path: mightyDecksPath + "/settings",
        Component: SettingsRoute,
    },
];

export const mightyDecksNavigationSubRoutes = mightyDecksSubRoutes.filter((route) => !route?.hideFromNav);
