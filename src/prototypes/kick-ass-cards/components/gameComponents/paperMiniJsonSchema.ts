import { JSONSchemaType } from "ajv";
import { PaperMiniProps } from "./PaperMini";

export const paperMiniJsonSchema: JSONSchemaType<PaperMiniProps> = {
    type: "object",
    properties: {
        imageUri: { type: "string" },
        imageStyle: { type: "object", nullable: true },
        backImageUri: { type: "string", nullable: true },
        backImageStyle: { type: "object", nullable: true },
        width: { type: "string", nullable: true, default: "1in" },
        height: { type: "string", nullable: true, default: "2in" },
        baseWidth: { type: "string", nullable: true },
        baseStyle: { type: "object", nullable: true },
        cutBorderStyle: { type: "string", nullable: true },
        baseContent: { type: "string", nullable: true },
        backBaseContent: { type: "string", nullable: true },
        className: { type: "string", nullable: true },
        imageClassName: { type: "string", nullable: true },
        backImageClassName: { type: "string", nullable: true },
        baseClassName: { type: "string", nullable: true },
        backBaseClassName: { type: "string", nullable: true },
        children: { type: "string", nullable: true },
    },
    required: ["imageUri"],
    additionalProperties: false,
};

export default paperMiniJsonSchema;
