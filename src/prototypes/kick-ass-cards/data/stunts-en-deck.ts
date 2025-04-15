import arrayToMap from "@/utils/arrayToMap";
import { StuntType, WithCount } from "../types";
import stuntData from "./stunts-en.csv";

const stunts: Required<WithCount<StuntType>>[] = stuntData.map((stunt) => ({ ...stunt, count: parseInt(stunt.count) }));

export const stuntMap = arrayToMap(stunts, "slug") as { [key in string]: WithCount<StuntType> };

export default stunts;
