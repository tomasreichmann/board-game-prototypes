import Article from "./Article";
import { defaultComponentMap } from "./ContentItem";
import GenericMdxArticle, {
    MdxArticleProps as GenericMdxArticleProps,
} from "../../../../components/content/MdxArticle";

export type MdxComponent = React.ComponentType<{
    components: {
        [key: string]: React.ComponentType<any>;
    };
}>;

export type MdxArticleProps = GenericMdxArticleProps;

export default function MdxArticle({
    className,
    componentMap = defaultComponentMap,
    ArticleComponent = Article,
    mdx,
    children,
}: MdxArticleProps) {
    return (
        <GenericMdxArticle
            className={className}
            ArticleComponent={ArticleComponent}
            mdx={mdx}
            componentMap={componentMap}
        >
            {children}
        </GenericMdxArticle>
    );
}
