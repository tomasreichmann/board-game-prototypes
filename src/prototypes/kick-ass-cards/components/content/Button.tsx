import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

const variants = cva(["Button"], {
    variants: {
        variant: {
            text: [
                "underline",
                "bg-transparent",
                "rounded-md",
                "underline",
                "hover:no-underline",
                "hover:outline-0",
                "focus:outline-2",
                "border-0",
                "p-0",
            ],
            solid: [
                "px-4",
                "py-2",
                "rounded-md",
                "text-white",
                "outline",
                "outline-0",
                "outline-transparent",
                "hover:outline-2",
                "focus:outline",
                "focus:outline-2",
                "transition-all",
                "border-0",
            ],
            outline: [
                "px-4",
                "py-2",
                "rounded-md",
                "outline",
                "outline-2",
                "border-0",
                "hover:border-0",
                "focus:border-0",
            ],
        },
        disabled: {
            true: ["pointer-events-none", "hover:outline-0", "focus:outline-0"],
        },
        color: {
            primary: [],
            secondary: [],
            danger: [],
            success: [],
            info: [],
        },
        size: {
            xs: ["text-xs"],
            sm: ["text-sm"],
            md: ["text-md"],
            lg: ["text-lg"],
            xl: ["text-xl"],
        },
    },
    defaultVariants: {
        variant: "solid",
        color: "primary",
    },
    compoundVariants: [
        {
            size: "xs",
            variant: ["solid", "outline"],
            className: ["px-1", "py-0.5"],
        },
        {
            size: "sm",
            variant: ["solid", "outline"],
            className: ["px-2", "py-1"],
        },
        {
            size: "md",
            variant: ["solid", "outline"],
            className: ["px-4", "py-2"],
        },
        {
            size: "lg",
            variant: ["solid", "outline"],
            className: ["px-8", "py-3"],
        },
        {
            size: "xl",
            variant: ["solid", "outline"],
            className: ["px-12", "py-4"],
        },

        {
            variant: "solid",
            color: "primary",
            className: [
                "bg-kac-gold-dark",
                "hover:bg-kac-gold",
                "hover:outline-kac-gold",
                "focus:outline-kac-gold",
                "hover:text-white",
            ],
        },
        {
            variant: "solid",
            color: "secondary",
            className: [
                "bg-kac-bone-dark",
                "hover:bg-kac-bone",
                "hover:outline-kac-bone",
                "focus:outline-kac-bone",
                "hover:text-white",
            ],
        },
        {
            variant: "solid",
            color: "danger",
            className: [
                "bg-kac-blood-dark",
                "hover:bg-kac-blood",
                "hover:outline-kac-blood",
                "focus:outline-kac-blood",
                "hover:text-white",
            ],
        },
        {
            variant: "solid",
            color: "success",
            className: [
                "bg-kac-monster-dark",
                "hover:bg-kac-monster",
                "hover:outline-kac-monster",
                "focus:outline-kac-monster",
                "hover:text-white",
            ],
        },
        {
            variant: "solid",
            color: "info",
            className: [
                "bg-kac-cloth-dark",
                "hover:bg-kac-cloth",
                "hover:outline-kac-cloth",
                "focus:outline-kac-cloth",
                "hover:text-white",
            ],
        },
        {
            variant: "text",
            color: "primary",
            className: ["text-kac-gold-dark", "hover:text-kac-gold-dark", "hover:border-kac-gold"],
        },
        {
            variant: "text",
            color: "secondary",
            className: ["text-kac-bone-dark", "hover:text-kac-bone-dark", "hover:border-kac-bone"],
        },
        {
            variant: "text",
            color: "danger",
            className: ["text-kac-blood-dark", "hover:text-kac-blood-dark", "hover:border-kac-blood"],
        },
        {
            variant: "text",
            color: "success",
            className: ["text-kac-monster-dark", "hover:text-kac-monster-dark", "hover:border-kac-monster"],
        },
        {
            variant: "text",
            color: "info",
            className: ["text-kac-cloth-dark", "hover:text-kac-cloth-dark", "hover:border-kac-cloth-dark"],
        },
        {
            variant: "outline",
            color: "primary",
            className: ["outline-2", "outline-kac-gold-dark", "hover:outline-kac-gold"],
        },
        {
            variant: "outline",
            color: "secondary",
            className: ["outline-2", "outline-kac-bone-dark", "hover:outline-kac-bone"],
        },
        {
            variant: "outline",
            color: "danger",
            className: ["outline-2", "outline-kac-blood-dark", "hover:outline-kac-blood-light"],
        },
        {
            variant: "outline",
            color: "success",
            className: ["outline-2", "outline-kac-monster-dark", "hover:outline-kac-monster"],
        },
        {
            variant: "outline",
            color: "info",
            className: ["outline-2", "outline-kac-cloth-dark", "hover:outline-kac-cloth"],
        },
        {
            disabled: true,
            variant: "text",
            className: [
                "outline-2",
                "text-kac-steel-dark",
                "hover:text-kac-steel-dark",
                "hover:outline-kac-steel-dark",
            ],
        },
        {
            disabled: true,
            variant: "solid",
            className: ["bg-kac-steel-dark"],
        },
        {
            disabled: true,
            variant: "outline",
            className: ["outline-2", "outline-kac-steel-dark", "text-kac-steel-dark"],
        },
    ],
});

export type ButtonLinkType = {
    href: string;
    download?: string;
    target?: string;
} & HTMLAttributes<HTMLAnchorElement> &
    VariantProps<typeof variants>;

export type ButtonButtonType = {
    onClick: HTMLAttributes<HTMLButtonElement>["onClick"];
} & HTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof variants>;

export type ButtonProps = ButtonLinkType | ButtonButtonType;

export default function Button({
    className,
    children,
    variant = "solid",
    color,
    size,
    disabled,
    ...restProps
}: ButtonProps) {
    const classNames = twMerge(variants({ variant, color, size, disabled }), className);
    if ("href" in restProps) {
        return (
            <a {...restProps} className={classNames}>
                {children}
            </a>
        );
    }
    return (
        <button {...restProps} className={classNames}>
            {children}
        </button>
    );
}
