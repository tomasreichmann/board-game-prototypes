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
import Mistral, { MessageType, MistralChatOptionsType, MistralModelEnum } from "../services/Mistral/Mistral";
import Text from "../prototypes/kick-ass-cards/components/content/Text";
import { JSONSchemaType } from "ajv";

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
        focusedProperty: null,
        promptIncludes: {
            _jobInfo: true,
            _focusInfo: true,
        },
        history: {},
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
    return `Let's focus on a ${job.name} ${job.schema.properties[job.focusedProperty].title}: `;
};

const getPropertyPrompt = (job: JobType, key: string) => {
    return `${job.name} ${key} is: ${job.data[key]}`;
};

export default function LlmJobRoute() {
    const [job, setJob] = useState<JobType | null>(null);
    const [mistralOptions, setMistralOptions] = useState<MistralOptionsType>({
        model: MistralModelEnum["open-mistral-7b"],
        includeHistoryLength: 0,
        format: MistralFormatEnum.json_object,
        temperature: 0.7,
        topP: 1,
        maxTokens: 500,
        stream: false,
        safePrompt: false,
    });
    const { sendMessage, clearHistory, ...status } = useMistral(mistralOptions);
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
                    <div className="flex-1 flex flex-col gap-4 w-full pb-2">
                        <div className="relative flex-1 w-full flex flex-col gap-4 overflow-auto min-h-[400px]">
                            <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col-reverse gap-4 items-center overflow-auto">
                                <div className="pr-4 max-w-full">
                                    {!job && (
                                        <div className="flex flex-col gap-4">
                                            <Text variant="h3" className="text-kac-steel-dark">
                                                Select a job
                                            </Text>
                                            {jobList.map((job) => (
                                                <Button
                                                    key={job.name}
                                                    color="primary"
                                                    className="w-full"
                                                    onClick={() => setJob(job)}
                                                >
                                                    {job.name}
                                                </Button>
                                            ))}
                                        </div>
                                    )}
                                    {job && (
                                        <div className="flex flex-col gap-4">
                                            <Text variant="h3" className="text-kac-steel-dark">
                                                {job.name}{" "}
                                                {job.focusedProperty && (
                                                    <>
                                                        - {job.focusedProperty}{" "}
                                                        <Button
                                                            onClick={() =>
                                                                setJob(
                                                                    (job) =>
                                                                        ({ ...job, focusedProperty: null } as JobType)
                                                                )
                                                            }
                                                            color="info"
                                                            variant="text"
                                                            className="text-sm px-2 py-1"
                                                        >
                                                            Back
                                                        </Button>
                                                    </>
                                                )}{" "}
                                                <Button
                                                    onClick={() => setJob(null)}
                                                    color="danger"
                                                    variant="text"
                                                    className="text-sm px-2 py-1"
                                                >
                                                    Close Job
                                                </Button>
                                            </Text>
                                            {!job.focusedProperty && (
                                                <div className="flex flex-col gap-4">
                                                    <Text variant="h3" className="text-kac-steel-dark">
                                                        This is what we have so far:
                                                    </Text>
                                                    <div className="flex flex-col">
                                                        {Object.keys(job.schema.properties)?.map((propertyKey) => {
                                                            const key = propertyKey as keyof JobType["data"];
                                                            return (
                                                                <div key={key} className="flex flex-row gap-4">
                                                                    <Text variant="h4" className="text-kac-steel-dark">
                                                                        {key}
                                                                    </Text>
                                                                    <Text
                                                                        variant="body"
                                                                        className="text-kac-steel-dark"
                                                                    >
                                                                        {job.data[key]}
                                                                    </Text>
                                                                    <Button
                                                                        key={job.name}
                                                                        color="primary"
                                                                        onClick={() =>
                                                                            setJob(
                                                                                (job) =>
                                                                                    ({
                                                                                        ...job,
                                                                                        focusedProperty: propertyKey,
                                                                                    } as JobType)
                                                                            )
                                                                        }
                                                                    >
                                                                        Focus
                                                                    </Button>
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
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <Input
                                                            type="checkbox"
                                                            label={getJobInfoPrompt(job)}
                                                            className="flex-row-reverse items-baseline w-auto text-right self-start"
                                                            inputClassName="w-auto mr-4"
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
                                                                        className="flex-row-reverse items-baseline w-auto text-right self-start"
                                                                        inputClassName="w-auto mr-4"
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
                                                            className="flex-row-reverse items-baseline w-auto text-right self-start"
                                                            inputClassName="w-auto mr-4"
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
                                                        <Input
                                                            className="flex-1"
                                                            label="Prompt"
                                                            type="textarea"
                                                            value={job.prompt}
                                                            onChange={(e) =>
                                                                setJob(
                                                                    (job) =>
                                                                        ({
                                                                            ...job,
                                                                            prompt: e.target.value,
                                                                        } as JobType)
                                                                )
                                                            }
                                                        />
                                                        <Button
                                                            onClick={() => {
                                                                if (!job.prompt || !job.focusedProperty) {
                                                                    return;
                                                                }

                                                                const promptIncludes: string[] = [];
                                                                if (job.promptIncludes._jobInfo) {
                                                                    promptIncludes.push(getJobInfoPrompt(job));
                                                                }
                                                                const propertyIncludeKeys = Object.keys(
                                                                    job.data
                                                                ).filter((key) => job.promptIncludes[key]);
                                                                propertyIncludeKeys.forEach((key) => {
                                                                    promptIncludes.push(getPropertyPrompt(job, key));
                                                                });

                                                                if (job.promptIncludes._focusInfo) {
                                                                    promptIncludes.push(getFocusInfoPrompt(job));
                                                                }
                                                                const combinedPrompt =
                                                                    promptIncludes.join("\n") + job.prompt;

                                                                setJob((job) => {
                                                                    if (!job) {
                                                                        return job;
                                                                    }
                                                                    return {
                                                                        ...job,
                                                                        history: {
                                                                            ...(job || {}).history,
                                                                            [(job || {}).focusedProperty as string]: [
                                                                                ...((job || {}).history[
                                                                                    (job || {})
                                                                                        .focusedProperty as string
                                                                                ] || []),
                                                                                {
                                                                                    role: "user",
                                                                                    content: combinedPrompt,
                                                                                } as MessageType,
                                                                            ],
                                                                        },
                                                                    };
                                                                });

                                                                llmClient
                                                                    .chat(combinedPrompt, {
                                                                        ...mistralOptions,
                                                                        history:
                                                                            (job.history[
                                                                                job.focusedProperty
                                                                            ] as MessageType[]) ||
                                                                            ([] as MessageType[]),
                                                                    })
                                                                    .then((response) => {
                                                                        setJob((job) => {
                                                                            if (!job) {
                                                                                return job;
                                                                            }
                                                                            return {
                                                                                ...job,
                                                                                history: {
                                                                                    ...(job || {}).history,
                                                                                    [(job || {})
                                                                                        .focusedProperty as string]: [
                                                                                        ...((job || {}).history[
                                                                                            (job || {})
                                                                                                .focusedProperty as string
                                                                                        ] || []),
                                                                                        response.choices[0].message,
                                                                                    ],
                                                                                },
                                                                            } as JobType;
                                                                        });
                                                                    });
                                                            }}
                                                            color="primary"
                                                            disabled={!job.prompt}
                                                            variant="text"
                                                            className="text-sm px-2 py-1"
                                                        >
                                                            Send
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
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
                    <ToggleData data={{ status, job }} previewClassName="flex-1 shrink" initialCollapsed />
                </div>
            </div>
        </Page>
    );
}
