export type ActionType = {
    slug: string;
    effects: string[];
    description: string;
    upgradeSlots: number;
    upgradeOptionSlugs: string[];
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
