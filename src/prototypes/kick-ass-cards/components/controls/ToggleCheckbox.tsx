import { InputHTMLAttributes, useId } from "react";
import Text, { TextProps } from "../content/Text";
import { twMerge } from "tailwind-merge";

export type ToggleCheckboxProps = React.PropsWithChildren<{
    labelFalse?: string;
    labelTrue?: string;
    labelClassName?: string;
    labelFalseClassName?: string;
    labelTrueClassName?: string;
    labelProps?: Partial<TextProps>;
    labelFalseProps?: Partial<TextProps>;
    labelTrueProps?: Partial<TextProps>;
    error?: React.ReactNode;
    inputClassName?: string;
    errorClassName?: string;
    description?: React.ReactNode;
    descriptionClassName?: string;
    clearable?: boolean;
    value?: boolean;
    defaultValue?: boolean;
    inputRef?: React.RefObject<HTMLInputElement>;
}> &
    Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "defaultValue">;

export default function ToggleCheckbox({
    className,
    children,
    labelFalse = "Off",
    labelTrue = "On",
    labelClassName,
    labelFalseClassName = labelClassName,
    labelTrueClassName = labelClassName,
    labelProps,
    labelFalseProps = labelProps,
    labelTrueProps = labelProps,
    disabled,
    defaultValue,
    value,
    inputRef,
    ...restProps
}: ToggleCheckboxProps) {
    const id = useId();

    return (
        <label
            className={twMerge(
                "inline-flex items-center cursor-pointer select-none",
                className,
                disabled && "pointer-events-none"
            )}
            htmlFor={restProps.id ?? id}
        >
            <Text color="inherit" {...labelFalseProps} className={labelFalseClassName}>
                {labelFalse}
            </Text>
            <input
                id={id}
                type="checkbox"
                className="sr-only peer"
                ref={inputRef}
                defaultChecked={defaultValue}
                checked={value}
                {...restProps}
            />
            <div className="relative mx-2 w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <Text color="inherit" {...labelTrueProps} className={labelTrueClassName}>
                {labelTrue}
            </Text>
            {children}
        </label>
    );
}
