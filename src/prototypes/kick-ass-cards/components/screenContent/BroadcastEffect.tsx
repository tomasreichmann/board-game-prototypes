import { mightyDecksPrintStorageKey, mightyDecksScreenStorageKey } from "../routes/routes";
import { ScreenContentTypeEnum } from "../../services/broadcastScreen";
import { EffectCardProps } from "../gameComponents/EffectCard";
import BroadcastComponent, { BroadcastComponentProps } from "./BroadcastComponent";

export type BroadcastActorProps = EffectCardProps & {
    broadcastProps?: Partial<BroadcastComponentProps<ScreenContentTypeEnum.Effect>>;
};

export const BroadcastEffect = ({ broadcastProps, ...props }: BroadcastActorProps) => (
    <BroadcastComponent
        screenStorageKey={mightyDecksScreenStorageKey}
        printStorageKey={mightyDecksPrintStorageKey}
        type={ScreenContentTypeEnum.Effect}
        props={props}
        {...broadcastProps}
    />
);
export default BroadcastEffect;
