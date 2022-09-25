import { IconType } from "./components/Icon/Icon";

export type ActionType = {
    slug: string;
    effects: IconType[];
    description: string;
    upgradeSlots: number;
    upgradeOptionSlugs: string[];
    upgradeOptions?: ActionType[];
    utilityValue: number;
    comments?: string;
};

export type ActionDeckType = {
    slug: string;
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
    flavourText: string;
    type: string;
    hitPoints: number;
    attack: string;
    altAttack: string;
    defend: string;
    move: string;
    special: string;
    passive: string;
    challenge: number;
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
    deckCounts: { [key: string]: number };
};

export type EnemyIntentDeckType = {
    slug: string;
    intents: EnemyIntentType[];
};
