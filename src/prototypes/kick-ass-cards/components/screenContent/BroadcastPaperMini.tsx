import { kickAssCardsPrintStorageKey, kickAssCardsScreenStorageKey } from "../../KickAssCardsPrototype";
import { ScreenContentTypeEnum } from "../../services/broadcastScreen";
import { PaperMiniProps } from "../gameComponents/PaperMini";
import BroadcastComponent from "./BroadcastComponent";

export const BroadcastPaperMini = (props: PaperMiniProps) => (
    <BroadcastComponent
        screenStorageKey={kickAssCardsScreenStorageKey}
        printStorageKey={kickAssCardsPrintStorageKey}
        type={ScreenContentTypeEnum.PaperMini}
        props={{ ...props }}
    />
);
export default BroadcastPaperMini;
