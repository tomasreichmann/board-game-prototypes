import { kickAssCardsPrintStorageKey, kickAssCardsScreenStorageKey } from "../../KickAssCardsPrototype";
import { ScreenContentTypeEnum } from "../../services/broadcastScreen";
import { ActorCardProps } from "../gameComponents/ActorCard";
import { ImageProps } from "../Image";
import BroadcastComponent from "./BroadcastComponent";
import BroadcastImage from "./BroadcastImage";

const BroadcastActorImage = (props: ImageProps) => (
    <BroadcastImage {...props} broadcastProps={{ className: "h-full" }} />
);

export const BroadcastActor = (props: ActorCardProps) => (
    <BroadcastComponent
        screenStorageKey={kickAssCardsScreenStorageKey}
        printStorageKey={kickAssCardsPrintStorageKey}
        type={ScreenContentTypeEnum.Actor}
        props={{ ...props, ImageComponent: BroadcastActorImage }}
    />
);
export default BroadcastActor;
