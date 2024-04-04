import { useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";
import { MistralFormatEnum, MistralOptionsType, useMistral } from "../hooks/useMistral";
import Button from "../prototypes/kick-ass-cards/components/content/Button";
import ButtonWithConfirmation from "../prototypes/kick-ass-cards/components/content/ButtonWithConfirmation";
import copyToClipboard from "../utils/copyToClipboard";
import Input from "../prototypes/kick-ass-cards/components/content/Input";
import Page from "../components/Page/Page";
import Pending from "../components/form/Pending";
import Select from "../prototypes/kick-ass-cards/components/content/Select";
import SmartInput from "../prototypes/kick-ass-cards/components/content/SmartInput";
import ToggleData from "../components/DataToggle";
import JobManager, { JobType, LLMRequestType, LLMResponseType, TaskTypeEnum } from "../services/JobManager/JobManager";
import { MistralModelEnum } from "../services/Mistral/Mistral";

const myMockJob: JobType = {
    tasks: [
        {
            id: "TASK_1",
            type: TaskTypeEnum.LLM,
            prompt: "This is a test prompt",
            parserKey: "allJsonBlocksInMarkdown",
            parserOptions: { minResults: 3 },
            validatorKey: "validateArrayOfAssetCardProps",
        },
    ],
    onTaskDone: (...params) => {
        console.log("onTaskDone", ...params);
    },
    onTaskParse: (...params) => {
        console.log("onTaskParse", ...params);
    },
    onTaskValidate: (...params) => {
        console.log("onTaskValidate", ...params);
    },
    onTaskError: (...params) => {
        console.log("onTaskError", ...params);
    },
    onDone: (...params) => {
        console.log("onDone", ...params);
    },
    onError: (...params) => {
        console.log("onError", ...params);
    },
};

const mockLlmApi = (() => {
    let responsePointer = 0;
    const responses = [
        `
        whatever
\`\`\`json
{
    "slug": "sample",
    "title": "Sample Asset",
    "effect": "This is a sample asset for testing purposes."
}
\`\`\`    
whatever
\`\`\`json
{
    "slug": "sample-2",
    "title": "Sample Asset 2",
    "effect": "This is another sample asset for testing purposes."
}
\`\`\`  
whatever  
`,
        "more mock response",
        "even more mock response",
    ];
    return {
        reset: () => {
            responsePointer = 0;
        },
        sendRequest: async (request: LLMRequestType): Promise<LLMResponseType> => {
            const response = responses[responsePointer];
            console.log({ request, response });
            if (response) {
                responsePointer = responsePointer++;
                return { response };
            }
            throw Error("No more responses");
        },
    };
})();

const mockJobManager = JobManager({ llmApi: mockLlmApi });

export default function LlmRoute() {
    const [mistralOptions, setMistralOptions] = useState<MistralOptionsType>({
        model: MistralModelEnum["open-mistral-7b"],
        includeHistoryLength: 0,
        // format: MistralFormatEnum.json_object,
        temperature: 0.7,
        topP: 1,
        maxTokens: 500,
        stream: false,
        safePrompt: false,
    });
    const { sendMessage, clearHistory, ...status } = useMistral(mistralOptions);
    console.log({ mistralOptions });
    const { isPending, error, history } = status;
    const [message, setMessage] = useState("");

    const sendMessageCallback = useCallback(
        (message: string) => {
            sendMessage(message);
            setMessage("");
        },
        [sendMessage]
    );

    return (
        <Page className="LlmRoute flex-1 h-svh flex flex-col box-border">
            <h1 className="text-3l font-bold mb-10">LLM Prototype</h1>
            <div className="flex-1 flex flex-col sm:flex-row gap-8">
                <div className="relative flex-1 flex flex-col items-center">
                    <div className="flex-1 flex flex-col gap-4 w-full max-w-xl pb-2">
                        <div className="relative flex-1 w-full flex flex-col gap-4 overflow-auto min-h-[400px]">
                            <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col-reverse gap-4 items-center overflow-auto">
                                <div className="pr-4 max-w-full">
                                    {history.map((historyItem, historyIndex) => {
                                        const isLast = historyIndex === history.length - 1;
                                        if (historyItem.type === "message") {
                                            return (
                                                <div
                                                    key={historyIndex}
                                                    className={twMerge(
                                                        "flex flex-col items-stretch text-sm mt-4 pl-8",
                                                        isLast && "text-md"
                                                    )}
                                                >
                                                    <div className="text-xs text-right">
                                                        <span className="text-slate-400">User</span>
                                                    </div>
                                                    <pre className="w-full whitespace-pre-wrap font-sans bg-kac-steel-light px-4 py-1 rounded-md shadow-inner">
                                                        {historyItem.message}&ensp;
                                                        <Button
                                                            variant="text"
                                                            color="success"
                                                            className="text-xs px-2 py-1 inline-block bg-transparent"
                                                            onClick={() => copyToClipboard(historyItem.message)}
                                                        >
                                                            Copy
                                                        </Button>
                                                        <Button
                                                            variant="text"
                                                            color="primary"
                                                            className="text-xs px-2 py-1 inline-block bg-transparent"
                                                            onClick={() => setMessage(historyItem.message)}
                                                        >
                                                            Reuse
                                                        </Button>
                                                    </pre>
                                                </div>
                                            );
                                        }
                                        if (historyItem.type === "response") {
                                            return (
                                                <div
                                                    key={historyIndex}
                                                    className={twMerge(
                                                        "flex flex-col items-stretch text-sm mt-4 pr-8",
                                                        isLast && "text-md"
                                                    )}
                                                >
                                                    <div className="text-xs capitalize text-slate-400">
                                                        {historyItem.response.choices[0].message.role}
                                                    </div>

                                                    <pre className="w-full whitespace-pre-wrap font-sans">
                                                        {historyItem.response.choices[0].message.content}&ensp;
                                                        <Button
                                                            variant="text"
                                                            color="success"
                                                            className="text-xs px-2 py-1 inline-block bg-transparent"
                                                            onClick={() =>
                                                                copyToClipboard(
                                                                    historyItem.response.choices[0].message.content
                                                                )
                                                            }
                                                        >
                                                            Copy
                                                        </Button>
                                                    </pre>
                                                </div>
                                            );
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                        <SmartInput
                            type="textarea"
                            isCopyable
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            textareaProps={{
                                onKeyDown: (e) => {
                                    if (e.ctrlKey && e.key === "Enter") {
                                        e.preventDefault();
                                        sendMessageCallback(message);
                                    }
                                },
                            }}
                            className="w-full bg-kac-steel-light rounded-md shadow-inner"
                            labelClassName="w-full px-4 pt-2"
                            inputClassName="w-full px-4 pb-2 rounded-md"
                            label="Message"
                        />
                        <Button
                            disabled={!message || isPending}
                            className="w-full leading-none min-h-14"
                            onClick={() => {
                                sendMessageCallback(message);
                            }}
                        >
                            {isPending ? (
                                <Pending />
                            ) : (
                                <>
                                    Send
                                    <br />
                                    <span className="opacity-50 text-xs"> CTRL + ENTER</span>
                                </>
                            )}
                        </Button>
                        <div className="flex flex-row flex-wrap gap-2 pb-8">
                            <ButtonWithConfirmation color="danger" className="flex-1 text-sm" onClick={clearHistory}>
                                Clear History
                            </ButtonWithConfirmation>
                            <Input
                                className="max-w-32 text-kac-steel-dark"
                                type="number"
                                value={mistralOptions.includeHistoryLength}
                                label="Include History"
                                labelClassName="text-sm max-w-24"
                                onChange={(e) => {
                                    setMistralOptions((options) => ({
                                        ...options,
                                        includeHistoryLength: parseInt(e.target.value),
                                    }));
                                }}
                            />
                            <Input
                                className="max-w-20"
                                type="number"
                                value={mistralOptions.maxTokens}
                                min={10}
                                step={10}
                                max={1000}
                                label="Max Tokens"
                                labelClassName="text-sm max-w-20"
                                onChange={(e) => {
                                    console.log(parseInt(e.target.value));
                                    setMistralOptions((options) => ({
                                        ...options,
                                        maxTokens: parseInt(e.target.value),
                                    }));
                                }}
                            />
                            <Input
                                className="max-w-20"
                                type="number"
                                value={mistralOptions.temperature}
                                min={0}
                                step={0.1}
                                max={1}
                                label="Temperature"
                                labelClassName="text-sm max-w-20"
                                onChange={(e) => {
                                    setMistralOptions((options) => ({
                                        ...options,
                                        temperature: parseInt(e.target.value),
                                    }));
                                }}
                            />
                            <Select
                                className="max-w-40"
                                label="Model"
                                labelClassName="text-sm"
                                options={Object.entries(MistralModelEnum).map(([_, value]) => ({
                                    label: value,
                                    value,
                                }))}
                                onChange={(event) => {
                                    setMistralOptions((options) => ({
                                        ...options,
                                        model: event.target.value as MistralModelEnum,
                                    }));
                                }}
                            />
                        </div>
                        {error && <p className="text-red-500 mt-2">{error.message}</p>}
                    </div>
                </div>
                <div className="sm:w-[25vw] md:w-[400px] overflow-auto flex flex-col relative gap-4">
                    <ToggleData data={{ status }} previewClassName="flex-1 shrink" />
                    <Button onClick={() => mockJobManager.runJob(myMockJob)}>Send Mock Job</Button>
                    <Button onClick={() => mockLlmApi.reset()}>Reset Mock Api</Button>
                </div>
            </div>
        </Page>
    );
}
