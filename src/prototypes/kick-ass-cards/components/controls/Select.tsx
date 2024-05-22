import { twMerge } from "tailwind-merge";
import { InputHTMLAttributes } from "react";
import Text, { TextProps } from "../content/Text";

export type SelectProps = React.PropsWithChildren<{
    label?: React.ReactNode;
    error?: React.ReactNode;
    selectClassName?: string;
    labelClassName?: string;
    labelProps?: TextProps;
    errorProps?: TextProps;
    options: {
        value: string;
        label: string;
    }[];
}> &
    InputHTMLAttributes<HTMLSelectElement>;

export default function Select({
    className = "max-w-xs",
    options,
    children,
    label,
    type,
    disabled,
    error,
    selectClassName,
    labelClassName,
    labelProps = {},
    errorProps = {},
    ...restProps
}: SelectProps) {
    return (
        <label className={twMerge("Select flex flex-col w-full", className)}>
            {label && (
                <Text variant="body" {...labelProps} className={twMerge("text-kac-steel", labelClassName)}>
                    {label}
                </Text>
            )}
            <select
                className={twMerge(
                    "bg-transparent border-b-2 border-kac-steel focus:outline-0 focus:border-kac-iron",
                    selectClassName
                )}
                {...restProps}
            >
                {options.map(({ value, label }) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))}
            </select>

            {error && (
                <Text variant="body" color="danger" {...errorProps}>
                    {error}
                </Text>
            )}
            {children}
        </label>
    );
}
