import { JSONSchemaType } from "ajv";
import { ImageProps } from "./Image";

export const imageFormSchema: JSONSchemaType<ImageProps> = {
    type: "object",
    properties: {
        className: { type: "string", nullable: true },
        src: { type: "string", nullable: true },
        style: { type: "object", nullable: true },
        objectFit: { type: "string", nullable: true },
        objectPosition: { type: "string", nullable: true },
        children: { type: "string", nullable: true },
    },
    additionalProperties: false,
};

export default imageFormSchema;
