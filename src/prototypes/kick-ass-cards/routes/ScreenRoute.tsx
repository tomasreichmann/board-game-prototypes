import React from "react";
import { kickAssCardsScreenStorageKey } from "../KickAssCardsPrototype";
import BroadcastRoute from "./BroadcastRoute";

export default function ScreenRoute() {
    return <BroadcastRoute storageKey={kickAssCardsScreenStorageKey} />;
}
