import Article, { ArticleProps } from "./Article";
import Mdx from "../../content/credits.mdx";

export default function Credits(props: Omit<ArticleProps, "mdx">) {
    return <Article mdx={Mdx} {...props} />;
}
