import Ajv, { JSONSchemaType } from "ajv";
import JobType from "./jobType";
import getDeepValue from "../../utils/getDeepValue";
import { MistralChatToolType } from "../../services/Mistral/Mistral";
import safeStringify from "../../utils/safeStringify";

export const keysToRemoveFromDeepPointer = ["properties"];

export const getKeyFromPointer = (pointer: string) => pointer.split("/").at(-1);

export const getKeyFromProperty = (property: JSONSchemaType<any>) => property?.$id?.split("/").at(-1);

export const getDeepPointer = (focusPointer: string) => {
    return (
        focusPointer
            ?.split("/")
            .slice(1)
            .filter((prop) => !keysToRemoveFromDeepPointer.includes(prop))
            .join(".") || ""
    );
};

export const getSchemaAtPointer = (schema: JSONSchemaType<any>, focusPointer?: string | null) => {
    if (!focusPointer || focusPointer === "/") {
        return schema;
    }
    return new Ajv({ allowUnionTypes: true }).addSchema(schema).getSchema("#" + focusPointer)?.schema as
        | JSONSchemaType<any>
        | null
        | undefined;
};

export const pointerToDeepValueSelector = (pointer: string) =>
    pointer
        .split("/")
        .filter((part) => part !== "properties" && part !== "")
        .join(".");

export const getPropertyIncludePrompt = (property: JSONSchemaType<any>, job: JobType) => {
    const selector = property.$id ? pointerToDeepValueSelector(property.$id) : null;
    const propertyValue = selector ? getDeepValue(job?.data, selector) : null;
    let displayValue = propertyValue ?? null;
    if (typeof propertyValue === "object" && propertyValue !== null) {
        displayValue = safeStringify(propertyValue);
    }
    if (displayValue !== null) {
        return `${getPropertyDescription(property, job)}: ${displayValue}`;
    }
    return null;
};

export const getPropertyDescription = (property: JSONSchemaType<any>, job: JobType) => {
    const description = (property.$id && job?.descriptions?.[property.$id]) || "";
    const descriptionPostfix = description ? ` (${description})` : "";
    const propName = property.title || property?.$id?.split("/").at(-1);
    return `${propName}${descriptionPostfix}`;
};

export const getJobInfoPrompt = (job: JobType) => {
    return `We are working on a ${job.name} (${job.description})`;
};

export const getObjectSchemaProperties = (
    schemaAtPointer: JSONSchemaType<any>,
    currentPointer: string,
    generateIds = false
) => {
    const properties = schemaAtPointer.properties as Record<string, any>;
    return Object.entries(properties).map(([key, value]) => {
        const propPointer = currentPointer + "/properties/" + key;
        const $id = generateIds ? propPointer : (value.$id as string | undefined);
        const isNewId = $id !== value.$id;
        if (isNewId) {
            return { ...(value || {}), $id };
        }
        return value;
    }) as JSONSchemaType<any>[];
};

export const filterPropertiesByPointers = (
    schemaAtPointer: JSONSchemaType<any> | null | undefined,
    currentPointer: string,
    propertyPointers: string[],
    generateIds = false
) => {
    const isObjectSchema = schemaAtPointer?.type === "object";
    if (!isObjectSchema) {
        return [];
    }
    const allProperties = schemaAtPointer
        ? getObjectSchemaProperties(schemaAtPointer, currentPointer, generateIds)
        : [];
    return allProperties.filter((property) => {
        return property.$id ? propertyPointers.includes(property.$id) : false;
    });
};

export const isRootPointer = (pointer?: string) => {
    return !pointer || pointer === "/";
};

export const getParentPointer = (pointer: string) => {
    let pointerParts = pointer.split("/").slice(0, -1);
    if (pointerParts.at(-1) === "properties") {
        pointerParts = pointerParts.slice(0, -1);
    }
    return pointerParts.join("/");
};

export const getParentSchema = (pointer: string, rootSchema: JSONSchemaType<any>) => {
    const parentPointer = getParentPointer(pointer);
    const parentSchema = parentPointer ? getSchemaAtPointer(rootSchema, parentPointer) : null;
    return parentSchema;
};

export const getFilteredProperties = (job: JobType, schemaAtPointer: JSONSchemaType<any>) => {
    if (!job?.propertiesToGenerate) {
        return [];
    }
    const isObjectSchema = schemaAtPointer?.type === "object";

    // include context - filtered properties filtered by focus pointer
    const unfilteredPointers = Object.entries(job.propertiesToGenerate || {})
        .filter(([, value]) => value)
        .map(([key]) => key);
    const filteredProperties = [] as JSONSchemaType<any>[];

    // if pointer is object include filtered child properties
    if (isObjectSchema) {
        filteredProperties.push(
            ...filterPropertiesByPointers(schemaAtPointer, job.focusPointer || "", unfilteredPointers, true)
        );
    } else {
        // we are at a primitive property, so include filtered sibling properties
        const parentPointer = getParentPointer(job?.focusPointer || "");
        const parentSchema = parentPointer ? getSchemaAtPointer(job?.schema, parentPointer) : null;
        if (parentPointer && parentSchema) {
            filteredProperties.push(...filterPropertiesByPointers(parentSchema, parentPointer, unfilteredPointers));
        }
    }
    return filteredProperties;
};

export const isChildPointer = (pointer: string, maybeParentPointer: string) => {
    return getParentPointer(pointer) === maybeParentPointer;
};

export const getFocusInfoPrompt = (job: JobType) => {
    // If focusPointer points to an object combine filteredProperties
    const focusPointer = job.focusPointer || "";
    const schemaAtPointer = getSchemaAtPointer(job.schema, focusPointer);
    const isObjectSchema = schemaAtPointer?.type === "object";
    if (isObjectSchema) {
        const filteredPointers = Object.keys(job.propertiesToGenerate || {}).filter(
            (pointer) => getParentPointer(pointer) === focusPointer
        );

        const filteredPropertiesDescriptions = filteredPointers.map((pointer) => {
            const propKey = pointer.split("/").at(-1);
            const findPropertySchema = schemaAtPointer.properties[propKey as keyof typeof schemaAtPointer.properties];
            const description = job?.descriptions?.[pointer] || "";
            const descriptionPostfix = description ? ` (${description})` : "";
            const propTitle = findPropertySchema?.title;
            const propTitlePostfix = propTitle ? ` - ${propTitle}` : "";
            return `'${propKey}'${propTitlePostfix}${descriptionPostfix}`;
        });
        if (filteredPropertiesDescriptions.length === 0) {
            return "";
        }
        const pointerTitle = job?.focusPointer
            ? schemaAtPointer.title || job?.focusPointer.split("/").at(-1)
            : job.name;
        return `Now focus only on ${pointerTitle} properties ${filteredPropertiesDescriptions.join(", ")}: `;
    }
    const propKey = getKeyFromPointer(focusPointer) || "";
    const description = job?.descriptions?.[focusPointer] || "";
    const descriptionPostfix = description ? ` (${description})` : "";
    return `Now focus only on ${job.name} > ${schemaAtPointer?.title || propKey}${descriptionPostfix}: `;
};

export const getRenderTool = (filteredPropertiesToGenerate: JSONSchemaType<any>[]) => {
    const schema: JSONSchemaType<Record<string, any>> = filteredPropertiesToGenerate.reduce(
        (schema, property) => {
            const key = getKeyFromProperty(property);
            if (key) {
                schema.properties[key] = property;
                schema.required.push(key);
            }
            return schema;
        },
        { type: "object", properties: {}, required: [] } as JSONSchemaType<Record<string, any>> & {
            properties: { [key: string]: JSONSchemaType<any> };
        }
    );
    const tool: MistralChatToolType = {
        type: "function",
        name: "render",
        description: "Render props as component",
        function: {
            name: "render",
            parameters: schema,
            function: (...params: any[]) => console.log("Render", ...params),
        },
    };
    return tool;
};
