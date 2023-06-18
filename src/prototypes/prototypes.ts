import KickAssCardsPrototype from "./kick-ass-cards/KickAssCardsPrototype";
import { kickAssCardsPath, kickAssCardsSubRoutes } from "./kick-ass-cards/routes";
import DungeonTimePrototype from "./dungeon-time/DungeonTimePrototype";
import { RouteDefinition } from "../routeTypes";
import JustDwarvesPrototype, {
    justDwarvesName,
    justDwarvesPath,
    justDwarvesSubRoutes,
} from "./just-dwarves/JustDwarvesPrototype";

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
    {
        name: justDwarvesName,
        Component: JustDwarvesPrototype,
        path: justDwarvesPath,
        children: justDwarvesSubRoutes,
    },
];

export default prototypes;
