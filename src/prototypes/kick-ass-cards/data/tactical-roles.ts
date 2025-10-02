export type ActionType = {
    type: "melee" | "ranged" | "direct" | "heal";
    count?: number;
    effect: (EffectType | JoinEnum)[];
    splash?: boolean;
    range?: string;
};

export type EffectType = {
    effectType:
        | "toughness"
        | "shield"
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
    toughness?: string;
    toughnessBonus?: string;
    speed?: string;
    special?: string;
    actions?: ActionType[];
    actionBonuses?: (null | string)[];
    count?: number;
    isModifier?: boolean;
};

export const tacticalModifierMap = {
    tough: <TacticalRoleType>{
        slug: "tough",
        name: "Tough",
        deck: "base modifier",
        count: 1,
        //special: "+[toughness][toughness]",
        toughnessBonus: "+[toughness][toughness]",
        isModifier: true,
    },
    shielded: <TacticalRoleType>{
        slug: "shielded",
        name: "Shielded",
        deck: "base modifier",
        count: 4,
        toughnessBonus: "+[shield]",
        special: "-1[injury] taken",
        isModifier: true,
    },
    armored: <TacticalRoleType>{
        slug: "armoured",
        name: "Armoured",
        deck: "base modifier",
        count: 1,
        toughnessBonus: "+[shield][shield]",
        special: "-2[injury] taken",
        isModifier: true,
    },
    dangerous: <TacticalRoleType>{
        slug: "dangerous",
        name: "Dangerous",
        deck: "base modifier",
        count: 1,
        special: "Primary attack also deals +1[injury]",
        actionBonuses: ["+1[injury]"],
        isModifier: true,
    },
    burning: <TacticalRoleType>{
        slug: "burning",
        name: "Burning",
        deck: "base modifier",
        count: 1,
        special: "Primary attack also deals +[burning]",
        actionBonuses: ["+[burning]"],
        isModifier: true,
    },
    fiery: <TacticalRoleType>{
        slug: "fiery",
        name: "Fiery",
        deck: "base modifier",
        count: 4,
        special: "Secondary attack deals [burning] instead",
        actionBonuses: [null, "replace effect with [burning]"],
        isModifier: true,
    },
    freezing: <TacticalRoleType>{
        slug: "freezing",
        name: "Freezing",
        deck: "base modifier",
        count: 1,
        special: "Primary attack also deals +[freezing]",
        actionBonuses: ["+[freezing]"],
        isModifier: true,
    },
    icy: <TacticalRoleType>{
        slug: "icy",
        name: "Icy",
        deck: "base modifier",
        count: 4,
        special: "Secondary attack deals [freezing] instead",
        actionBonuses: [null, "replace effect with [freezing]"],
        isModifier: true,
    },
    enerving: <TacticalRoleType>{
        slug: "enerving",
        name: "Enerving",
        deck: "base modifier",
        count: 1,
        special: "Primary attack also deals +[distress]",
        actionBonuses: ["+[distress]"],
        isModifier: true,
    },
    corrupting: <TacticalRoleType>{
        slug: "corrupting",
        name: "Corrupting",
        deck: "base modifier",
        count: 4,
        special: "Secondary attack deals [distress] instead",
        actionBonuses: [null, "replace effect with [distress]"],
        isModifier: true,
    },
    fast: <TacticalRoleType>{
        slug: "fast",
        name: "Fast",
        deck: "base modifier",
        count: 2,
        speed: "+[speed]",
        special: "Moves an extra zone per turn",
        isModifier: true,
    },
    harassing: <TacticalRoleType>{
        slug: "harassing",
        name: "Harassing",
        deck: "base modifier",
        count: 1,
        special: "Secondary attack also deals +[complication]",
        actionBonuses: [null, "+[complication]"],
        isModifier: true,
    },
    slowing: <TacticalRoleType>{
        slug: "slowing",
        name: "Slowing",
        deck: "base modifier",
        count: 1,
        special: "Secondary attack also deals +[hindered]",
        actionBonuses: [null, "+[hindered]"],
        isModifier: true,
    },
    elemental: <TacticalRoleType>{
        slug: "elemental",
        name: "Elemental",
        deck: "base modifier",
        count: 4,
        special: "All attacks can deal [freezing] or [burning]",
        actionBonuses: ["+[freezing]/+[burning]", "+[freezing]/+[burning]"],
        isModifier: true,
    },
    charging: <TacticalRoleType>{
        slug: "charging",
        name: "Charging",
        deck: "base modifier",
        count: 1,
        special: "Primary attack also deals +[injury][injury] when entering a zone",
        actionBonuses: ["(+[injury][injury])"],
        isModifier: true,
    },
    suicide: <TacticalRoleType>{
        slug: "suicide",
        name: "Suicide",
        deck: "base modifier",
        count: 4,
        special: "Can die and deal [injury][injury][splash]",
        isModifier: true,
    },
    grabbing: <TacticalRoleType>{
        slug: "grabbing",
        name: "Grabbing",
        deck: "base modifier",
        count: 2,
        special: "[melee] also deals +[stuck]",
        isModifier: true,
    },
    webbing: <TacticalRoleType>{
        slug: "webbing",
        name: "Webbing",
        deck: "base modifier",
        count: 2,
        special: "[ranged] also deals +[stuck][splash]",
        isModifier: true,
    },
    healing: <TacticalRoleType>{
        slug: "healing",
        name: "Healing",
        deck: "base modifier",
        count: 2,
        special: "[heal] 2[injury] from one ally in the zone",
        isModifier: true,
    },
    restoring: <TacticalRoleType>{
        slug: "restoring",
        name: "Restoring",
        deck: "base modifier",
        count: 1,
        special: "[heal] an [injury] from all allies in the zone",
        isModifier: true,
    },
    regenerating: <TacticalRoleType>{
        slug: "regenerating",
        name: "Regenerating",
        deck: "base modifier",
        count: 4,
        special: "[heal] an [injury] at the end of it's turn",
        toughnessBonus: "[heal]",
        isModifier: true,
    },
} as const;

export const tacticalSpecials = Object.values(tacticalModifierMap);

export const tacticalRolesMap = {
    pawn: <TacticalRoleType>{
        slug: "pawn",
        name: "Pawn",
        deck: "base",
        count: 4,
        toughness: "[toughness]".repeat(1),
        speed: "[speed]",
        actions: [{ type: "melee", effect: [{ effectType: "injury", amount: 1 }] }],
    },
    minion: <TacticalRoleType>{
        slug: "minion",
        name: "Minion",
        deck: "base",
        count: 4,
        toughness: "[toughness]".repeat(2),
        speed: "[speed]",
        actions: [{ type: "melee", effect: [{ effectType: "injury", amount: 1 }] }],
    },
    thug: <TacticalRoleType>{
        slug: "thug",
        name: "Thug",
        deck: "base",
        count: 4,
        toughness: "[toughness]".repeat(2),
        speed: "[speed]",
        actions: [{ type: "melee", effect: [{ effectType: "injury", amount: 2 }] }],
    },
    brute: <TacticalRoleType>{
        slug: "brute",
        name: "Brute",
        deck: "base",
        count: 2,
        toughness: "[toughness]".repeat(3),
        speed: "[speed]",
        actions: [
            { type: "melee", effect: [{ effectType: "injury", amount: 2 }] },
            { type: "melee", effect: [{ effectType: "injury", amount: 1 }], splash: true },
        ],
    },
    tank: <TacticalRoleType>{
        slug: "tank",
        name: "Tank",
        deck: "base",
        count: 2,
        toughness: "[toughness]".repeat(6),
        speed: "[speed]",
        actions: [{ type: "melee", effect: [{ effectType: "injury", amount: 2 }] }],
    },
    champion: <TacticalRoleType>{
        slug: "champion",
        name: "Champion",
        deck: "base",
        count: 1,
        toughness: "[toughness]".repeat(4),
        speed: "[speed]",
        actions: [
            { type: "melee", effect: [{ effectType: "injury", amount: 3 }] },
            { type: "direct", effect: [{ effectType: "distress", amount: 2 }], splash: true },
        ],
    },
    assassin: <TacticalRoleType>{
        slug: "assassin",
        name: "Assassin",
        deck: "base",
        count: 1,
        toughness: "[toughness]".repeat(2),
        speed: "[speed]",
        actions: [{ type: "melee", effect: [{ effectType: "injury", amount: 4 }] }],
    },
    slinger: <TacticalRoleType>{
        slug: "slinger",
        name: "Slinger",
        deck: "base",
        count: 4,
        toughness: "[toughness]".repeat(2),
        speed: "[speed]",
        actions: [
            { type: "ranged", effect: [{ effectType: "injury", amount: 1 }], range: "1-2" },
            { type: "melee", effect: [{ effectType: "injury", amount: 1 }] },
        ],
    },
    skirmisher: <TacticalRoleType>{
        slug: "skirmisher",
        name: "Skirmisher",
        deck: "base",
        count: 4,
        toughness: "[toughness]".repeat(2),
        speed: "[speed]",
        actions: [
            { type: "melee", effect: [{ effectType: "injury", amount: 2 }] },
            { type: "ranged", effect: [{ effectType: "injury", amount: 2 }], range: "1-2" },
        ],
    },
    ranger: <TacticalRoleType>{
        slug: "ranger",
        name: "Ranger",
        deck: "base",
        count: 4,
        toughness: "[toughness]".repeat(3),
        speed: "[speed]",
        actions: [
            { type: "melee", effect: [{ effectType: "injury", amount: 2 }] },
            { type: "ranged", effect: [{ effectType: "injury", amount: 2 }], range: "1-2" },
        ],
    },
    stalker: <TacticalRoleType>{
        slug: "stalker",
        name: "Stalker",
        deck: "base",
        count: 2,
        toughness: "[toughness]".repeat(2),
        speed: "[speed]",
        actions: [
            { type: "melee", effect: [{ effectType: "injury", amount: 3 }] },
            { type: "ranged", effect: [{ effectType: "injury", amount: 3 }], range: "1-2" },
        ],
    },
    commando: <TacticalRoleType>{
        slug: "commando",
        name: "Commando",
        deck: "base",
        count: 2,
        toughness: "[toughness]".repeat(3),
        speed: "[speed]",
        actions: [
            { type: "melee", effect: [{ effectType: "injury", amount: 3 }] },
            { type: "ranged", effect: [{ effectType: "injury", amount: 3 }], range: "1-2" },
        ],
    },
    marksman: <TacticalRoleType>{
        slug: "marksman",
        name: "Marksman",
        deck: "base",
        count: 2,
        toughness: "[toughness]".repeat(2),
        speed: "[speed]",
        actions: [
            { type: "ranged", effect: [{ effectType: "injury", amount: 3 }], range: "1-3" },
            { type: "melee", effect: [{ effectType: "injury", amount: 1 }] },
        ],
    },
    sniper: <TacticalRoleType>{
        slug: "sniper",
        name: "Sniper",
        deck: "base",
        count: 1,
        toughness: "[toughness]".repeat(2),
        speed: "[speed]",
        actions: [
            { type: "ranged", effect: [{ effectType: "injury", amount: 4 }], range: "1-∞" },
            { type: "melee", effect: [{ effectType: "injury", amount: 1 }] },
        ],
    },
    grenadier: <TacticalRoleType>{
        slug: "grenadier",
        name: "Grenadier",
        deck: "base",
        count: 2,
        toughness: "[toughness]".repeat(2),
        speed: "[speed]",
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
    bomber: <TacticalRoleType>{
        slug: "bomber",
        name: "Bomber",
        deck: "base",
        count: 1,
        toughness: "[toughness]".repeat(3),
        speed: "[speed]",
        actions: [
            {
                type: "ranged",
                effect: [{ effectType: "injury", amount: 3 }],
                splash: true,
                range: "0",
            },
        ],
    },
    artillery: <TacticalRoleType>{
        slug: "artillery",
        name: "Artillery",
        deck: "base",
        count: 2,
        toughness: "[toughness]".repeat(2),
        speed: "[speed]",
        actions: [
            {
                type: "ranged",
                effect: [{ effectType: "injury", amount: 2 }],
                splash: true,
                range: "1-∞",
            },
        ],
    },
} as const;

export default Object.values(tacticalRolesMap) as TacticalRoleType[];
