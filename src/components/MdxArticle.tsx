export type MdxComponent = React.ComponentType<{
    components?: {
        [key: string]: React.ComponentType<any>;
    };
}>;

export type MdxArticleProps = React.PropsWithChildren<{
    className?: string;
    componentMap?: { [key: string]: React.ComponentType<any> };
    ArticleComponent?:
        | React.ComponentType<{
              className?: string;
          }>
        | "article";
    mdx: MdxComponent;
}>;

const emptyComponentMap = {};

export default function MdxArticle({
    className,
    componentMap = emptyComponentMap,
    ArticleComponent = "article",
    mdx,
    children,
}: MdxArticleProps) {
    const Component = mdx;
    return (
        <ArticleComponent className={className}>
            <Component components={componentMap} />
            {children}
        </ArticleComponent>
    );
}
