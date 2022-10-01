import { ErrorResponse } from "use-google-sheets/dist/types";
import { PlaytesterType } from "../types";
import useSheetData from "./useSheetData";
import playtestersDataAdapter from "../adapters/playtestersDataAdapter";

export const usePlaytesters = (): {
    data: PlaytesterType[] | undefined;
    loading: boolean;
    error: null | ErrorResponse;
} => {
    const sheetData = useSheetData();
    if (!sheetData.data) {
        return { ...sheetData, data: undefined };
    }
    const stagesSheet = sheetData.data.find((item: { id: string }) => item.id === "playtesters");

    const data = stagesSheet ? playtestersDataAdapter(stagesSheet.data as Record<string, string>[]) : undefined;
    return { ...sheetData, data };
};
