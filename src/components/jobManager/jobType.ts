import { JSONSchemaType } from "ajv";
import { AnyRecord } from "../../utils/simpleTypes";
import { MessageType, MistralChatOptionsType } from "../../services/Mistral/Mistral";
import ComponentMetaType from "../../prototypes/kick-ass-cards/components/generation/ComponentMetaType";

type JobType = {
    name: string;
    description: string;
    data: AnyRecord;
    schema: JSONSchemaType<any>;
    previewMeta?: ComponentMetaType<any>;
    descriptions?: {
        [key: string]: string;
    };
    focusedProperty?: string | null;
    focusPointer?: string | null;
    prompt?: string;
    history: {
        [key: string]: MessageType[];
    };
    forceToolCall?: boolean;
    chatOptions?: Partial<MistralChatOptionsType>;
    propertiesToGenerate?: {
        [key: string]: boolean;
    };
    promptIncludes: {
        _jobInfo: boolean;
        _focusInfo: boolean;
        [key: string]: boolean;
    };
};
export default JobType;
