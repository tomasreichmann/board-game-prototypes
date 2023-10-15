import resolveRandom, { DeepRandomType } from "./resolveRandom";
import { Culture, name as defaultNameOptions, traits as defaultTraitOptions } from "./schemes/cultureScheme";

export type GenerateCultureOptionsType = {
    nameOptions?: typeof defaultNameOptions;
    originOptions?: DeepRandomType<string | null>;
    traitOptions?: typeof defaultTraitOptions;
};

export default function generateCulture({
    traitOptions = defaultTraitOptions,
    originOptions = null,
    nameOptions = defaultNameOptions,
}: GenerateCultureOptionsType = {}): Culture | null {
    const culture = resolveRandom({
        _rObject: {
            name: nameOptions,
            origin: originOptions,
            traits: traitOptions,
        },
    });
    if (typeof culture !== "object" || culture === null) {
        return null;
    }

    return culture as unknown as Culture;
}
