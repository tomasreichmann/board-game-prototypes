import { ErrorResponse } from "use-google-sheets/dist/types";
import { StageType } from "../types";
import arrayToMap from "../utils/arrayToMap";
import stagesDataAdapter from "../adapters/stagesDataAdapter";
import useSheetData from "./useSheetData";
import { useBattleEncounters } from "./useBattleEncounters";

export const useStages = (): {
    data: StageType[] | undefined;
    loading: boolean;
    error: null | ErrorResponse;
} => {
    const sheetData = useSheetData();
    const { data: battleEncounters } = useBattleEncounters();
    if (!sheetData.data || !battleEncounters) {
        return { ...sheetData, data: undefined };
    }
    const stagesSheet = sheetData.data.find(
        (item: { id: string }) => item.id === "stages"
    );

    const encounterMap = arrayToMap(battleEncounters, "slug");

    const data = stagesSheet
        ? stagesDataAdapter(
              stagesSheet.data as Record<string, string>[],
              encounterMap
          )
        : undefined;
    return { ...sheetData, data };
};
