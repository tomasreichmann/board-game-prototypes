import { mightyDecksPrintStorageKey, mightyDecksScreenStorageKey } from "../routes/routes";
import { ScreenContentTypeEnum } from "../../services/broadcastScreen";
import BroadcastComponent, { BroadcastComponentProps } from "./BroadcastComponent";
import { GenericCounterCardProps } from "../gameComponents/GenericCounterCard";

export type BroadcastGenericCounterCardProps = GenericCounterCardProps & {
    broadcastProps?: Partial<BroadcastComponentProps<ScreenContentTypeEnum.GenericCounterCard>>;
};

export default function BroadcastGenericCounterCard({ broadcastProps, ...props }: BroadcastGenericCounterCardProps) {
    return (
        <BroadcastComponent
            screenStorageKey={mightyDecksScreenStorageKey}
            printStorageKey={mightyDecksPrintStorageKey}
            type={ScreenContentTypeEnum.GenericCounterCard}
            props={props}
            {...broadcastProps}
        />
    );
}
