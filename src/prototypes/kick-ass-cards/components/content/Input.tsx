import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";
import { InputHTMLAttributes } from "react";
import Text from "./Text";

const variants = cva(["Input", "w-full", "max-w-xs"], {
    variants: {
        type: {
            text: ["bg-transparent", "border-b-2", "border-kac-steel", "focus:outline-0", "focus:border-kac-iron"],
            password: ["bg-transparent", "border-b-2", "border-kac-steel", "focus:outline-0", "focus:border-kac-iron"],
            email: ["bg-transparent", "border-b-2", "border-kac-steel", "focus:outline-0", "focus:border-kac-iron"],
            number: ["bg-transparent", "border-b-2", "border-kac-steel", "focus:outline-0", "focus:border-kac-iron"],
            date: ["bg-transparent", "border-b-2", "border-kac-steel", "focus:outline-0", "focus:border-kac-iron"],
            datetime: ["bg-transparent", "border-b-2", "border-kac-steel", "focus:outline-0", "focus:border-kac-iron"],
            checkbox: ["bg-transparent", "border-b-2", "border-kac-steel", "focus:outline-0", "focus:border-kac-iron"],
            radio: ["bg-transparent", "border-b-2", "border-kac-steel", "focus:outline-0", "focus:border-kac-iron"],
            file: ["bg-transparent", "border-b-2", "border-kac-steel", "focus:outline-0", "focus:border-kac-iron"],
            month: ["bg-transparent", "border-b-2", "border-kac-steel", "focus:outline-0", "focus:border-kac-iron"],
            time: ["bg-transparent", "border-b-2", "border-kac-steel", "focus:outline-0", "focus:border-kac-iron"],
            week: ["bg-transparent", "border-b-2", "border-kac-steel", "focus:outline-0", "focus:border-kac-iron"],
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
        | "date"
        | "datetime-local"
        | "checkbox"
        | "radio"
        | "file"
        | "month"
        | "time"
        | "week";
}> &
    Omit<InputHTMLAttributes<HTMLInputElement>, "type"> &
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
