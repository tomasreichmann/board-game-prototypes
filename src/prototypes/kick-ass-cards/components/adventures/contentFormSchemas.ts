import { JSONSchemaType } from "ajv";
import { getFormSchemaFromJsonSchema } from "../content/Form";
import mdxJsonSchema from "../content/mdxSchema";
import textJsonSchema from "../content/textSchema";
import { actorCardSchema } from "../gameComponents/ActorCard";
import { assetCardSchema } from "../gameComponents/AssetCard";
import { clockSchema } from "../Clock";
import effectCardSchema from "../gameComponents/effectCardSchema";
import imageFormSchema from "../imageFormSchema";

const contentFormSchemas = {
    Text: getFormSchemaFromJsonSchema(textJsonSchema as JSONSchemaType<any>),
    Mdx: getFormSchemaFromJsonSchema(mdxJsonSchema as JSONSchemaType<any>),
    Actor: getFormSchemaFromJsonSchema(actorCardSchema as JSONSchemaType<any>),
    Asset: getFormSchemaFromJsonSchema(assetCardSchema as JSONSchemaType<any>),
    Clock: getFormSchemaFromJsonSchema(clockSchema as JSONSchemaType<any>),
    Effect: getFormSchemaFromJsonSchema(effectCardSchema as JSONSchemaType<any>),
    Image: getFormSchemaFromJsonSchema(imageFormSchema as JSONSchemaType<any>),
};

export default contentFormSchemas;
