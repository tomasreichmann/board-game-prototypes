import { JSONSchemaType } from "ajv";
import { ImageProps } from "./Image";

export const imageJsonSchema: JSONSchemaType<ImageProps> = {
    type: "object",
    properties: {
        children: { type: "string", nullable: true },
        src: { type: "string", nullable: true },
        objectFit: { type: "string", nullable: true },
        objectPosition: { type: "string", nullable: true },
        className: { type: "string", nullable: true },
        style: { description: "CSS style in JSON format", type: "object", nullable: true },
    },
    additionalProperties: false,
};

export default imageJsonSchema;
