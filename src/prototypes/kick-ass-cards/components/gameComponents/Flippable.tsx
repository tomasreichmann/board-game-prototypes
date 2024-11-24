import { twMerge } from "tailwind-merge";
import { PaperOrDiv, PaperProps } from "../../../../components/print/Paper/Paper";
import { IconOrImage } from "../../../../components/Icon/IconOrImage";
import { PropsWithChildren } from "react";
import { transform } from "lodash";

export type FlippableProps = React.PropsWithChildren<{
    className?: string;
    isFaceDown?: boolean;
    backFace: React.ReactNode;
    style?: React.CSSProperties;
}>;

export default function Flippable({
    className,
    children,
    isFaceDown = false,
    backFace,
    style,
    ...restProps
}: FlippableProps) {
    const combinedStyle: React.CSSProperties = {
        ...style,
        transition: "transform 500ms ease-in-out",
        transformStyle: "preserve-3d",
        transformOrigin: "left center",
        transform: isFaceDown ? "translateX(100%) rotateY(-180deg) " : undefined,
    };
    return (
        <div
            className={twMerge("Flippable relative [&_*]:[backface-visibility:hidden]", className)}
            style={combinedStyle}
            {...restProps}
        >
            <div className="FlippableFrontFace">{children}</div>
            <div
                className="FlippableBackFace absolute left-0 top-0"
                style={{ transform: "translateZ(-1px) rotateY(180deg)" }}
            >
                {backFace}
            </div>
        </div>
    );
}
