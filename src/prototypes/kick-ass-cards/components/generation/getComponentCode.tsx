import { escape } from "lodash";

export const getComponentCode = (componentName: string, componentProps: Record<string, any>) => {
    return `<${componentName}
${Object.entries(componentProps)
    .map(([key, value]) => {
        const isNumber = typeof value === "number";
        const isBoolean = typeof value === "boolean";
        const isString = typeof value === "string";
        const spacing = "    ";
        if (isNumber) {
            return `${spacing}${key}={${value}}`;
        }
        if (isBoolean) {
            return `${spacing}${key}={${String(value)}}`;
        }
        if (isString) {
            return `${spacing}${key}=${JSON.stringify(escape(value))}`;
        }
        return `${spacing}${key}={${JSON.stringify(value)}}`;
    })
    .join("\n")}
/>`;
};
export default getComponentCode;
