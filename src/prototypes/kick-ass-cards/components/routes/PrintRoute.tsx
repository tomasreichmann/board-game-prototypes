import React from "react";
import { mightyDecksPrintStorageKey } from "./routes";
import BroadcastRoute from "./BroadcastRoute";

export default function ScreenRoute() {
    return <BroadcastRoute storageKey={mightyDecksPrintStorageKey} withPrintMarkerCorners />;
}
