import { mightyDecksPrintStorageKey, mightyDecksScreenStorageKey } from "../routes/routes";
import { ScreenContentTypeEnum } from "../../services/broadcastScreen";
import { AssetCardProps } from "../gameComponents/AssetCard";
import BroadcastComponent, { BroadcastComponentProps } from "./BroadcastComponent";

export type BroadcastActorProps = AssetCardProps & {
    broadcastProps?: Partial<BroadcastComponentProps<ScreenContentTypeEnum.Asset>>;
};

export const BroadcastAsset = ({ broadcastProps, ...props }: BroadcastActorProps) => (
    <BroadcastComponent
        screenStorageKey={mightyDecksScreenStorageKey}
        printStorageKey={mightyDecksPrintStorageKey}
        type={ScreenContentTypeEnum.Asset}
        props={props}
        {...broadcastProps}
    />
);
export default BroadcastAsset;
