import arrayToMap from "../../../utils/arrayToMap";
import actorData from "./actors.csv";

export type ActorType = { slug: string; imageUri: string };

const actors: ActorType[] = actorData;
export const actorMap = arrayToMap(actorData, "slug") as { [key in string]: { slug: string; imageUri: string } };

export default actors;
