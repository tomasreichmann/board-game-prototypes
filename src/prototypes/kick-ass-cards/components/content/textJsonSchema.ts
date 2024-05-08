import { JSONSchemaType } from "ajv";
import { TextPropsEditable } from "./Text";

export const textJsonSchema: JSONSchemaType<Pick<TextPropsEditable, "variant" | "color"> & { children: any }> = {
    type: "object",
    properties: {
        variant: {
            type: "string",
            enum: ["body", "h1", "h2", "h3", "h4", "h5", "h6"],
            nullable: true,
        },
        color: {
            type: "string",
            enum: ["body", "heading", "danger", "success", "white", "inherit"],
            nullable: true,
        },
        size: {
            type: "string",
            enum: ["xs", "sm", "md", "lg", "xl"],
            nullable: true,
        },
        children: {
            label: "Text",
            type: "string",
            nullable: true,
        },
    },
    additionalProperties: true,
};

export default textJsonSchema;
