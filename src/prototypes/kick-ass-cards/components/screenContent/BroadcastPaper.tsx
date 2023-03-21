import { PaperProps } from "../../../../components/print/Paper/Paper";
import { kickAssCardsPrintStorageKey, kickAssCardsScreenStorageKey } from "../../KickAssCardsPrototype";
import { ScreenContentTypeEnum } from "../../services/broadcastScreen";
import BroadcastComponent from "./BroadcastComponent";

export const BroadcastPaper = ({ children, ...props }: PaperProps) => (
    <BroadcastComponent
        screenStorageKey={kickAssCardsScreenStorageKey}
        printStorageKey={kickAssCardsPrintStorageKey}
        type={ScreenContentTypeEnum.Paper}
        props={{
            ...props,
            children: typeof children === "object" ? "This component does not support complex children" : children,
        }}
    />
);
export default BroadcastPaper;
