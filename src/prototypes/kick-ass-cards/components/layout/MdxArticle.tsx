import React from "react";
import GenericMdxArticle, { MdxArticleProps } from "../../../../components/MdxArticle";
import Article from "./Article";

export default function MdxArticle({ ...restProps }: MdxArticleProps) {
    return <GenericMdxArticle ArticleComponent={Article} {...restProps} />;
}
