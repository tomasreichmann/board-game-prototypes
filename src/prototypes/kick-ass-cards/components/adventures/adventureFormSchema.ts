import { JSONSchemaType } from "ajv";
import { AdventureDocType } from "../../services/firestoreController";

export type AdventureFormType = Omit<AdventureDocType, "id" | "meta" | "contents">;

export const adventureFormJsonSchema: JSONSchemaType<AdventureFormType> = {
    type: "object",
    properties: {
        name: {
            nullable: true,
            type: "string",
        },
        description: {
            description: "Supports [MDX](https://mdxjs.com/) syntax",
            nullable: true,
            type: "string",
            maxLength: 1000,
        },
        imageUri: {
            nullable: true,
            type: "string",
        },
    },
    required: [],
    additionalProperties: false,
};
