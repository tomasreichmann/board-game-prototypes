import React from "react";
import { kickAssCardsScreenStorageKey } from "../../routes";
import BroadcastRoute from "./BroadcastRoute";

export default function ScreenRoute() {
    return <BroadcastRoute storageKey={kickAssCardsScreenStorageKey} />;
}
