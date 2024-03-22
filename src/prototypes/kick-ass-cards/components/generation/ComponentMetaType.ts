import { SDOptionsType } from "../../../../hooks/useSD";
import { MistralOptionsType } from "../../../../hooks/useMistral";
import { JSONSchemaType } from "ajv";

type ComponentMetaType<PropType extends {}> = {
    componentName: string;
    description?: string;
    generationConfig: {
        llmContext?: string;
        llmOptions?: MistralOptionsType;
        sdOptions?: SDOptionsType;
        props: {
            [key in keyof PropType]?: {
                llm?:
                    | boolean
                    | {
                          prompt?: string;
                          promptFromSchemaDescription?: boolean;
                          promptFromProp?: keyof PropType;
                          llmContext?: string;
                          llmOptions?: MistralOptionsType;
                      };
                sd?:
                    | boolean
                    | {
                          prompt?: string;
                          promptFromSchemaDescription?: boolean;
                          promptFromProp?: keyof PropType;
                          sdOptions?: SDOptionsType;
                      };
            };
        };
    };
    Component: React.ComponentType<PropType>;
    schema: JSONSchemaType<any>;
};
export default ComponentMetaType;
