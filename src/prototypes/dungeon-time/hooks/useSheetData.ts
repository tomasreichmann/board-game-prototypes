import { useEffect } from "react";
import useGoogleSheets from "use-google-sheets";
import packageJson from "../../../../package.json";

const sheetSignature = {
    apiKey: "AIzaSyAm5yIsB152NAh1EWBc0dQwRAoy5ajpbE4",
    sheetId: "1A9ibKGg4ASiIl3PiDix6ASe9Tj55oKAiPuBPJcw7pLg",
};
const LOCAL_STORAGE_PREFIX =
    "DT_SHEET_" + packageJson.version.replaceAll(".", "_") + "_";
const LOCAL_STORAGE_KEY = LOCAL_STORAGE_PREFIX + sheetSignature.sheetId;

export const clearSheetDataCache = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
};

export default function useSheetData() {
    const localStorageData = localStorage.getItem(LOCAL_STORAGE_KEY);
    let response = useGoogleSheets(
        localStorageData ? { apiKey: "", sheetId: "" } : { ...sheetSignature }
    );
    if (localStorageData) {
        response = {
            data: JSON.parse(localStorageData),
            loading: false,
            error: null,
            called: false,
            refetch: response.refetch,
        };
    }

    useEffect(() => {
        if (!localStorageData && response.data && response.data.length > 0) {
            localStorage.setItem(
                LOCAL_STORAGE_KEY,
                JSON.stringify(response.data)
            );
        }
    }, [response.data]);

    return response;
}
