import { OutcomeSlug, OutcomeType } from "../types";
import arrayToMap from "../../../utils/arrayToMap";
import outcomeData from "./outcomes.csv";

export const outcomeMap = arrayToMap(outcomeData, "slug") as { [key in OutcomeSlug]: OutcomeType };

const { special, success, partialSuccess, fumble, chaos } = outcomeMap;

const outcomes: OutcomeType[] = [
    special,
    success,
    success,
    success,
    partialSuccess,
    partialSuccess,
    partialSuccess,
    fumble,
    fumble,
    fumble,
    chaos,
].map((outcome, outcomeIndex) => ({ ...outcome, slug: outcome.slug + "-" + outcomeIndex }));

export default outcomes;
