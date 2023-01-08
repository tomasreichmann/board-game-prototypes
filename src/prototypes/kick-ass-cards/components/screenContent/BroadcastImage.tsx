import { v4 as uuidv4 } from "uuid";
import { Button } from "react-daisyui";
import Icon from "../../../../components/Icon/Icon";
import {
    AnimationEnum,
    ScreenContentTypeEnum,
    ScreenStoreActionTypeEnum,
    useBroadcastData,
} from "../../services/broadcastScreen";

export type BroadcastImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

export default function BroadcastImage(props: BroadcastImageProps) {
    const { dispatch } = useBroadcastData();
    return (
        <div className="relative">
            <img {...props} />
            <Button
                className="absolute right-2 top-2 h-auto"
                size="xs"
                color="secondary"
                onClick={() => {
                    if (props.src) {
                        dispatch({
                            type: ScreenStoreActionTypeEnum.AppendContent,
                            content: [
                                {
                                    type: ScreenContentTypeEnum.Image,
                                    id: uuidv4(),
                                    uri: props.src,
                                    style: { backgroundSize: "contain", backgroundColor: "black" },
                                    animation: AnimationEnum.FadeIn,
                                },
                            ],
                        });
                    }
                }}
            >
                <Icon icon="cast" className="h-4 block" />
            </Button>
        </div>
    );
}
