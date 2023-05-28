import Article, { ArticleProps } from "./Article";
import DrinkingRulesArticle from "../../content/drinkingRules.mdx";

export default function DrinkingRules(props: Omit<ArticleProps, "mdx">) {
    return <Article mdx={DrinkingRulesArticle} {...props} />;
}
