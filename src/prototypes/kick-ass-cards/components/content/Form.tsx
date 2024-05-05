import { twMerge } from "tailwind-merge";
import { SyntheticEvent, useEffect, useMemo, useState } from "react";
import Button from "./Button";
import camelCaseToTitleCase from "../../../../utils/camelCaseToTitleCase";
import Input, { InputProps } from "./Input";
import { AnyRecord } from "../../../../utils/simpleTypes";
import { JSONSchemaType } from "ajv";
import ErrorBoundary from "../../../../components/ErrorBoundary";

export const getDefaultsFromSchema = (schema: JSONSchemaType<any>) => {
    if (typeof schema === "object" && "default" in schema) {
        return schema.default as any;
    }
    if (typeof schema === "object" && "const" in schema) {
        return schema.const;
    }
    if (typeof schema === "object" && schema.type === "array") {
        return [];
    }
    if (typeof schema === "object" && schema.type === "object") {
        const value = {} as AnyRecord;
        for (const key in schema.properties) {
            value[key] = getDefaultsFromSchema(schema.properties[key]);
        }
        return value;
    }
    return undefined;
};

export const getInputPropsFromSchemaProperty = (property: JSONSchemaType<any>): InputProps => {
    const inputProps: InputProps = { type: "text" };
    if (property.enum?.length ?? 0 > 0) {
        inputProps.type = "select";
        inputProps.selectOptions = property.enum.map((value: any) => ({ label: String(value), value }));
        return inputProps;
    }
    if (property.default !== undefined) {
        inputProps.defaultValue = property.default;
    }
    if (property.nullable) {
        inputProps.clearable = true;
    }
    if (property.type === "boolean") {
        inputProps.type = "checkbox";
        return inputProps;
    }
    if (property.type === "integer") {
        inputProps.type = "number";
        inputProps.step = "1";
        property.minimum && (inputProps.min = property.minimum);
        property.maximum && (inputProps.max = property.maximum);
        return inputProps;
    }
    if (property.type === "number") {
        inputProps.type = "number";
        property.minimum && (inputProps.min = property.minimum);
        property.maximum && (inputProps.max = property.maximum);
        return inputProps;
    }
    if (property.type === "string") {
        const isLong =
            (property.maxLength && property.maxLength > 100) || (property.minLength && property.minLength > 100);
        inputProps.type = isLong ? "textarea" : "text";
        property.minLength && (inputProps.minLength = property.minLength);
        property.maxLength && (inputProps.maxLength = property.maxLength);
        property.pattern && (inputProps.pattern = property.pattern);
        return inputProps;
    }
    if (property.type === "boolean") {
        inputProps.type = "checkbox";
        return inputProps;
    }

    return inputProps;
};

export const getFormSchemaFromJsonSchema = <ValueType extends AnyRecord>(
    schema: JSONSchemaType<any>
): FormProps<ValueType>["schema"] => {
    if (typeof schema === "object") {
        return Object.fromEntries(
            Object.entries(schema.properties).map(([propKey, propValue]) => {
                const inputProps = getInputPropsFromSchemaProperty(propValue as JSONSchemaType<any>);
                return [propKey, inputProps];
            })
        ) as FormProps<ValueType>["schema"];
    }
    // TODO add support for nested props
    // TODO add support for arrays
    return undefined;
};

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
        // placeholder: value?.[key] ? JSON.stringify(value?.[key]) : undefined,
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
            <div className={twMerge("flex flex-col gap-2", propertiesClassName)}>
                <ErrorBoundary>
                    {properties.map((property) => (
                        <ErrorBoundary key={String(property.prop as keyof ValueType)}>
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
                                            property.type === "number"
                                                ? Number(event.target.value)
                                                : event.target.value,
                                    }));
                                    onChange?.({
                                        ...value,
                                        [property.prop]:
                                            property.type === "number"
                                                ? Number(event.target.value)
                                                : event.target.value,
                                    } as ValueType);
                                }}
                            />
                        </ErrorBoundary>
                    ))}
                </ErrorBoundary>
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
