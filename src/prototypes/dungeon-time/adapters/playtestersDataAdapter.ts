import { PlaytesterType } from "../types";
import camelCaseObjectKeys from "../../../utils/camelCaseObjectKeys";

export default function playtestersDataAdapter(playtestersData: Record<string, string>[]): PlaytesterType[] {
    return playtestersData.map((playtester) => {
        return camelCaseObjectKeys(playtester) as Record<keyof PlaytesterType, string>;
    });
}
