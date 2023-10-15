import { culturesSyllablesData } from "../../data/cultures-syllables";
import resolveRandom, { DeepRandomMultipleType, DeepRandomType, ReferenceConditionType } from "../resolveRandom";
import traitsData from "../../data/traits-cs-cleaned";

export type TraitType = (typeof traitsData)[0];

export type Culture = {
    name: string;
    language?: string | null;
    origin?: string | null;
    accent?: string | null;
    traits: TraitType[];
};

export const name: DeepRandomType<string> = { _rWord: culturesSyllablesData };

export const traits = {
    _rMultiple: { _rArray: traitsData },
    _count: { _rRange: { from: 1, to: 3 } },
    _filterOutDuplicates: true,
} as DeepRandomMultipleType<TraitType>;

const cultureScheme = {
    _rObject: {
        name,
        origin: null,
        traits,
    },
};
export default cultureScheme;
