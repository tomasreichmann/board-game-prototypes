import { JSONSchemaType } from "ajv";
import { EffectCardProps } from "./EffectCard";
import { PaperProps } from "../../../../components/print/Paper/Paper";
import { iconMap } from "../Icon";

export const effectCardJsonSchema: JSONSchemaType<Omit<EffectCardProps, keyof PaperProps>> = {
    type: "object",
    properties: {
        className: {
            type: "string",
            nullable: true,
            default: "not-prose drop-shadow-md print:drop-shadow-none print:filter-none",
        },
        slug: { type: "string", nullable: true },
        title: { type: "string" },
        icon: { type: "string", enum: Object.keys(iconMap) },
        effect: { type: "string" },
        count: { type: "integer", minimum: 0, nullable: true },
    },
    required: ["title", "effect", "icon"],
    additionalProperties: false,
};

export default effectCardJsonSchema;
