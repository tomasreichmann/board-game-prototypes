import { JSONSchemaType } from "ajv";
import { ComponentListProps } from "./ComponentList";

export const componentListJsonSchema: JSONSchemaType<ComponentListProps> = {
    type: "object",
    properties: {
        children: { type: "string", nullable: true, isReactNode: true },
        className: { type: "string", nullable: true },
    },
    additionalProperties: false,
};

export default componentListJsonSchema;
