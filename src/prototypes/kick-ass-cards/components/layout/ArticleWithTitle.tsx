import React from "react";
import Article, { ArticleProps } from "../content/Article";

export type ArticleWithTitleProps = React.PropsWithChildren<{ title?: string } & ArticleProps>;

export default function ArticleWithTitle({ title, children, ...restProps }: ArticleWithTitleProps) {
    return (
        <Article {...restProps}>
            {title && <div className="flex-1 flex flex-col gap-2">{title}</div>}
            {children}
        </Article>
    );
}
