import { twMerge } from "tailwind-merge";

export type ArticleProps = React.PropsWithChildren<{
    className?: string;
}>;

export default function Article({ className, children }: ArticleProps) {
    return (
        <article
            className={twMerge(
                `text-jd-iron max-w-none 
                prose prose-strong:text-jd-soil prose-blockquote:text-jd-iron prose-em:text-jd-soil prose-ul:[--tw-prose-bullets:rgb(108,24,29)] prose-ul:my-0 prose-li:my-0`,
                className
            )}
        >
            {children}
        </article>
    );
}
