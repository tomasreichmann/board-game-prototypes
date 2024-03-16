import { twMerge } from "tailwind-merge";
import { SyntheticEvent, useEffect, useMemo, useState } from "react";
import Button from "./Button";
import camelCaseToTitleCase from "../../../../utils/camelCaseToTitleCase";
import Input, { InputProps } from "./Input";

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

const inferPropertyFromValue = <Keys extends string>(key: Keys, value: Record<Keys, any>) => {
    return {
        prop: key,
        label: camelCaseToTitleCase(key),
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
export type FormSchemaType<Keys extends string> = {
    [key in Keys]?: InputProps;
};
/* export type FormSchemaType<Keys extends string> = {
    [key in Keys]?: FormPropertySchemaType<FormPropertyTypeType>;
}; */

export type FormProps<Keys extends string, V extends Record<Keys, any>> = {
    className?: string;
    propertiesClassName?: string;
    children?: React.ReactNode;
    errorMap?: Partial<Record<Keys, Error>>;
    schema?: Partial<FormSchemaType<Keys>>;
    defaultInputProps?: Partial<InputProps>;
    value?: Partial<V>;
    onChange?: (value: Partial<V>) => void;
    onSubmit?: (value: Partial<V>) => void;
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

export default function Form<Keys extends string, V extends Record<Keys, any>>({
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
}: FormProps<Keys, V>) {
    const [valueWithChanges, setValueWithChanges] = useState<Partial<V>>(value || ({} as Partial<V>));

    useEffect(() => {
        setValueWithChanges(value || ({} as Partial<V>));
    }, [value]);

    const properties = useMemo(() => {
        if (schema) {
            return (Object.keys(schema) as Keys[]).map((key) => {
                const property = schema[key];
                return {
                    ...inferPropertyFromValue(key, value || ({} as Partial<V>)),
                    prop: key,
                    ...property,
                };
            });
        }
        return (Object.keys(value || {}) as Keys[]).map((key) => {
            return inferPropertyFromValue(key, value || ({} as Partial<V>));
        });
    }, [schema]);

    return (
        <form className={twMerge("flex flex-col gap-4", className)}>
            {children}
            <div className={twMerge("flex flex-col gap-2 my-2", propertiesClassName)}>
                {properties.map((property) => (
                    <Input
                        {...defaultInputProps}
                        key={property.prop as Keys}
                        {...property}
                        value={getDefaultValue(valueWithChanges?.[property.prop as Keys], property)}
                        error={errorMap?.[property.prop as Keys]?.message || undefined}
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
                            } as V);
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
