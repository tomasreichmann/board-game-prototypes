import { twMerge } from "tailwind-merge";
import { SyntheticEvent, useEffect, useMemo, useState } from "react";
import Button from "./Button";
import camelCaseToTitleCase from "../../../../utils/camelCaseToTitleCase";
import Input, { InputProps } from "./Input";
import { AnyRecord } from "../../../../utils/simpleTypes";

const valueTypeToInputType = (value: any): InputProps["type"] | undefined => {
    if (value === null || value === undefined) {
        return undefined;
    }
    if (typeof value === "number") {
        return "number";
    }
    if (typeof value === "boolean") {
        return "checkbox";
    }
    return "text";
};

const inferPropertyFromValue = <ValueType extends AnyRecord>(key: keyof ValueType, value: Partial<ValueType>) => {
    return {
        prop: key,
        label: camelCaseToTitleCase(String(key)),
        type: valueTypeToInputType(value?.[key]) || "text",
        placeholder: value?.[key] ? JSON.stringify(value?.[key]) : undefined,
    };
};

export type FormPropertyTypeType = InputProps["type"];

export type TypeFromTypeString<T extends FormPropertyTypeType> = T extends "string"
    ? string
    : T extends "number"
    ? number
    : T extends "boolean"
    ? boolean
    : never;

export type FormPropertySchemaType<T extends FormPropertyTypeType> = {
    title: string;
    type?: T;
    description?: string;
    default?: TypeFromTypeString<T>;
};
export type FormSchemaType<Keys extends string | number | symbol> = {
    [key in Keys]?: InputProps;
};
/* export type FormSchemaType<Keys extends string> = {
    [key in Keys]?: FormPropertySchemaType<FormPropertyTypeType>;
}; */

export type FormProps<ValueType extends AnyRecord> = {
    className?: string;
    propertiesClassName?: string;
    children?: React.ReactNode;
    errorMap?: Partial<Record<keyof ValueType, Error>>;
    schema?: Partial<FormSchemaType<keyof ValueType>>;
    defaultInputProps?: Partial<InputProps>;
    value?: Partial<ValueType>;
    onChange?: (value: Partial<ValueType>) => void;
    onSubmit?: (value: Partial<ValueType>) => void;
    onReset?: () => void;
};

const getDefaultValue = (value: any, property: InputProps) => {
    if (value !== undefined) {
        return value;
    }
    if (property.value !== undefined) {
        return property.value;
    }
    if (property.type === "number") {
        return 0;
    }
    if (property.type === "checkbox") {
        return false;
    }
    return "";
};

export default function Form<ValueType extends AnyRecord>({
    className,
    propertiesClassName,
    children,
    value,
    schema,
    errorMap,
    defaultInputProps = {},
    onChange,
    onSubmit,
    onReset,
}: FormProps<ValueType>) {
    const [valueWithChanges, setValueWithChanges] = useState<Partial<ValueType>>(value || ({} as Partial<ValueType>));

    useEffect(() => {
        setValueWithChanges(value || ({} as Partial<ValueType>));
    }, [value]);

    const properties = useMemo(() => {
        if (schema) {
            return (Object.keys(schema) as (keyof ValueType)[]).map((key) => {
                const property = schema[key];
                return {
                    ...inferPropertyFromValue(key, value || ({} as Partial<ValueType>)),
                    prop: key,
                    ...property,
                };
            });
        }
        return (Object.keys(value || {}) as (keyof ValueType)[]).map((key) => {
            return inferPropertyFromValue(key, value || ({} as Partial<ValueType>));
        });
    }, [schema]);

    return (
        <form className={twMerge("flex flex-col gap-4", className)}>
            {children}
            <div className={twMerge("flex flex-col gap-2 my-2", propertiesClassName)}>
                {properties.map((property) => (
                    <Input
                        {...defaultInputProps}
                        key={String(property.prop as keyof ValueType)}
                        {...property}
                        value={getDefaultValue(valueWithChanges?.[property.prop as keyof ValueType], property)}
                        error={errorMap?.[property.prop as keyof ValueType]?.message || undefined}
                        onChange={(event) => {
                            setValueWithChanges((value) => ({
                                ...value,
                                [property.prop]:
                                    property.type === "number" ? Number(event.target.value) : event.target.value,
                            }));
                            onChange?.({
                                ...value,
                                [property.prop]:
                                    property.type === "number" ? Number(event.target.value) : event.target.value,
                            } as ValueType);
                        }}
                    />
                ))}
            </div>
            {onSubmit && (
                <Button
                    color="primary"
                    onClick={(e: SyntheticEvent) => {
                        e.preventDefault();
                        onSubmit?.(valueWithChanges);
                    }}
                >
                    Submit
                </Button>
            )}
            {onReset && (
                <Button
                    color="danger"
                    onClick={(e: SyntheticEvent) => {
                        e.preventDefault();
                        onReset?.();
                    }}
                >
                    Reset
                </Button>
            )}
        </form>
    );
}
