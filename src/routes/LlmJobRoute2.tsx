import Page from "../components/Page/Page";
import Text from "../prototypes/kick-ass-cards/components/content/Text";
import JobManagerProvider from "../components/jobManager/JobManagerProvider";
import LlmJobManager from "../components/jobManager/LlmJobManager";

export default function LlmJobRoute2() {
    return (
        <Page className="LlmRoute flex-1 h-svh flex flex-col box-border font-kacBody">
            <div className="flex flex-col sm:flex-row gap-4 items-baseline pb-2 mt-4">
                <Text variant="h1">LLM Job Prototype 2</Text>
                <Text variant="body" className="flex-1 min-w-[200px]">
                    Job is a data structure with metadata describing it. You can traverse the data and talk to LLM about
                    it using other parts of the data structure as context
                </Text>
            </div>
            <div className="flex-1 flex flex-col sm:flex-row gap-8">
                <JobManagerProvider>
                    <LlmJobManager />
                </JobManagerProvider>
            </div>
        </Page>
    );
}
