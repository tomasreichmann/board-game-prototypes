import { twMerge } from "tailwind-merge";
import { kickAssCardsPrintStorageKey, kickAssCardsScreenStorageKey } from "../routes/routes";
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
            className={className}
            broadcastPropsOverride={{
                className: twMerge("self-stretch flex-1 flex flex-col align-center items-center", props.className),
                style: { ...(props.style || {}), height: "100%", maxHeight: "100vh", minWidth: "min(400px, 100vw)" },
            }}
            {...restBroadcastProps}
        />
    );
};
export default BroadcastImage;
