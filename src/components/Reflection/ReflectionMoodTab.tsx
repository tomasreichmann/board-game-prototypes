import { useEffect, useMemo, useState } from "react";
import { formatConsumptionLabel, getConsumptionCombos, ReflectionEvent } from "@/components/Reflection/eventFilter";
import ReflectionMoodChart from "@/components/Reflection/ReflectionMoodChart";

interface ReflectionMoodTabProps {
    events: ReflectionEvent[];
}

interface MoodStat {
    value: number;
    event: ReflectionEvent;
}

const formatDate = (event: ReflectionEvent): string => {
    if (event.startDate) {
        return event.startDate.toLocaleDateString();
    }

    return event.startRaw;
};

const formatAverage = (value: number): string => {
    return Number.isFinite(value) ? value.toFixed(1) : "–";
};

export default function ReflectionMoodTab({ events }: ReflectionMoodTabProps) {
    const moodEvents = useMemo(() => events.filter((event) => typeof event.metadata.mood === "number"), [events]);

    const averageMood = useMemo(() => {
        if (!moodEvents.length) {
            return Number.NaN;
        }

        const total = moodEvents.reduce((sum, event) => sum + (event.metadata.mood ?? 0), 0);
        return total / moodEvents.length;
    }, [moodEvents]);

    const maxMood = useMemo<MoodStat | null>(() => {
        if (!moodEvents.length) {
            return null;
        }

        return moodEvents.reduce<MoodStat | null>((accumulator, event) => {
            const mood = event.metadata.mood ?? Number.NEGATIVE_INFINITY;
            if (!accumulator || mood > accumulator.value) {
                return { value: mood, event };
            }
            return accumulator;
        }, null);
    }, [moodEvents]);

    const minMood = useMemo<MoodStat | null>(() => {
        if (!moodEvents.length) {
            return null;
        }

        return moodEvents.reduce<MoodStat | null>((accumulator, event) => {
            const mood = event.metadata.mood ?? Number.POSITIVE_INFINITY;
            if (!accumulator || mood < accumulator.value) {
                return { value: mood, event };
            }
            return accumulator;
        }, null);
    }, [moodEvents]);

    const consumptionCombos = useMemo(() => getConsumptionCombos(moodEvents), [moodEvents]);
    const [selectedConsumptionKeys, setSelectedConsumptionKeys] = useState<string[]>([]);
    const [isConsumptionSelectAll, setIsConsumptionSelectAll] = useState(false);

    const conflictCount = useMemo(() => moodEvents.filter((event) => event.metadata.isConflict).length, [moodEvents]);

    const sleepRecordCount = useMemo(
        () => moodEvents.filter((event) => event.metadata.sleepHours).length,
        [moodEvents]
    );

    const averageSleepHours = useMemo(
        () =>
            moodEvents
                .filter((event) => event.metadata.sleepHours)
                .reduce((sum, event) => sum + event.metadata.sleepHours!, 0) / sleepRecordCount,
        [moodEvents, sleepRecordCount]
    );

    useEffect(() => {
        if (isConsumptionSelectAll) {
            setSelectedConsumptionKeys(consumptionCombos.map((combo) => combo.key));
            return;
        }

        setSelectedConsumptionKeys((previous) =>
            previous.filter((key) => consumptionCombos.some((combo) => combo.key === key))
        );
    }, [consumptionCombos, isConsumptionSelectAll]);

    const toggleConsumptionKey = (key: string) => {
        setSelectedConsumptionKeys((previous) => {
            if (previous.includes(key)) {
                setIsConsumptionSelectAll(false);
                return previous.filter((value) => value !== key);
            }

            const updated = [...previous, key];
            if (updated.length === consumptionCombos.length) {
                setIsConsumptionSelectAll(true);
            }

            return updated;
        });
    };

    if (!moodEvents.length) {
        return (
            <div className="alert alert-info mb-6">
                <span>No mood data is available for the selected events.</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="stat bg-base-100 text-base-content border border-base-300 rounded-box">
                    <div className="stat-title">Average mood</div>
                    <div className="stat-value text-primary">{formatAverage(averageMood)}</div>
                    <div className="stat-desc">Across {moodEvents.length} events</div>
                </div>
                <div className="stat bg-base-100 text-base-content border border-base-300 rounded-box">
                    <div className="stat-title">Highest mood</div>
                    <div className="stat-value text-success">{maxMood?.value ?? "–"}</div>
                    <div className="stat-desc">{maxMood ? formatDate(maxMood.event) : "No data"}</div>
                </div>
                <div className="stat bg-base-100 text-base-content border border-base-300 rounded-box">
                    <div className="stat-title">Lowest mood</div>
                    <div className="stat-value text-error">{minMood?.value ?? "–"}</div>
                    <div className="stat-desc">{minMood ? formatDate(minMood.event) : "No data"}</div>
                </div>
                <div className="stat bg-base-100 text-base-content border border-base-300 rounded-box">
                    <div className="stat-title">Sleep Hours</div>
                    <div className="stat-value text-warning">{formatAverage(averageSleepHours) ?? "–"}</div>
                    <div className="stat-desc">
                        {sleepRecordCount > 0
                            ? `${sleepRecordCount} event${sleepRecordCount === 1 ? "" : "s"}`
                            : "No data"}
                    </div>
                </div>
                <div className="stat bg-base-100 text-base-content border border-base-300 rounded-box">
                    <div className="stat-title">Conflicts</div>
                    <div className="stat-value text-warning">{conflictCount}</div>
                    <div className="stat-desc">
                        {conflictCount
                            ? `${conflictCount} event${conflictCount === 1 ? "" : "s"} flagged`
                            : "No conflicts"}
                    </div>
                </div>
            </div>

            {consumptionCombos.length ? (
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-base-content/70">Overlay consumption</span>
                    <div className="flex flex-wrap gap-2 items-center">
                        <button
                            type="button"
                            className={`btn btn-xs ${
                                isConsumptionSelectAll && consumptionCombos.length ? "btn-primary" : "btn-outline"
                            }`}
                            onClick={() => {
                                if (isConsumptionSelectAll) {
                                    setIsConsumptionSelectAll(false);
                                    setSelectedConsumptionKeys([]);
                                } else {
                                    setIsConsumptionSelectAll(true);
                                    setSelectedConsumptionKeys(consumptionCombos.map((combo) => combo.key));
                                }
                            }}
                        >
                            {isConsumptionSelectAll ? "Clear all" : "Select all"}
                        </button>
                        {consumptionCombos.map((combo) => {
                            const isActive = selectedConsumptionKeys.includes(combo.key);
                            const label = formatConsumptionLabel(combo);
                            return (
                                <button
                                    key={combo.key}
                                    type="button"
                                    className={`btn btn-xs ${isActive ? "btn-primary" : "btn-outline"}`}
                                    onClick={() => toggleConsumptionKey(combo.key)}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ) : null}

            <ReflectionMoodChart
                events={moodEvents}
                consumptionCombos={consumptionCombos}
                selectedConsumptionKeys={selectedConsumptionKeys}
            />
        </div>
    );
}
