import React, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export type ParagraphProps = React.PropsWithChildren<{
    className?: string;
} & HTMLAttributes<HTMLParagraphElement>>;

export default function Paragraph({
    className,
    children,
}: ParagraphProps) {
    return (
        <p
            className={twMerge(
                "Paragraph max-w-2xl",
                className
            )}
        >
            {children}
        </p>
    );
}
