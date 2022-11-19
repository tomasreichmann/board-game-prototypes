import KickAssCardsPrototype, { kickAssCardsPath, kickAssCardsSubRoutes } from "./kick-ass-cards/KickAssCardsPrototype";
import DungeonTimePrototype from "./dungeon-time/DungeonTimePrototype";
import { RouteDefinition } from "../routeTypes";

const prototypes: RouteDefinition[] = [
    {
        name: "Dungeon Time",
        Component: DungeonTimePrototype,
        path: "/dungeon-time",
    },
    {
        name: "Kick Ass Cards",
        Component: KickAssCardsPrototype,
        path: kickAssCardsPath,
        children: kickAssCardsSubRoutes,
    },
];

export default prototypes;
