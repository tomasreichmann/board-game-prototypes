import clsx from "clsx";
import { kickAssCardsPrintStorageKey, kickAssCardsScreenStorageKey } from "../../KickAssCardsPrototype";
import { ScreenContentTypeEnum } from "../../services/broadcastScreen";
import { ImageProps } from "../Image";
import BroadcastComponent, { BroadcastComponentProps } from "./BroadcastComponent";

export type BroadcastImageProps = ImageProps & {
    broadcastProps?: Partial<BroadcastComponentProps<ScreenContentTypeEnum.Image>>;
};

export const BroadcastImage = ({ broadcastProps = {}, ...props }: BroadcastImageProps) => {
    const { className, ...restBroadcastProps } = broadcastProps;
    return (
        <BroadcastComponent
            screenStorageKey={kickAssCardsScreenStorageKey}
            printStorageKey={kickAssCardsPrintStorageKey}
            type={ScreenContentTypeEnum.Image}
            props={props}
            className={clsx("bg-black/50 print:bg-transparent", className)}
            broadcastPropsOverride={{
                className: (props.className || "") + " self-stretch flex-1 flex flex-col align-center items-center",
                style: { ...(props.style || {}), height: "min(100vh, 100%)", minWidth: "min(400px, 100vw)" },
            }}
            {...restBroadcastProps}
        />
    );
};
export default BroadcastImage;
