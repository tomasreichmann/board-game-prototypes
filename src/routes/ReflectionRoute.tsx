import { useMemo, useState } from "react";
import Page from "@/components/Page/Page";
import ToggleData from "@/components/DataToggle";
import { filterReflectionEvents, getReflectionEvents } from "@/components/Reflection/eventFilter";
import ReflectionDetailsTab from "@/components/Reflection/ReflectionDetailsTab";
import ReflectionMoodTab from "@/components/Reflection/ReflectionMoodTab";
import ReflectionConsumptionTab from "@/components/Reflection/ReflectionConsumptionTab";
import twm from "@/utils/twm";

const toStartOfDay = (value: string): Date | undefined => {
    if (!value) {
        return undefined;
    }

    return new Date(`${value}T00:00:00`);
};

const toEndOfDay = (value: string): Date | undefined => {
    if (!value) {
        return undefined;
    }

    return new Date(`${value}T23:59:59.999`);
};

const startOfDay = (value: Date): Date => {
    const copy = new Date(value);
    copy.setHours(0, 0, 0, 0);
    return copy;
};

const formatDateInput = (value: Date): string => {
    return startOfDay(value).toISOString().slice(0, 10);
};

const addDays = (value: Date, amount: number): Date => {
    const copy = new Date(value);
    copy.setDate(copy.getDate() + amount);
    return copy;
};

const addMonths = (value: Date, amount: number): Date => {
    const copy = new Date(value);
    const day = copy.getDate();
    copy.setDate(1);
    copy.setMonth(copy.getMonth() + amount);

    const lastDay = new Date(copy.getFullYear(), copy.getMonth() + 1, 0).getDate();
    copy.setDate(Math.min(day, lastDay));

    return copy;
};

const parseDateInput = (value: string | undefined): Date | undefined => {
    if (!value) {
        return undefined;
    }

    const parsed = new Date(`${value}T00:00:00`);
    return Number.isNaN(parsed.valueOf()) ? undefined : parsed;
};

type ReflectionTab = "details" | "mood" | "consumption";

const tabDefinitions: Array<{ key: ReflectionTab; label: string }> = [
    { key: "details", label: "Details" },
    { key: "mood", label: "Mood" },
    { key: "consumption", label: "Consumption" },
];

type RangeAction =
    | "allTime"
    | "last7Days"
    | "last30Days"
    | "lastWeek"
    | "lastMonth"
    | "lastYear"
    | "weekEarlier"
    | "weekLater"
    | "monthEarlier"
    | "monthLater";

const rangeActions: Array<{ action: RangeAction; label: string }> = [
    { action: "allTime", label: "All time" },
    { action: "last7Days", label: "Last 7 days" },
    { action: "last30Days", label: "Last 30 days" },
    { action: "lastWeek", label: "Last week" },
    { action: "lastMonth", label: "Last month" },
    { action: "lastYear", label: "Last year" },
    { action: "weekEarlier", label: "Week earlier" },
    { action: "weekLater", label: "Week later" },
    { action: "monthEarlier", label: "Month earlier" },
    { action: "monthLater", label: "Month later" },
];

export default function ReflectionRoute() {
    const [startDateFilter, setStartDateFilter] = useState<string>("");
    const [endDateFilter, setEndDateFilter] = useState<string>("");
    const [activeTab, setActiveTab] = useState<ReflectionTab>("details");

    const allEvents = useMemo(() => getReflectionEvents(), []);

    const applyRange = (start: Date, end: Date) => {
        const orderedStart = start.getTime() <= end.getTime() ? start : end;
        const orderedEnd = start.getTime() <= end.getTime() ? end : start;
        setStartDateFilter(formatDateInput(orderedStart));
        setEndDateFilter(formatDateInput(orderedEnd));
    };

    const ensureRange = (
        fallback: () => { start: Date; end: Date },
        modifier: () => { start: Date; end: Date } | undefined
    ) => {
        const result = modifier();
        if (result) {
            applyRange(result.start, result.end);
            return;
        }

        const fallbackRange = fallback();
        applyRange(fallbackRange.start, fallbackRange.end);
    };

    const handleRangeAction = (action: RangeAction) => {
        const now = startOfDay(new Date());
        const currentStart = parseDateInput(startDateFilter);
        const currentEnd = parseDateInput(endDateFilter);

        const lastNDaysRange = (days: number) => {
            const end = now;
            const start = addDays(now, -(days - 1));
            return { start, end };
        };

        const defaultWeekRange = () => {
            const end = addDays(now, -1);
            const start = addDays(end, -6);
            return { start, end };
        };

        const defaultMonthRange = () => {
            const today = new Date();
            const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
            const end = new Date(today.getFullYear(), today.getMonth(), 0);
            return { start, end };
        };

        const defaultYearRange = () => {
            const today = new Date();
            const year = today.getFullYear() - 1;
            const start = new Date(year, 0, 1);
            const end = new Date(year, 11, 31);
            return { start, end };
        };

        switch (action) {
            case "allTime": {
                const firstEvent = allEvents.find((event) => event.startDate);
                const lastEvent = [...allEvents].reverse().find((event) => event.startDate || event.endDate);

                if (!firstEvent || !lastEvent) {
                    applyRange(addDays(now, -29), now);
                    break;
                }

                const startCandidate = firstEvent.startDate || firstEvent.endDate || now;
                const endCandidate = lastEvent.endDate || lastEvent.startDate || now;

                applyRange(startOfDay(startCandidate), startOfDay(endCandidate));
                break;
            }
            case "last7Days": {
                const { start, end } = lastNDaysRange(7);
                applyRange(start, end);
                break;
            }
            case "last30Days": {
                const { start, end } = lastNDaysRange(30);
                applyRange(start, end);
                break;
            }
            case "lastWeek": {
                const { start, end } = defaultWeekRange();
                applyRange(start, end);
                break;
            }
            case "lastMonth": {
                const { start, end } = defaultMonthRange();
                applyRange(start, end);
                break;
            }
            case "lastYear": {
                const { start, end } = defaultYearRange();
                applyRange(start, end);
                break;
            }
            case "weekEarlier": {
                ensureRange(defaultWeekRange, () => {
                    if (!currentStart || !currentEnd) {
                        return undefined;
                    }
                    return {
                        start: addDays(currentStart, -7),
                        end: addDays(currentEnd, -7),
                    };
                });
                break;
            }
            case "weekLater": {
                ensureRange(defaultWeekRange, () => {
                    if (!currentStart || !currentEnd) {
                        return undefined;
                    }
                    return {
                        start: addDays(currentStart, 7),
                        end: addDays(currentEnd, 7),
                    };
                });
                break;
            }
            case "monthEarlier": {
                ensureRange(defaultMonthRange, () => {
                    if (!currentStart || !currentEnd) {
                        return undefined;
                    }
                    return {
                        start: startOfDay(addMonths(currentStart, -1)),
                        end: startOfDay(addMonths(currentEnd, -1)),
                    };
                });
                break;
            }
            case "monthLater": {
                ensureRange(defaultMonthRange, () => {
                    if (!currentStart || !currentEnd) {
                        return undefined;
                    }
                    return {
                        start: startOfDay(addMonths(currentStart, 1)),
                        end: startOfDay(addMonths(currentEnd, 1)),
                    };
                });
                break;
            }
            default:
                break;
        }
    };

    const filteredEvents = useMemo(() => {
        return filterReflectionEvents({
            start: toStartOfDay(startDateFilter),
            end: toEndOfDay(endDateFilter),
        });
    }, [startDateFilter, endDateFilter]);

    return (
        <Page className="ReflectionRoute bg-slate-800 text-base-content min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Reflection Schedule</h1>
            <p className="mb-6 text-base-content/70">
                Filter and review Morning Planning and Evening Reflection sessions exported from Google Calendar.
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
                {rangeActions.map(({ action, label }) => (
                    <button
                        key={action}
                        type="button"
                        className="btn btn-sm btn-outline"
                        onClick={() => handleRangeAction(action)}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <label className="form-control">
                    <span className="label-text text-base-content/70">Start date</span>
                    <input
                        type="date"
                        className="input input-bordered bg-base-100 text-base-content"
                        value={startDateFilter}
                        onChange={(event) => setStartDateFilter(event.target.value)}
                    />
                </label>
                <label className="form-control">
                    <span className="label-text text-base-content/70">End date</span>
                    <input
                        type="date"
                        className="input input-bordered bg-base-100 text-base-content"
                        value={endDateFilter}
                        onChange={(event) => setEndDateFilter(event.target.value)}
                    />
                </label>
                <div className="form-control">
                    <span className="label-text text-base-content/70">Matching events</span>
                    <div className="stat bg-base-100 text-base-content border border-base-300 rounded-box h-full flex items-center justify-center text-lg font-semibold">
                        {filteredEvents.length}
                    </div>
                </div>
            </div>

            <div
                role="tablist"
                className="tabs tabs-boxed bg-base-100 text-base-content border border-base-300 w-fit mb-6"
            >
                {tabDefinitions.map((tab) => (
                    <button
                        key={tab.key}
                        type="button"
                        role="tab"
                        className={twm(
                            "tab bg-base-100 text-base-content border border-base-200 leading-tight",
                            activeTab === tab.key && "tab-active bg-base-200 border-base-300"
                        )}
                        onClick={() => setActiveTab(tab.key)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {activeTab === "details" ? <ReflectionDetailsTab events={filteredEvents} /> : null}
            {activeTab === "mood" ? <ReflectionMoodTab events={filteredEvents} /> : null}
            {activeTab === "consumption" ? <ReflectionConsumptionTab events={filteredEvents} /> : null}

            <ToggleData data={{ allEventsCount: allEvents.length, startDateFilter, endDateFilter, filteredEvents }} />
        </Page>
    );
}
