import { PaperProps } from "../../../../components/print/Paper/Paper";
import { kickAssCardsPrintStorageKey, kickAssCardsScreenStorageKey } from "../../routes";
import { ScreenContentTypeEnum } from "../../services/broadcastScreen";
import BroadcastComponent, { BroadcastComponentProps } from "./BroadcastComponent";

export type BroadcastActorProps = PaperProps & {
    broadcastProps?: Partial<BroadcastComponentProps<ScreenContentTypeEnum.Paper>>;
};

export const BroadcastPaper = ({ broadcastProps, children, ...props }: BroadcastActorProps) => (
    <BroadcastComponent
        screenStorageKey={kickAssCardsScreenStorageKey}
        printStorageKey={kickAssCardsPrintStorageKey}
        type={ScreenContentTypeEnum.Paper}
        props={{
            ...props,
            children: typeof children === "object" ? "This component does not support complex children" : children,
        }}
        {...broadcastProps}
    />
);
export default BroadcastPaper;
