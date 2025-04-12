import React, { HTMLAttributes } from "react";
import twm from "@/utils/twm";

const titleClassName = "font-kacTitle leading-tight uppercase";
const headingClassName = "font-kacHeading font-bold leading-tight tracking-tighter";
const bodyClassName = "font-kacBody leading-tight tracking-tight";
const sizeClassNameMap = {
    "3xl": "text-5xl",
    "2xl": "text-xl",
    xl: "text-base",
    lg: "text-sm",
    md: "text-xs",
} as const;

const variantComponentMap = {
    title: "h1",
    h1: "h1",
    h2: "h2",
    h3: "h3",
    body: "p",
} as const;

const variantSizeMap = {
    title: "3xl",
    h1: "2xl",
    h2: "xl",
    h3: "lg",
    body: "md",
} as const;

const variantColorMap = {
    title: "title",
    h1: "heading",
    h2: "heading",
    h3: "heading",
    body: "body",
} as const;

const headingColorClassName = "text-kac-cloth-dark";
const bodyColorClassName = "text-kac-iron";
const colorClassNameMap = {
    title: "text-kac-iron-light",
    heading: headingColorClassName,
    h1: headingColorClassName,
    h2: headingColorClassName,
    h3: headingColorClassName,
    body: bodyColorClassName,
} as const;

const variantClassNameMap = {
    title: titleClassName,
    h1: headingClassName,
    h2: headingClassName,
    h3: headingClassName,
    body: bodyClassName,
} as const;

const varinatMtClassNameMap = {
    title: "mt-10",
    h1: "mt-8",
    h2: "mt-6",
    h3: "mt-4",
    body: "mt-2",
} as const;

const varinatMbClassNameMap = {
    title: "mb-8",
    h1: "mb-6",
    h2: "mb-4",
    h3: "mb-2",
    body: "mb-0",
} as const;


export type TextProps = React.PropsWithChildren<{
    className?: string;
    Component?: React.ElementType;
    variant?: "title" | "h1" | "h2" | "h3" | "body";
    size?: keyof typeof sizeClassNameMap;
    color?: keyof typeof colorClassNameMap;
    center?: boolean;
    mb?: boolean;
    mt?: boolean;
}> &
    HTMLAttributes<HTMLElement>;

export default function Text({
    variant = "body",
    Component = variantComponentMap[variant],
    size = variantSizeMap[variant],
    color = variantColorMap[variant],
    center = false,
    mt = false,
    mb = false,
    className,
    children,
    ...restProps
}: TextProps) {
    console.log("Text", restProps);
    return (
        <Component
            {...restProps}
            className={twm(
                sizeClassNameMap[size],
                variantClassNameMap[variant],
                colorClassNameMap[color],
                mt && varinatMtClassNameMap[variant],
                mb && varinatMbClassNameMap[variant],
                center ? "text-center" : "",
                className
            )}
        >
            {children}
        </Component>
    );
}

export const Title = (props: TextProps) => (
    <Text variant="title" Component={variantComponentMap.title} size={variantSizeMap.title} color={variantColorMap.title} {...props} />
);
export const H1 = (props: TextProps) => (
    <Text variant="h1" Component={variantComponentMap.h1} size={variantSizeMap.h1} color={variantColorMap.h1} {...props} />
);
export const H2 = (props: TextProps) => (
    <Text variant="h2" Component={variantComponentMap.h2} size={variantSizeMap.h2} color={variantColorMap.h2} {...props} />
);
export const H3 = (props: TextProps) => (
    <Text variant="h3" Component={variantComponentMap.h3} size={variantSizeMap.h3} color={variantColorMap.h3} {...props} />
);
export const Body = (props: TextProps) => (
    <Text variant="body" Component={variantComponentMap.body} size={variantSizeMap.body} color={variantColorMap.body} {...props} />
);
