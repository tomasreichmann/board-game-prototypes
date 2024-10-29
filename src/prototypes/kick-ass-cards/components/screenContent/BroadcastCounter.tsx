import { mightyDecksPrintStorageKey, mightyDecksScreenStorageKey } from "../routes/routes";
import { ScreenContentTypeEnum } from "../../services/broadcastScreen";
import { ClockProps } from "../Clock";
import BroadcastComponent, { BroadcastComponentProps } from "./BroadcastComponent";

export type BroadcastCounterProps = ClockProps & {
    broadcastProps?: Partial<BroadcastComponentProps<ScreenContentTypeEnum.Counter>>;
};

export const BroadcastCounter = ({ broadcastProps, ...props }: BroadcastCounterProps) => (
    <BroadcastComponent
        screenStorageKey={mightyDecksScreenStorageKey}
        printStorageKey={mightyDecksPrintStorageKey}
        type={ScreenContentTypeEnum.Counter}
        props={props}
        {...broadcastProps}
    />
);
export default BroadcastCounter;
