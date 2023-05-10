import React, { ComponentType } from "react";
// import "./RichText.css";

export type RichTextProps<Aliases extends string, CommonProps extends {}> = {
    children: string;
    commonComponentProps?: CommonProps;
    aliasComponentMap: { [key in Aliases]: ComponentType<{ match: string }> };
    aliasProps?: { [key in Aliases]?: Record<string, any> };
    aliasRegex?: RegExp;
};

export default function RichText<Aliases extends string, CommonProps extends {}>({
    commonComponentProps,
    aliasComponentMap,
    aliasProps = {},
    aliasRegex = RegExp(Object.keys(aliasComponentMap).join("|"), "g"),
    children = "",
}: RichTextProps<Aliases, CommonProps>) {
    const matches = children.match(aliasRegex) || [];
    const fragments = children.split(aliasRegex);
    return (
        <>
            {fragments.reduce((fragments, fragment, fragmentIndex) => {
                const match = matches[fragmentIndex - 1];
                const aliasKey = fragmentIndex * 2 + 1 + "-alias";
                if (fragmentIndex > 0 && match) {
                    if (match in aliasComponentMap) {
                        const Component = aliasComponentMap[match as keyof typeof aliasComponentMap];
                        fragments.push(
                            <Component
                                key={aliasKey}
                                {...commonComponentProps}
                                {...((match in aliasProps ? aliasProps[match as keyof typeof aliasProps] : {}) as any)}
                            />
                        );
                    }
                }
                fragments.push(<React.Fragment key={fragmentIndex * 2}>{fragment}</React.Fragment>);
                return fragments;
            }, [] as JSX.Element[])}
        </>
    );
}
