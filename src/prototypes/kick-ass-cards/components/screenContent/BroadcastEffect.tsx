import { kickAssCardsPrintStorageKey, kickAssCardsScreenStorageKey } from "../../KickAssCardsPrototype";
import { ScreenContentTypeEnum } from "../../services/broadcastScreen";
import { EffectCardProps } from "../gameComponents/EffectCard";
import BroadcastComponent from "./BroadcastComponent";

export const BroadcastEffect = (props: EffectCardProps) => (
    <BroadcastComponent
        screenStorageKey={kickAssCardsScreenStorageKey}
        printStorageKey={kickAssCardsPrintStorageKey}
        type={ScreenContentTypeEnum.Effect}
        props={props}
    />
);
export default BroadcastEffect;
