import { JSONSchema7Definition } from "json-schema";
import { SDOptionsType } from "../../../../hooks/useSD";
import { MistralOptionsType } from "../../../../hooks/useMistral";

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
    schema: JSONSchema7Definition;
};
export default ComponentMetaType;
