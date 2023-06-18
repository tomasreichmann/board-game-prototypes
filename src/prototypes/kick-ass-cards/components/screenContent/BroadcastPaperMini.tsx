import { kickAssCardsPrintStorageKey, kickAssCardsScreenStorageKey } from "../../routes";
import { ScreenContentTypeEnum } from "../../services/broadcastScreen";
import { PaperMiniProps } from "../gameComponents/PaperMini";
import BroadcastComponent, { BroadcastComponentProps } from "./BroadcastComponent";

export type BroadcastActorProps = PaperMiniProps & {
    broadcastProps?: Partial<BroadcastComponentProps<ScreenContentTypeEnum.Paper>>;
};

export const BroadcastPaperMini = ({ broadcastProps, ...restProps }: BroadcastActorProps) => (
    <BroadcastComponent
        screenStorageKey={kickAssCardsScreenStorageKey}
        printStorageKey={kickAssCardsPrintStorageKey}
        type={ScreenContentTypeEnum.PaperMini}
        props={{ ...restProps }}
        {...broadcastProps}
    />
);
export default BroadcastPaperMini;
