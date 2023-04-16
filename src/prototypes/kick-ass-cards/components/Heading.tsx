import React from "react";
import { twMerge } from "tailwind-merge";
import BroadcastImage from "./screenContent/BroadcastImage";
import Image, { ImageProps } from "./Image";

export type HeadingProps = React.PropsWithChildren<{
    className?: string;
    heading?: string | null;
    headingClassName?: string | null;
    imageUri?: string | null;
    imageClassName?: string | null;
    broadcast?: boolean;
    ImageComponent?: React.ComponentType<ImageProps>;
}>;

export default function Heading({
    className,
    heading,
    headingClassName,
    imageClassName,
    imageUri,
    broadcast,
    ImageComponent = broadcast ? BroadcastImage : Image,
    children,
}: HeadingProps) {
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
            {heading && (
                <h2
                    className={twMerge(
                        "font-kacHeading text-3xl text-kac-steel-light text-center z-10 drop-shadow-2xl",
                        headingClassName
                    )}
                >
                    {heading}
                </h2>
            )}

            {children}
        </div>
    );
}
