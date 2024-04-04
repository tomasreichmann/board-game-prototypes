// import immutableAssign from "immutable-assign";
import Markdown from "react-markdown";

import JobType from "./jobType";
import Button from "../../prototypes/kick-ass-cards/components/content/Button";
import Text from "../../prototypes/kick-ass-cards/components/content/Text";
import { defaultComponentMap } from "../../prototypes/kick-ass-cards/components/ContentItem";
import copyToClipboard from "../../utils/copyToClipboard";
import { twMerge } from "tailwind-merge";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import safeStringify from "../../utils/safeStringify";
import Article from "../../prototypes/kick-ass-cards/components/layout/Article";
import Icon from "../Icon/Icon";

export type PropertyHistoryProps = {
    job: JobType | null;
    setJob: React.Dispatch<React.SetStateAction<JobType | null>>;
};

export type PropertyHistoryItemContentProps = JobType["history"][string][number] & Pick<PropertyHistoryProps, "setJob">;

export const PropertyHistoryItemContent = ({ content, role }: PropertyHistoryItemContentProps) => {
    if (role === "assistant" && typeof content === "string") {
        return (
            <Article>
                <Markdown>{content}</Markdown>
            </Article>
        );
    }
    if (typeof content === "string") {
        return (
            <Text variant="body" className="">
                {content} {/* TODO: add a button to use data */}
            </Text>
        );
    }
    return <>{content}</>;
};

export default function PropertyHistory({ job, setJob }: PropertyHistoryProps) {
    const focusPointer = job?.focusPointer || "";
    if (!job || !job.history[focusPointer]?.length) {
        return null;
    }

    return (
        <div className="self-stretch flex flex-col gap-4 pr-4">
            {job.history[focusPointer]?.map((message, messageIndex) => (
                <div
                    key={messageIndex}
                    className={twMerge(
                        "flex flex-col",
                        message.role === "assistant" && "pr-8",
                        message.role === "user" && "pl-8"
                    )}
                >
                    <div
                        className={twMerge(
                            "flex flex-row justify-between items-baseline gap-4",
                            message.role === "assistant" && "border-b-2 border-kac-steel-dark mb-1 border-opacity-50",
                            message.role === "user" && "border-b-2 border-kac-gold-dark mb-1 border-opacity-50"
                        )}
                    >
                        <Text
                            variant="body"
                            className={twMerge(
                                "flex-1 text-sm text-kac-iron-light font-bold",
                                message.role === "assistant" && "text-kac-steel-dark",
                                message.role === "user" && "text-kac-gold-dark"
                            )}
                        >
                            {capitalizeFirstLetter(message.role)}
                        </Text>
                        {typeof message.content === "string" && (
                            <Button
                                onClick={() =>
                                    copyToClipboard(
                                        typeof message.content === "string"
                                            ? message.content
                                            : safeStringify(message.content, null, 2)
                                    )
                                }
                                color="success"
                                variant="text"
                                className="text-sm px-2 py-1"
                            >
                                Copy to clipboard
                            </Button>
                        )}
                        {message.role === "user" && (
                            <Button
                                onClick={() =>
                                    setJob((job) => {
                                        if (!job) {
                                            return job;
                                        }
                                        return {
                                            ...job,
                                            prompt:
                                                typeof message.content === "string"
                                                    ? message.content
                                                    : safeStringify(message.content, null, 2),
                                        } as JobType;
                                    })
                                }
                                color="primary"
                                variant="text"
                                className="text-sm px-2 py-1"
                            >
                                Copy to prompt
                            </Button>
                        )}
                        {message.role === "tool" && (
                            <Button
                                onClick={() =>
                                    setJob((job) => {
                                        if (!job) {
                                            return job;
                                        }
                                        return {
                                            ...job,
                                            prompt:
                                                typeof message.content === "string"
                                                    ? message.content
                                                    : safeStringify(message.content, null, 2),
                                        } as JobType;
                                    })
                                }
                                color="primary"
                                variant="text"
                                className="text-sm px-2 py-1"
                            >
                                Copy to prompt
                            </Button>
                        )}
                        {message.finishReason === "length" && (
                            <Text variant="body" className={twMerge("text-sm text-kac-blood-dark")}>
                                <Icon icon="halt" className="w-4 h-4 mr-1" />
                                This message might have been cut. Try to increase maximum token length.
                            </Text>
                        )}
                    </div>
                    <PropertyHistoryItemContent {...message} setJob={setJob} />
                </div>
            ))}
        </div>
    );
}
