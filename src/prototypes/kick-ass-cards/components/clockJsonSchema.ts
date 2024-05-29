import { JSONSchemaType } from "ajv";
import { ClockProps } from "./Clock";
import { PaperProps } from "../../../components/print/Paper/Paper";

export const clockJsonSchema: JSONSchemaType<Omit<ClockProps, keyof PaperProps>> = {
    type: "object",
    properties: {
        slug: { type: "string", nullable: true },
        forPrint: { type: "boolean", nullable: true },
        title: { type: "string", nullable: true },
        reward: { type: "string", nullable: true },
        threat: { type: "string", nullable: true },
        note: { type: "string", nullable: true },
        total: { type: "number", nullable: true },
        current: { type: "number", nullable: true },
    },
};

export default clockJsonSchema;
