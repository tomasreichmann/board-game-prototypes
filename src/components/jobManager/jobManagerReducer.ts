import React from "react";
import { MistralChatOptionsType } from "../../services/Mistral/Mistral";
import { JobManagerStateType } from "./JobManagerProvider";
import { JSONSchemaType } from "ajv";
import JobType from "./jobType";
import { appendKeyToDeepPointer, getSchemaAtDeepPointer } from "./utils";
import { AnyRecord } from "../../utils/simpleTypes";

export enum JobManagerActionTypeEnum {
    SetJob = "SetJob",
    SetPointer = "SetPointer",
    SetPropertyPointersToGenerate = "SetPropertyPointersToGenerate",
    SetPropertyPointersToInclude = "SetPropertyPointersToInclude",
    SetPropertyPointerToGenerate = "SetPropertyPointerToGenerate",
    SetPropertyPointerToInclude = "SetPropertyPointerToInclude",
    SetMistralOptions = "SetMistralOptions",
    SetIsPending = "SetIsPending",
    SetError = "SetError",
    SetData = "SetData",
}

export type Setter<V> = V | ((prev: V) => V);

const normalizeSetter = <V>(setter: Setter<V>) => {
    if (typeof setter === "function") {
        return setter as (prev: V) => V;
    } else {
        return () => setter;
    }
};

export type JobManagerActionType =
    | {
          type: JobManagerActionTypeEnum.SetJob;
          payload: Setter<JobManagerStateType>;
      }
    | {
          type: JobManagerActionTypeEnum.SetPointer;
          payload: Setter<string>;
      }
    | {
          type: JobManagerActionTypeEnum.SetPropertyPointersToGenerate;
          payload: Setter<string[]>;
      }
    | {
          type: JobManagerActionTypeEnum.SetPropertyPointerToInclude;
          payload: Setter<string>;
      }
    | {
          type: JobManagerActionTypeEnum.SetPropertyPointersToGenerate;
          payload: Setter<string[]>;
      }
    | {
          type: JobManagerActionTypeEnum.SetPropertyPointerToInclude;
          payload: Setter<string>;
      }
    | {
          type: JobManagerActionTypeEnum.SetMistralOptions;
          payload: Setter<MistralChatOptionsType>;
      }
    | {
          type: JobManagerActionTypeEnum.SetIsPending;
          payload: Setter<boolean>;
      }
    | {
          type: JobManagerActionTypeEnum.SetError;
          payload: Setter<Error | undefined>;
      };

const calculateRelatedProperties = (state: JobType): JSONSchemaType<any>[] => {
    const relatedProperties: JSONSchemaType<any>[] = [];
    // get pointer schema type
    const schemaAtPointer = getSchemaAtDeepPointer(state.schema, state.pointer);
    // const pointerSchemaType
    const pointerSchemaType: string | undefined = schemaAtPointer?.type;
    if (!pointerSchemaType) {
        return [];
    }
    // if pointer points to an object, related properties are all properties of the object
    if (pointerSchemaType === "object") {
        relatedProperties.push(
            ...Object.entries((schemaAtPointer?.properties || {}) as AnyRecord).map(([key, property]) => ({
                ...property,
                $id: appendKeyToDeepPointer(state.pointer, key),
            }))
        );
    }
    // if pointer points to an object property, related properties are other properties of the object

    // if pointer points to an array, related properties are array items
    // TODO: Figure this out
    // if pointer points to an array item, related properties are other array items
    return relatedProperties;
};

const updateRelatedPropertiesAndIncludes = (state: JobManagerStateType): JobManagerStateType => {
    if (!state) {
        return state;
    }
    // TODO: calculate includes
    return { ...state, relatedProperties: calculateRelatedProperties(state) };
};

export default function jobManagerReducer(
    state: JobManagerStateType,
    action: JobManagerActionType
): JobManagerStateType {
    console.log(action);
    if (action.type === JobManagerActionTypeEnum.SetJob) {
        const newState = normalizeSetter(action.payload)(state);
        return updateRelatedPropertiesAndIncludes(newState);
    }

    if (action.type === JobManagerActionTypeEnum.SetPointer) {
        if (!state) {
            console.error("Job not set");
            return state;
        }
        const newState = {
            ...state,
            pointer: normalizeSetter(action.payload)(state.pointer),
        };
        return updateRelatedPropertiesAndIncludes(newState);
    }

    return state;
}
