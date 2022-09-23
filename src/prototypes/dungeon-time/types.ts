export type ActionType = {
    slug: string;
    effects: string[];
    description: string;
    upgradeSlots: number;
    upgradeOptionSlugs: string[];
    utilityValue: number;
    comments?: string;
};
