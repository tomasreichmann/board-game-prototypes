import React from "react";
import GenericMdxArticle, { MdxArticleProps } from "../../../../components/MdxArticle";
import ArticleWithTitle from "./ArticleWithTitle";
import { defaultMdxComponentMap } from "../content/MdxArticle";

export default function MdxArticle({ componentMap = defaultMdxComponentMap, ...restProps }: MdxArticleProps) {
    return <GenericMdxArticle ArticleComponent={ArticleWithTitle} componentMap={componentMap} {...restProps} />;
}
