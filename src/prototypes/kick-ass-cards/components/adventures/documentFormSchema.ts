import { JSONSchemaType } from "ajv";
import { AdventureDocumentFormType } from "./Document";

export const documentFormJsonSchema: JSONSchemaType<AdventureDocumentFormType> = {
    type: "object",
    properties: {
        name: {
            nullable: true,
            type: "string",
        },
    },
    required: [],
    additionalProperties: false,
};
