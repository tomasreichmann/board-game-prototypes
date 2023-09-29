import React from "react";
import GenericMdxArticle, { MdxArticleProps } from "../../../../components/MdxArticle";
import Article from "./Article";
import { defaultMdxComponentMap } from "../content/MdxArticle";

export default function MdxArticle({ componentMap = defaultMdxComponentMap, ...restProps }: MdxArticleProps) {
    return <GenericMdxArticle ArticleComponent={Article} componentMap={componentMap} {...restProps} />;
}
