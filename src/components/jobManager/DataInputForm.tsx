import React from "react";
import Input from "../../prototypes/kick-ass-cards/components/content/Input";
import getDeepValue from "../../utils/getDeepValue";
import Icon from "../Icon/Icon";
import { JobManagerStateType, useJobManager } from "./JobManagerProvider";
import { getSchemaAtDeepPointer } from "./utils";
import { JobManagerActionTypeEnum, Setter } from "./jobManagerReducer";
import JobType from "./jobType";
import setDeepValue from "../../utils/setDeepValue";
import Button from "../../prototypes/kick-ass-cards/components/content/Button";
import Ajv from "ajv";
import Text from "../../prototypes/kick-ass-cards/components/content/Text";

export type DataInputFormProps = {};

const isValidJson = (str: string) => {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
};

const ajv = new Ajv();

const defaultContentByTypeMap = {
    string: "",
    number: 0,
    boolean: false,
    object: {},
    array: [],
};

export default function DataInputForm({}: DataInputFormProps) {
    const { state: job, dispatch } = useJobManager();

    const valueAtPointer: any = job ? getDeepValue(job.data, job.pointer) ?? undefined : undefined;
    const schemaAtPointer = job ? getSchemaAtDeepPointer(job.schema, job.pointer) : undefined;
    const contentType = (schemaAtPointer?.type as string) || undefined;
    const isJsonContent = contentType === "object" || contentType === "array";

    const [jsonString, setJsonString] = React.useState("");

    React.useEffect(() => {
        if (isJsonContent) {
            if (valueAtPointer) {
                setJsonString(JSON.stringify(valueAtPointer, null, 2));
            } else {
                setJsonString(JSON.stringify(defaultContentByTypeMap[contentType], null, 2));
            }
        }
    }, [isJsonContent, valueAtPointer]);

    if (!job) {
        return null;
    }
    const contentLabel = "Edit" + (contentType ? ` (${contentType})` : "");
    let inputValue = jsonString;

    const isInvalidJson = isJsonContent && !isValidJson(jsonString);

    if (isJsonContent && valueAtPointer !== null) {
        inputValue = jsonString;
    }
    if (contentType === "string") {
        inputValue = valueAtPointer || "";
    }
    if (contentType === "number") {
        inputValue = valueAtPointer ?? "";
    }
    if (contentType === "boolean") {
        inputValue = valueAtPointer ?? "";
    }

    const setJob = (job: Setter<JobManagerStateType>) => {
        dispatch({ type: JobManagerActionTypeEnum.SetJob, payload: job });
    };
    const setError = (error: Setter<JobType["error"]>) => {
        dispatch({ type: JobManagerActionTypeEnum.SetError, payload: error });
    };

    let errorText: React.ReactNode | undefined = undefined;
    if (isJsonContent && isInvalidJson) {
        errorText = "Invalid JSON";
    }
    if (isJsonContent && !isInvalidJson && schemaAtPointer) {
        const validate = ajv.compile(schemaAtPointer);
        const parsedValue = JSON.parse(jsonString);
        const isValid = validate(parsedValue);
        if (!isValid) {
            errorText = validate.errors?.map((error) => error.message).join("\n");
        } else {
            errorText = undefined;
        }
    }
    const errorContent = errorText ? (
        <Text variant="body" color="danger">
            {errorText}
        </Text>
    ) : undefined;

    return (
        <div className="flex flex-row gap-4">
            <Input
                type="textarea"
                label={
                    <span>
                        <Icon icon="fountainPen" className="w-5 h-5 mr-1 inline text-kac-steel-dark" />
                        {contentLabel}
                    </span>
                }
                value={inputValue}
                className={"w-full bg-kac-steel-light rounded-md shadow-inner"}
                labelClassName="w-full px-4 pt-2"
                inputClassName="w-full px-4 pb-2 rounded-md z-10"
                errorClassName="px-4 py-2 bg-kac-skin-light rounded-b-md"
                error={errorContent}
                onChange={(event) => {
                    if (!job) {
                        return job;
                    }
                    // only set JSON value to state and do not update job
                    if (isJsonContent) {
                        setJsonString(event.target.value);
                        return;
                    }
                    const isValueObject = schemaAtPointer?.type === "object";
                    const isValueArray = schemaAtPointer?.type === "array";
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

                    setJob((job) => {
                        if (!job) {
                            return job;
                        }
                        if (!job?.schema) {
                            setError(Error("No schema available"));
                            return job;
                        }
                        const newData = setDeepValue(job.data, job.pointer, job.schema, newValue);
                        return {
                            ...job,
                            data: newData,
                        };
                    });
                }}
            />
            {isJsonContent && (
                <Button
                    onClick={() => {
                        if (!job) {
                            return job;
                        }

                        setJob((job) => {
                            if (!job) {
                                return job;
                            }
                            const newValue = JSON.parse(jsonString);
                            const newData = setDeepValue(job.data, job.pointer, job.schema, newValue);
                            return {
                                ...job,
                                data: newData,
                            };
                        });
                    }}
                    color="primary"
                    variant="solid"
                    disabled={isInvalidJson}
                    className="px-2 py-1"
                >
                    Save
                </Button>
            )}
            <Button
                onClick={() => {
                    if (!job) {
                        return job;
                    }

                    setJob((job) => {
                        if (!job) {
                            return job;
                        }
                        const newData = setDeepValue(job.data, job.pointer, job.schema, undefined);
                        return {
                            ...job,
                            data: newData,
                        };
                    });
                }}
                color="danger"
                variant="solid"
                disabled={valueAtPointer === undefined}
                className="px-2 py-1"
            >
                Clear
            </Button>
        </div>
    );
}
