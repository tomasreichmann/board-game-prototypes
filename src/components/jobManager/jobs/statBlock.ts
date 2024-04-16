import { JSONSchemaType } from "ajv";
import { statBlockMeta, statBlockSchemaWithGeneratedProps } from "../../../prototypes/dnd/components/StatBlock";
import { ToolChoice } from "../../../services/Mistral/Mistral";
import JobType from "../jobType";

const statBlockJob: JobType = {
    name: "Stat Block",
    description: "A Dungeons and Dragons 5e stat block.",
    data: {},
    previewMeta: statBlockMeta,
    schema: statBlockMeta.schema as JSONSchemaType<any>,
    includeFocusInfo: true,
    includeJobInfo: true,
    pointer: "",
    pointersToGenerate: {},
    pointersToInclude: {},
    relatedProperties: [],
    descriptions: {
        SD_imageUri: "Stable Diffusion XL prompt",
    },
    focusedProperty: null,
    promptIncludes: {
        _jobInfo: true,
        _focusInfo: true,
    },
    history: {},
    chatOptions: {
        toolChoice: ToolChoice.any,
    },
};

export default statBlockJob;
