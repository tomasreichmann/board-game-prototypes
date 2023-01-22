import { kickAssCardsPrintStorageKey, kickAssCardsScreenStorageKey } from "../../KickAssCardsPrototype";
import { ScreenContentTypeEnum } from "../../services/broadcastScreen";
import { ClockProps } from "../Clock";
import BroadcastComponent from "./BroadcastComponent";

export const BroadcastClock = (props: ClockProps) => (
    <BroadcastComponent
        screenStorageKey={kickAssCardsScreenStorageKey}
        printStorageKey={kickAssCardsPrintStorageKey}
        type={ScreenContentTypeEnum.Clock}
        props={props}
    />
);
export default BroadcastClock;
