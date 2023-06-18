import { twMerge } from "tailwind-merge";
import { kickAssCardsPrintStorageKey, kickAssCardsScreenStorageKey } from "../../routes";
import { ScreenContentTypeEnum } from "../../services/broadcastScreen";
import { HeadingProps } from "../Heading";
import BroadcastComponent, { BroadcastComponentProps } from "./BroadcastComponent";

export type BroadcastHeadingProps = HeadingProps & {
    broadcastProps?: Partial<BroadcastComponentProps<ScreenContentTypeEnum.Heading>>;
};

export const BroadcastHeading = ({ broadcastProps = {}, ...props }: BroadcastHeadingProps) => {
    const { className, ...restBroadcastProps } = broadcastProps;

    return (
        <BroadcastComponent
            screenStorageKey={kickAssCardsScreenStorageKey}
            printStorageKey={kickAssCardsPrintStorageKey}
            type={ScreenContentTypeEnum.Heading}
            props={props}
            className={className}
            broadcastPropsOverride={{
                className: twMerge("self-stretch flex-1 flex flex-col align-center items-center", props.className),
            }}
            {...restBroadcastProps}
        />
    );
};
export default BroadcastHeading;
