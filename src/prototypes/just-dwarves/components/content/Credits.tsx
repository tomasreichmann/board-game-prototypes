import MdxArticle, { MdxArticleProps } from "./MdxArticle";
import Mdx from "../../content/credits.mdx";

export default function Credits(props: Omit<MdxArticleProps, "mdx">) {
    return <MdxArticle mdx={Mdx} {...props} />;
}
