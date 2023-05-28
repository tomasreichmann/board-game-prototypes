import Article, { ArticleProps } from "./Article";
import ChangelogArticle from "../../content/changelog.mdx";

export default function Changelog(props: Omit<ArticleProps, "mdx">) {
    return <Article mdx={ChangelogArticle} {...props} />;
}
