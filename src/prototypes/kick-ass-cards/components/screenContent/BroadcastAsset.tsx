import { kickAssCardsPrintStorageKey, kickAssCardsScreenStorageKey } from "../../KickAssCardsPrototype";
import { ScreenContentTypeEnum } from "../../services/broadcastScreen";
import { AssetCardProps } from "../gameComponents/AssetCard";
import BroadcastComponent from "./BroadcastComponent";

export const BroadcastAsset = (props: AssetCardProps) => (
    <BroadcastComponent
        screenStorageKey={kickAssCardsScreenStorageKey}
        printStorageKey={kickAssCardsPrintStorageKey}
        type={ScreenContentTypeEnum.Asset}
        props={props}
    />
);
export default BroadcastAsset;
