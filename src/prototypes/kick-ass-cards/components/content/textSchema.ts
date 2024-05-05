import { JSONSchemaType } from "ajv";
import { TextPropsEditable } from "./Text";

const textJsonSchema: JSONSchemaType<TextPropsEditable> = {
    type: "object",
    properties: {
        variant: {
            type: "string",
            enum: ["body", "h1", "h2", "h3", "h4", "h5", "h6"],
            nullable: true,
        },
        color: {
            type: "string",
            enum: ["body", "heading", "danger", "success"],
            nullable: true,
        },
        children: {
            type: "string",
            nullable: true,
        },
    },
    additionalProperties: true,
};

export default textJsonSchema;
