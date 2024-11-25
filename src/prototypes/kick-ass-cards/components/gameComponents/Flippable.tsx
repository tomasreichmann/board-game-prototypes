import { twMerge } from "tailwind-merge";
import { HTMLAttributes } from "react";

export type FlippableProps = React.PropsWithChildren<{
    className?: string;
    isFaceDown?: boolean;
    backFace: React.ReactNode;
    style?: React.CSSProperties;
}> &
    HTMLAttributes<HTMLDivElement>;

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
        <div className={twMerge("Flippable relative", className)} style={combinedStyle} {...restProps}>
            <div className="FlippableFrontFace">{children}</div>
            <div
                className="FlippableBackFace absolute left-0 top-0"
                style={{ transform: "translateZ(-0.1px) rotateY(180deg)" }}
            >
                {backFace}
            </div>
        </div>
    );
}
