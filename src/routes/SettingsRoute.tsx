import Page from "../components/Page/Page";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Input from "../prototypes/kick-ass-cards/components/content/Input";
import ToggleData from "../components/DataToggle";
import camelCaseToTitleCase from "../utils/camelCaseToTitleCase";
import { localSettingsKey } from "../hooks/useLocalSettings";

const valueTypeInputTypeMap = {
    string: "text",
    number: "number",
    bigint: "number",
    date: "date",
    boolean: "checkbox",
} as const;

export default function SettingsRoute() {
    const [settingsStore, setSettingsStore] = useLocalStorage(localSettingsKey);

    const settings = {
        mistralKey: "",
        sdUri: "http://127.0.0.1:7860/",
        ...(settingsStore || {}),
    };

    const items = (Object.keys(settings) as (keyof typeof settings)[]).map((key) => {
        return (
            <Input
                type={valueTypeInputTypeMap[typeof settings[key] as keyof typeof valueTypeInputTypeMap] || "text"}
                value={settings[key]}
                onChange={(e) => {
                    setSettingsStore({ ...settings, [key]: e.target.value });
                }}
                className="w-full max-w-xs"
                label={camelCaseToTitleCase(key)}
            />
        );
    });

    return (
        <Page className="SettingsRoute">
            <h1 className="text-3l font-bold mb-10">Prototypes</h1>
            <div className="flex flex-row gap-8">
                <div className="flex-1 flex flex-col gap-2 mb-8">{items}</div>
                <ToggleData data={settings} />
            </div>
        </Page>
    );
}
