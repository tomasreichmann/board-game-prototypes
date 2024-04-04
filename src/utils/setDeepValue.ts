import { JSONSchemaType } from "ajv";

const referenceDataTypes = ["array", "object"];

const getDataType = (data: any) => {
    if (data === null) {
        return "null";
    }
    if (Array.isArray(data)) {
        return "array";
    }
    return typeof data;
};

const isReferenceType = (data: any) => {
    return referenceDataTypes.includes(getDataType(data));
};

const createNewReference = <T>(data: T): T => {
    const type = getDataType(data);

    if (type === "array") {
        return [...(data as Array<any>)] as T;
    }
    if (type === "object") {
        return { ...data };
    }
    return data;
};

const setDeepValue = (data: any, pointer: string, schema: JSONSchemaType<any>, value: any) => {
    if (!pointer || pointer === "/") {
        return value;
    }
    let newData = data;
    const isDataReference = isReferenceType(data);
    newData = isDataReference ? createNewReference(data) : data;
    if (newData === undefined || newData === null) {
        const type = schema.type;
        if (type === "object") {
            newData = {};
        } else if (type === "array") {
            newData = [];
        }
    }
    let [root, nextKey, ...otherKeys] = pointer.split("/");
    if (schema.type === "object" && nextKey === "properties" && otherKeys.length > 0) {
        nextKey = otherKeys[0];
        otherKeys = otherKeys.slice(1);
    }
    if (otherKeys.length === 0) {
        newData[nextKey] = value;
    } else {
        let childPointer = [root, ...otherKeys].join("/");
        let childSchema = undefined;
        if (schema.type === "object") {
            if (otherKeys[0] === "properties") {
                childPointer = [root, ...otherKeys.slice(1)].join("/");
            }
            childSchema = schema.properties[nextKey];
        }
        if (schema.type === "array") {
            childSchema = schema.items;
        }
        newData[nextKey] = setDeepValue(newData[nextKey], childPointer, schema, value);
    }
    return newData;
};

export default setDeepValue;
/*
console.log(setDeepValue({ a: 1 }, "/", { type: "object" }, 1));
console.log(setDeepValue({}, "/a", { type: "object" }, 1));
console.log(setDeepValue({ a: 2 }, "/a", { type: "object" }, 1));
console.log(setDeepValue({ b: 2 }, "/a", { type: "object" }, 1));
console.log(setDeepValue([2], "/1", { type: "array", items: { type: "number" } }, 1));
console.log(setDeepValue({ b: { a: 2} }, "/b/a", { type: "object", properties: { b: { type: "object", nullable: true } } }, 1));
console.log(setDeepValue({  }, "/b/a", { type: "object", properties: { b: { type: "object", nullable: true } } }, 1));
*/
