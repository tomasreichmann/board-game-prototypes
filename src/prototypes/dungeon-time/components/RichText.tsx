import React, { ReactElement } from "react";
import clsx from "clsx";
import Paper from "../../../components/print/Paper/Paper";
import { ActionType } from "../types";
import Icon, { iconAliases, IconProps, IconType } from "./Icon/Icon";
// import "./RichText.css";

export type RichTextProps = {
    className?: string;
    children: string;
    iconProps?: Partial<IconProps>;
};

const aliasRegex = new RegExp(
    Object.keys(iconAliases)
        .map((alias) => {
            return alias + "(?:_\\d+)?";
        })
        .join("|"),
    "g"
);

export default function RichText({ className, iconProps = {}, children = "" }: RichTextProps) {
    const matches = children.match(aliasRegex) || [];
    const fragments = children.split(aliasRegex);
    return (
        <>
            {fragments.reduce((fragments, fragment, fragmentIndex) => {
                const match = matches[fragmentIndex - 1];
                if (fragmentIndex > 0 && match) {
                    const icon = match.replace(/_\d+$/, "") as IconType;
                    fragments.push(
                        <React.Fragment key={fragmentIndex * 2 + 1 + "-alias"}>
                            <Icon icon={icon} {...iconProps} />
                        </React.Fragment>
                    );
                }
                fragments.push(<React.Fragment key={fragmentIndex * 2}>{fragment}</React.Fragment>);
                return fragments;
            }, [] as JSX.Element[])}
        </>
    );
}
