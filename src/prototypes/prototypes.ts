import KickAssCardsPrototype, { kickAssCardsPath } from "./kick-ass-cards/KickAssCardsPrototype";
import DungeonTimePrototype from "./dungeon-time/DungeonTimePrototype";

const prototypes = [
    {
        name: "Dungeon Time",
        Component: DungeonTimePrototype,
        path: "/dungeon-time",
    },
    {
        name: "Kick Ass Cards",
        Component: KickAssCardsPrototype,
        path: kickAssCardsPath,
    },
];

export default prototypes;
