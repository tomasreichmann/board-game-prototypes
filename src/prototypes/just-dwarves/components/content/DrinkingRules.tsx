import MdxArticle, { MdxArticleProps } from "./MdxArticle";
import DrinkingRulesArticle from "../../content/drinkingRules.mdx";

export default function DrinkingRules(props: Omit<MdxArticleProps, "mdx">) {
    return <MdxArticle mdx={DrinkingRulesArticle} {...props} />;
}
