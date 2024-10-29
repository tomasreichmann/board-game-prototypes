import { mightyDecksPrintStorageKey, mightyDecksScreenStorageKey } from "../routes/routes";
import { ScreenContentTypeEnum } from "../../services/broadcastScreen";
import { ClockProps } from "../Clock";
import BroadcastComponent, { BroadcastComponentProps } from "./BroadcastComponent";

export type BroadcastActorProps = ClockProps & {
    broadcastProps?: Partial<BroadcastComponentProps<ScreenContentTypeEnum.Clock>>;
};

export const BroadcastClock = ({ broadcastProps, ...props }: BroadcastActorProps) => (
    <BroadcastComponent
        screenStorageKey={mightyDecksScreenStorageKey}
        printStorageKey={mightyDecksPrintStorageKey}
        type={ScreenContentTypeEnum.Clock}
        props={props}
        {...broadcastProps}
    />
);
export default BroadcastClock;
