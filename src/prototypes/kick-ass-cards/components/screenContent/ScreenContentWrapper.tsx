import React from "react";
import clsx from "clsx";
import { AnimationEnum, ScreenContentTypeEnum, typeComponentMap } from "../../services/broadcastScreen";

export type ScreenContentWrapperProps<ContentType extends ScreenContentTypeEnum> = {
    type: ContentType;
    props: React.ComponentProps<typeof typeComponentMap[ContentType]>;
    animation?: AnimationEnum;
};

export default function ScreenContentWrapper<ContentType extends ScreenContentTypeEnum>({
    type,
    animation,
    props,
}: ScreenContentWrapperProps<ContentType>) {
    const { className } = props;
    const Component = typeComponentMap[type];
    return (
        <Component
            {...(props as any)}
            className={clsx("w-full h-full bg-no-repeat fill", animation && "animate-" + animation, className)}
        />
    );
}
