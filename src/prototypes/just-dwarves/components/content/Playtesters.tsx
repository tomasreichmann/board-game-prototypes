import Article, { ArticleProps } from "./Article";
import Mdx from "../../content/playtesters.mdx";

export default function Playtesters(props: Omit<ArticleProps, "mdx">) {
    return <Article mdx={Mdx} {...props} />;
}
