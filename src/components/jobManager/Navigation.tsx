import React from "react";
import immutableAssign from "immutable-assign";
import Button from "../../prototypes/kick-ass-cards/components/controls/Button";
import Text from "../../prototypes/kick-ass-cards/components/content/Text";
import ButtonWithConfirmation from "../../prototypes/kick-ass-cards/components/controls/ButtonWithConfirmation";
import { JobManagerStateType, useJobManager } from "./JobManagerProvider";
import { JobManagerActionTypeEnum, Setter } from "./jobManagerReducer";
import { twMerge } from "tailwind-merge";
import Input from "../../prototypes/kick-ass-cards/components/controls/Input";
import JobType from "./jobType";
import getDeepValue from "../../utils/getDeepValue";
import safeStringify from "../../utils/safeStringify";

export type NavigationProps = {};

export default function Navigation({}: NavigationProps) {
    const { state, dispatch } = useJobManager();
    if (!state) {
        return null;
    }

    const { relatedProperties } = state;

    const setJob = (job: Setter<JobManagerStateType>) => {
        dispatch({ type: JobManagerActionTypeEnum.SetJob, payload: job });
    };

    const isAtRootPointer = state.pointer === "";

    const breadCrumbs =
        state.pointer.length > 0
            ? state.pointer.split(".").map((fragment, fragmentIndex, fragments) => {
                  const pointer = fragments.slice(0, fragmentIndex + 1).join(".");
                  const isCurrentPointer = state.pointer === pointer;
                  return (
                      <React.Fragment key={pointer}>
                          <span className="text-kac-steel-dark">❯</span>
                          <Button
                              onClick={() => dispatch({ type: JobManagerActionTypeEnum.SetPointer, payload: pointer })}
                              color="info"
                              variant="text"
                              disabled={isCurrentPointer}
                              className={twMerge(
                                  "px-2 py-1",
                                  isCurrentPointer ? "underline font-bold" : "no-underline"
                              )}
                          >
                              {fragment}
                          </Button>
                      </React.Fragment>
                  );
              })
            : [];

    const isAllKeysGenerated = relatedProperties.every((property) =>
        property.$id ? state.pointersToGenerate?.[property.$id] : false
    );
    const isAllKeysIncluded = relatedProperties.every((property) =>
        property.$id ? state.pointersToInclude?.[property.$id] : false
    );

    return (
        <>
            <div className={"flex-1 flex flex-row gap-4 text-kac-steel-dark mb-0 mt-8"}>
                <div className="flex-1 flex flex-row flex-wrap items-baseline -mx-1">
                    <Button
                        onClick={() => dispatch({ type: JobManagerActionTypeEnum.SetPointer, payload: "" })}
                        color="info"
                        variant="text"
                        disabled={isAtRootPointer}
                        className={twMerge(
                            "px-2 py-1 font-bold font-kacHeading",
                            isAtRootPointer ? "underline" : "no-underline"
                        )}
                    >
                        {state.name}
                    </Button>
                    {breadCrumbs}
                </div>
                <ButtonWithConfirmation
                    onClick={() => dispatch({ type: JobManagerActionTypeEnum.SetJob, payload: undefined })}
                    color="danger"
                    variant="text"
                    confirmText="Closing job will discard all data. Are you sure?"
                    className="text-sm px-2 py-1"
                >
                    Close Job
                </ButtonWithConfirmation>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] pt-[10ch] gap-x-4">
                <div className="flex flex-row items-baseline gap-2 border-b-2 border-kac-steel">
                    <Input
                        type="checkbox"
                        label="Generate"
                        className="w-auto self-start break-words relative h-[1.5em]"
                        inputClassName="w-auto mr-2 w-4 h-4"
                        labelClassName="text-kac-iron -rotate-90 origin-top-left translate-y-1/2 absolute bottom-full"
                        checked={isAllKeysGenerated}
                        onChange={(e) =>
                            setJob((job) => {
                                if (!job) {
                                    return job;
                                }
                                const result = immutableAssign(
                                    job,
                                    (job) => job.pointersToGenerate,
                                    (pointersToGenerate = {}) => ({
                                        ...pointersToGenerate,
                                        ...relatedProperties.reduce(
                                            (acc, property) => ({
                                                ...acc,
                                                [property.$id as string]: e.target.checked || undefined,
                                            }),
                                            {} as Record<string, true | undefined>
                                        ),
                                    })
                                );
                                console.log("result", result.pointersToGenerate);
                                return result;
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
                                    (job) => job.pointersToInclude,
                                    (pointersToInclude = {}) => ({
                                        ...pointersToInclude,
                                        ...relatedProperties.reduce(
                                            (acc, property) => ({
                                                ...acc,
                                                [property.$id as string]: e.target.checked || undefined,
                                            }),
                                            {} as Record<string, true | undefined>
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
                {relatedProperties.map((property) => {
                    const pointer = property.$id as string;
                    const isSelectedToGenerate = state.pointersToGenerate?.[pointer];
                    const isSelectedToInclude = state.pointersToInclude?.[pointer];
                    const valueInData = getDeepValue(state.data, pointer);
                    const key = pointer.split("/").at(-1) as string;
                    return (
                        <div key={pointer} className="flex flex-col items-start">
                            <div className="flex flex-row gap-2">
                                <Input
                                    type="checkbox"
                                    className="w-auto self-start mt-2"
                                    inputClassName="w-auto mr-2 w-4 h-4"
                                    labelClassName="text-kac-iron"
                                    checked={isSelectedToGenerate}
                                    onChange={(e) =>
                                        setJob((job) => {
                                            if (!job) {
                                                return job;
                                            }
                                            return immutableAssign(
                                                job,
                                                (job) => job.pointersToGenerate,
                                                (pointersToGenerate = {}) => ({
                                                    ...pointersToGenerate,
                                                    [pointer]: e.target.checked || undefined,
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
                                    checked={isSelectedToInclude}
                                    onChange={(e) =>
                                        setJob((job) => {
                                            if (!job) {
                                                return job;
                                            }
                                            return immutableAssign(
                                                job,
                                                (job) => job.pointersToInclude,
                                                (pointersToInclude) => ({
                                                    ...pointersToInclude,
                                                    [pointer]: e.target.checked || undefined,
                                                })
                                            );
                                        })
                                    }
                                />
                                <Button
                                    variant="text"
                                    color="primary"
                                    className="font-bold px-2 py-1 text-left leading-tight"
                                    onClick={() =>
                                        setJob(
                                            (job) =>
                                                ({
                                                    ...job,
                                                    pointer,
                                                } as JobType)
                                        )
                                    }
                                >
                                    {property.title || key}
                                </Button>
                            </div>
                            {(valueInData ?? undefined) && (
                                <Text variant="body" className="text-kac-steel-dark mb-2">
                                    {typeof valueInData === "object" ? safeStringify(valueInData) : String(valueInData)}
                                </Text>
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    );
}
