import { IconType } from "../../components/Icon/Icon";

export type PlayerCharacterType = {
    name: string;
    occupation: string;
    specials: string[];
    tricks: string[];
    wounds: string[];
    titles: string[];
    assets: string[];
    notes: string;
};

export type AssetType = {
    slug: string;
    title: string;
    icon: IconType;
    effect: string;
    cost: number;
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

export type OutcomeSlug =
    | "special"
    | "success"
    | "partialSuccess"
    | "fumble"
    | "chaos"
    | "wound"
    | "complication"
    | "bless"
    | "advantage"
    | "curse";

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
