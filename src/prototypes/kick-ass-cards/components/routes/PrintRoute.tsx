import React from "react";
import { kickAssCardsPrintStorageKey } from "../../routes";
import BroadcastRoute from "./BroadcastRoute";

export default function ScreenRoute() {
    return <BroadcastRoute storageKey={kickAssCardsPrintStorageKey} withPrintMarkerCorners />;
}
