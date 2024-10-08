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

export const kickAssCardsPath = "/kick-ass-cards";
export const kickAssCardsScreenStorageKey = "kick-ass-cards-screen";
export const kickAssCardsPrintStorageKey = "kick-ass-cards-print";
export const smartDocsPath = kickAssCardsPath + "/smart-docs";
export const adventuresPath = kickAssCardsPath + "/adventures";

export const sidebarPath = "__sidebar";

export const kickAssCardsSubRoutes: RouteDefinition[] = [
    {
        name: "Mighty Decks",
        path: kickAssCardsPath + "/",
        hideFromNav: true,
        Component: InfoRoute,
    },
    {
        name: "Preparing the Game",
        path: kickAssCardsPath + "/preparing-the-game",
        Component: PreparingTheGameRoute,
    },
    {
        name: "Components",
        path: kickAssCardsPath + "/components",
        Component: ComponentsRoute,
    },
    {
        name: "Generate Component",
        path: kickAssCardsPath + "/generate-component",
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

export const kickAssCardsNavigationSubRoutes = kickAssCardsSubRoutes.filter((route) => !route?.hideFromNav);
