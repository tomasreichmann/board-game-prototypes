import { JSONSchemaType } from "ajv";
import { MdxEditable } from "./Mdx";

const mdxJsonSchema: JSONSchemaType<MdxEditable> = {
    type: "object",
    properties: {
        mdxString: {
            type: "string",
            maxLength: 100000,
        },
    },
    required: ["mdxString"],
    additionalProperties: true,
};

export default mdxJsonSchema;
