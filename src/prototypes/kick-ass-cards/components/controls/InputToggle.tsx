import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";
import { InputHTMLAttributes, useCallback, useEffect, useId, useState } from "react";
import Text from "../content/Text";
import Button from "./Button";
import JsonInput from "./JsonInput";
import Input, { InputProps } from "./Input";
import ToggleCheckbox, { ToggleCheckboxProps } from "./ToggleCheckbox";

export type InputToggleProps = {
    className?: string;
    children?: React.ReactNode;
    isEditing?: boolean;
    initialIsEditing?: boolean;
    onIsEditingChange?: (isEditing: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
    inputProps: InputProps;
    toggleCheckboxProps?: Partial<ToggleCheckboxProps>;
    previewProps?: React.HTMLAttributes<HTMLDivElement>;
};

const noProps = {};

export default function InputToggle({
    className,
    children,
    inputProps,
    previewProps,
    isEditing: isEditingProp,
    initialIsEditing,
    toggleCheckboxProps = noProps,
    onIsEditingChange,
    ...restProps
}: InputToggleProps) {
    const [isEditingState, setIsEditingState] = useState(isEditingProp ?? initialIsEditing ?? false);

    const isControlled = isEditingProp !== undefined;

    const isEditing = isControlled ? isEditingProp : isEditingState;

    const handleIsEditingChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (!isControlled) {
                setIsEditingState(!isEditingState);
            }

            if (onIsEditingChange) {
                onIsEditingChange(event.target.checked, event);
            }
        },
        [isControlled]
    );

    return (
        <div className={twMerge("InputToggle inline-flex flex-row gap-2 items-start", className)} {...restProps}>
            {isEditing ? (
                <Input {...inputProps} inputClassName="[field-sizing:content] [box-sizing:content-box]" />
            ) : (
                <div {...previewProps}>{inputProps.value}</div>
            )}
            <ToggleCheckbox
                onChange={handleIsEditingChange}
                labelTrue="Edit"
                labelFalse="Preview"
                {...toggleCheckboxProps}
            />
        </div>
    );
}
