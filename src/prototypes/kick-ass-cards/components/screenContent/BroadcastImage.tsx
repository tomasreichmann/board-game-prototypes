import { kickAssCardsPrintStorageKey, kickAssCardsScreenStorageKey } from "../../KickAssCardsPrototype";
import { ScreenContentTypeEnum } from "../../services/broadcastScreen";
import { ImageProps } from "../Image";
import BroadcastComponent from "./BroadcastComponent";

export const BroadcastImage = (props: ImageProps) => (
    <BroadcastComponent
        screenStorageKey={kickAssCardsScreenStorageKey}
        printStorageKey={kickAssCardsPrintStorageKey}
        type={ScreenContentTypeEnum.Image}
        props={props}
        className="bg-black/50 print:bg-transparent"
        broadcastPropsOverride={{
            className: (props.className || "") + " self-stretch flex-1",
            style: { ...(props.style || {}), height: "min(100vh, 100%)", minWidth: "min(400px, 100vw)" },
        }}
    />
);
export default BroadcastImage;
