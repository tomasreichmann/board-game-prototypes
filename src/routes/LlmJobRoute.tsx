import { useCallback, useMemo, useState } from "react";
import { MistralOptionsType } from "../hooks/useMistral";
import Button from "../prototypes/kick-ass-cards/components/content/Button";
import Input from "../prototypes/kick-ass-cards/components/content/Input";
import Page from "../components/Page/Page";
import ToggleData from "../components/DataToggle";
import MistralClient, {
    MessageType,
    MistralChatOptionsType,
    MistralModelEnum,
    ToolChoice,
} from "../services/Mistral/Mistral";
import Text, { TextProps } from "../prototypes/kick-ass-cards/components/content/Text";
import uuid from "../utils/uuid";
import { ChatCompletionResponse, ChatCompletionResponseChoice } from "@mistralai/mistralai";
import ComponentMetaEditor from "../prototypes/kick-ass-cards/components/generation/ComponentMetaEditor";
import JobType from "../components/jobManager/jobType";
import sceneJob from "../components/jobManager/jobs/sceneJob";
import statBlockJob from "../components/jobManager/jobs/statBlock";
import InputForm from "../components/jobManager/InputForm";
import ContextIncludes from "../components/jobManager/ContextIncludes";
import {
    filterPropertiesByPointers,
    getJobInfoPrompt,
    getParentPointer,
    getPropertyIncludePrompt,
    getRenderTool,
} from "../components/jobManager/utils";
import JobOverview from "../components/jobManager/JobOverview";
import { JSONSchemaType } from "ajv";
import getDeepValue from "../utils/getDeepValue";
import { getDeepPointer, getSchemaAtPointer } from "../components/jobManager/utils";
import setDeepValue from "../utils/setDeepValue";
import PropertyHistory from "../components/jobManager/PropertyHistory";
import ErrorBoundary from "../components/ErrorBoundary";
import Icon from "../components/Icon/Icon";
import { AnyRecord } from "../utils/simpleTypes";
import DataPreview from "../components/DataPreview";

const jobList: JobType[] = [sceneJob, statBlockJob];

const llmClient = MistralClient();

const renderMeta = (props: AnyRecord, job?: JobType) => {
    if (!job?.previewMeta || !job?.previewMeta.schema) {
        console.warn({ job, meta: job?.previewMeta, schema: job?.previewMeta?.schema });
        return <DataPreview data={props} className="max-w-full" />;
    }
    // TODO handle SD generated props with generated schema
    return (
        <ComponentMetaEditor
            disabled
            key={uuid()}
            initialProps={props}
            {...job?.previewMeta}
            className="flex-col"
            controlsClassName="flex-row"
        />
    );
};

const renderText = (options: { variant: TextProps["variant"]; color: TextProps["color"]; children: string }) => {
    const { variant = "body", color = "body", children = "No content" } = options;
    const element = (
        <Text key={uuid()} variant={variant} color={color}>
            {children}
        </Text>
    );
    return element;
};

export default function LlmJobRoute() {
    const [job, setJob] = useState<JobType | null>(null);
    const [mistralOptions, setMistralOptions] = useState<MistralOptionsType>({
        // model: MistralModelEnum["open-mistral-7b"],
        // model: MistralModelEnum["open-mixtral-8x7b"],
        model: MistralModelEnum["mistral-small-latest"],
        includeHistoryLength: 0,
        // format: MistralFormatEnum.json_object,
        temperature: 0.7,
        topP: 1,
        maxTokens: 500,
        stream: false,
        safePrompt: false,
    });

    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const schemaAtPointer = useMemo(() => {
        if (!job?.schema) {
            return null;
        }
        return getSchemaAtPointer(job?.schema, job?.focusPointer || "");
    }, [job?.schema, job?.focusPointer]);

    const toolFunctionMap = useMemo(() => {
        return {
            pre: (props: any) => renderMeta(props, undefined),
            renderText,
            render: (props: any) => renderMeta(props, job || undefined),
        };
    }, [job]);

    const callTool = useCallback(
        (name: string, argString: string) => {
            const params = JSON.parse(argString); // TODO: wrap with try/catch
            const func = toolFunctionMap[name as keyof typeof toolFunctionMap];
            if (!func) {
                console.error(new Error(`Tool function ${name} not found`));
                // TODO: setError maybe?
                return renderMeta({ ...(params || {}) }, undefined);
            }
            return func(params);
        },
        [job, toolFunctionMap]
    );

    /* TODO: Decide what to do with this
    if (job.prompt.toLowerCase().includes("render") || job.prompt.toLowerCase().includes("show")) {
        promptIncludes.push(
            "Always use a tool call to display the output. Do not respond with 'assistant' message.\n"
        );
    }
    const propertyIncludeKeys = Object.keys(job.data).filter((key) => job.promptIncludes[key]);
    propertyIncludeKeys.forEach((key) => {
        promptIncludes.push(getPropertyPrompt(job, key));
    });

    if (job.promptIncludes._focusInfo) {
        promptIncludes.push(getFocusInfoPrompt(job));
    }
    */
    const filteredPropertiesToGenerate = useMemo(() => {
        if (!job?.schema) {
            return [];
        }
        const focusPointer = job.focusPointer || "";
        const isObjectSchema = schemaAtPointer?.type === "object";

        // include context - filtered properties filtered by focus pointer
        const allPointersToGenerate = Object.entries(job.propertiesToGenerate || {})
            .filter(([, value]) => value)
            .map(([key]) => key);
        const filteredPropertiesToGenerate = [] as JSONSchemaType<any>[];

        // if pointer is object include filtered child properties
        if (isObjectSchema) {
            const filteredProperties = filterPropertiesByPointers(
                schemaAtPointer,
                focusPointer,
                allPointersToGenerate,
                true
            );
            filteredPropertiesToGenerate.push(...filteredProperties);
        } else {
            // we are at primitive property, so include filtered sibling properties
            const parentPointer = getParentPointer(focusPointer);
            const parentSchema = parentPointer ? getSchemaAtPointer(job?.schema, parentPointer) : null;
            if (parentPointer && parentSchema) {
                filteredPropertiesToGenerate.push(
                    ...filterPropertiesByPointers(parentSchema, parentPointer, allPointersToGenerate, true)
                );
            }
        }

        return filteredPropertiesToGenerate;
    }, [job, schemaAtPointer]);

    const combinedPrompt = useMemo(() => {
        if (!job) {
            return "";
        }
        const promptIncludes: string[] = [];
        // Include job info
        if (job.promptIncludes._jobInfo) {
            promptIncludes.push(getJobInfoPrompt(job));
        }
        filteredPropertiesToGenerate.forEach((property) => {
            const prompt = getPropertyIncludePrompt(property, job);
            if (prompt) {
                promptIncludes.push(prompt);
            }
        });
        return [...promptIncludes, job.prompt].join("\n");
    }, [job, filteredPropertiesToGenerate, schemaAtPointer]);

    const toolOptions = useMemo(() => {
        const shouldGenerateTools = job?.forceToolCall;
        if (!shouldGenerateTools) {
            return [];
        }
        const toolOptions: Partial<MistralChatOptionsType> = job.forceToolCall
            ? {
                  toolChoice: ToolChoice.any,
                  tools: [...(job?.chatOptions?.tools || []), getRenderTool(filteredPropertiesToGenerate)],
              }
            : {};
        return toolOptions;
    }, [job?.forceToolCall, job?.chatOptions?.tools, filteredPropertiesToGenerate, schemaAtPointer]);

    const sendMessageCallback = useCallback(() => {
        if (!job || !job.prompt) {
            return;
        }

        setError(null);
        setIsPending(true);

        const focusPointer = job.focusPointer || "";

        setIsPending(false);

        setJob((job) => {
            if (!job) {
                return job;
            }
            const focusPointer = job.focusPointer || "";
            return {
                ...job,
                history: {
                    ...job.history,
                    [focusPointer as string]: [
                        ...(job.history[focusPointer as string] || []),
                        {
                            role: "user",
                            content: combinedPrompt,
                        } as MessageType,
                    ],
                },
            };
        });

        // TODO: Dynamic render tool

        const combinedChatOptions: MistralChatOptionsType = {
            ...job?.chatOptions,
            ...mistralOptions,
            ...toolOptions,
            history: (job.history[focusPointer] as MessageType[]) || ([] as MessageType[]),
        };

        llmClient
            .chat(combinedPrompt, combinedChatOptions)
            .then((responseWithWrongType) => {
                const response = responseWithWrongType as ChatCompletionResponse & {
                    choices: (ChatCompletionResponseChoice & { message: MessageType })[];
                };
                const finishReason = response.choices[0].finish_reason;
                const newHistoryItems: MessageType[] = [];
                if (response.choices[0].message.content) {
                    newHistoryItems.push({ ...response.choices[0].message, finishReason });
                }
                if (response.choices[0].message.tool_calls?.length) {
                    const toolCalls = response.choices[0].message.tool_calls;
                    const toolCallHistory = toolCalls
                        .map((toolCall) => {
                            if ("function" in toolCall) {
                                const name =
                                    toolCall.function.name in toolFunctionMap
                                        ? toolCall.function.name
                                        : Object.keys(toolFunctionMap)[0];
                                return {
                                    role: toolCall.function.name,
                                    content: callTool(toolCall.function.name, toolCall.function.arguments),
                                    finishReason,
                                    // TODO move callTool to PropertyHistory
                                    toolCalls: {
                                        name: name,
                                        arguments: {
                                            pointer: focusPointer,
                                            filteredPropertiesToGenerate,
                                            generatedArguments: toolCall.function.arguments,
                                        },
                                    },
                                };
                            }
                            return null;
                        })
                        .filter((toolCall) => toolCall !== null) as MessageType[];
                    newHistoryItems.push(...toolCallHistory);
                }

                setIsPending(false);
                setJob((job) => {
                    if (!job) {
                        return job;
                    }
                    const newJob: JobType = {
                        ...job,
                        focusPointer: job.focusPointer || "",
                    };
                    const newPropHistory = [
                        ...(newJob.history[newJob.focusPointer as string] || []),
                        ...newHistoryItems,
                    ];

                    newJob.history = {
                        ...newJob.history,
                        [newJob.focusPointer as string]: newPropHistory,
                    };
                    return newJob;
                });
            })
            .catch((error) => {
                setIsPending(false);
                setError(error);
            });
    }, [
        job,
        setJob,
        setIsPending,
        mistralOptions,
        callTool,
        toolFunctionMap,
        schemaAtPointer,
        combinedPrompt,
        toolOptions,
        filteredPropertiesToGenerate,
    ]);

    const contentType = schemaAtPointer ? schemaAtPointer.type : null;
    const contentLabel = "Edit" + (contentType ? ` (${contentType})` : "");
    const selector = job?.focusPointer ? getDeepPointer(job?.focusPointer) : "";
    const valueAtPointer: any = getDeepValue(job?.data, selector) ?? null;
    let contentValue = valueAtPointer;
    if ((contentType === "object" || contentType === "array") && valueAtPointer !== null) {
        // In case of invalid JSON, it is saved as string instead
        if (typeof valueAtPointer === "string") {
            contentValue = valueAtPointer;
        } else {
            contentValue = JSON.stringify(valueAtPointer, null, 2);
        }
    }
    if (contentType === "string") {
        contentValue = valueAtPointer || "";
    }
    if (contentType === "number") {
        contentValue = valueAtPointer ?? "";
    }
    if (contentType === "boolean") {
        contentValue = valueAtPointer ?? "";
    }
    return (
        <Page className="LlmRoute flex-1 h-svh flex flex-col box-border font-kacBody">
            <div className="flex flex-col sm:flex-row gap-4 items-baseline pb-2 mt-4">
                <Text variant="h1">LLM Job Prototype</Text>
                <Text variant="body" className="flex-1 min-w-[200px]">
                    Job is a data structure with metadata describing it. You can traverse the data and talk to LLM about
                    it using other parts of the data structure as context
                </Text>
            </div>
            <div className="flex-1 flex flex-col sm:flex-row gap-8">
                <div className="relative flex-1 flex flex-col items-center">
                    <div className="flex flex-col gap-4 w-full pb-2 ">
                        <JobOverview
                            job={job}
                            setJob={setJob}
                            schemaAtPointer={schemaAtPointer}
                            valueAtPointer={valueAtPointer}
                        />
                        {job && (
                            <Input
                                type="textarea"
                                label={
                                    <span>
                                        <Icon icon="fountainPen" className="w-5 h-5 mr-1 inline text-kac-steel-dark" />
                                        {contentLabel}
                                    </span>
                                }
                                value={contentValue}
                                className={"w-full bg-kac-steel-light rounded-md shadow-inner"}
                                labelClassName="w-full px-4 pt-2"
                                inputClassName="w-full px-4 pb-2 rounded-md"
                                onChange={(event) => {
                                    // TODO: Handle JSON
                                    setJob((job) => {
                                        if (!job) {
                                            return job;
                                        }
                                        const isValueObject = schemaAtPointer?.type === "object";
                                        const isValueArray = schemaAtPointer?.type === "array";
                                        setError(null);
                                        let newValue = event.target.value;
                                        if (isValueObject || isValueArray) {
                                            try {
                                                newValue = JSON.parse(event.target.value);
                                            } catch (e) {
                                                if (e) {
                                                    console.error(Error("Invalid JSON", { cause: e }));
                                                    setError(Error("Invalid JSON", { cause: e }));
                                                    newValue = event.target.value;
                                                }
                                            }
                                        }
                                        if (!job?.schema) {
                                            setError(Error("No schema available"));
                                            return job;
                                        }
                                        const newData = setDeepValue(
                                            job?.data,
                                            job?.focusPointer || "",
                                            job?.schema,
                                            newValue
                                        );
                                        return {
                                            ...job,
                                            data: newData,
                                        };
                                    });
                                }}
                            />
                        )}
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
                                                onClick={() => setJob({ ...job, focusPointer: "" })}
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
                                    <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col-reverse gap-4 items-center overflow-auto pt-4">
                                        <PropertyHistory job={job} setJob={setJob} />
                                        <div className="pr-4 w-full">
                                            <div className="w-full flex flex-col">
                                                <div className="flex flex-col gap-4">
                                                    {schemaAtPointer && (
                                                        <ContextIncludes
                                                            job={job}
                                                            setJob={setJob}
                                                            schemaAtPointer={schemaAtPointer}
                                                        />
                                                    )}
                                                    {/* {job?.forceToolCall && (
                                                        <ToggleData
                                                            data={toolOptions}
                                                            buttonContent="Tool Data"
                                                            initialCollapsed
                                                            buttonProps={{ className: "px-2 py-1 text-sm" }}
                                                        />
                                                    )} */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        <InputForm
                            job={job}
                            setJob={setJob}
                            sendMessageCallback={sendMessageCallback}
                            mistralOptions={mistralOptions}
                            setMistralOptions={setMistralOptions}
                            isPending={isPending}
                            error={error}
                        />
                        <p className="text-xs whitespace-pre-wrap text-kac-steel-dark">{combinedPrompt}</p>

                        {error && <p className="text-red-500 mt-2">{error.message}</p>}
                        {(error && Boolean(error.cause) && (
                            <pre className="text-red-500 ">{JSON.stringify(error.cause, null, 2)}</pre>
                        )) ||
                            null}
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
        </Page>
    );
}
