import { v4 as uuidv4 } from "uuid";
import { Button } from "react-daisyui";
import Icon from "../../../../components/Icon/Icon";
import {
    AnimationEnum,
    ScreenContentType,
    ScreenContentTypeEnum,
    ScreenStoreActionTypeEnum,
    typeComponentMap,
    useBroadcastData,
} from "../../services/broadcastScreen";

export type BroadcastComponentProps<ContentType extends ScreenContentTypeEnum> = {
    type: ContentType;
    props: React.ComponentProps<typeof typeComponentMap[ContentType]>;
    storageKey?: string;
};

const isContentType = (type: string): type is keyof typeof typeComponentMap => {
    return type in typeComponentMap;
};

export default function BroadcastComponent<ContentType extends ScreenContentTypeEnum>({
    type,
    props,
    storageKey,
}: BroadcastComponentProps<ContentType>) {
    const { dispatch } = useBroadcastData(storageKey);
    if (isContentType(type)) {
        const Component = typeComponentMap[type];

        return (
            <div className="relative">
                <Component {...(props as any)} />
                <Button
                    className="absolute right-2 top-2 h-auto"
                    size="xs"
                    color="secondary"
                    onClick={() => {
                        dispatch({
                            type: ScreenStoreActionTypeEnum.ReplaceContent,
                            content: [
                                {
                                    type,
                                    id: uuidv4(),
                                    props,
                                    animation: AnimationEnum.FadeIn,
                                } as ScreenContentType,
                            ],
                        });
                    }}
                >
                    <Icon icon="cast" className="h-4 block" />
                </Button>
            </div>
        );
    }
    return null;
}
