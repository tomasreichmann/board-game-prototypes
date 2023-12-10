import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";
import { InputHTMLAttributes } from "react";
import Text from "./Text";

export type SelectProps = React.PropsWithChildren<{
    label?: React.ReactNode;
    error?: React.ReactNode;
    options: {
        value: string;
        label: string;
    }[];
}> &
    InputHTMLAttributes<HTMLSelectElement>;

export default function Select({
    className,
    options,
    children,
    label,
    type,
    disabled,
    error,
    ...restProps
}: SelectProps) {
    return (
        <label className="Input flex flex-col w-full max-w-xs">
            {label && (
                <Text variant="body" className="text-kac-steel">
                    {label}
                </Text>
            )}
            <select
                className={twMerge(
                    "bg-transparent border-b-2 border-kac-steel focus:outline-0 focus:border-kac-iron",
                    className
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
                <Text variant="body" color="danger">
                    {error}
                </Text>
            )}
            {children}
        </label>
    );
}
