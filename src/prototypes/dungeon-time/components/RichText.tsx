import React from "react";
import Icon, { aliasMap, IconProps, IconType } from "./Icon";
// import "./RichText.css";

export type RichTextProps = {
    className?: string;
    children: string;
    iconProps?: Partial<IconProps>;
    aliasProps?: { [key in keyof typeof aliasMap | keyof typeof componentAliases]?: Record<string, any> };
};

const componentAliases = {
    "\n": () => <br />,
};

const aliasRegex = new RegExp(
    Object.keys(aliasMap)
        .map((alias) => {
            return alias + "(?:_\\d+)?";
        })
        .concat(Object.keys(componentAliases).map((componentAlias) => componentAlias))
        .join("|"),
    "g"
);

export default function RichText({ className, iconProps = {}, aliasProps = {}, children = "" }: RichTextProps) {
    const matches = children.match(aliasRegex) || [];
    const fragments = children.split(aliasRegex);
    return (
        <>
            {fragments.reduce((fragments, fragment, fragmentIndex) => {
                const match = matches[fragmentIndex - 1];
                const aliasKey = fragmentIndex * 2 + 1 + "-alias";
                if (fragmentIndex > 0 && match) {
                    const icon = match.replace(/_\d+$/, "") as IconType;
                    if (match in componentAliases) {
                        const Component = componentAliases[match as keyof typeof componentAliases];
                        fragments.push(
                            <Component
                                key={aliasKey}
                                {...(match in aliasProps ? aliasProps[match as keyof typeof aliasProps] : {})}
                            />
                        );
                    } else if (icon in aliasMap) {
                        fragments.push(
                            <React.Fragment key={aliasKey}>
                                <Icon
                                    icon={icon}
                                    {...(icon in aliasProps ? aliasProps[icon as keyof typeof aliasProps] : iconProps)}
                                />
                            </React.Fragment>
                        );
                    }
                }
                fragments.push(<React.Fragment key={fragmentIndex * 2}>{fragment}</React.Fragment>);
                return fragments;
            }, [] as JSX.Element[])}
        </>
    );
}
