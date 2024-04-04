import { JSONSchemaType } from "ajv";
import { sceneMeta } from "../../../prototypes/kick-ass-cards/components/content/Scene";
import JobType from "../jobType";

const sceneJob: JobType = {
    name: "Scene",
    description: "A part of a script that defines a single scene withing a larger story.",
    data: {},
    previewMeta: sceneMeta,
    schema: sceneMeta.schema as JSONSchemaType<any>, // TODO: fix this
    descriptions: {
        title: "Name of the scene capturing the basic essence with 1 world or 1 sentence. Plaintext format",
        context: "What is the whole artwork about. Markdown format",
        story: "What happens within the scene. Markdown format",
    },
    focusedProperty: null,
    promptIncludes: {
        _jobInfo: true,
        _focusInfo: true,
    },
    history: {},
};

export default sceneJob;
