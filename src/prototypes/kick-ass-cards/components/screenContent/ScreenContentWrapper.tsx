import React from "react";
import { AnimationEnum, ScreenContentTypeEnum, typeComponentMap } from "../../services/broadcastScreen";
import PrintMarkerCorners from "../../../../components/print/PrintMarker/PrintMarkerCorners";
import { twMerge } from "tailwind-merge";

export type ScreenContentWrapperProps<ContentType extends ScreenContentTypeEnum> = React.PropsWithChildren<{
    type: ContentType;
    props: React.ComponentProps<typeof typeComponentMap[ContentType]>;
    animation?: AnimationEnum;
    withPrintMarkerCorners?: boolean;
    size?: AnimationEnum;
}>;

export default function ScreenContentWrapper<ContentType extends ScreenContentTypeEnum>({
    type,
    animation,
    props,
    withPrintMarkerCorners = false,
    children,
}: ScreenContentWrapperProps<ContentType>) {
    const { className } = props;
    const Component = typeComponentMap[type];
    return (
        <Component {...(props as any)} className={twMerge(animation && "animate-" + animation, className)}>
            {withPrintMarkerCorners && <PrintMarkerCorners />}
            {children}
        </Component>
    );
}
