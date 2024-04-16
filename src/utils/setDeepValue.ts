import { JSONSchemaType } from "ajv";
import getSchemaAtDeepPointer from "./getSchemaAtDeepPointer";

const referenceDataTypes = ["array", "object"]; // function is not supported

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

const setDeepValue = (data: any, pointer: string, schema: JSONSchemaType<any>, value: any, delimiter = ".") => {
    if (!pointer || pointer === delimiter) {
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
    const [nextKey, ...otherKeys] = pointer.split(delimiter);
    if (otherKeys.length === 0) {
        newData[nextKey] = value;
    } else {
        const childPointer = otherKeys.join(delimiter);
        const childSchema = getSchemaAtDeepPointer(schema, nextKey, delimiter);
        newData[nextKey] = setDeepValue(newData[nextKey], childPointer, childSchema, value);
    }
    return newData;
};

export default setDeepValue;
