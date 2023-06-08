import MdxArticle, { MdxArticleProps } from "./MdxArticle";
import Mdx from "../../content/playtesters.mdx";

export default function Playtesters(props: Omit<MdxArticleProps, "mdx">) {
    return <MdxArticle mdx={Mdx} {...props} />;
}
