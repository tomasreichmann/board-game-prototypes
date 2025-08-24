import { mightyDecksPrintStorageKey, mightyDecksScreenStorageKey } from "../routes/routes";
import { ScreenContentTypeEnum } from "../../services/broadcastScreen";
import BroadcastComponent, { BroadcastComponentProps } from "./BroadcastComponent";
import { StuntCardProps } from "../gameComponents/StuntCard";

export type BroadcastStuntCardProps = StuntCardProps & {
    broadcastProps?: Partial<BroadcastComponentProps<ScreenContentTypeEnum.StuntCard>>;
};

export const BroadcastStuntCard = ({ broadcastProps, ...props }: BroadcastStuntCardProps) => (
    <BroadcastComponent
        screenStorageKey={mightyDecksScreenStorageKey}
        printStorageKey={mightyDecksPrintStorageKey}
        type={ScreenContentTypeEnum.StuntCard}
        props={props}
        {...broadcastProps}
    />
);
export default BroadcastStuntCard;
