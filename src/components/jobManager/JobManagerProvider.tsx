import React, { PropsWithChildren, createContext, useContext, useReducer } from "react";
import JobType from "./jobType";
import jobManagerReducer, { JobManagerActionType } from "./jobManagerReducer";

export type JobManagerStateType = JobType | undefined;

export type JobManagerContextType = {
    state: JobManagerStateType;
    dispatch: (action: JobManagerActionType) => void;
};

const initialContext: JobManagerContextType = {
    state: undefined,
    dispatch: () => {},
};

const JobManagerContext = createContext(initialContext);

export const useJobManager = () => {
    return useContext(JobManagerContext);
};

export type JobManagerProviderProps = PropsWithChildren<{
    initialJob?: JobType;
}>;

const JobManagerProvider = ({ initialJob, children }: JobManagerProviderProps) => {
    const [state, dispatch] = useReducer(jobManagerReducer, initialJob);

    return <JobManagerContext.Provider value={{ state, dispatch }}>{children}</JobManagerContext.Provider>;
};

export default JobManagerProvider;
