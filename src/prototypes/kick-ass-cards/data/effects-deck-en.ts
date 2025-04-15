import { EffectType, WithCount } from "../types";
import arrayToMap from "../../../utils/arrayToMap";
import effectData from "./effects-en.csv";
import multiplyByCount from "../../../utils/multiplyByCount";

export const effectMap = arrayToMap(effectData.map(({ count, ...item }) => ({...item, count: parseInt(count)})), "slug") as { [key in string]: WithCount<EffectType> };

const effects: WithCount<EffectType>[] = multiplyByCount(effectData, "count", ({ count, ...item }) => ({...item, count: parseInt(count)}));

export default effects;
