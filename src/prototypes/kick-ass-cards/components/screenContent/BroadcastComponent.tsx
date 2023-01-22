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
import clsx from "clsx";

export type BroadcastComponentProps<ContentType extends ScreenContentTypeEnum> = {
    type: ContentType;
    props: React.ComponentProps<typeof typeComponentMap[ContentType]>;
    broadcastPropsOverride?: Partial<React.ComponentProps<typeof typeComponentMap[ContentType]>>;
    screenStorageKey: string;
    printStorageKey: string;
    className?: string;
};

const isContentType = (type: string): type is keyof typeof typeComponentMap => {
    return type in typeComponentMap;
};

export default function BroadcastComponent<ContentType extends ScreenContentTypeEnum>({
    type,
    props,
    broadcastPropsOverride,
    screenStorageKey,
    printStorageKey,
    className,
}: BroadcastComponentProps<ContentType>) {
    const { dispatch: dispatchScreen } = useBroadcastData(screenStorageKey);
    const { dispatch: dispatchPrint } = useBroadcastData(printStorageKey);
    if (isContentType(type)) {
        const Component = typeComponentMap[type];

        const content: ScreenContentType[] = [
            {
                type,
                id: uuidv4(),
                props: { ...props, ...broadcastPropsOverride },
                animation: AnimationEnum.FadeIn,
            } as ScreenContentType,
        ];

        return (
            <div className={clsx("relative", className)}>
                <Component {...(props as any)} />
                <div className="absolute right-2 top-2 flex flex-col gap-2">
                    <Button
                        className="h-auto"
                        size="xs"
                        color="secondary"
                        onClick={() => {
                            dispatchScreen({
                                type: ScreenStoreActionTypeEnum.ReplaceContent,
                                content,
                            });
                        }}
                    >
                        <Icon icon="cast" className="h-4 block" />
                    </Button>
                    <Button
                        className="h-auto"
                        size="xs"
                        color="secondary"
                        onClick={() => {
                            dispatchScreen({
                                type: ScreenStoreActionTypeEnum.AppendContent,
                                content,
                            });
                        }}
                    >
                        <Icon icon="cast" className="h-4 block" />
                        <span className="relative left-[-9px] -mr-2 ">+</span>
                    </Button>
                    <Button
                        className="h-auto"
                        size="xs"
                        color="secondary"
                        onClick={() => {
                            dispatchScreen({
                                type: ScreenStoreActionTypeEnum.ReplaceContent,
                                content: [],
                            });
                        }}
                    >
                        <Icon icon="cast" className="h-4 block" />
                        <span className="relative left-[-9px] -mr-2 ">×</span>
                    </Button>

                    <Button
                        className="h-auto"
                        size="xs"
                        color="secondary"
                        onClick={() => {
                            dispatchPrint({
                                type: ScreenStoreActionTypeEnum.ReplaceContent,
                                content,
                            });
                        }}
                    >
                        <Icon icon="print" className="h-4 block" />
                    </Button>
                    <Button
                        className="h-auto"
                        size="xs"
                        color="secondary"
                        onClick={() => {
                            dispatchPrint({
                                type: ScreenStoreActionTypeEnum.AppendContent,
                                content,
                            });
                        }}
                    >
                        <Icon icon="print" className="h-4 block" />
                        <span>+</span>
                    </Button>
                    <Button
                        className="h-auto"
                        size="xs"
                        color="secondary"
                        onClick={() => {
                            dispatchPrint({
                                type: ScreenStoreActionTypeEnum.ReplaceContent,
                                content: [],
                            });
                        }}
                    >
                        <Icon icon="print" className="h-4 block" />
                        <span>×</span>
                    </Button>
                </div>
            </div>
        );
    }
    return null;
}
