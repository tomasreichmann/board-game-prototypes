import Article, { ArticleProps } from "./Article";
import GlossaryArticle from "../../content/glossary.mdx";

export default function Glossary(props: Omit<ArticleProps, "mdx">) {
    return <Article mdx={GlossaryArticle} {...props} />;
}
