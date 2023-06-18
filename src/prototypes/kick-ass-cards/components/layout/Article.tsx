import React from "react";
import { twMerge } from "tailwind-merge";

export type ArticleProps = React.PropsWithChildren<{ className?: string; title?: string }>;

export default function Article({ className, title, children }: ArticleProps) {
    return (
        <div
            className={twMerge(
                "Article prose text-kac-iron max-w-none prose-headings:font-kacHeading prose-headings:text-kac-blood prose-a:text-kac-monster prose-strong:text-kac-iron-dark prose-blockquote:text-kac-iron-dark prose-em:text-kac-cloth prose-ul:[--tw-prose-bullets:rgb(123,0,29)] prose-ul:my-0 prose-li:my-0",
                className
            )}
        >
            {title && <div className="flex-1 flex flex-col gap-2">{title}</div>}
            {children}
        </div>
    );
}
