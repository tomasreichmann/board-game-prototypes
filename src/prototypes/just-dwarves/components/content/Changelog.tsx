import MdxArticle, { MdxArticleProps } from "./MdxArticle";
import ChangelogArticle from "../../content/changelog.mdx";

export default function Changelog(props: Omit<MdxArticleProps, "mdx">) {
    return <MdxArticle mdx={ChangelogArticle} {...props} />;
}
