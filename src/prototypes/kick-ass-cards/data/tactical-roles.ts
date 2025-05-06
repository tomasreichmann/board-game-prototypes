export type ActionType = {
    type: "melee" | "ranged" | "direct" | "heal";
    effect: (EffectType | JoinEnum)[];
    splash?: boolean;
    range?: string;
};

export type EffectType = {
    effectType:
        | "toughness"
        | "injury"
        | "distress"
        | "burning"
        | "freezing"
        | "stuck"
        | "hindered"
        | "complication"
        | "boost";
    amount: number;
};
export enum JoinEnum {
    AND = "+",
    OR = "|",
}

export type TacticalRoleType = {
    slug: string;
    name: string;
    deck: string;
    toughness?: number;
    speed?: number;
    special?: string;
    actions?: ActionType[];
    count?: number;
};

export const tacticalSpecialsMap: Record<string, TacticalRoleType> = {
    tough: {
        slug: "tough",
        name: "Tough",
        deck: "universal",
        count: 1,
        special: "+[toughness][toughness]",
    },
    shielded: {
        slug: "shielded",
        name: "Shielded",
        deck: "universal",
        count: 4,
        special: "-1[injury] taken",
    },
    armored: {
        slug: "armoured",
        name: "Armoured",
        deck: "universal",
        count: 1,
        special: "-2[injury] taken",
    },
    dangerous: {
        slug: "dangerous",
        name: "Dangerous",
        deck: "universal",
        count: 1,
        special: "[melee]|[ranged] deal +2[injury]",
    },
    burning: {
        slug: "burning",
        name: "Burning",
        deck: "universal",
        count: 1,
        special: "[melee]|[ranged] deal +1[burning]",
    },
    fiery: {
        slug: "fiery",
        name: "Fiery",
        deck: "universal",
        count: 4,
        special: "[melee]|[ranged] deal [burning] instead",
    },
    freezing: {
        slug: "freezing",
        name: "Freezing",
        deck: "universal",
        count: 1,
        special: "[melee]|[ranged] deal +1[freezing]",
    },
    icy: {
        slug: "icy",
        name: "Icy",
        deck: "universal",
        count: 4,
        special: "[melee]|[ranged] deal [freezing] instead",
    },
    enerving: {
        slug: "enerving",
        name: "Enerving",
        deck: "universal",
        count: 1,
        special: "[melee]|[ranged] also deal +[distress]",
    },
    corrupting: {
        slug: "corrupting",
        name: "Corrupting",
        deck: "universal",
        count: 4,
        special: "[melee]|[ranged] deal [distress] instead",
    },
    fast: {
        slug: "fast",
        name: "Fast",
        deck: "universal",
        count: 2,
        // speed: 2,
        special: "+1[speed]",
    },
    harassing: {
        slug: "harassing",
        name: "Harassing",
        deck: "universal",
        count: 1,
        special: "[melee]|[ranged] also deal +[complication]",
    },
    slowing: {
        slug: "slowing",
        name: "Slowing",
        deck: "universal",
        count: 1,
        special: "[melee]|[ranged] also deal +[hindered]",
    },
    elemental: {
        slug: "elemental",
        name: "Elemental",
        deck: "universal",
        count: 4,
        special: "[melee]|[ranged] can deal [freezing] or [burning]",
    },
    charging: {
        slug: "charging",
        name: "Charging",
        deck: "universal",
        count: 1,
        special: "[melee] deals +2[injury] when entering a zone",
    },
    suicide: {
        slug: "suicide",
        name: "Suicide",
        deck: "universal",
        count: 4,
        special: "can die and deal +2[injury][splash][range]0",
    },
    grabbing: {
        slug: "grabbing",
        name: "Grabbing",
        deck: "universal",
        count: 2,
        special: "[melee] also deals +1[stuck]",
    },
    webbing: {
        slug: "webbing",
        name: "Webbing",
        deck: "universal",
        count: 2,
        special: "[ranged] also deals +[stuck][splash]",
    },
    healing: {
        slug: "healing",
        name: "Healing",
        deck: "universal",
        count: 2,
        special: "[heal] 2[injury] from one ally in the zone",
    },
    restoring: {
        slug: "restoring",
        name: "Restoring",
        deck: "universal",
        count: 1,
        special: "[heal] 1[injury] from all allies in the zone",
    },
    regenerating: {
        slug: "regenerating",
        name: "Regenerating",
        deck: "universal",
        count: 4,
        special: "[heal] 1[injury] at the end of it's turn",
    },
};

export const tacticalSpecials = Object.values(tacticalSpecialsMap);

const tacticalRolesMap: Record<string, TacticalRoleType> = {
    pawn: {
        slug: "pawn",
        name: "Pawn",
        deck: "universal",
        count: 4,
        toughness: 1,
        speed: 1,
        actions: [{ type: "melee", effect: [{ effectType: "injury", amount: 1 }] }],
    },
    minion: {
        slug: "minion",
        name: "Minion",
        deck: "universal",
        count: 4,
        toughness: 2,
        speed: 1,
        actions: [{ type: "melee", effect: [{ effectType: "injury", amount: 1 }] }],
    },
    thug: {
        slug: "thug",
        name: "Thug",
        deck: "universal",
        count: 4,
        toughness: 2,
        speed: 1,
        actions: [{ type: "melee", effect: [{ effectType: "injury", amount: 2 }] }],
    },
    brute: {
        slug: "brute",
        name: "Brute",
        deck: "universal",
        count: 2,
        toughness: 3,
        speed: 1,
        actions: [
            { type: "melee", effect: [{ effectType: "injury", amount: 2 }] },
            { type: "melee", effect: [{ effectType: "injury", amount: 1 }], splash: true },
        ],
    },
    tank: {
        slug: "tank",
        name: "Tank",
        deck: "universal",
        count: 2,
        toughness: 6,
        speed: 1,
        actions: [{ type: "melee", effect: [{ effectType: "injury", amount: 2 }] }],
    },
    champion: {
        slug: "champion",
        name: "Champion",
        deck: "universal",
        count: 1,
        toughness: 4,
        speed: 1,
        actions: [
            { type: "melee", effect: [{ effectType: "injury", amount: 3 }] },
            { type: "direct", effect: [{ effectType: "distress", amount: 2 }], splash: true },
        ],
    },
    assassin: {
        slug: "assassin",
        name: "Assassin",
        deck: "universal",
        count: 1,
        toughness: 2,
        speed: 1,
        actions: [{ type: "melee", effect: [{ effectType: "injury", amount: 4 }] }],
    },
    slinger: {
        slug: "slinger",
        name: "Slinger",
        deck: "universal",
        count: 4,
        toughness: 2,
        speed: 1,
        actions: [
            { type: "ranged", effect: [{ effectType: "injury", amount: 1 }], range: "1-2" },
            { type: "melee", effect: [{ effectType: "injury", amount: 1 }] },
        ],
    },
    skirmisher: {
        slug: "skirmisher",
        name: "Skirmisher",
        deck: "universal",
        count: 4,
        toughness: 2,
        speed: 1,
        actions: [
            { type: "melee", effect: [{ effectType: "injury", amount: 2 }] },
            { type: "ranged", effect: [{ effectType: "injury", amount: 2 }], range: "1-2" },
        ],
    },
    ranger: {
        slug: "ranger",
        name: "Ranger",
        deck: "universal",
        count: 4,
        toughness: 3,
        speed: 1,
        actions: [
            { type: "melee", effect: [{ effectType: "injury", amount: 2 }] },
            { type: "ranged", effect: [{ effectType: "injury", amount: 2 }], range: "1-2" },
        ],
    },
    stalker: {
        slug: "stalker",
        name: "Stalker",
        deck: "universal",
        count: 2,
        toughness: 2,
        speed: 1,
        actions: [
            { type: "melee", effect: [{ effectType: "injury", amount: 3 }] },
            { type: "ranged", effect: [{ effectType: "injury", amount: 3 }], range: "1-2" },
        ],
    },
    commando: {
        slug: "commando",
        name: "Commando",
        deck: "universal",
        count: 2,
        toughness: 3,
        speed: 1,
        actions: [
            { type: "melee", effect: [{ effectType: "injury", amount: 3 }] },
            { type: "ranged", effect: [{ effectType: "injury", amount: 3 }], range: "1-2" },
        ],
    },
    marksman: {
        slug: "marksman",
        name: "Marksman",
        deck: "universal",
        count: 2,
        toughness: 2,
        speed: 1,
        actions: [
            { type: "ranged", effect: [{ effectType: "injury", amount: 3 }], range: "1-3" },
            { type: "melee", effect: [{ effectType: "injury", amount: 1 }] },
        ],
    },
    sniper: {
        slug: "sniper",
        name: "Sniper",
        deck: "universal",
        count: 1,
        toughness: 2,
        speed: 1,
        actions: [
            { type: "ranged", effect: [{ effectType: "injury", amount: 4 }], range: "1-∞" },
            { type: "melee", effect: [{ effectType: "injury", amount: 1 }] },
        ],
    },
    grenadier: {
        slug: "grenadier",
        name: "Grenadier",
        deck: "universal",
        count: 2,
        toughness: 2,
        speed: 1,
        actions: [
            {
                type: "ranged",
                effect: [{ effectType: "injury", amount: 2 }],
                splash: true,
                range: "1",
            },
            { type: "melee", effect: [{ effectType: "injury", amount: 1 }] },
        ],
    },
    bomber: {
        slug: "bomber",
        name: "Bomber",
        deck: "universal",
        count: 1,
        toughness: 3,
        speed: 1,
        actions: [
            {
                type: "ranged",
                effect: [{ effectType: "injury", amount: 3 }],
                splash: true,
                range: "0",
            },
        ],
    },
    artillery: {
        slug: "artillery",
        name: "Artillery",
        deck: "universal",
        count: 2,
        toughness: 2,
        speed: 1,
        actions: [
            {
                type: "ranged",
                effect: [{ effectType: "injury", amount: 2 }],
                splash: true,
                range: "1-∞",
            },
        ],
    },
};

export default Object.values(tacticalRolesMap);
