import { mightyDecksPrintStorageKey, mightyDecksScreenStorageKey } from "../routes/routes";
import { ScreenContentTypeEnum } from "../../services/broadcastScreen";
import BroadcastComponent, { BroadcastComponentProps } from "./BroadcastComponent";
import { ActorCardWithTacticalOverlayProps } from "../gameComponents/ActorCardWithTacticalOverlay";

export type BroadcastActorCardWithTacticalOverlayProps = ActorCardWithTacticalOverlayProps & {
    broadcastProps?: Partial<BroadcastComponentProps<ScreenContentTypeEnum.ActorCardWithTacticalOverlay>>;
};

export const BroadcastActorCardWithTacticalOverlay = ({
    broadcastProps,
    ...props
}: BroadcastActorCardWithTacticalOverlayProps) => (
    <BroadcastComponent
        screenStorageKey={mightyDecksScreenStorageKey}
        printStorageKey={mightyDecksPrintStorageKey}
        type={ScreenContentTypeEnum.ActorCardWithTacticalOverlay}
        props={props}
        {...broadcastProps}
    />
);
export default BroadcastActorCardWithTacticalOverlay;
