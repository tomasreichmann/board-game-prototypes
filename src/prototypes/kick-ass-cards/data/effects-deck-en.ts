import { EffectType } from "../types";
import arrayToMap from "../../../utils/arrayToMap";
import effectData from "./effects-en.csv";
import multiplyByCount from "../../../utils/multiplyByCount";

export const effectMap = arrayToMap(effectData, "slug") as { [key in string]: EffectType };

const effects: EffectType[] = multiplyByCount(effectData, "count", ({ count, ...item }) => item);

export default effects;
