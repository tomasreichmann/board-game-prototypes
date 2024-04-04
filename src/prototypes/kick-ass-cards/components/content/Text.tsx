import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";
import { JSONSchemaType } from "ajv";
import ComponentMetaType from "../generation/ComponentMetaType";

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
            body: ["text-kac-iron", "text-md"],
            h1: ["font-kacHeading", "text-4xl"],
            h2: ["font-kacHeading", "text-3xl"],
            h3: ["font-kacHeading", "text-2xl"],
            h4: ["font-kacHeading", "text-xl"],
            h5: ["font-kacHeading", "text-lg"],
            h6: ["font-kacHeading", "text-md"],
        },
        color: {
            body: ["text-kac-iron"],
            heading: ["text-kac-cloth-dark"],
            danger: ["text-kac-blood"],
            success: ["text-kac-monster-dark"],
        },
    },
    defaultVariants: {
        variant: "body",
        color: "body",
    },
});

const defaultVariantColorMap = {
    body: "body" as const,
    h1: "heading" as const,
    h2: "heading" as const,
    h3: "heading" as const,
    h4: "heading" as const,
    h5: "heading" as const,
    h6: "heading" as const,
};

export type TextProps = React.PropsWithChildren<{
    className?: string;
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

export const textSchema: JSONSchemaType<Pick<TextProps, "variant" | "color"> & { children: any }> = {
    type: "object",
    properties: {
        variant: {
            type: "string",
            enum: ["body", "h1", "h2", "h3", "h4", "h5", "h6"],
            nullable: true,
        },
        color: {
            type: "string",
            enum: ["body", "heading", "danger", "success"],
            nullable: true,
        },
        children: {
            type: "string",
            nullable: true,
        },
    },
    additionalProperties: true,
};

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
    schema: textSchema as JSONSchemaType<TextProps>,
};

export default function Text({
    className,
    children,
    variant = "body",
    Component,
    color = defaultVariantColorMap[variant || "body"],
    ...restProps
}: TextProps) {
    const ResolvedComponent = Component || variantComponentMap[variant || "body"];
    return (
        <ResolvedComponent className={twMerge(variants({ variant, color }), className)} {...restProps}>
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
