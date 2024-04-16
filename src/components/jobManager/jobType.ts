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
    pointer: string; // updated pointer where "" is root, e.g. "key.subKey.0"
    pointersToGenerate: { [key: string]: true | undefined };
    pointersToInclude: { [key: string]: true | undefined };
    relatedProperties: JSONSchemaType<any>[];
    includeJobInfo: boolean;
    includeFocusInfo: boolean;
    forceToolCall?: boolean;
    error?: Error;
    prompt?: string;
    history: {
        [key: string]: MessageType[];
    };

    // deprecated
    focusedProperty?: string | null;
    focusPointer?: string | null;
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
