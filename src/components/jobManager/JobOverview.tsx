import immutableAssign from "immutable-assign";
import JobType from "./jobType";
import Button from "../../prototypes/kick-ass-cards/components/controls/Button";
import Text from "../../prototypes/kick-ass-cards/components/content/Text";
import ButtonWithConfirmation from "../../prototypes/kick-ass-cards/components/controls/ButtonWithConfirmation";
import Input from "../../prototypes/kick-ass-cards/components/controls/Input";
import { JSONSchemaType } from "ajv";
import { getParentPointer, isRootPointer } from "./utils";
import safeStringify from "../../utils/safeStringify";

export type JobOverviewProps = {
    job: JobType | null;
    setJob: React.Dispatch<React.SetStateAction<JobType | null>>;
    schemaAtPointer?: JSONSchemaType<any> | null;
    valueAtPointer: any;
};

const keysToRemoveFromHeadingPointer = ["properties"];

export default function JobOverview({ job, setJob, schemaAtPointer, valueAtPointer }: JobOverviewProps) {
    if (!job) {
        return null;
    }

    const schemaAtPointerIsObject =
        schemaAtPointer &&
        typeof schemaAtPointer === "object" &&
        "type" in schemaAtPointer &&
        schemaAtPointer.type === "object";
    const allKeysAtPointer = schemaAtPointerIsObject ? Object.keys(schemaAtPointer.properties) : [];

    const isAllKeysFilteredIn = allKeysAtPointer.every(
        (key) => job.propertiesToGenerate?.[(job.focusPointer || "") + "/" + key]
    );
    const isAllKeysIncluded = allKeysAtPointer.every(
        (key) => job.promptIncludes?.[(job.focusPointer || "") + "/" + key]
    );
    return (
        <>
            <Text variant="h3" className="flex-1 flex flex-row gap-4 text-kac-steel-dark mb-0 mt-8">
                <span className="flex-1 block">
                    {job.name}
                    {job.focusPointer
                        ? ` > ${job.focusPointer
                              .split("/")
                              .slice(1)
                              .filter((key) => !keysToRemoveFromHeadingPointer.includes(key))
                              .join(" > ")}`
                        : ""}
                </span>
                {!isRootPointer(job?.focusPointer || "") && (
                    <Button
                        onClick={() =>
                            setJob(
                                (job) =>
                                    ({
                                        ...job,
                                        focusedProperty: null,
                                        focusPointer: getParentPointer(job?.focusPointer || ""),
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
            {schemaAtPointerIsObject && (
                <div className="flex flex-col gap-4">
                    <Text variant="body" className="text-kac-steel-dark">
                        Pick a property to focus on or check several properties to generate at once. Properties marked
                        with include will be shared as context with LLM.
                    </Text>

                    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] pt-[10ch] gap-x-4">
                        <div className="flex flex-row items-baseline gap-2 border-b-2 border-kac-steel">
                            <Input
                                type="checkbox"
                                label="Generate"
                                className="w-auto self-start break-words relative h-[1.5em]"
                                inputClassName="w-auto mr-2 w-4 h-4"
                                labelClassName="text-kac-iron -rotate-90 origin-top-left translate-y-1/2 absolute bottom-full"
                                checked={isAllKeysFilteredIn}
                                onChange={(e) =>
                                    setJob((job) => {
                                        if (!job) {
                                            return job;
                                        }
                                        return immutableAssign(
                                            job,
                                            (job) => job.propertiesToGenerate,
                                            (filteredProperties = {}) => ({
                                                ...filteredProperties,
                                                ...allKeysAtPointer.reduce(
                                                    (acc, key) => ({
                                                        ...acc,
                                                        [(job.focusPointer || "") + "/properties/" + key]:
                                                            e.target.checked,
                                                    }),
                                                    {} as Record<string, boolean>
                                                ),
                                            })
                                        );
                                    })
                                }
                            />
                            <Input
                                type="checkbox"
                                label="Include"
                                className="w-auto self-start break-words relative h-[1.5em]"
                                inputClassName="w-auto mr-2 w-4 h-4"
                                labelClassName="text-kac-iron -rotate-90 origin-top-left translate-y-1/2 absolute bottom-full"
                                checked={isAllKeysIncluded}
                                onChange={(e) =>
                                    setJob((job) => {
                                        if (!job) {
                                            return job;
                                        }
                                        return immutableAssign(
                                            job,
                                            (job) => job.promptIncludes,
                                            (promptIncludes) => ({
                                                ...promptIncludes,
                                                ...allKeysAtPointer.reduce(
                                                    (acc, key) => ({
                                                        ...acc,
                                                        [(job.focusPointer || "") + "/properties/" + key]:
                                                            e.target.checked,
                                                    }),
                                                    {} as Record<string, boolean>
                                                ),
                                            })
                                        );
                                    })
                                }
                            />
                            <Text variant="body" className="ml-2 font-bold text-kac-iron -mt-1">
                                Property
                            </Text>
                        </div>
                        {(Object.entries(schemaAtPointer?.properties) as [string, JSONSchemaType<any>][])?.map(
                            ([propertyKey, property]) => {
                                const key = propertyKey as keyof JobType["data"];
                                return (
                                    <div key={String(key)} className="flex flex-col items-start">
                                        <div className="flex flex-row gap-2">
                                            <Input
                                                type="checkbox"
                                                className="w-auto self-start mt-2"
                                                inputClassName="w-auto mr-2 w-4 h-4"
                                                labelClassName="text-kac-iron"
                                                checked={Boolean(
                                                    job.propertiesToGenerate?.[
                                                        (job.focusPointer || "") + "/properties/" + String(key)
                                                    ]
                                                )}
                                                onChange={(e) =>
                                                    setJob((job) => {
                                                        if (!job) {
                                                            return job;
                                                        }
                                                        return immutableAssign(
                                                            job,
                                                            (job) => job.propertiesToGenerate,
                                                            (filteredProperties = {}) => ({
                                                                ...filteredProperties,
                                                                [(job.focusPointer || "") +
                                                                "/properties/" +
                                                                String(key)]: e.target.checked,
                                                            })
                                                        );
                                                    })
                                                }
                                            />
                                            <Input
                                                type="checkbox"
                                                className="w-auto self-start mt-2"
                                                inputClassName="w-auto mr-2 w-4 h-4"
                                                labelClassName="text-kac-iron"
                                                checked={Boolean(
                                                    job.promptIncludes?.[
                                                        (job.focusPointer || "") + "/properties/" + String(key)
                                                    ]
                                                )}
                                                onChange={(e) =>
                                                    setJob((job) => {
                                                        if (!job) {
                                                            return job;
                                                        }
                                                        return immutableAssign(
                                                            job,
                                                            (job) => job.promptIncludes,
                                                            (promptIncludes) => ({
                                                                ...promptIncludes,
                                                                [(job.focusPointer || "") +
                                                                "/properties/" +
                                                                String(key)]: e.target.checked,
                                                            })
                                                        );
                                                    })
                                                }
                                            />
                                            <Button
                                                key={job.name}
                                                variant="text"
                                                color="primary"
                                                className="font-bold px-2 py-1 text-left leading-tight"
                                                onClick={() =>
                                                    setJob(
                                                        (job) =>
                                                            ({
                                                                ...job,
                                                                focusedProperty: key,
                                                                focusPointer:
                                                                    (job?.focusPointer || "") +
                                                                    "/properties/" +
                                                                    String(key),
                                                            } as JobType)
                                                    )
                                                }
                                            >
                                                {property.title || String(key)}
                                            </Button>
                                        </div>
                                        {valueAtPointer && valueAtPointer[key] && (
                                            <Text variant="body" className="text-kac-steel-dark mb-2">
                                                {typeof valueAtPointer[key] === "object"
                                                    ? safeStringify(valueAtPointer[key])
                                                    : valueAtPointer[key]}
                                            </Text>
                                        )}
                                    </div>
                                );
                            }
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
