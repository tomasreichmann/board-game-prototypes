import immutableAssign from "immutable-assign";
import JobType from "./jobType";
import Input from "../../prototypes/kick-ass-cards/components/content/Input";
import { ToolChoice } from "../../services/Mistral/Mistral";
import { JSONSchemaType } from "ajv";
import {
    getFocusInfoPrompt,
    getJobInfoPrompt,
    getObjectSchemaProperties,
    getParentPointer,
    getPropertyIncludePrompt,
    getSchemaAtPointer,
    isChildPointer,
} from "./utils";
import DataPreview from "../DataPreview";
import Text from "../../prototypes/kick-ass-cards/components/content/Text";

export type ContextIncludesProps = {
    job: JobType | null;
    setJob: React.Dispatch<React.SetStateAction<JobType | null>>;
    schemaAtPointer: JSONSchemaType<any> | null;
};

export default function ContextIncludes({ job, setJob, schemaAtPointer }: ContextIncludesProps) {
    if (!job) {
        return null;
    }
    const focusPointer = job.focusPointer || "";

    const isToolAvailable =
        job.chatOptions?.toolChoice &&
        job.chatOptions.toolChoice !== ToolChoice.none &&
        job.chatOptions.tools &&
        job.chatOptions.tools.length > 0;

    const isObjectSchema = schemaAtPointer?.type === "object";

    const pointersToGenerate = Object.entries(job.propertiesToGenerate || {})
        .filter(([pointer, isChecked]) => isChildPointer(pointer, focusPointer) && isChecked)
        .map(([pointer]) => pointer);

    const propertiesToGenerate = isObjectSchema
        ? pointersToGenerate.map((pointer) => {
              const propKey = pointer.split("/").at(-1);
              return schemaAtPointer.properties[
                  propKey as keyof typeof schemaAtPointer.properties
              ] as JSONSchemaType<any>;
          })
        : [schemaAtPointer];

    // all possible include properties: a property title or key, description, data value
    const includeOptions: { pointer: string; prompt: string }[] = [];
    // if focusPointer is an object, includeOptions are all properties
    if (isObjectSchema) {
        includeOptions.push(
            ...getObjectSchemaProperties(schemaAtPointer, job.focusPointer || "", true)
                .map((property) => {
                    const pointer = property.$id as string; // hopefully generated ^^^
                    const prompt = getPropertyIncludePrompt(property, job) || "";
                    return { pointer, prompt };
                })
                .filter((includeOption) => includeOption.prompt)
        );
    } else {
        // if focusPointer is a primitive, includeOptions are all sibling properties
        const parentPointer = getParentPointer(job?.focusPointer || "");
        const parentSchema = getSchemaAtPointer(job?.schema, parentPointer);
        if (parentSchema) {
            const allProperties = getObjectSchemaProperties(parentSchema, parentPointer, true);
            const allOptions = allProperties.map((property) => ({
                pointer: property.$id as string, // hopefully generated ^^^
                prompt: getPropertyIncludePrompt(property, job),
            }));
            const siblingIncludeOptions = allOptions.filter(
                (option) => option.pointer && option.prompt && option.pointer !== job.focusPointer
            ) as {
                pointer: string;
                prompt: string;
            }[]; // because empty values are filtered out. Also filters out current property
            includeOptions.push(...siblingIncludeOptions);
        }
    }

    const isAllIncludeOptionsSelected = includeOptions.every((option) => job.promptIncludes[option.pointer]);

    return (
        <div className="flex flex-col gap-2">
            <Input
                type="checkbox"
                label="Force a Tool Call"
                className="flex-row-reverse items-baseline w-auto self-start"
                inputClassName="w-auto mr-2"
                labelClassName="text-kac-iron"
                disabled={isToolAvailable}
                checked={Boolean(job.forceToolCall)}
                onChange={(e) =>
                    setJob((job) => {
                        if (!job) {
                            return job;
                        }
                        return immutableAssign(
                            job,
                            (job) => job.forceToolCall,
                            () => e.target.checked
                        );
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
                        return immutableAssign(
                            job,
                            (job) => job.promptIncludes._jobInfo,
                            () => e.target.checked
                        );
                    })
                }
            />
            {includeOptions.length > 0 && (
                <div className="flex flex-row">
                    <Text variant="body" className=" text-kac-steel-dark font-bold">
                        Include Context{" "}
                    </Text>
                    <Input
                        type="checkbox"
                        label="All"
                        className="flex-row-reverse items-baseline w-auto self-start inline-flex ml-2"
                        inputClassName="w-auto mr-2"
                        labelClassName="text-kac-iron"
                        checked={isAllIncludeOptionsSelected}
                        onChange={(e) =>
                            setJob((job) => {
                                if (!job) {
                                    return job;
                                }
                                return immutableAssign(
                                    job,
                                    (job) => job.promptIncludes,
                                    (promptIncludes) => {
                                        includeOptions.forEach(({ pointer }) => {
                                            promptIncludes[pointer] = e.target.checked;
                                        });
                                        return promptIncludes;
                                    }
                                );
                            })
                        }
                    />
                </div>
            )}
            {includeOptions.length > 0 && (
                <div className="flex flex-row flex-wrap gap-4">
                    {includeOptions.map(({ pointer, prompt }) => {
                        return (
                            <Input
                                type="checkbox"
                                label={prompt}
                                className="flex-row-reverse items-baseline w-auto self-start"
                                inputClassName="w-auto mr-2"
                                labelClassName="text-kac-iron"
                                checked={job.promptIncludes[pointer]}
                                onChange={(e) =>
                                    setJob((job) => {
                                        if (!job) {
                                            return job;
                                        }
                                        return immutableAssign(
                                            job,
                                            (job) => job.promptIncludes[pointer],
                                            () => e.target.checked
                                        );
                                    })
                                }
                            />
                        );
                    })}
                </div>
            )}
            {propertiesToGenerate.length > 0 && (
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
                            return immutableAssign(
                                job,
                                (job) => job.promptIncludes._focusInfo,
                                () => e.target.checked
                            );
                        })
                    }
                />
            )}
        </div>
    );
}
