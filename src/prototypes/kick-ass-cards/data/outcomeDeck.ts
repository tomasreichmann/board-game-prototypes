import { OutcomeSlug, OutcomeType } from "../types";
import arrayToMap from "../../../utils/arrayToMap";
import outcomeData from "./outcomes-en.csv";

export const outcomeMap = arrayToMap(
    outcomeData.map(({ count, ...outcome }) => ({ ...outcome, count: parseInt(count) })),
    "slug"
) as { [key in OutcomeSlug]: OutcomeType & { count: number } };

export const { special, success, partial, fumble, chaos } = outcomeMap;

const outcomes = [
    special,
    success,
    success,
    success,
    partial,
    partial,
    partial,
    fumble,
    fumble,
    fumble,
    fumble,
    chaos,
].map((outcome, outcomeIndex) => ({ ...outcome, slug: outcome.slug + "-" + outcomeIndex }));

export default outcomes;
