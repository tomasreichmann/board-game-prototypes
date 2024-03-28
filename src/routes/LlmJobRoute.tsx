import { useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";
import { MistralOptionsType } from "../hooks/useMistral";
import Button from "../prototypes/kick-ass-cards/components/content/Button";
import ButtonWithConfirmation from "../prototypes/kick-ass-cards/components/content/ButtonWithConfirmation";
import Input from "../prototypes/kick-ass-cards/components/content/Input";
import Page from "../components/Page/Page";
import Pending from "../components/form/Pending";
import Select from "../prototypes/kick-ass-cards/components/content/Select";
import SmartInput from "../prototypes/kick-ass-cards/components/content/SmartInput";
import ToggleData from "../components/DataToggle";
import Mistral, { MessageType, MistralModelEnum, ToolChoice } from "../services/Mistral/Mistral";
import Text, { TextProps, textMeta } from "../prototypes/kick-ass-cards/components/content/Text";
import { JSONSchemaType } from "ajv";
import uuid from "../utils/uuid";
import { ChatCompletionResponse, ChatCompletionResponseChoice } from "@mistralai/mistralai";
import StatBlock, {
    StatBlockProps,
    statBlockMeta,
    statBlockSchemaWithGeneratedProps,
} from "../prototypes/dnd/components/StatBlock";
import ComponentMetaEditor from "../prototypes/kick-ass-cards/components/generation/ComponentMetaEditor";

type AnyRecord = Record<string, any>;

type JobType = {
    name: string;
    description: string;
    data: AnyRecord;
    schema: JSONSchemaType<any>;
    descriptions?: {
        [key: string]: string;
    };
    focusedProperty?: string | null;
    prompt?: string;
    history: {
        [key: string]: MessageType[];
    };
    forceToolCall?: boolean;
    chatOptions?: Partial<MistralOptionsType>;
    promptIncludes: {
        _jobInfo: boolean;
        _focusInfo: boolean;
        [key: string]: boolean;
    };
};

const jobList: JobType[] = [
    {
        name: "Scene",
        description: "A part of a script that defines a single scene withing a larger story.",
        data: {},
        schema: {
            title: "Scene",
            type: "object",
            properties: {
                title: {
                    title: "Title",
                    type: "string",
                    nullable: true,
                },
                context: {
                    title: "Context",
                    type: "string",
                    nullable: true,
                },
                story: {
                    title: "Story",
                    type: "string",
                    nullable: true,
                },
            },
        },
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
        chatOptions: {
            tools: [
                {
                    type: "function",
                    description:
                        "renderText function displays a styled Text component to the user with styles based on the variant and color props. Always use this tool if the user asks you to show or render any text.",
                    function: {
                        name: "renderText",
                        parameters: textMeta.schema,
                    },
                },
            ],
            toolChoice: ToolChoice.auto,
        },
    },
    {
        name: "Stat Block",
        description: "A Dungeons and Dragons 5e stat block.",
        data: {},
        schema: statBlockMeta.schema,
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
            tools: [
                {
                    name: "renderStatBlock",
                    description: "Renders the Stat Block component for preview",
                    type: "function",
                    function: {
                        name: "renderStatBlock",
                        description: "Renders the Stat Block component for preview",
                        parameters: statBlockSchemaWithGeneratedProps,
                    },
                },
            ],
            toolChoice: ToolChoice.any,
        },
    },
];

const llmClient = Mistral();

const getJobInfoPrompt = (job: JobType) => {
    return `We are working on a ${job.name} (${job.description})`;
};

const getFocusInfoPrompt = (job: JobType) => {
    if (!job.focusedProperty) {
        return "";
    }
    const description = job?.descriptions?.[job.focusedProperty] || "";
    const descriptionPostfix = description ? ` (${description})` : "";
    const focusedPropertySchema = job.schema.properties[job.focusedProperty];
    return `Let's focus on a ${job.name} ${focusedPropertySchema.title || job.focusedProperty}${descriptionPostfix}: `;
};

const getPropertyPrompt = (job: JobType, key: string) => {
    const description = job?.descriptions?.[key] || "";
    const descriptionPostfix = description ? ` (${description})` : "";
    return `${job.name} ${key}${descriptionPostfix} is: ${job.data[key]}`;
};

const renderStatBlock = (props: StatBlockProps) => {
    console.log("renderStatBlock props", props);
    return (
        <ComponentMetaEditor
            key={uuid()}
            initialProps={props}
            {...statBlockMeta}
            schema={statBlockSchemaWithGeneratedProps}
        />
    );
    //return <StatBlock key={uuid()} {...props} />;
};

const renderText = (options: { variant: TextProps["variant"]; color: TextProps["color"]; children: string }) => {
    const { variant = "body", color = "body", children = "No content" } = options;
    console.log("renderText options", options);
    const element = (
        <Text key={uuid()} variant={variant} color={color}>
            {children}
        </Text>
    );
    /*setPreview((preview) => {
        return [...preview, element];
    });*/
    return element;
};

export default function LlmJobRoute() {
    const [job, setJob] = useState<JobType | null>(null);
    const [preview, setPreview] = useState<React.ReactNode[]>([]);
    const [mistralOptions, setMistralOptions] = useState<MistralOptionsType>({
        // model: MistralModelEnum["open-mistral-7b"],
        // model: MistralModelEnum["open-mixtral-8x7b"],
        model: MistralModelEnum["mistral-small-latest"],
        includeHistoryLength: 6,
        // format: MistralFormatEnum.json_object,
        temperature: 0.7,
        topP: 1,
        maxTokens: 500,
        stream: false,
        safePrompt: false,
    });

    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const callTool = useCallback(
        (name: string, argString: string) => {
            console.log("callTool", name, argString);
            const toolFunctionMap = {
                renderText,
                renderStatBlock,
            };
            const params = JSON.parse(argString);
            const func = toolFunctionMap[name as keyof typeof toolFunctionMap];
            if (!func) {
                throw new Error(`Tool function ${name} not found`);
            }
            return func(params);
        },
        [renderText]
    );

    const sendMessageCallback = useCallback(() => {
        if (!job || !job.prompt || !job.focusedProperty) {
            return;
        }

        setError(null);
        setIsPending(true);

        const promptIncludes: string[] = [];
        if (job.prompt.toLowerCase().includes("render") || job.prompt.toLowerCase().includes("show")) {
            promptIncludes.push(
                "Always use a tool call to display the output. Do not respond with 'assistant' message.\n"
            );
        }
        if (job.promptIncludes._jobInfo) {
            promptIncludes.push(getJobInfoPrompt(job));
        }
        const propertyIncludeKeys = Object.keys(job.data).filter((key) => job.promptIncludes[key]);
        propertyIncludeKeys.forEach((key) => {
            promptIncludes.push(getPropertyPrompt(job, key));
        });

        if (job.promptIncludes._focusInfo) {
            promptIncludes.push(getFocusInfoPrompt(job));
        }

        const combinedPrompt = promptIncludes.join("\n") + job.prompt;

        setJob((job) => {
            if (!job) {
                return job;
            }
            return {
                ...job,
                history: {
                    ...(job || {}).history,
                    [(job || {}).focusedProperty as string]: [
                        ...((job || {}).history[(job || {}).focusedProperty as string] || []),
                        {
                            role: "user",
                            content: combinedPrompt,
                        } as MessageType,
                    ],
                },
            };
        });

        const toolOptions = job.forceToolCall ? { toolChoice: ToolChoice.any } : {};

        llmClient
            .chat(combinedPrompt, {
                ...job?.chatOptions,
                ...mistralOptions,
                ...toolOptions,
                history: (job.history[job.focusedProperty] as MessageType[]) || ([] as MessageType[]),
            })
            .then((responseWithWrongType) => {
                const response = responseWithWrongType as ChatCompletionResponse & {
                    choices: (ChatCompletionResponseChoice & { message: MessageType })[];
                };
                console.log(
                    "llmClient response tool calls",
                    response.choices[0].message?.tool_calls?.length,
                    response.choices[0].message?.tool_calls?.map((call) => call.function.name).join(", ")
                );
                const newHistoryItems: MessageType[] = [];
                if (response.choices[0].message.content) {
                    newHistoryItems.push(response.choices[0].message);
                }
                if (response.choices[0].message.tool_calls?.length) {
                    const toolCalls = response.choices[0].message.tool_calls;
                    const toolCallHistory = toolCalls
                        .map((toolCall) => {
                            if ("function" in toolCall) {
                                return {
                                    role: toolCall.function.name,
                                    content: callTool(toolCall.function.name, toolCall.function.arguments),
                                };
                            }
                            return null;
                        })
                        .filter((toolCall) => toolCall !== null) as MessageType[];
                    console.log({ toolCalls, toolCallHistory });
                    newHistoryItems.push(...toolCallHistory);
                }

                setIsPending(false);
                setJob((job) => {
                    console.log("setJob", Math.random());
                    if (!job) {
                        return job;
                    }
                    const newJob: JobType = {
                        ...job,
                    };
                    const newPropHistory = [
                        ...(newJob.history[newJob.focusedProperty as string] || []),
                        ...newHistoryItems,
                    ];

                    newJob.history = {
                        ...newJob.history,
                        [newJob.focusedProperty as string]: newPropHistory,
                    };
                    return newJob;
                });
            })
            .catch((error) => {
                setIsPending(false);
                setError(error);
            });
    }, [job?.prompt, job?.focusedProperty, mistralOptions, setJob, setIsPending, callTool]);

    const isPromptDisabled = !job || !job.focusedProperty || isPending;

    return (
        <Page className="LlmRoute flex-1 h-svh flex flex-col box-border font-kacBody">
            <div className="flex flex-row gap-4 items-baseline">
                <Text variant="h1" className="whitespace-nowrap">
                    LLM Job Prototype
                </Text>
                <Text variant="body" className="flex-1">
                    Job is a data structure with metadata describing it. You can traverse the data and talk to LLM about
                    it using other parts of the data structure as context
                </Text>
            </div>
            <div className="flex-1 flex flex-col sm:flex-row gap-8">
                <div className="relative flex-1 flex flex-col items-center">
                    <div className="flex-1 flex flex-col gap-4 w-full pb-2">
                        <div className="relative flex-1 w-full flex flex-col gap-4 overflow-auto min-h-[400px]">
                            {!job && (
                                <div className="flex-1 flex flex-col items-center justify-center gap-4">
                                    <Text variant="h3" className="text-center">
                                        Select a job
                                    </Text>
                                    <div className="w-full flex flex-row flex-wrap gap-4"></div>
                                    {jobList.map((job) => (
                                        <Button
                                            key={job.name}
                                            color="primary"
                                            className="w-full flex flex-col items-stretch text-center max-w-64"
                                            variant="outline"
                                            onClick={() => setJob(job)}
                                        >
                                            <Text variant="h4" className="text-kac-gold-darker text-center">
                                                {job.name}
                                            </Text>
                                            <Text variant="body">{job.description}</Text>
                                        </Button>
                                    ))}
                                </div>
                            )}
                            {job && (
                                <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col-reverse gap-4 items-center overflow-auto">
                                    <div className="pr-4 w-full">
                                        <div className="w-full flex flex-col">
                                            <Text
                                                variant="h3"
                                                className="flex-1 flex flex-row gap-4 text-kac-steel-dark mb-0"
                                            >
                                                <span className="flex-1 block">
                                                    {job.name}
                                                    {job.focusedProperty ? ` > ${job.focusedProperty}` : ""}
                                                </span>
                                                {job.focusedProperty && (
                                                    <Button
                                                        onClick={() =>
                                                            setJob(
                                                                (job) =>
                                                                    ({
                                                                        ...job,
                                                                        focusedProperty: null,
                                                                    } as JobType)
                                                            )
                                                        }
                                                        color="info"
                                                        variant="text"
                                                        className="text-sm px-2 py-1"
                                                    >
                                                        Back
                                                    </Button>
                                                )}
                                                <ButtonWithConfirmation
                                                    onClick={() => setJob(null)}
                                                    color="danger"
                                                    variant="text"
                                                    confirmText="Closing job will discard all data. Are you sure?"
                                                    className="text-sm px-2 py-1"
                                                >
                                                    Close Job
                                                </ButtonWithConfirmation>
                                            </Text>
                                            {!job.focusedProperty && (
                                                <div className="flex flex-col gap-4">
                                                    <Text variant="body" className="text-kac-steel-dark">
                                                        Pick a property to focus on.
                                                    </Text>
                                                    <div className="flex flex-col gap-2">
                                                        {Object.keys(job.schema.properties)?.map((propertyKey) => {
                                                            const key = propertyKey as keyof JobType["data"];
                                                            return (
                                                                <div key={key} className="flex flex-row gap-4">
                                                                    <Button
                                                                        key={job.name}
                                                                        color="primary"
                                                                        className="font-bold"
                                                                        onClick={() =>
                                                                            setJob(
                                                                                (job) =>
                                                                                    ({
                                                                                        ...job,
                                                                                        focusedProperty: key,
                                                                                    } as JobType)
                                                                            )
                                                                        }
                                                                    >
                                                                        {key}
                                                                    </Button>
                                                                    <Text
                                                                        variant="body"
                                                                        className="text-kac-steel-dark"
                                                                    >
                                                                        {job.data[key]}
                                                                    </Text>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                            {job.focusedProperty && (
                                                <div className="flex flex-col gap-4">
                                                    <Input
                                                        type="textarea"
                                                        label="Content"
                                                        value={job.data[job.focusedProperty as keyof JobType["data"]]}
                                                        onChange={(e) =>
                                                            setJob(
                                                                (job) =>
                                                                    ({
                                                                        ...job,
                                                                        data: {
                                                                            ...(job || {}).data,
                                                                            [(job || {})
                                                                                .focusedProperty as keyof JobType["data"]]:
                                                                                e.target.value,
                                                                        },
                                                                    } as JobType)
                                                            )
                                                        }
                                                    />
                                                    <div className="flex flex-col gap-4">
                                                        {job.history[job.focusedProperty as string]?.map(
                                                            (message, messageIndex) => (
                                                                <div key={messageIndex} className="flex flex-col gap-2">
                                                                    <Text
                                                                        variant="body"
                                                                        className="text-xs text-kac-iron-light"
                                                                    >
                                                                        {message.role}
                                                                    </Text>
                                                                    {typeof message.content === "string" ? (
                                                                        <Text variant="body" className="">
                                                                            {message.content}{" "}
                                                                            <Button
                                                                                onClick={() =>
                                                                                    setJob((job) => {
                                                                                        if (message.role === "user") {
                                                                                            return {
                                                                                                ...job,
                                                                                                prompt: message.content,
                                                                                            } as JobType;
                                                                                        }
                                                                                        return {
                                                                                            ...job,
                                                                                            data: {
                                                                                                ...(job || {}).data,
                                                                                                [(job || {})
                                                                                                    .focusedProperty as keyof JobType["data"]]:
                                                                                                    message.content,
                                                                                            },
                                                                                        } as JobType;
                                                                                    })
                                                                                }
                                                                                color={
                                                                                    message.role === "user"
                                                                                        ? "primary"
                                                                                        : "success"
                                                                                }
                                                                                variant="text"
                                                                                className="text-sm px-2 py-1"
                                                                            >
                                                                                {message.role === "user"
                                                                                    ? "Copy to prompt"
                                                                                    : "Use as data"}
                                                                            </Button>
                                                                        </Text>
                                                                    ) : (
                                                                        message.content
                                                                    )}
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <Input
                                                            type="checkbox"
                                                            label="Force a Tool Call"
                                                            className="flex-row-reverse items-baseline w-auto self-start"
                                                            inputClassName="w-auto mr-2"
                                                            labelClassName="text-kac-iron"
                                                            disabled={
                                                                !job.chatOptions?.toolChoice ||
                                                                job.chatOptions.toolChoice === ToolChoice.none ||
                                                                !job.chatOptions.tools ||
                                                                job.chatOptions.tools.length === 0
                                                            }
                                                            checked={Boolean(job.forceToolCall)}
                                                            onChange={(e) =>
                                                                setJob((job) => {
                                                                    if (!job) {
                                                                        return job;
                                                                    }
                                                                    return {
                                                                        ...job,
                                                                        forceToolCall: e.target.checked,
                                                                    };
                                                                })
                                                            }
                                                        />
                                                        <Input
                                                            type="checkbox"
                                                            label={getJobInfoPrompt(job)}
                                                            className="flex-row-reverse items-baseline w-auto self-start"
                                                            inputClassName="w-auto mr-2"
                                                            labelClassName="text-kac-iron"
                                                            checked={job.promptIncludes._jobInfo}
                                                            onChange={(e) =>
                                                                setJob((job) => {
                                                                    if (!job) {
                                                                        return job;
                                                                    }
                                                                    return {
                                                                        ...job,
                                                                        promptIncludes: {
                                                                            ...job.promptIncludes,
                                                                            _jobInfo: e.target.checked,
                                                                        },
                                                                    };
                                                                })
                                                            }
                                                        />
                                                        {Object.keys(job.data)
                                                            ?.filter(
                                                                (propertyKey) => propertyKey !== job.focusedProperty
                                                            )
                                                            ?.map((propertyKey) => {
                                                                return (
                                                                    <Input
                                                                        type="checkbox"
                                                                        label={getPropertyPrompt(job, propertyKey)}
                                                                        className="flex-row-reverse items-baseline w-auto self-start"
                                                                        inputClassName="w-auto mr-2"
                                                                        labelClassName="text-kac-iron"
                                                                        checked={job.promptIncludes[propertyKey]}
                                                                        onChange={(e) =>
                                                                            setJob((job) => {
                                                                                if (!job) {
                                                                                    return job;
                                                                                }
                                                                                return {
                                                                                    ...job,
                                                                                    promptIncludes: {
                                                                                        ...job.promptIncludes,
                                                                                        [propertyKey]: e.target.checked,
                                                                                    },
                                                                                };
                                                                            })
                                                                        }
                                                                    />
                                                                );
                                                            })}
                                                        <Input
                                                            type="checkbox"
                                                            label={getFocusInfoPrompt(job)}
                                                            className="flex-row-reverse items-baseline w-auto self-start"
                                                            inputClassName="w-auto mr-2"
                                                            labelClassName="text-kac-iron"
                                                            checked={job.promptIncludes._focusInfo}
                                                            onChange={(e) =>
                                                                setJob((job) => {
                                                                    if (!job) {
                                                                        return job;
                                                                    }
                                                                    return {
                                                                        ...job,
                                                                        promptIncludes: {
                                                                            ...job.promptIncludes,
                                                                            _focusInfo: e.target.checked,
                                                                        },
                                                                    };
                                                                })
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        {!isPromptDisabled && (
                            <>
                                <SmartInput
                                    type="textarea"
                                    isCopyable
                                    value={job?.prompt || ""}
                                    disabled={isPromptDisabled}
                                    onChange={(e) =>
                                        setJob(
                                            (job) =>
                                                ({
                                                    ...job,
                                                    prompt: e.target.value,
                                                } as JobType)
                                        )
                                    }
                                    textareaProps={{
                                        onKeyDown: (e) => {
                                            if (e.ctrlKey && e.key === "Enter") {
                                                e.preventDefault();
                                                sendMessageCallback();
                                            }
                                        },
                                    }}
                                    className={twMerge(
                                        "w-full bg-kac-steel-light rounded-md shadow-inner",
                                        isPromptDisabled && "opacity-50"
                                    )}
                                    labelClassName="w-full px-4 pt-2"
                                    inputClassName="w-full px-4 pb-2 rounded-md"
                                    label="Ask LLM"
                                />

                                <div className="flex flex-row flex-wrap gap-2 pb-8">
                                    {/* <ButtonWithConfirmation color="danger" className="flex-1 text-sm" onClick={clearHistory}>
                                Clear History
                            </ButtonWithConfirmation> */}
                                    <Input
                                        className="max-w-24 text-kac-steel-dark"
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
                                        value={mistralOptions.model}
                                        onChange={(event) => {
                                            setMistralOptions((options) => ({
                                                ...options,
                                                model: event.target.value as MistralModelEnum,
                                            }));
                                        }}
                                    />
                                    <Button
                                        disabled={!job || isPending}
                                        className="flex-1 leading-none min-h-14"
                                        onClick={sendMessageCallback}
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
                                </div>

                                {error && <p className="text-red-500 mt-2">{error.message}</p>}
                            </>
                        )}
                    </div>
                </div>
                <div className="sm:w-[25vw] md:w-[400px] overflow-auto flex flex-col relative gap-4">
                    {preview}
                    <ToggleData data={{ job }} previewClassName="flex-1 shrink" initialCollapsed />
                </div>
            </div>
        </Page>
    );
}
