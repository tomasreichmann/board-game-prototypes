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
        | "push"
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
    actions?: (ActionType | string)[];
    actionBonuses?: (null | string)[];
    count?: number;
    imageOverlayUri?: string;
    isModifier?: boolean;
};

export const tacticalModifierMap = {
    tough: <TacticalRoleType>{
        slug: "tough",
        imageOverlayUri: "/mighty-decks/actors/base/tough.png",
        name: "Tough",
        deck: "base mod",
        count: 1,
        //special: "+[toughness][toughness]",
        toughnessBonus: "+[toughness][toughness]",
        isModifier: true,
    },
    shielded: <TacticalRoleType>{
        slug: "shielded",
        imageOverlayUri: "/mighty-decks/actors/base/shielded.png",
        name: "Shielded",
        deck: "base mod",
        count: 4,
        toughnessBonus: "+[shield]",
        special: "-1[injury] taken",
        isModifier: true,
    },
    armored: <TacticalRoleType>{
        slug: "armoured",
        imageOverlayUri: "/mighty-decks/actors/base/armoured.png",
        name: "Armoured",
        deck: "base mod",
        count: 1,
        toughnessBonus: "+[shield][shield]",
        special: "-2[injury] taken",
        isModifier: true,
    },
    alpha: <TacticalRoleType>{
        slug: "alpha",
        imageOverlayUri: "/mighty-decks/actors/base/alpha.png",
        name: "Alpha",
        deck: "base mod",
        count: 1,
        special: "+[toughness] and +[injury] for all attacks",
        toughnessBonus: "+[toughness]",
        actionBonuses: ["+[injury]", "+[injury]"],
        isModifier: true,
    },
    dangerous: <TacticalRoleType>{
        slug: "dangerous",
        imageOverlayUri: "/mighty-decks/actors/base/dangerous.png",
        name: "Dangerous",
        deck: "base mod",
        count: 1,
        special: "Primary attack also deals +[injury]",
        actionBonuses: ["+[injury]"],
        isModifier: true,
    },
    burning: <TacticalRoleType>{
        slug: "burning",
        imageOverlayUri: "/mighty-decks/actors/base/burning.png",
        name: "Burning",
        deck: "base mod",
        count: 4,
        special: "Primary attack also deals +[burning]",
        actionBonuses: ["+[burning]"],
        isModifier: true,
    },
    fiery: <TacticalRoleType>{
        slug: "fiery",
        imageOverlayUri: "/mighty-decks/actors/base/fiery.png",
        name: "Fiery",
        deck: "base mod",
        count: 1,
        special: "Secondary attack deals [burning] instead",
        actionBonuses: [null, "[replace][burning]"],
        isModifier: true,
    },
    freezing: <TacticalRoleType>{
        slug: "freezing",
        imageOverlayUri: "/mighty-decks/actors/base/freezing.png",
        name: "Freezing",
        deck: "base mod",
        count: 4,
        special: "Primary attack also deals +[freezing]",
        actionBonuses: ["+[freezing]"],
        isModifier: true,
    },
    icy: <TacticalRoleType>{
        slug: "icy",
        imageOverlayUri: "/mighty-decks/actors/base/icy.png",
        name: "Icy",
        deck: "base mod",
        count: 1,
        special: "Secondary attack deals [freezing] instead",
        actionBonuses: [null, "[replace][freezing]"],
        isModifier: true,
    },
    irritating: <TacticalRoleType>{
        slug: "irritating",
        imageOverlayUri: "/mighty-decks/actors/base/irritating.png",
        name: "Irritating",
        deck: "base mod",
        count: 4,
        special: "Primary attack also deals +[distress]",
        actionBonuses: ["+[distress]"],
        isModifier: true,
    },
    corrupting: <TacticalRoleType>{
        slug: "corrupting",
        imageOverlayUri: "/mighty-decks/actors/base/corrupting.png",
        name: "Corrupting",
        deck: "base mod",
        count: 1,
        special: "Secondary attack deals [distress] instead",
        actionBonuses: [null, "[replace][distress]"],
        isModifier: true,
    },
    fast: <TacticalRoleType>{
        slug: "fast",
        imageOverlayUri: "/mighty-decks/actors/base/fast.png",
        name: "Fast",
        deck: "base mod",
        count: 4,
        speed: "+[speed]",
        special: "Moves an extra zone per turn",
        isModifier: true,
    },
    harassing: <TacticalRoleType>{
        slug: "harassing",
        imageOverlayUri: "/mighty-decks/actors/base/harassing.png",
        name: "Harassing",
        deck: "base mod",
        count: 1,
        special: "Secondary attack also deals +[complication]",
        actionBonuses: [null, "+[complication]"],
        isModifier: true,
    },
    slowing: <TacticalRoleType>{
        slug: "slowing",
        imageOverlayUri: "/mighty-decks/actors/base/slowing.png",
        name: "Slowing",
        deck: "base mod",
        count: 1,
        special: "Secondary attack also deals +[hindered]",
        actionBonuses: [null, "+[hindered]"],
        isModifier: true,
    },
    elemental: <TacticalRoleType>{
        slug: "elemental",
        imageOverlayUri: "/mighty-decks/actors/base/elemental.png",
        name: "Elemental",
        deck: "base mod",
        count: 4,
        special: "All attacks can deal [freezing] or [burning]",
        actionBonuses: ["+[freezing]/+[burning]", "+[freezing]/+[burning]"],
        isModifier: true,
    },
    charging: <TacticalRoleType>{
        slug: "charging",
        imageOverlayUri: "/mighty-decks/actors/base/charging.png",
        name: "Charging",
        deck: "base mod",
        count: 1,
        special: "Primary attack also deals +[injury2] when entering a zone",
        actionBonuses: ["(+[injury2])"],
        isModifier: true,
    },
    suicide: <TacticalRoleType>{
        slug: "suicide",
        imageOverlayUri: "/mighty-decks/actors/base/suicide.png",
        name: "Suicide",
        deck: "base mod",
        count: 4,
        special: "Can die and deal 2x[injury][splash]",
        isModifier: true,
    },
    grabbing: <TacticalRoleType>{
        slug: "grabbing",
        imageOverlayUri: "/mighty-decks/actors/base/grabbing.png",
        name: "Grabbing",
        deck: "base mod",
        count: 2,
        special: "[melee] attack also deals +[stuck]",
        actionBonuses: ["(+[stuck])", "(+[stuck])"],
        isModifier: true,
    },
    webbing: <TacticalRoleType>{
        slug: "webbing",
        imageOverlayUri: "/mighty-decks/actors/base/webbing.png",
        name: "Webbing",
        deck: "base mod",
        count: 2,
        special: "Primary attack also deals +[stuck][splash]",
        actionBonuses: ["+[stuck][splash]", null],
        isModifier: true,
    },
    reaching: <TacticalRoleType>{
        slug: "reaching",
        imageOverlayUri: "/mighty-decks/actors/base/reaching.png",
        name: "Reaching",
        deck: "base mod",
        count: 1,
        special: "[melee] attack reaches to the adjacent zones",
        actionBonuses: ["([range]0-1)", "([range]0-1)"],
        isModifier: true,
    },
    healing: <TacticalRoleType>{
        slug: "healing",
        imageOverlayUri: "/mighty-decks/actors/base/healing.png",
        name: "Healing",
        deck: "base mod",
        count: 1,
        special: "Heal 2x[injury] from one ally in the zone",
        isModifier: true,
    },
    restoring: <TacticalRoleType>{
        slug: "restoring",
        imageOverlayUri: "/mighty-decks/actors/base/restoring.png",
        name: "Restoring",
        deck: "base mod",
        count: 1,
        special: "Heal [injury] from all allies in the zone",
        isModifier: true,
    },
    regenerating: <TacticalRoleType>{
        slug: "regenerating",
        imageOverlayUri: "/mighty-decks/actors/base/regenerating.png",
        name: "Regenerating",
        deck: "base mod",
        count: 4,
        special: "Heal [injury2] at the end of the turn",
        toughnessBonus: "[heal][heal]",
        isModifier: true,
    },
    encouraging: <TacticalRoleType>{
        slug: "encouraging",
        imageOverlayUri: "/mighty-decks/actors/base/encouraging.png",
        name: "Encouraging",
        deck: "base mod",
        count: 1,
        special: "[boost] all allies in the zone",
        isModifier: true,
    },
} as const;

export const tacticalSpecials = Object.values(tacticalModifierMap);

export const tacticalRoleMap = {
    pawn: <TacticalRoleType>{
        slug: "pawn",
        name: "Pawn",
        deck: "base",
        count: 4,
        toughness: "[toughness]".repeat(1),
        speed: "[speed]",
        actions: [
            { type: "melee", effect: [{ effectType: "injury", amount: 1 }] },
            { type: "ranged", effect: [{ effectType: "injury", amount: 1 }], range: "1" },
        ],
    },
    minion: <TacticalRoleType>{
        slug: "minion",
        name: "Minion",
        deck: "base",
        count: 4,
        toughness: "[toughness]".repeat(2),
        speed: "[speed]",
        actions: [
            { type: "melee", effect: [{ effectType: "injury", amount: 1 }] },
            { type: "ranged", effect: [{ effectType: "injury", amount: 1 }], range: "1-2" },
        ],
    },
    thug: <TacticalRoleType>{
        slug: "thug",
        name: "Thug",
        deck: "base",
        count: 4,
        toughness: "[toughness]".repeat(2),
        speed: "[speed]",
        actions: [
            { type: "melee", effect: [{ effectType: "injury", amount: 2 }] },
            { type: "ranged", effect: [{ effectType: "injury", amount: 1 }], range: "1" },
        ],
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
        toughness: "[toughness6]",
        speed: "[speed]",
        actions: [{ type: "melee", effect: [{ effectType: "injury", amount: 2 }] }, "[direct][push][range]1[splash]"],
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
        actions: ["[melee][injury4]", "[direct][complication2][splash]"],
    },
    skirmisher: <TacticalRoleType>{
        slug: "skirmisher",
        name: "Skirmisher",
        deck: "base",
        count: 4,
        toughness: "[toughness]".repeat(2),
        speed: "[speed]",
        actions: [
            { type: "melee", effect: [{ effectType: "injury", amount: 1 }], count: 2 },
            { type: "ranged", effect: [{ effectType: "injury", amount: 1 }], count: 2, range: "1-2" },
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
            { type: "ranged", effect: [{ effectType: "injury", amount: 2 }], range: "1-2" },
            { type: "melee", effect: [{ effectType: "injury", amount: 2 }] },
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
            { type: "ranged", effect: [{ effectType: "injury", amount: 1 }], count: 3, range: "1-2" },
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
        actions: ["[ranged][injury4][range]1-∞", { type: "melee", effect: [{ effectType: "injury", amount: 1 }] }],
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

export default Object.values(tacticalRoleMap) as TacticalRoleType[];
