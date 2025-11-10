import { JSONSchemaType } from "ajv";

const getSchemaAtDeepPointer = (schema: JSONSchemaType<any>, deepPointer: string, delimiter = ".") => {
    console.log("getSchemaAtDeepPointer", { schema, deepPointer });
    const pointerFragments = deepPointer.split(delimiter);
    if (pointerFragments.length === 0) {
        return schema;
    }
    const pointerFragmentsLeft = pointerFragments;
    let currentFragment;
    let currentSchema = schema;
    while ((currentFragment = pointerFragmentsLeft.shift())) {
        const lastSchemaType = currentSchema.type;
        if (lastSchemaType === "object") {
            currentSchema = currentSchema.properties[currentFragment];
        }
        if (lastSchemaType === "array") {
            currentSchema = currentSchema.items;
        }
    }
    return currentSchema;
};

export default getSchemaAtDeepPointer;
