import Button from "../../prototypes/kick-ass-cards/components/content/Button";
import Text from "../../prototypes/kick-ass-cards/components/content/Text";
import JobType from "./jobType";
import sceneJob from "./jobs/sceneJob";
import statBlockJob from "./jobs/statBlock";
import { useJobManager } from "./JobManagerProvider";
import MistralService from "../../services/Mistral/Mistral";
import { JobManagerActionTypeEnum } from "./jobManagerReducer";
import ErrorBoundary from "../ErrorBoundary";
import ComponentMetaEditor from "../../prototypes/kick-ass-cards/components/generation/ComponentMetaEditor";
import ToggleData from "../DataToggle";
import Navigation from "./Navigation";
import DataInputForm from "./DataInputForm";

const jobList: JobType[] = [sceneJob, statBlockJob].map((job) => {
    return {
        ...job,
        pointer: "",
        pointersToGenerate: {},
        pointersToInclude: {},
        relatedProperties: [],
        includeJobInfo: true,
        includeFocusInfo: true,
        forceToolCall: false,
    };
});

const llmClient = MistralService();

export default function LlmJobManager() {
    const { state: job, dispatch } = useJobManager();

    return (
        <div className="flex-1 flex flex-col sm:flex-row gap-8">
            <div className="relative flex-1 flex flex-col items-center">
                <div className="flex flex-col gap-4 w-full pb-2 ">
                    <Navigation />
                    <DataInputForm />
                </div>
                <div className="flex-1 flex flex-col gap-4 w-full pb-2">
                    <div className="relative flex-1 w-full flex flex-col gap-4 overflow-auto min-h-[400px] ">
                        {!job && (
                            <div className="flex-1 flex flex-col items-center justify-center gap-4">
                                <Text variant="h3" className="text-center">
                                    Select a job
                                </Text>
                                <div className="w-full flex flex-row flex-wrap gap-4 justify-center">
                                    {jobList.map((job) => (
                                        <Button
                                            key={job.name}
                                            color="primary"
                                            className="w-full flex flex-col items-stretch text-center max-w-64"
                                            variant="outline"
                                            onClick={() =>
                                                dispatch({ type: JobManagerActionTypeEnum.SetJob, payload: job })
                                            }
                                        >
                                            <Text variant="h4" className="text-kac-gold-darker text-center">
                                                {job.name}
                                            </Text>
                                            <Text variant="body">{job.description}</Text>
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}
                        {job && (
                            <>
                                <div className="absolute top-0 left-0 right-4 h-4 bg-[linear-gradient(to_top,rgba(255,255,255,0)_0%,rgba(255,255,255,1)_100%)] z-10"></div>
                                <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col-reverse gap-4 items-center overflow-auto pt-4"></div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="sm:w-[25vw] md:w-[400px] overflow-auto flex flex-col relative gap-4">
                <ErrorBoundary>
                    {job && job.previewMeta && (
                        <ComponentMetaEditor
                            className="flex-col"
                            disabled
                            {...job.previewMeta}
                            initialProps={job.data}
                            controlsClassName="flex-row"
                        />
                    )}
                </ErrorBoundary>

                <ToggleData
                    data={{ job }}
                    buttonContent="Show Job Data"
                    previewClassName="flex-1 shrink"
                    initialCollapsed
                />
            </div>
        </div>
    );
}
