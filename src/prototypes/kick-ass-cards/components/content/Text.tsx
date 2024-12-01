import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";
import { HTMLAttributes, Ref } from "react";
import { JSONSchemaType } from "ajv";
import ComponentMetaType from "../generation/ComponentMetaType";
import textJsonSchema from "./textJsonSchema";

export const variantComponentMap = {
    body: "p" as const,
    h1: "h1" as const,
    h2: "h2" as const,
    h3: "h3" as const,
    h4: "h4" as const,
    h5: "h5" as const,
    h6: "h6" as const,
};

const variants = cva(["Text"], {
    variants: {
        variant: {
            body: ["text-kac-iron"],
            h1: ["font-kacHeading", "font-bold", "leading-tight", "tracking-tighter"],
            h2: ["font-kacHeading", "font-bold", "leading-tight", "tracking-tighter"],
            h3: ["font-kacHeading", "font-bold", "leading-tight", "tracking-tighter"],
            h4: ["font-kacHeading", "font-bold", "leading-tight", "tracking-tighter"],
            h5: ["font-kacHeading", "font-bold", "leading-tight", "tracking-tighter"],
            h6: ["font-kacHeading", "font-bold", "leading-tight", "tracking-tighter"],
        },
        color: {
            inherit: ["text-inherit"],
            body: ["text-kac-iron"],
            heading: ["text-kac-cloth-dark"],
            primary: ["text-kac-gold-dark"],
            warning: ["text-kac-curse"],
            danger: ["text-kac-blood"],
            success: ["text-kac-monster-dark"],
            white: ["text-white"],
        },
        size: {
            xs: ["text-xs"],
            sm: ["text-sm"],
            md: ["text-md"],
            lg: ["text-lg"],
            xl: ["text-xl"],
            xxl: ["text-2xl"],
            xxxl: ["text-3xl"],
            xxxxl: ["text-4xl"],
        },
    },
    defaultVariants: {
        variant: "body",
        color: "body",
    },
});

const defaultVariantColorMap = {
    body: "body",
    h1: "heading",
    h2: "heading",
    h3: "heading",
    h4: "heading",
    h5: "heading",
    h6: "heading",
} as const;

const defaultVariantSizeMap = {
    body: "md",
    h1: "xxxl",
    h2: "xxl",
    h3: "xl",
    h4: "lg",
    h5: "md",
    h6: "sm",
} as const;

export type TextPropsEditable = Pick<TextProps, "variant" | "color" | "size" | "children">;

export type TextProps = React.PropsWithChildren<{
    className?: string;
    ref?: Ref<any>;
    Component?:
        | React.ComponentType<React.PropsWithChildren<any>>
        | "div"
        | "span"
        | "h1"
        | "h2"
        | "h3"
        | "h4"
        | "h5"
        | "h6"
        | "p";
}> &
    VariantProps<typeof variants> &
    HTMLAttributes<HTMLParagraphElement | HTMLHeadingElement>;

export const textMeta: ComponentMetaType<TextProps> = {
    componentName: "Text",
    Component: Text,
    description:
        "Text component renders text with a font style defined by the variant prop and color defined by the color prop.",
    generationConfig: {
        props: {
            children: {
                llm: true,
            },
            color: {
                llm: true,
            },
            variant: {
                llm: true,
            },
        },
    },
    schema: textJsonSchema as JSONSchemaType<TextProps>,
};

export default function Text({
    className,
    children,
    variant = "body",
    Component,
    color = defaultVariantColorMap[variant || "body"],
    size = defaultVariantSizeMap[variant || "body"],
    ref,
    ...restProps
}: TextProps) {
    const ResolvedComponent = Component || variantComponentMap[variant || "body"];
    return (
        <ResolvedComponent ref={ref} className={twMerge(variants({ variant, color, size }), className)} {...restProps}>
            {children}
        </ResolvedComponent>
    );
}

export const H1 = ({ ...props }: TextProps) => <Text variant="h1" {...props} />;
export const H2 = ({ ...props }: TextProps) => <Text variant="h2" {...props} />;
export const H3 = ({ ...props }: TextProps) => <Text variant="h3" {...props} />;
export const H4 = ({ ...props }: TextProps) => <Text variant="h4" {...props} />;
export const H5 = ({ ...props }: TextProps) => <Text variant="h5" {...props} />;
export const H6 = ({ ...props }: TextProps) => <Text variant="h6" {...props} />;
export const P = ({ ...props }: TextProps) => <Text variant="body" {...props} />;
