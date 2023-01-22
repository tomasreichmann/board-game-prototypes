import { kickAssCardsPrintStorageKey, kickAssCardsScreenStorageKey } from "../../KickAssCardsPrototype";
import { ScreenContentTypeEnum } from "../../services/broadcastScreen";
import { ActorCardProps } from "../gameComponents/ActorCard";
import BroadcastComponent from "./BroadcastComponent";

export const BroadcastActor = (props: ActorCardProps) => (
    <BroadcastComponent
        screenStorageKey={kickAssCardsScreenStorageKey}
        printStorageKey={kickAssCardsPrintStorageKey}
        type={ScreenContentTypeEnum.Actor}
        props={props}
    />
);
export default BroadcastActor;
