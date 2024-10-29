import MightyDecksPrototype from "./kick-ass-cards/KickAssCardsPrototype";
import { mightyDecksPath, mightyDecksSubRoutes } from "./kick-ass-cards/components/routes/routes";
import DungeonTimePrototype from "./dungeon-time/DungeonTimePrototype";
import { RouteDefinition } from "../routeTypes";
import JustDwarvesPrototype, {
    justDwarvesName,
    justDwarvesPath,
    justDwarvesSubRoutes,
} from "./just-dwarves/JustDwarvesPrototype";
import { perspectiveViewPrototypeRoute } from "./perspective-view/PerspectiveViewPrototype";
import { subViewPrototypeRoute } from "./sub-view/SubViewPrototype";

const prototypes: RouteDefinition[] = [
    {
        name: "Dungeon Time",
        Component: DungeonTimePrototype,
        path: "/dungeon-time",
    },
    {
        name: "Mighty Decks",
        Component: MightyDecksPrototype,
        path: mightyDecksPath,
        children: mightyDecksSubRoutes,
    },
    {
        name: justDwarvesName,
        Component: JustDwarvesPrototype,
        path: justDwarvesPath,
        children: justDwarvesSubRoutes,
    },
    perspectiveViewPrototypeRoute,
    subViewPrototypeRoute,
];

export default prototypes;
