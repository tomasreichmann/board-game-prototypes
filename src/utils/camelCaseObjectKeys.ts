import { camelCase } from "lodash";

export default function camelCaseObjectKeys<T extends Record<string, any>>(
    obj: T
): Record<string, any> {
    return Object.keys(obj).reduce((result, origKey) => {
        result[camelCase(origKey)] = obj[origKey];
        return result;
    }, {} as Record<string, any>);
}
