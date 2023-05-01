import { twMerge } from "tailwind-merge";
import { defaultComponentMap } from "./ContentItem";
// import { useEffect, useState } from "react";
// import DefaultPending, { PendingProps } from "../misc/Pending";

export type MdxComponent = React.ComponentType<{
    components: {
        [key: string]: React.ComponentType<any>;
    };
}>;

export type ArticleProps = React.PropsWithChildren<{
    className?: string;
    componentMap?: typeof defaultComponentMap;
    mdx: MdxComponent;
    // mdx: MdxComponent | Promise<{ default: MdxComponent }>;
    // Pending?: React.ComponentType<PendingProps>;
}>;

export default function Article({
    className,
    componentMap = defaultComponentMap,
    mdx,
    //Pending = DefaultPending,
    children,
}: ArticleProps) {
    console.log("mdx", mdx);
    const Component = mdx;
    //
    /*return null;
    const [Component, setComponent] = useState<MdxComponent | null>(null);

    useEffect(() => {
        let isValid = true;
        setComponent(null);
        if ("then" in mdx) {
            console.log("mdx", mdx);
            return;
            mdx.then((result) => {
                console.log("result", result, result.default);

                if (isValid && result) {
                    console.log(result.default);

                    //setComponent(result.default);
                }
            });
        } else {
            setComponent(mdx);
        }
        return () => {
            isValid = false;
        };
    }, [mdx]);

    if (!Component) {
        return <Pending />;
    }

    console.log("Component", Component);
    return null;*/
    return (
        <article
            className={twMerge(
                `p-4 text-jd-iron max-w-none 
                prose prose-strong:text-jd-soil prose-blockquote:text-jd-iron prose-em:text-jd-soil prose-ul:[--tw-prose-bullets:rgb(108,24,29)] prose-ul:my-0 prose-li:my-0`,
                className
            )}
        >
            <Component components={componentMap} />
            {children}
        </article>
    );
}
