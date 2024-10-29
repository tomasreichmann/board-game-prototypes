import React from "react";
import { mightyDecksScreenStorageKey } from "./routes";
import BroadcastRoute from "./BroadcastRoute";

export default function ScreenRoute() {
    return <BroadcastRoute storageKey={mightyDecksScreenStorageKey} />;
}
