import { IconType } from "../../components/Icon/Icon";

export type PlayerCharacterType = {
    name: string;
    imageUri?: string;
    occupation?: string;
    specials?: string[];
    tricks?: string[];
    wounds?: string[];
    titles?: string[];
    assets?: string[];
    notes?: string;
    toughness?: number;
};

export type ActorType = {
    name: string;
    imageUri?: string;
    occupation?: string | null;
    toughness?: number;
    currentToughness?: number;
    reward?: string | null;
    threat?: string | null;
    notes?: string | null;
};

export type AssetType = {
    slug: string;
    title: string;
    icon: IconType | string;
    effect: string;
    cost: number;
    cardCount: number;
};

export type EffectType = {
    slug?: string;
    title: string;
    icon?: IconType | string;
    effect: string;
    cardCount: number;
};

export type ContentType = {
    children?: string | ContentType[];
    component?: string;
    className?: string;
};

export type PlaytesterType = {
    name: string;
};

export type OutcomeSlug = "special" | "success" | "partialSuccess" | "fumble" | "chaos";

export type OutcomeType = {
    slug: string;
    title: string;
    icon: IconType;
    description: string;
};

export type EncounterType = {
    slug: string;
    title: string;
};
