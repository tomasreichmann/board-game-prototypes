import Ajv from "ajv";
import { assetCardSchema } from "../../prototypes/kick-ass-cards/components/gameComponents/AssetCard";
import { noop } from "lodash";

// Define parsers and validators outside of the task
type ParserFunctionType = (response: string, options?: Record<string, any>) => any;
type ValidatorFunctionType = (parsedResponse: any, options?: Record<string, any>) => boolean;

const parsers: { [key: string]: ParserFunctionType } = {
    allJsonBlocksInMarkdown: (response: string) => {
        let responseLeft = response;
        const parsedData = [];
        const openingDelimiter = /```(json)?/gi;
        const closingDelimiter = /```/gi;

        const getDelimiterIndexes = (response: string) => {
            const openingDelimiterMatch = response.match(openingDelimiter)?.[0];
            if (!openingDelimiterMatch) {
                console.warn("No opening delimiter '" + openingDelimiter.source + "' found in :\n" + response);
                return undefined;
            }
            const openingDelimiterStartIndex = response.indexOf(openingDelimiterMatch);
            const openingDelimiterEndIndex = openingDelimiterStartIndex + openingDelimiterMatch.length;
            const responseAfterOpeningDelimiter = response.substring(openingDelimiterEndIndex);
            const closingDelimiterMatch = responseAfterOpeningDelimiter.match(closingDelimiter)?.[0];
            if (!closingDelimiterMatch) {
                console.warn("No closing delimiter '" + closingDelimiter.source + "' found in :\n" + response);
                return undefined;
            }
            const closingDelimiterStartIndex =
                openingDelimiterEndIndex + responseAfterOpeningDelimiter.indexOf(closingDelimiterMatch);
            const closingDelimiterEndIndex = closingDelimiterStartIndex + closingDelimiterMatch.length;
            return {
                openingDelimiterStartIndex,
                openingDelimiterEndIndex,
                closingDelimiterStartIndex,
                closingDelimiterEndIndex,
            };
        };
        let indexes:
            | {
                  openingDelimiterStartIndex: number;
                  openingDelimiterEndIndex: number;
                  closingDelimiterStartIndex: number;
                  closingDelimiterEndIndex: number;
              }
            | undefined;
        let safeGuard = 100;
        while (((indexes = getDelimiterIndexes(responseLeft)), indexes !== undefined && --safeGuard > 0)) {
            if (indexes === undefined) {
                break;
            }
            const jsonMatch = responseLeft.substring(
                indexes.openingDelimiterEndIndex,
                indexes.closingDelimiterStartIndex
            );
            console.log("jsonMatch", jsonMatch);
            parsedData.push(JSON.parse(jsonMatch));
            responseLeft = responseLeft.substring(indexes.closingDelimiterEndIndex);
        }

        if (parsedData.length === 0) {
            return "No JSON blocks found in :\n" + response;
        }

        return parsedData;
    },
};

const ajv = new Ajv();

const validators: { [key: string]: ValidatorFunctionType } = {
    validateActorCardProps: (parsedResponse: any) => {
        // Validator logic
        if (!parsedResponse) {
            return false;
        }

        return true;
    },
    validateAssetCardProps: (parsedResponse: any) => {
        // Validator logic
        if (!parsedResponse) {
            return false;
        }
        const validate = ajv.compile(assetCardSchema);
        return validate(parsedResponse);
    },
    validateArrayOfAssetCardProps: (parsedResponse: any, { minResults = 1 }: { minResults?: number } = {}) => {
        // Validator logic
        if (!parsedResponse || !Array.isArray(parsedResponse)) {
            throw Error("Response must be an array");
        }
        if (parsedResponse.length < minResults) {
            throw Error("Response must have at least " + minResults + " items");
        }
        const validate = ajv.compile(assetCardSchema);
        parsedResponse.forEach((assetCardProps, AssetCardPropsIndex) => {
            if (!assetCardProps) {
                throw Error(
                    "Response item at index " +
                        AssetCardPropsIndex +
                        " must be an object. It is instead: '" +
                        JSON.stringify(assetCardProps) +
                        "'"
                );
            }
            if (!validate(assetCardProps)) {
                throw Error(
                    "Response item at index " +
                        AssetCardPropsIndex +
                        " '" +
                        JSON.stringify(assetCardProps) +
                        "' is not valid AssetCardProps:\n" +
                        JSON.stringify(validate.errors, null, 2)
                );
            }
        });
        return true;
    },
};

export enum TaskTypeEnum {
    LLM = "LLM",
    SD = "SD",
}

export type TaskType = {
    id: string;
    type: TaskTypeEnum.LLM;
    prompt: string;
    parserKey: string;
    parserOptions?: Record<string, any>;
    validatorKey: string;
    validatorOptions?: Record<string, any>;
    retryCount?: number;
    autoRun?: boolean;
};

// Job type
export type JobType = {
    tasks: TaskType[];
    onTaskDone?: (taskId: string, result: any) => void;
    onTaskParse?: (taskId: string, result: any) => void;
    onTaskValidate?: (taskId: string, result: any, isValid: boolean) => void;
    onTaskError?: (taskId: string, error: Error) => void;
    onDone?: (result: any) => void;
    onWaitingForConfirmation?: (onContinue: () => void, onCancel: () => void) => void;
    onError?: (error: Error) => void;
};

// API response type
export type LLMResponseType = {
    response: string;
};

// API request type
export type LLMRequestType = {
    prompt: string;
};

// API client type
export type LLMClientType = {
    sendRequest: (request: LLMRequestType) => Promise<LLMResponseType>;
};

export type JobManagerOptionsType = {
    llmApi?: LLMClientType;
    sdApi?: any;
};

const JobManager = ({ llmApi, sdApi }: JobManagerOptionsType) => {
    const waitForConfirmation = () => {
        let onContinue = noop;
        let onCancel = noop;

        const promise = new Promise<void>((resolve, reject) => {
            onContinue = resolve;
            onCancel = reject;
        });
        return { onContinue, onCancel, promise };
    };
    const runTask = async (task: TaskType, job?: JobType, results?: { [key: string]: any }) => {
        if (!llmApi) {
            throw new Error("LLM API is not defined");
        }
        const taskKeys = Object.keys(task);
        const taskRegex = new RegExp(`\{\{(${taskKeys.join("|")})\}\}`, taskKeys.length === 1 ? "g" : "gi");
        const prompt = task.prompt.replaceAll(
            taskRegex,
            (match) => JSON.stringify(results?.[match.slice(2, -2)]) ?? match
        );
        const response = await llmApi.sendRequest({ prompt });
        const parser = parsers[task.parserKey];
        if (!parser) {
            throw new Error("Parser '" + task.parserKey + "' not found");
        }
        const parsedResponse = parser(response.response, task.parserOptions);
        job?.onTaskParse?.(task.id, parsedResponse);
        const validator = validators[task.validatorKey];
        if (!validator) {
            throw new Error("Validator '" + task.validatorKey + "' not found");
        }
        const isValid = validator(parsedResponse, task.validatorOptions);
        job?.onTaskValidate?.(task.id, parsedResponse, isValid);
        if (!isValid) {
            throw new Error("Invalid response");
        }
        job?.onTaskDone?.(task.id, parsedResponse);
        return parsedResponse;
    };
    const runJob = async (job: JobType) => {
        const results: {
            [key: string]: any;
        } = {};
        for (let taskIndex = 0; taskIndex < job.tasks.length; taskIndex++) {
            const task = job.tasks[taskIndex];
            const isAutoRunTask = Boolean(task.autoRun || taskIndex === 0);
            if (!isAutoRunTask) {
                const { onContinue, onCancel, promise } = waitForConfirmation();
                job?.onWaitingForConfirmation?.(onContinue, onCancel);
                await promise;
            }
            const result = (results[task.id] = await runTask(task, job).catch((error) => {
                const resolvedError = error instanceof Error ? error : new Error("Unknown error");
                job?.onTaskError?.(task.id, resolvedError);
                job.onError?.(resolvedError);
                return resolvedError;
            }));
            console.log(task.id, result);
            const isLastTask = taskIndex === job.tasks.length - 1;
            console.log({ isLastTask });
            if (isLastTask) {
                job?.onDone?.(result);
                return result;
            }
        }
    };

    return {
        runJob,
    };
};

export default JobManager;
