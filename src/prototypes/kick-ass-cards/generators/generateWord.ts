import { capitalize, range } from "lodash";
import resolveRandom, { DeepRandomType, DeepRandomWeightedType } from "./resolveRandom";
import splitIntoSyllables from "../../../utils/splitIntoSyllables";

export const getWeightedSyllablesAndStats = (words: string[]) => {
    const weightedSyllables: DeepRandomWeightedType<string> = {
        _rWeighted: [],
    };
    const stats = {
        lengthDistribution: {
            _rWeighted: [],
        } as DeepRandomWeightedType<number>,
        firstSyllables: {
            _rWeighted: [],
        } as DeepRandomWeightedType<string>,
        middleSyllables: {
            _rWeighted: [],
        } as DeepRandomWeightedType<string>,
        lastSyllables: {
            _rWeighted: [],
        } as DeepRandomWeightedType<string>,
    };

    const uniqueSyllables: string[] = [];
    const firstSyllables: string[] = [];
    const middleSyllables: string[] = [];
    const lastSyllables: string[] = [];
    const lengths: number[] = [];
    words.forEach((name) => {
        const syllables = splitIntoSyllables(name);
        const length = syllables.length;
        const lengthIndex = lengths.indexOf(length);
        if (lengthIndex === -1) {
            lengths.push(length);
            stats.lengthDistribution._rWeighted.push([length, 1]);
        } else {
            stats.lengthDistribution._rWeighted[lengthIndex][1]++;
        }

        syllables.forEach((syllable, syllableIndex) => {
            const uniqueIndex = uniqueSyllables.indexOf(syllable);
            if (uniqueIndex === -1) {
                uniqueSyllables.push(syllable);
                weightedSyllables._rWeighted.push([syllable, 1]);
            } else {
                weightedSyllables._rWeighted[uniqueIndex][1]++;
            }
            const isFirstSyllable = syllableIndex === 0;
            const isLastSyllable = syllableIndex === syllables.length - 1;
            const isMiddleSyllable = !isFirstSyllable && !isLastSyllable;
            if (isMiddleSyllable) {
                const middleIndex = middleSyllables.indexOf(syllable);
                if (middleIndex === -1) {
                    middleSyllables.push(syllable);
                    stats.middleSyllables._rWeighted.push([syllable, 1]);
                } else {
                    stats.middleSyllables._rWeighted[middleIndex][1]++;
                }
            } else {
                if (isFirstSyllable) {
                    const capitalizedSyllable = capitalize(syllable);
                    const firstIndex = firstSyllables.indexOf(capitalizedSyllable);
                    if (firstIndex === -1) {
                        firstSyllables.push(capitalizedSyllable);
                        stats.firstSyllables._rWeighted.push([capitalizedSyllable, 1]);
                    } else {
                        stats.firstSyllables._rWeighted[firstIndex][1]++;
                    }
                }
                if (isLastSyllable) {
                    const lastIndex = lastSyllables.indexOf(syllable);
                    if (lastIndex === -1) {
                        lastSyllables.push(syllable);
                        stats.lastSyllables._rWeighted.push([syllable, 1]);
                    } else {
                        stats.lastSyllables._rWeighted[lastIndex][1]++;
                    }
                }
            }
        });
    });

    stats.lengthDistribution._rWeighted.sort((a, b) => b[1] - a[1]);
    stats.firstSyllables._rWeighted.sort((a, b) => b[1] - a[1]);
    stats.middleSyllables._rWeighted.sort((a, b) => b[1] - a[1]);
    stats.lastSyllables._rWeighted.sort((a, b) => b[1] - a[1]);

    return {
        weightedSyllables,
        stats,
    };
};

export type GenerateWordOptionsType = {
    lengthDistribution: DeepRandomType<number>;
    firstSyllables: DeepRandomType<string>;
    middleSyllables: DeepRandomType<string>;
    lastSyllables: DeepRandomType<string>;
    separator?: string;
};

const generateWord = ({
    lengthDistribution,
    firstSyllables,
    middleSyllables,
    lastSyllables,
    separator = "",
}: GenerateWordOptionsType) => {
    const length = resolveRandom(lengthDistribution);
    if (length === null || typeof length !== "number" || length < 1) {
        return null;
    }
    const firstFragment = resolveRandom(firstSyllables);
    const lastFragment = length >= 2 ? resolveRandom(lastSyllables) : null;
    const middleFragments = length >= 3 ? range(length - 2).map(() => resolveRandom(middleSyllables)) : [];
    return [firstFragment, ...middleFragments, lastFragment].filter((fragment) => fragment !== null).join(separator);
};

export default generateWord;
