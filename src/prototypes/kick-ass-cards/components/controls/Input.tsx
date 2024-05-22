import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";
import { InputHTMLAttributes, useId } from "react";
import Text from "../content/Text";
import Button from "./Button";
import JsonInput from "./JsonInput";

const variants = cva(["Input", "w-full"], {
    variants: {
        type: {
            text: ["bg-transparent", "border-b-2", "border-kac-steel", "focus:outline-0", "focus:border-kac-iron"],
            textarea: ["bg-transparent", "border-b-2", "border-kac-steel", "focus:outline-0", "focus:border-kac-iron"],
            password: ["bg-transparent", "border-b-2", "border-kac-steel", "focus:outline-0", "focus:border-kac-iron"],
            email: ["bg-transparent", "border-b-2", "border-kac-steel", "focus:outline-0", "focus:border-kac-iron"],
            number: ["bg-transparent", "border-b-2", "border-kac-steel", "focus:outline-0", "focus:border-kac-iron"],
            range: ["bg-transparent", "border-b-2", "border-kac-steel", "focus:outline-0", "focus:border-kac-iron"],
            date: ["bg-transparent", "border-b-2", "border-kac-steel", "focus:outline-0", "focus:border-kac-iron"],
            datetime: ["bg-transparent", "border-b-2", "border-kac-steel", "focus:outline-0", "focus:border-kac-iron"],
            checkbox: ["bg-transparent", "border-b-2", "border-kac-steel", "focus:outline-0", "focus:border-kac-iron"],
            radio: ["bg-transparent", "border-b-2", "border-kac-steel", "focus:outline-0", "focus:border-kac-iron"],
            file: ["bg-transparent", "border-b-2", "border-kac-steel", "focus:outline-0", "focus:border-kac-iron"],
            month: ["bg-transparent", "border-b-2", "border-kac-steel", "focus:outline-0", "focus:border-kac-iron"],
            time: ["bg-transparent", "border-b-2", "border-kac-steel", "focus:outline-0", "focus:border-kac-iron"],
            week: ["bg-transparent", "border-b-2", "border-kac-steel", "focus:outline-0", "focus:border-kac-iron"],
            select: ["bg-transparent", "border-b-2", "border-kac-steel", "focus:outline-0", "focus:border-kac-iron"],
            object: ["bg-transparent", "border-b-2", "border-kac-steel", "focus:outline-0", "focus:border-kac-iron"],
            array: ["bg-transparent", "border-b-2", "border-kac-steel", "focus:outline-0", "focus:border-kac-iron"],
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
    checkboxWrapperClassName?: string;
    checkboxLabelClassName?: string;
    checkboxInputClassName?: string;
    description?: React.ReactNode;
    descriptionClassName?: string;
    clearable?: boolean;
    defaultValue?: any;
    inputRef?: React.RefObject<HTMLInputElement>;
    textareaRef?: React.RefObject<HTMLTextAreaElement>;
    textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
    selectRef?: React.RefObject<HTMLSelectElement>;
    selectProps?: React.SelectHTMLAttributes<HTMLSelectElement>;
    selectOptions?: { label: string; value: string | number }[];
    isReactNode?: boolean; // TODO: this should not be here but it is important for drag and dropping into components
    type:
        | "number"
        | "range"
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
        | "week"
        | "object"
        | "array"
        | "select";
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
    checkboxWrapperClassName,
    checkboxLabelClassName,
    checkboxInputClassName,
    descriptionClassName,
    description,
    type,
    disabled,
    clearable,
    defaultValue,
    error,
    inputRef,
    textareaRef,
    textareaProps: { className: textareaClassName, disabled: textareaDisabled = disabled, ...textareaProps } = {},
    selectRef,
    selectProps: { className: selectClassName, disabled: selectDisabled = disabled, ...selectProps } = {},
    selectOptions = [],
    isReactNode, // intentionally unused
    ...restProps
}: InputProps) {
    const combinedInputClassName = twMerge(
        variants({ type, disabled }),
        inputClassName,
        type === "checkbox" && "w-auto self-center",
        type === "checkbox" && checkboxInputClassName
    );

    const id = useId();
    let input = <input ref={inputRef} type={type} className={combinedInputClassName} {...restProps} />;
    if (type === "textarea") {
        input = (
            <textarea
                id={id}
                className={twMerge(combinedInputClassName, textareaClassName)}
                value={restProps.value}
                ref={textareaRef}
                onChange={restProps.onChange as any}
                disabled={textareaDisabled}
                {...textareaProps}
            />
        );
    }

    if (type === "select") {
        input = (
            <select
                id={id}
                className={twMerge(combinedInputClassName, textareaClassName)}
                value={restProps.value}
                ref={selectRef}
                onChange={restProps.onChange as any}
                disabled={selectDisabled}
                {...selectProps}
            >
                {selectOptions.map(({ label, value }) => (
                    <option key={String(value)} value={value}>
                        {label}
                    </option>
                ))}
            </select>
        );
    }

    if (type === "object" || type === "array") {
        input = (
            <JsonInput
                id={id}
                className={twMerge(combinedInputClassName, textareaClassName)}
                value={restProps.value}
                textareaRef={textareaRef}
                onChange={restProps.onChange as any}
                disabled={textareaDisabled}
                {...textareaProps}
            />
        );
    }

    return (
        <label
            className={twMerge(
                "Input flex flex-col w-full",
                className,
                type === "checkbox" && "flex-row gap-2",
                type === "checkbox" && checkboxWrapperClassName
            )}
            htmlFor={id}
        >
            {label && (
                <Text
                    Component="span"
                    variant="body"
                    className={twMerge(
                        "text-kac-steel",
                        labelClassName,
                        type === "checkbox" && "w-auto",
                        type === "checkbox" && checkboxLabelClassName
                    )}
                >
                    {label}
                    {clearable && (
                        <Button
                            type="button"
                            variant="text"
                            color="danger"
                            className="text-inherit ml-2"
                            tabIndex={-1}
                            onClick={() =>
                                restProps?.onChange?.({
                                    target: { value: undefined as any },
                                } as React.ChangeEvent<HTMLInputElement>)
                            }
                            disabled={disabled}
                        >
                            Clear
                        </Button>
                    )}
                    {defaultValue !== undefined && (
                        <Button
                            type="button"
                            variant="text"
                            color="danger"
                            className="text-inherit ml-2"
                            tabIndex={-1}
                            onClick={() =>
                                restProps?.onChange?.({
                                    target: { value: defaultValue as any },
                                } as React.ChangeEvent<HTMLInputElement>)
                            }
                            disabled={disabled}
                        >
                            Default
                        </Button>
                    )}
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
