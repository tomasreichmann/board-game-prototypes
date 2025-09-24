import { ReflectionEvent } from "@/components/Reflection/eventFilter";

const formatDateTime = (value: Date | null, fallback: string) => {
    if (!value) {
        return fallback;
    }

    return value.toLocaleString();
};

const formatSubstance = (value: string) =>
    value.length <= 3
        ? value.toUpperCase()
        : value.replace(/(^|\s|[-_/])(\w)/g, (match, boundary, char) => `${boundary}${char.toUpperCase()}`);

interface ReflectionDetailsTabProps {
    events: ReflectionEvent[];
}

export default function ReflectionDetailsTab({ events }: ReflectionDetailsTabProps) {
    if (!events.length) {
        return (
            <div className="alert alert-info mb-6">
                <span>No events found in the selected range.</span>
            </div>
        );
    }

    return (
        <ul className="flex flex-col gap-4 mb-8 max-w-4xl">
            {events.map((event) => (
                <li
                    key={`${event.summary}-${event.startRaw}`}
                    className="card border bg-base-300 border-base-100 shadow"
                >
                    <div className="card-body">
                        <h2 className="card-title">{event.summary}</h2>
                        <p className="text-sm">
                            {formatDateTime(event.startDate, event.startRaw)}
                            {event.endDate ? ` → ${formatDateTime(event.endDate, event.endRaw)}` : ""}
                        </p>
                        {event.metadata.mood !== undefined ? (
                            <p className="text-sm">
                                Mood: {event.metadata.mood}
                                {event.metadata.moodReason ? ` (${event.metadata.moodReason})` : ""}
                            </p>
                        ) : null}
                        {event.metadata.isConflict ? (
                            <p className="text-sm text-warning">
                                Conflict: {event.metadata.conflictDescription || "unspecified"}
                            </p>
                        ) : null}
                        {event.metadata.consumption?.length ? (
                            <p className="text-sm">
                                Consumption:{" "}
                                {event.metadata.consumption.map((item, index) => {
                                    const parts = [formatSubstance(item.substance)];
                                    if (item.amount !== undefined) {
                                        parts.push(String(item.amount));
                                    }
                                    if (item.unit) {
                                        parts.push(item.unit);
                                    }
                                    return (
                                        <span key={`${item.substance}-${index}`}>
                                            {index > 0 ? ", " : ""}
                                            {parts.filter(Boolean).join(" ")}
                                        </span>
                                    );
                                })}
                            </p>
                        ) : null}
                        {event.location ? <p className="text-sm">Location: {event.location}</p> : null}
                        {event.description ? <p className="text-sm whitespace-pre-wrap">{event.description}</p> : null}
                    </div>
                </li>
            ))}
        </ul>
    );
}
