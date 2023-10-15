import culturesData from "../data/cultures.csv";
import { getWeightedSyllablesAndStats } from "../generators/generateWord";
console.log(culturesData[0]);
const culturesDataCleaned = culturesData
    .filter(({ name }) => {
        if (/[\W]/.test(name)) {
            return false;
        }
        return true;
    })
    .map(({ name }) => name);

export const { weightedSyllables: culturesWeightedSyllables, stats: culturesSyllablesData } =
    getWeightedSyllablesAndStats(culturesDataCleaned);
export default culturesDataCleaned;
