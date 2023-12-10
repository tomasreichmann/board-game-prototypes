import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";
import { InputHTMLAttributes } from "react";
import Text from "./Text";

const variants = cva(["Input", "w-full", "max-w-xs"], {
    variants: {
        type: {
            text: ["bg-transparent", "border-b-2", "border-kac-steel", "focus:outline-0", "focus:border-kac-iron"],
        },
        disabled: {
            true: ["pointer-events-none"],
        },
    },
    defaultVariants: {
        type: "text",
    },
});

export type InputProps = React.PropsWithChildren<{
    label?: React.ReactNode;
    error?: React.ReactNode;
    type:
        | "number"
        | "text"
        | "password"
        | "email"
        | "number"
        | "date"
        | "datetime-local"
        | "checkbox"
        | "radio"
        | "file"
        | "month"
        | "time"
        | "week";
}> &
    InputHTMLAttributes<HTMLInputElement> &
    VariantProps<typeof variants>;

export default function Input({ className, children, label, type, disabled, error, ...restProps }: InputProps) {
    const inputClassName = twMerge(variants({ type, disabled }), className);
    const input = <input type={type} className={inputClassName} {...restProps} />;

    return (
        <label className="Input flex flex-col w-full max-w-xs">
            {label && (
                <Text variant="body" className="text-kac-steel">
                    {label}
                </Text>
            )}
            {input}
            {error && (
                <Text variant="body" color="danger">
                    {error}
                </Text>
            )}
            {children}
        </label>
    );
}
