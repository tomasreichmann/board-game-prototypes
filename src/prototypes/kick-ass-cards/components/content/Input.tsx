import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";
import { InputHTMLAttributes } from "react";
import Text from "./Text";

const variants = cva(["Input", "w-full"], {
    variants: {
        type: {
            text: ["bg-transparent", "border-b-2", "border-kac-steel", "focus:outline-0", "focus:border-kac-iron"],
            textarea: ["bg-transparent", "border-b-2", "border-kac-steel", "focus:outline-0", "focus:border-kac-iron"],
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
    labelClassName?: string;
    error?: React.ReactNode;
    inputClassName?: string;
    errorClassName?: string;
    description?: React.ReactNode;
    descriptionClassName?: string;
    inputRef?: React.RefObject<HTMLInputElement>;
    textareaRef?: React.RefObject<HTMLTextAreaElement>;
    textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
    type:
        | "number"
        | "textarea"
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

export default function Input({
    className,
    children,
    label,
    labelClassName,
    inputClassName,
    errorClassName,
    descriptionClassName,
    description,
    type,
    disabled,
    error,
    inputRef,
    textareaRef,
    textareaProps: { className: textareaClassName, disabled: textareaDisabled = disabled, ...textareaProps } = {},
    ...restProps
}: InputProps) {
    const combinedInputClassName = twMerge(variants({ type, disabled }), inputClassName);

    let input = <input ref={inputRef} type={type} className={combinedInputClassName} {...restProps} />;
    if (type === "textarea") {
        input = (
            <textarea
                className={twMerge(combinedInputClassName, textareaClassName)}
                value={restProps.value}
                ref={textareaRef}
                onChange={restProps.onChange as any}
                disabled={textareaDisabled}
                {...textareaProps}
            />
        );
    }

    return (
        <label className={twMerge("Input flex flex-col w-full", className)}>
            {label && (
                <Text Component="span" variant="body" className={twMerge("text-kac-steel", labelClassName)}>
                    {label}
                    {description && <span className="text-kac-steel text-xs ml-2">{description}</span>}
                </Text>
            )}
            {input}
            {error && (
                <Text Component="span" variant="body" color="danger" className={errorClassName}>
                    {error}
                </Text>
            )}
            {children}
        </label>
    );
}
