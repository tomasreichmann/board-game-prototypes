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
    gender?: string | null;
    age?: number | null;
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
    count: number;
};

export type EffectType = {
    slug?: string;
    title: string;
    icon?: IconType | string;
    effect: string;
    count: number;
};

export type StuntType = {
    requirements?: string;
} & EffectType;

export type ContentType<ComponentType = string> = {
    children?: string | ContentType[];
    component?: ComponentType;
    className?: string;
};

export type PlaytesterType = {
    name: string;
};

export type OutcomeSlug = "special" | "success" | "partial" | "fumble" | "chaos";

export type OutcomeType = {
    slug: string;
    title: string;
    icon: IconType;
    description: string;
};

export type ThreatType = { slug: string; icon: string; title: string; description: string };

export type EncounterType = {
    slug: string;
    title: string;
};

export type WithCount<T> = T & { count: number };
