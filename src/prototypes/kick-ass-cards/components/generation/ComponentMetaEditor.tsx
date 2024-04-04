import { useEffect, useMemo, useState } from "react";
import ComponentMetaType from "./ComponentMetaType";
import Form, { FormProps } from "../content/Form";
import { InputProps } from "../content/Input";
import Toggle from "../../../../components/Toggle";
import ToggleData from "../../../../components/DataToggle";
import getComponentCode from "./getComponentCode";
import Button from "../content/Button";
import { SDResultType, useSD } from "../../../../hooks/useSD";
import { twMerge } from "tailwind-merge";
import { JSONSchemaType } from "ajv";
import { AnyRecord } from "../../../../utils/simpleTypes";

export type StripNumbersAndSymbols<Key extends keyof AnyRecord> = Exclude<Key, number | symbol>;
export type PrefixKeyType<
    Key extends keyof AnyRecord,
    Prefix extends string
> = `${Prefix}${StripNumbersAndSymbols<Key>}`;

export const SD_PREFIX = "SD_";
export const LLM_PREFIX = "LLM_";

// Add "SD_" and "LLM_" prefixes to all keys
export type PropsWithAiPrefixes<PropType extends AnyRecord> = PropType & {
    [key in
        | PrefixKeyType<keyof PropType, typeof SD_PREFIX>
        | PrefixKeyType<keyof PropType, typeof LLM_PREFIX>]?: string;
};

// Map object values to string
export type MapToStringValues<PropType extends AnyRecord> = {
    [key in keyof PropType]: string;
};

export type ComponentMetaEditorProps<PropType extends AnyRecord> = {
    className?: string;
    controlsClassName?: string;
    disabled?: boolean;
    preview?: boolean;
    initialIsEditing?: boolean;
    initialProps: Partial<PropsWithAiPrefixes<PropType>>;
    defaultSdImageUri?: string;
} & ComponentMetaType<PropType>;

const getDefaultsFromSchema = (schema: JSONSchemaType<any>) => {
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

const getInputPropsFromSchemaProperty = (property: JSONSchemaType<any>): InputProps => {
    const inputProps: InputProps = { type: "text" };
    if (typeof property === "boolean") {
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
        inputProps.type = "text";
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

const getFormSchemaFromSchema = <ValueType extends AnyRecord>(
    schema: JSONSchemaType<any>
): FormProps<ValueType>["schema"] => {
    if (typeof schema === "object" && schema.properties?.length) {
        return Object.fromEntries(
            Object.entries(schema.properties).map(([propKey, propValue]) => {
                const inputProps = getInputPropsFromSchemaProperty(propValue as JSONSchemaType<any>);
                return [propKey, inputProps];
            })
        ) as FormProps<ValueType>["schema"];
    }
    return undefined;
};

const sdPromiseCache: Map<string, Promise<void | SDResultType>> = new Map();

export default function ComponentMetaEditor<PropType extends {}>({
    className,
    controlsClassName,
    disabled,
    Component,
    schema,
    preview,
    initialProps,
    initialIsEditing = false,
    defaultSdImageUri = "/loading.gif",
}: ComponentMetaEditorProps<PropType>) {
    const [isEditing, setIsEditing] = useState(initialIsEditing);
    const [resolvedSdProps, setResolvedSdProps] = useState({} as Partial<PropType>);
    const [resolvedLlmProps, setResolvedLlmProps] = useState({} as Partial<PropType>);
    const { txt2Image } = useSD();

    const { strippedInitialProps, sdProps, llmProps } = useMemo(() => {
        const strippedInitialProps = {} as Partial<PropType>;
        const sdProps = {} as MapToStringValues<Partial<PropType>>;
        const llmProps = {} as MapToStringValues<Partial<PropType>>;
        for (const keyWithoutType in initialProps) {
            const key = keyWithoutType as StripNumbersAndSymbols<keyof PropType>;
            if (key.startsWith(SD_PREFIX)) {
                const strippedKey = key.slice(SD_PREFIX.length) as StripNumbersAndSymbols<keyof PropType>;
                sdProps[strippedKey] = initialProps[key] as string;
            } else if (key.startsWith(LLM_PREFIX)) {
                const strippedKey = key.slice(LLM_PREFIX.length) as StripNumbersAndSymbols<keyof PropType>;
                llmProps[strippedKey] = initialProps[key] as string;
            } else {
                strippedInitialProps[key] = initialProps[key];
            }
        }
        return { strippedInitialProps, sdProps, llmProps };
    }, [initialProps]);

    const { defaultProps, formSchema } = useMemo(() => {
        const defaultProps = getDefaultsFromSchema(schema as JSONSchemaType<any>) as Partial<PropType>;
        const formSchema = getFormSchemaFromSchema(schema as JSONSchemaType<any>);
        return {
            formSchema,
            defaultProps,
        };
    }, [schema]);

    const [props, setProps] = useState({ ...defaultProps, ...initialProps } as Partial<PropType>);

    useEffect(() => {
        setProps((prev) => {
            const newProps = { ...prev };
            Object.keys(sdProps).forEach((key) => {
                newProps[key as keyof PropType] = defaultSdImageUri as any;
            });
            return newProps;
        });
        let isRequestValid = true;
        Object.entries(sdProps).forEach(([key, value]) => {
            // TODO Validate value
            if (typeof value === "string" && value.length > 2) {
                console.warn("invalid SD prompt for", key, "prompt:", value);
                const prompt = String(value);
                const cachedPromise =
                    sdPromiseCache.get(prompt) ||
                    (sdPromiseCache.set(prompt, txt2Image(prompt)).get(prompt) as Promise<void | SDResultType>);

                return cachedPromise.then((res) => {
                    if (isRequestValid) {
                        setProps((prev) => ({ ...prev, [key]: res && res.images[0] }));
                    }
                });
            }
            return undefined;
        });
        return () => {
            isRequestValid = false;
        };
    }, [sdProps]);

    useEffect(() => {
        // defaultProps and initialProps must make complete PropType
        setProps(strippedInitialProps);
    }, [strippedInitialProps]);

    const combinedProps = {
        ...defaultProps,
        ...props,
    } as PropType;

    if (preview) {
        return <Component {...combinedProps} />;
    }

    return (
        <div className={twMerge("flex flex-row gap-5 flex-wrap", className)}>
            <div className="flex-1 flex flex-col">
                <Component {...combinedProps} />
            </div>

            <div className={twMerge("flex flex-col gap-2", controlsClassName)}>
                {!disabled && (
                    <>
                        <Button
                            className="leading-none font-kacHeading text-sm px-3 py-1 self-start"
                            onClick={() => {
                                setIsEditing((isEditing) => !isEditing);
                            }}
                        >
                            ✏️ Edit
                        </Button>
                        {isEditing && (
                            <Form
                                className="min-w-[300px]"
                                schema={formSchema}
                                value={props}
                                onChange={(newProps) => setProps(newProps as PropType)}
                            />
                        )}
                    </>
                )}
                <Toggle
                    className="w-auto"
                    buttonContent="Fine-tuned Code Block"
                    buttonProps={{ className: "shrink-0 h-auto btn-sm px-3 py-1" }}
                    initialCollapsed
                >
                    <pre className="rounded-md border-2 border-slate-500 bg-slate-100 p-2 whitespace-pre-wrap">
                        {getComponentCode(Component.name, props)}
                    </pre>
                </Toggle>
                <ToggleData
                    initialCollapsed
                    data={props}
                    className="w-auto"
                    buttonContent="Fine-tuned Props"
                    buttonProps={{ className: "shrink-0 h-auto btn-sm px-3 py-1" }}
                />
                <div className="flex flex-col gap-2 items-stretch"></div>
            </div>
        </div>
    );
}
