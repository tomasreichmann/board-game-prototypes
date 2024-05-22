import React, { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import Button from "../../prototypes/kick-ass-cards/components/controls/Button";
import PendingBar, { PendingBarProps } from "./PendingBar";

export type GeneratedImageProps = React.HTMLAttributes<HTMLDivElement> & {
    generationContent?: React.ReactNode;
    initialIsGenerationContentDisplayed?: boolean;
    imageProps?: React.ImgHTMLAttributes<HTMLImageElement>;
    saveFileName?: string;
    pendingProps?: PendingBarProps;
    extraControls?: React.ReactNode;
};

export default function GeneratedImage({
    className,
    imageProps,
    saveFileName,
    generationContent,
    initialIsGenerationContentDisplayed = Boolean(generationContent && !imageProps?.src),
    pendingProps,
    extraControls,
    children,
    ...restProps
}: GeneratedImageProps) {
    const [isGenerationContentDisplayed, setIsGenerationContentDisplayed] = React.useState(
        initialIsGenerationContentDisplayed
    );
    useEffect(() => {
        setIsGenerationContentDisplayed(false);
    }, [imageProps?.src]);
    return (
        <div className={twMerge("relative overflow-hidden", className)} {...restProps}>
            <div className="absolute top-2 right-2 print:hidden flex flex-row flex-wrap max-w-full z-20">
                {generationContent && (
                    <Button
                        className="px-2 py-1 no-underline"
                        variant="text"
                        color="info"
                        onClick={(e: React.SyntheticEvent) => {
                            setIsGenerationContentDisplayed(
                                (isGenerationContentDisplayed) => !isGenerationContentDisplayed
                            );
                            e.stopPropagation();
                        }}
                    >
                        💡
                    </Button>
                )}
                {saveFileName && imageProps?.src && (
                    <Button
                        href={imageProps.src}
                        download={saveFileName}
                        onClick={(e: React.SyntheticEvent) => {
                            e.stopPropagation();
                        }}
                        className="px-2 py-1 no-underline"
                        variant="text"
                        color="success"
                    >
                        💾
                    </Button>
                )}
                {extraControls}
            </div>
            {isGenerationContentDisplayed && generationContent && (
                <div className="absolute top-0 left-0 w-full h-full p-4 pt-16 bg-black text-white bg-opacity-50 z-10 overflow-auto">
                    {generationContent}
                </div>
            )}
            {imageProps?.src && (
                <img
                    src={imageProps.src}
                    {...imageProps}
                    className={twMerge("w-full h-full object-cover", imageProps.className)}
                />
            )}
            {pendingProps && (
                <PendingBar
                    {...pendingProps}
                    className={twMerge("absolute bottom-0 left-0 right-0 z-20", pendingProps?.className)}
                />
            )}
            {children}
        </div>
    );
}
