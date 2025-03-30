import { EffectType } from "../types";
import stuntData from "./stunts-en.csv";

const stunts: Required<EffectType>[] = stuntData.map((stunt) => ({ ...stunt, count: parseInt(stunt.count) }));

export default stunts;
