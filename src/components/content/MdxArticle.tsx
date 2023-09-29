import Article, { ArticleProps } from "./Article";
import { defaultComponentMap } from "../../prototypes/just-dwarves/components/content/ContentItem";
import { MDXProvider } from "@mdx-js/react";

export type MdxComponent = React.ComponentType<{
    components?: {
        [key: string]: React.ComponentType<any>;
    };
}>;

export type MdxArticleProps = React.PropsWithChildren<{
    className?: string;
    componentMap?: { [key: string]: React.ComponentType<any> };
    ArticleComponent?: React.ComponentType<ArticleProps>;
    mdx: MdxComponent;
}>;

export default function MdxArticle({
    className,
    componentMap = defaultComponentMap,
    ArticleComponent = Article,
    mdx,
    children,
}: MdxArticleProps) {
    const Component = mdx;
    return (
        <ArticleComponent className={className}>
            <MDXProvider
                    components={
                        componentMap
                    }
                >
                <Component components={componentMap} />
            </MDXProvider>
            {children}
        </ArticleComponent>
    );
}
