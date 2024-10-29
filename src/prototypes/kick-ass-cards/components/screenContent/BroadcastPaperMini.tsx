import { mightyDecksPrintStorageKey, mightyDecksScreenStorageKey } from "../routes/routes";
import { ScreenContentTypeEnum } from "../../services/broadcastScreen";
import { PaperMiniProps } from "../gameComponents/PaperMini";
import BroadcastComponent, { BroadcastComponentProps } from "./BroadcastComponent";

export type BroadcastActorProps = PaperMiniProps & {
    broadcastProps?: Partial<BroadcastComponentProps<ScreenContentTypeEnum.Paper>>;
};

export const BroadcastPaperMini = ({ broadcastProps, ...restProps }: BroadcastActorProps) => (
    <BroadcastComponent
        screenStorageKey={mightyDecksScreenStorageKey}
        printStorageKey={mightyDecksPrintStorageKey}
        type={ScreenContentTypeEnum.PaperMini}
        props={{ ...restProps }}
        {...broadcastProps}
    />
);
export default BroadcastPaperMini;
