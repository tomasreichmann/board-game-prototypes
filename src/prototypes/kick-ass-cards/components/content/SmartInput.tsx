import { twMerge } from "tailwind-merge";
import { useState } from "react";
import Input, { InputProps } from "./Input";
import Button from "./Button";
import copyToClipboard from "../../../../utils/copyToClipboard";
import Select from "./Select";

export type SmartInputPresetType<T> = {
    label: string;
    value: T;
};

export type SmartInputProps = {
    presets?: SmartInputPresetType<any>[];
    labelContent?: React.ReactNode;
    onNewPreset?: (value: any) => void;
    onRemovePreset?: (value: any) => void;
    isCopyable?: boolean;
} & InputProps;

export default function SmartInput({
    label,
    labelClassName,
    labelContent,
    isCopyable,
    presets,
    onNewPreset,
    onRemovePreset,
    children,
    ...restProps
}: SmartInputProps) {
    const [presetName, setPresetName] = useState("");

    const smallButtonClassName = "px-2 py-1 rounded-md text-xs";
    const combinedLabelClassName = twMerge("w-full flex flex-row relative gap-2", labelClassName);
    const copyControl = isCopyable && (
        <Button
            color="success"
            variant="text"
            className={smallButtonClassName}
            tabIndex={-1}
            onClick={() => {
                if (restProps.value) {
                    copyToClipboard(JSON.stringify(restProps.value));
                }
            }}
        >
            Copy
        </Button>
    );
    const presetMatch = presets?.find((preset) => preset.value === restProps.value);
    const presetControl = presets !== undefined && (
        <>
            {onNewPreset && (
                <>
                    <Input type="text" onChange={(e) => setPresetName(e.target.value)} value={presetName} />
                    <Button
                        color="success"
                        variant="text"
                        onClick={() => onNewPreset(presetName)}
                        className={smallButtonClassName}
                    >
                        &plus;
                    </Button>
                </>
            )}
            {onRemovePreset && presets.length && (
                <Button
                    color="danger"
                    disabled={!presetMatch}
                    variant="text"
                    className={smallButtonClassName}
                    onClick={() => {
                        if (presetMatch) {
                            onRemovePreset(presetMatch);
                        }
                    }}
                >
                    &times;
                </Button>
            )}
            <Select
                options={presets}
                color="success"
                onChange={(event) => {
                    restProps.onChange?.(event as any);
                }}
            >
                copy
            </Select>
        </>
    );
    const combinedLabel = (
        <>
            {label}
            <div className="flex-1" />
            {labelContent}
            {copyControl}
            {presetControl}
        </>
    );

    return (
        <Input tabIndex={0} label={combinedLabel} labelClassName={combinedLabelClassName} {...restProps}>
            {children}
        </Input>
    );
}
