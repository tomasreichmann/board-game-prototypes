import { kickAssCardsPrintStorageKey, kickAssCardsScreenStorageKey } from "../../routes";
import { ScreenContentTypeEnum } from "../../services/broadcastScreen";
import { ActorCardProps } from "../gameComponents/ActorCard";
import { ImageProps } from "../Image";
import BroadcastComponent, { BroadcastComponentProps } from "./BroadcastComponent";
import BroadcastImage from "./BroadcastImage";

const BroadcastActorImage = (props: ImageProps) => (
    <BroadcastImage {...props} broadcastProps={{ className: "h-full" }} />
);

export type BroadcastActorProps = ActorCardProps & {
    broadcastProps?: Partial<BroadcastComponentProps<ScreenContentTypeEnum.Actor>>;
};

export const BroadcastActor = ({ broadcastProps, ...props }: BroadcastActorProps) => (
    <BroadcastComponent
        screenStorageKey={kickAssCardsScreenStorageKey}
        printStorageKey={kickAssCardsPrintStorageKey}
        type={ScreenContentTypeEnum.Actor}
        props={{ ...props, ImageComponent: BroadcastActorImage }}
        {...broadcastProps}
    />
);
export default BroadcastActor;
