import { JSONSchemaType } from "ajv";
import { HeadingEditableProps } from "./Heading";

export const headingJsonSchema: JSONSchemaType<HeadingEditableProps> = {
    type: "object",
    properties: {
        heading: {
            type: "string",
            nullable: true,
        },
        imageUri: {
            type: "string",
            nullable: true,
        },
        broadcast: {
            description: "Allow broadcasting",
            type: "boolean",
            nullable: true,
        },
        children: {
            description: "Extra content below the heading text",
            type: "string",
            nullable: true,
        },
        className: {
            type: "string",
            nullable: true,
        },
        headingClassName: {
            type: "string",
            nullable: true,
        },
        contentWrapperClassName: {
            type: "string",
            nullable: true,
        },
        imageClassName: {
            type: "string",
            nullable: true,
        },
    },
    additionalProperties: false,
};

export default headingJsonSchema;
