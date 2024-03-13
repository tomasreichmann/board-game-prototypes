import React, { useEffect, useState } from "react";
import { Navigation } from "../Navigation";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
import ToggleData from "../../../../components/DataToggle";
import Input from "../content/Input";

const valueTypeInputTypeMap = {
    string: "text",
    number: "number",
    bigint: "number",
    date: "date",
    boolean: "checkbox",
} as const;

export default function SettingsRoute() {
    const [settingsStore, setSettingsStore] = useLocalStorage("settings");

    const settings = settingsStore || {
        mistralKey: "",
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
                label={key}
            />
        );
    });

    return (
        <>
            <Navigation />
            <div className="flex-1 mt-4 print:m-0 w-full text-kac-iron p-2 md:px-10 bg-white">
                <h1 className="font-kacHeading text-3xl text-kac-cloth-dark mt-8 mb-4">Settings</h1>
                <div className="mb-8">{items}</div>
                <ToggleData data={settings} />
            </div>
        </>
    );
}
