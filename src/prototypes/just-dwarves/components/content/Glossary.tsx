import MdxArticle, { MdxArticleProps } from "./MdxArticle";

import GlossaryArticle from "../../content/glossary.mdx";

export default function Glossary(props: Omit<MdxArticleProps, "mdx">) {
    return <MdxArticle mdx={GlossaryArticle} {...props} />;
}
