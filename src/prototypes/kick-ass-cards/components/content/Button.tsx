import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

const variants = cva(["Button"], {
    variants: {
        variant: {
            text: ["underline", "bg-transparent", "hover:no-underline"],
            solid: [
                "px-4",
                "py-2",
                "rounded-md",
                "text-white",
                "hover:outline",
                "hover:outline-1",
                "focus:outline",
                "focus:outline-2",
                "transition-colors",
                "border-0",
            ],
            outline: ["px-4", "py-2", "rounded-md", "border-2"],
        },
        disabled: {
            true: ["pointer-events-none", "hover:outline-0", "focus:outline-0"],
        },
        color: {
            primary: [],
            danger: [],
            success: [],
            info: [],
        },
    },
    defaultVariants: {
        variant: "solid",
        color: "primary",
    },
    compoundVariants: [
        {
            variant: "solid",
            color: "primary",
            className: ["bg-kac-gold-dark", "hover:bg-kac-gold", "hover:outline-kac-gold", "focus:outline-kac-gold"],
        },
        {
            variant: "solid",
            color: "danger",
            className: [
                "bg-kac-blood-dark",
                "hover:bg-kac-blood",
                "hover:outline-kac-blood",
                "focus:outline-kac-blood",
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
            ],
        },
        {
            variant: "text",
            color: "primary",
            className: ["text-kac-gold-dark", "hover:text-kac-gold-dark", "hover:border-kac-primary"],
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
            className: ["border-kac-gold-dark", "hover:border-kac-gold"],
        },
        {
            variant: "outline",
            color: "danger",
            className: ["border-kac-blood-dark", "hover:border-kac-blood"],
        },
        {
            variant: "outline",
            color: "success",
            className: ["border-kac-monster-dark", "hover:border-kac-monster"],
        },
        {
            variant: "outline",
            color: "info",
            className: ["border-kac-cloth-dark", "hover:border-kac-cloth"],
        },
        {
            disabled: true,
            variant: "text",
            className: ["bg-kac-steel-dark"],
        },
        {
            disabled: true,
            variant: "solid",
            className: ["bg-kac-steel-dark"],
        },
        {
            disabled: true,
            variant: "outline",
            className: ["border-kac-steel-dark", "text-kac-steel-dark"],
        },
    ],
});

export type ButtonLinkType = {
    href: string;
} & HTMLAttributes<HTMLAnchorElement> &
    VariantProps<typeof variants>;

export type ButtonButtonType = {
    onClick: HTMLAttributes<HTMLButtonElement>["onClick"];
} & HTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof variants>;

export type ButtonProps = ButtonLinkType | ButtonButtonType;

export default function Button({ className, children, variant = "solid", color, disabled, ...restProps }: ButtonProps) {
    const classNames = twMerge(variants({ variant, color, disabled }), className);
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
