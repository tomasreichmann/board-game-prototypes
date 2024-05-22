import immutableAssign from "immutable-assign";
import { twMerge } from "tailwind-merge";
import JobType from "./jobType";
import SmartInput from "../../prototypes/kick-ass-cards/components/controls/SmartInput";
import Input from "../../prototypes/kick-ass-cards/components/controls/Input";
import { MistralOptionsType } from "../../hooks/useMistral";
import Select from "../../prototypes/kick-ass-cards/components/controls/Select";
import { MistralModelEnum } from "../../services/Mistral/Mistral";
import Button from "../../prototypes/kick-ass-cards/components/controls/Button";
import Pending from "../form/Pending";
import Icon from "../Icon/Icon";
import ButtonWithConfirmation from "../../prototypes/kick-ass-cards/components/controls/ButtonWithConfirmation";

export type InputFormProps = {
    job: JobType | null;
    setJob: React.Dispatch<React.SetStateAction<JobType | null>>;
    sendMessageCallback: () => void;
    mistralOptions: MistralOptionsType;
    setMistralOptions: React.Dispatch<React.SetStateAction<MistralOptionsType>>;
    isPending: boolean;
    error: Error | null;
};

export default function InputForm({
    job,
    setJob,
    sendMessageCallback,
    mistralOptions,
    setMistralOptions,
    isPending,
}: InputFormProps) {
    const isPromptDisabled = !job || isPending;
    return (
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
                label={
                    <span>
                        <Icon icon="ai" className="w-5 h-5 mr-1 inline text-kac-steel-dark" />
                        Ask LLM
                    </span>
                }
            />

            <div className="flex flex-row flex-wrap gap-2 pb-8">
                <ButtonWithConfirmation
                    color="danger"
                    className="flex-1 text-sm"
                    onClick={() =>
                        setJob((job) => {
                            if (!job) {
                                return job;
                            }
                            return immutableAssign(
                                job,
                                (job) => job.history[job.focusPointer || ""],
                                () => []
                            );
                        })
                    }
                >
                    Clear History
                </ButtonWithConfirmation>
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
        </>
    );
}
