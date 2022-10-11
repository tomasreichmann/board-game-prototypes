import React from "react";
import clsx from "clsx";
import { ContentType } from "../types";
import DataPreview from "../../../components/DataPreview";
import RichText from "./RichText";
import GameComponents from "./GameComponents";
import ActionUpgradeTree from "./ActionUpgradeTree";
// import "./ContentItem.css";

export type ContentItemProps = {
    componentMap?: typeof defaultComponentMap;
} & ContentType;
type NormalizedChildrenProps = { iconClassName: string } & Pick<ContentType, "children">;
const NormalizedChildren = ({ children, iconClassName }: NormalizedChildrenProps) => {
    if (typeof children === "string") {
        return <RichText iconProps={{ className: iconClassName }}>{children}</RichText>;
    }
    return (
        <>
            {children?.map((child, childIndex) => (
                <ContentItem key={childIndex} {...child} />
            ))}
        </>
    );
};

export const defaultComponentMap: { [key: string]: React.ComponentType<ContentItemProps> } = {
    h1: ({ className, children = "" }) => (
        <h1 className={clsx("break-inside-avoid text-3xl font-dtHeading text-lightning-3 mt-6", className)}>
            <NormalizedChildren iconClassName="h-12 inline-block -my-1">{children}</NormalizedChildren>
        </h1>
    ),
    h2: ({ className, children = "" }) => (
        <h2 className={clsx("break-inside-avoid text-2xl font-dtHeading text-lightning-3 mt-5", className)}>
            <NormalizedChildren iconClassName="h-10 inline-block -my-1">{children}</NormalizedChildren>
        </h2>
    ),
    h3: ({ className, children = "" }) => (
        <h3 className={clsx("break-inside-avoid text-xl font-dtHeading text-lightning-3 mt-4", className)}>
            <NormalizedChildren iconClassName="h-8 inline-block -my-1">{children}</NormalizedChildren>
        </h3>
    ),
    h4: ({ className, children = "" }) => (
        <h4 className={clsx("break-inside-avoid text-lg font-dtHeading text-lightning-3 mt-3", className)}>
            <NormalizedChildren iconClassName="h-7 inline-block -my-1">{children}</NormalizedChildren>
        </h4>
    ),
    h5: ({ className, children = "" }) => (
        <h5 className={clsx("break-inside-avoid text-md font-dtHeading text-lightning-3 mt-2", className)}>
            <NormalizedChildren iconClassName="h-6 inline-block -my-1">{children}</NormalizedChildren>
        </h5>
    ),
    h6: ({ className, children = "" }) => (
        <h6 className={clsx("break-inside-avoid text-md font-dtHeading text-lightning-2 mt-1", className)}>
            <NormalizedChildren iconClassName="h-6 inline-block -my-1">{children}</NormalizedChildren>
        </h6>
    ),
    p: ({ className, children = "" }) => (
        <p className={clsx("break-inside-avoid mb-2", className)}>
            <NormalizedChildren iconClassName="h-6 inline-block -my-1">{children}</NormalizedChildren>
        </p>
    ),
    ol: ({ className, children = "" }) => (
        <ol className={clsx("list-decimal pl-7 mb-2", className)}>
            <NormalizedChildren iconClassName="h-6 inline-block -my-1">{children}</NormalizedChildren>
        </ol>
    ),
    ul: ({ className, children = "" }) => (
        <ul className={clsx("list-disc pl-7 mb-2", className)}>
            <NormalizedChildren iconClassName="h-6 inline-block -my-1">{children}</NormalizedChildren>
        </ul>
    ),
    li: ({ className, children = "" }) => (
        <li className={clsx("break-inside-avoid", typeof children !== "string" ? "list-none" : "", className)}>
            <NormalizedChildren iconClassName="h-6 inline-block -my-1">{children}</NormalizedChildren>
        </li>
    ),
    GameComponents: (props) => <GameComponents />,
    ActionUpgradeTree: (props) => <ActionUpgradeTree />,
    pre: (props) => <DataPreview data={props} />,
};
export default function ContentItem({ componentMap = defaultComponentMap, ...componentProps }: ContentItemProps) {
    const { component } = componentProps;
    const Component = (component && componentMap[component]) || componentMap.pre || defaultComponentMap.pre;
    return <Component {...componentProps} />;
}
