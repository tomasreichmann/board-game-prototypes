import arrayToMap from "@/utils/arrayToMap";
import { EffectType, StuntType } from "../types";
import stuntData from "./stunts-en.csv";

const stunts: Required<EffectType>[] = stuntData.map((stunt) => ({ ...stunt, count: parseInt(stunt.count) }));

export const stuntMap = arrayToMap(stunts, "slug") as { [key in string]: StuntType };

export default stunts;
