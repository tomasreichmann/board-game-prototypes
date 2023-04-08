import { v4 as uuidv4 } from "uuid";
import Icon from "../../../../components/Icon/Icon";
import {
    AnimationEnum,
    ScreenContentType,
    ScreenContentTypeEnum,
    ScreenStoreActionTypeEnum,
    typeComponentMap,
    useBroadcastData,
} from "../../services/broadcastScreen";
import { twMerge } from "tailwind-merge";

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
            <div className={twMerge("relative not-prose", className)}>
                <Component {...(props as any)} />
                <div className="dropdown dropdown-bottom dropdown-end absolute right-2 top-2 flex flex-col gap-2">
                    <label
                        tabIndex={0}
                        className="btn btn-sm bg-kac-cloth border-0 hover:bg-kac-cloth-light text-kac-iron"
                    >
                        <Icon icon="cast" className="h-4" />
                    </label>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu menu-compact p-1 shadow bg-kac-steel-light text-kac-monster-dark-content rounded-sm w-24"
                    >
                        <li className="mt-2 mb-0 px-5 text-sm font-kacHeading text-kac-steel-dark">Screen</li>
                        <li className="my-1">
                            <div
                                onClick={() => {
                                    dispatchScreen({
                                        type: ScreenStoreActionTypeEnum.ReplaceContent,
                                        content,
                                    });
                                }}
                                className="px-4 py-1 text-xs text-kac-cloth-dark"
                            >
                                Replace
                            </div>
                        </li>
                        <li className="my-1">
                            <div
                                onClick={() => {
                                    dispatchScreen({
                                        type: ScreenStoreActionTypeEnum.AppendContent,
                                        content,
                                    });
                                }}
                                className="px-4 py-1 text-xs text-kac-cloth-dark"
                            >
                                Add
                            </div>
                        </li>
                        <li className="my-1">
                            <div
                                onClick={() => {
                                    dispatchScreen({
                                        type: ScreenStoreActionTypeEnum.ReplaceContent,
                                        content: [],
                                    });
                                }}
                                className="px-4 py-1 text-xs text-kac-cloth-dark"
                            >
                                Clear
                            </div>
                        </li>
                        <li className="mt-2 mb-0 px-5 text-sm font-kacHeading text-kac-steel-dark">Print</li>
                        <li className="my-1">
                            <div
                                onClick={() => {
                                    dispatchPrint({
                                        type: ScreenStoreActionTypeEnum.ReplaceContent,
                                        content,
                                    });
                                }}
                                className="px-4 py-1 text-xs text-kac-cloth-dark"
                            >
                                Replace
                            </div>
                        </li>
                        <li className="my-1">
                            <div
                                onClick={() => {
                                    dispatchPrint({
                                        type: ScreenStoreActionTypeEnum.AppendContent,
                                        content,
                                    });
                                }}
                                className="px-4 py-1 text-xs text-kac-cloth-dark"
                            >
                                Add
                            </div>
                        </li>
                        <li className="my-1">
                            <div
                                onClick={() => {
                                    dispatchPrint({
                                        type: ScreenStoreActionTypeEnum.ReplaceContent,
                                        content: [],
                                    });
                                }}
                                className="px-4 py-1 text-xs text-kac-cloth-dark"
                            >
                                Clear
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
    return null;
}
