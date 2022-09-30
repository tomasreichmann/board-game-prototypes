import { IconType } from "./components/Icon/Icon";

export type ActionType = {
    slug: string;
    effects: IconType[];
    deck?: ActionDeckType;
    description: string;
    upgradeSlots: number;
    upgradeOptionSlugs: string[];
    upgradeOptions?: ActionType[];
    utilityValue: number;
    comments?: string;
};

export type ActionDeckType = {
    slug: string;
    name: string;
    actionSlugCounts: {
        actionSlug: string;
        count: number;
    }[];
    actionSlugs: string[];
    actions: ActionType[];
};

export type EnemyType = {
    slug: string;
    name: string;
    icon: IconType;
    imageUri: string;
    flavorText: string;
    type: string;
    toughness: string;
    attack: string;
    altAttack: string;
    defend: string;
    move: string;
    special: string;
    passive: string;
    challenge: number;
    cardCount: number;
};

export type EnemyIntentType = {
    slug: string;
    attack: number;
    attackMod: string;
    altAttack: number;
    altAttackMod: string;
    defend: number;
    defendMod: string;
    move: number;
    moveMod: string;
    special: number;
};

export type EnemyIntentDeckType = {
    slug: string;
    name: string;
    icon: IconType;
    intentSlugs: string[];
    intents: EnemyIntentType[];
};

export type BattleEncounterType = {
    slug: string;
    name: string;
    description: string;
    type: string;
    icon: IconType;
    enemyIntentDeckSlug: string;
    enemyIntentDeck: EnemyIntentDeckType;
    enemySlugsForPlayerCount1: string[];
    enemiesForPlayerCount1: EnemyType[];
    enemySlugsForPlayerCount2: string[];
    enemiesForPlayerCount2: EnemyType[];
    enemySlugsForPlayerCount3: string[];
    enemiesForPlayerCount3: EnemyType[];
    enemySlugsForPlayerCount4: string[];
    enemiesForPlayerCount4: EnemyType[];
    enemySlugsForPlayerCount5: string[];
    enemiesForPlayerCount5: EnemyType[];
    reward: string;
};

export type PlayerCharacterType = {
    slug: string;
    name: string;
    role: string;
    flavor: string;
    gameplay: string;
    icon: IconType;
    imageUri: string;
    flavorText: string;
    toughness: number;
    speed: number;
    handSize: number;
    passive: string;
    special: string;
    startingDeckSlug: string;
    startingDeck: ActionDeckType;
};

export type ConsumableType = {
    slug: string;
    name: string;
    icon: IconType;
    effect: string;
    cost: number;
    cardCount: number;
};

export type RelicType = {
    slug: string;
    type: "minor" | "major";
    name: string;
    effect: string;
    cost: string;
    cardCount: number;
};

export type RuleType = {
    children?: string;
    imageUri?: string;
    component?: string;
    className?: string;
};

export type PlayTestersType = {
    name: string;
};
