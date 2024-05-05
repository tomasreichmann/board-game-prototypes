import React, { useEffect, useState } from "react";
import MdxArticle, { MdxArticleProps } from "./MdxArticle";

import { evaluate, run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { MDXModule } from "@mdx-js/mdx/lib/run";
import Pending from "../../../../components/form/Pending";

export type MdxProps = {
    mdxString: string;
} & Omit<MdxArticleProps, "mdx">;
export type MdxEditable = Pick<MdxProps, "mdxString">;

export default function Mdx({ mdxString = "", ...restProps }: MdxProps) {
    const [mdxComponent, setMdxComponent] = useState<MDXModule["default"] | undefined>(undefined);
    useEffect(() => {
        evaluate(mdxString, { ...runtime, baseUrl: import.meta.url, Fragment: React.Fragment }).then(
            ({ default: mdxComponent }) => setMdxComponent(() => mdxComponent)
        );
    }, [mdxString]);
    return mdxComponent ? <MdxArticle mdx={mdxComponent} {...restProps} /> : <Pending />;
}
