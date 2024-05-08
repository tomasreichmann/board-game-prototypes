import { JSONSchemaType } from "ajv";
import { getFormSchemaFromJsonSchema } from "../content/Form";
import mdxJsonSchema from "../content/mdxSchema";
import textJsonSchema from "../content/textJsonSchema";
import { actorCardSchema } from "../gameComponents/ActorCard";
import { assetCardSchema } from "../gameComponents/AssetCard";
import effectCardJsonSchema from "../gameComponents/effectCardJsonSchema";
import imageJsonSchema from "../imageJsonSchema";
import headingJsonSchema from "../headingJsonSchema";
import paperMiniJsonSchema from "../gameComponents/paperMiniJsonSchema";
import clockJsonSchema from "../clockJsonSchema";
import componentListJsonSchema from "../componentListJsonSchema";

const contentFormSchemas = {
    Text: getFormSchemaFromJsonSchema(textJsonSchema as JSONSchemaType<any>),
    Mdx: getFormSchemaFromJsonSchema(mdxJsonSchema as JSONSchemaType<any>),
    Actor: getFormSchemaFromJsonSchema(actorCardSchema as JSONSchemaType<any>),
    Asset: getFormSchemaFromJsonSchema(assetCardSchema as JSONSchemaType<any>),
    Clock: getFormSchemaFromJsonSchema(clockJsonSchema as JSONSchemaType<any>),
    Effect: getFormSchemaFromJsonSchema(effectCardJsonSchema as JSONSchemaType<any>),
    Image: getFormSchemaFromJsonSchema(imageJsonSchema as JSONSchemaType<any>),
    Heading: getFormSchemaFromJsonSchema(headingJsonSchema as JSONSchemaType<any>),
    PaperMini: getFormSchemaFromJsonSchema(paperMiniJsonSchema as JSONSchemaType<any>),
    List: getFormSchemaFromJsonSchema(componentListJsonSchema as JSONSchemaType<any>),
};

export default contentFormSchemas;
