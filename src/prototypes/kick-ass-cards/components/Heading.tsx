import React from "react";
import { twMerge } from "tailwind-merge";
import BroadcastImage from "./screenContent/BroadcastImage";
import Image, { ImageProps } from "./Image";
import { H2 } from "./content/Text";

export type HeadingProps = React.PropsWithChildren<{
    className?: string;
    heading?: string | null;
    headingClassName?: string | null;
    contentWrapperClassName?: string | null;
    imageUri?: string | null;
    imageClassName?: string | null;
    broadcast?: boolean;
    ImageComponent?: React.ComponentType<ImageProps>;
}>;

export default function Heading({
    className,
    heading,
    headingClassName,
    contentWrapperClassName,
    imageClassName,
    imageUri,
    broadcast,
    ImageComponent = broadcast ? BroadcastImage : Image,
    children,
}: HeadingProps) {
    const headingElement = heading && (
        <H2 className={twMerge("text-3xl text-kac-steel-light z-10", headingClassName)}>{heading}</H2>
    );
    const content = contentWrapperClassName ? (
        <div className={contentWrapperClassName}>
            {headingElement}
            {children}
        </div>
    ) : (
        <>
            {headingElement}
            {children}
        </>
    );
    return (
        <div
            className={twMerge(
                "Heading p-5 relative flex flex-col justify-center items-center not-prose rounded overflow-hidden bg-slate-400 min-h-[max(20vh,400px)]",
                className
            )}
        >
            {imageUri && (
                <ImageComponent
                    src={imageUri}
                    className={twMerge("absolute left-0 top-0 right-0 bottom-0 ", imageClassName)}
                    objectFit="cover"
                    objectPosition="50% 25%"
                />
            )}
            {content}
        </div>
    );
}
