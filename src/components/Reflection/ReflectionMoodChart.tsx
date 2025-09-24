import { useMemo } from "react";
import {
    Bar,
    CartesianGrid,
    ComposedChart,
    Legend,
    Line,
    ResponsiveContainer,
    Tooltip,
    TooltipProps,
    XAxis,
    YAxis,
    DotProps,
    LabelList,
} from "recharts";
import { ConsumptionComboSummary, formatConsumptionLabel, ReflectionEvent } from "@/components/Reflection/eventFilter";
import twm from "@/utils/twm";

interface ReflectionMoodChartProps {
    events: ReflectionEvent[];
    consumptionCombos: ConsumptionComboSummary[];
    selectedConsumptionKeys: string[];
    className?: string;
}

interface MoodDataPoint {
    id: string;
    index: number;
    mood: number;
    isMorning: boolean;
    dateLabel: string;
    rawDate: string;
    movingAverage3?: number;
    trend?: number;
    summary: string;
    description: string;
    isConflict: boolean;
    consumption: Record<string, number>;
}

const formatDateLabel = (event: ReflectionEvent): string => {
    if (event.startDate) {
        return event.startDate.toLocaleDateString();
    }

    return event.startRaw;
};

const computeMovingAverage3 = (points: MoodDataPoint[]): MoodDataPoint[] => {
    return points.map((point, index) => {
        const windowStart = Math.max(0, index - 2);
        const window = points.slice(windowStart, index + 1);
        const average = window.reduce((sum, item) => sum + item.mood, 0) / window.length;
        return {
            ...point,
            movingAverage3: Number.isFinite(average) ? Number.parseFloat(average.toFixed(2)) : undefined,
        };
    });
};

const computeTrend = (points: MoodDataPoint[]): MoodDataPoint[] => {
    const n = points.length;
    if (n <= 1) {
        return points.map((point) => ({ ...point, trend: point.mood }));
    }

    const sumX = points.reduce((acc, point) => acc + point.index, 0);
    const sumY = points.reduce((acc, point) => acc + point.mood, 0);
    const sumXY = points.reduce((acc, point) => acc + point.index * point.mood, 0);
    const sumX2 = points.reduce((acc, point) => acc + point.index * point.index, 0);

    const denominator = n * sumX2 - sumX * sumX;
    const slope = denominator === 0 ? 0 : (n * sumXY - sumX * sumY) / denominator;
    const intercept = n === 0 ? 0 : (sumY - slope * sumX) / n;

    return points.map((point) => ({
        ...point,
        trend: Number.parseFloat((slope * point.index + intercept).toFixed(2)),
    }));
};

const enhanceDataPoints = (points: MoodDataPoint[]): MoodDataPoint[] => {
    const withAverage = computeMovingAverage3(points);
    return computeTrend(withAverage);
};

const CHART_HEIGHT_CLASS = "h-[28rem]";

const CONSUMPTION_COLORS = ["#38bdf8", "#f97316", "#8b5cf6", "#14b8a6", "#ec4899", "#facc15", "#22c55e"];

export default function ReflectionMoodChart({
    events,
    consumptionCombos,
    selectedConsumptionKeys,
    className,
}: ReflectionMoodChartProps) {
    const data = useMemo<MoodDataPoint[]>(() => {
        const basePoints = events
            .filter((event) => typeof event.metadata.mood === "number")
            .map((event, index) => {
                const lowerSummary = event.summary.toLowerCase();
                const isMorning = lowerSummary.includes("morning");

                return {
                    id: `${event.summary}-${event.startRaw}-${index}`,
                    index,
                    mood: event.metadata.mood as number,
                    isMorning,
                    dateLabel: formatDateLabel(event),
                    rawDate: event.startRaw,
                    summary: event.summary,
                    description: event.description,
                    isConflict: Boolean(event.metadata.isConflict),
                    consumption: { ...(event.metadata.consumptionMap || {}) },
                } satisfies MoodDataPoint;
            })
            .sort((a, b) => a.index - b.index);

        return enhanceDataPoints(basePoints);
    }, [events]);

    if (!data.length) {
        return null;
    }

    const eventsByDate = useMemo(() => {
        return data.reduce<Record<string, MoodDataPoint[]>>((accumulator, point) => {
            const bucket = accumulator[point.dateLabel] || [];
            bucket.push(point);
            accumulator[point.dateLabel] = bucket;
            return accumulator;
        }, {});
    }, [data]);

    const selectedEntries = useMemo(
        () =>
            selectedConsumptionKeys
                .map((key, index) => {
                    const combo = consumptionCombos.find((candidate) => candidate.key === key);
                    if (!combo) {
                        return null;
                    }
                    const color = CONSUMPTION_COLORS[index % CONSUMPTION_COLORS.length];
                    return {
                        key,
                        combo,
                        label: formatConsumptionLabel(combo),
                        color,
                    };
                })
                .filter(
                    (entry): entry is { key: string; combo: ConsumptionComboSummary; label: string; color: string } =>
                        Boolean(entry)
                ),
        [consumptionCombos, selectedConsumptionKeys]
    );

    const renderTooltip = ({ active, payload }: TooltipProps<number, string>) => {
        if (!active || !payload?.length) {
            return null;
        }

        const point = payload[0]?.payload as MoodDataPoint | undefined;
        if (!point) {
            return null;
        }

        const eventsForDate = eventsByDate[point.dateLabel] || [];

        return (
            <div className="bg-base-100 text-base-content border border-base-300 rounded-box p-3 max-w-xs">
                <h4 className="font-semibold mb-2">{point.dateLabel}</h4>
                <div className="flex flex-col gap-3">
                    {eventsForDate.map((eventPoint) => (
                        <div key={eventPoint.id}>
                            <div className="flex items-center gap-2">
                                <span className="font-medium">{eventPoint.summary}</span>
                                <span className="badge badge-sm badge-outline">Mood {eventPoint.mood}</span>
                                {eventPoint.isConflict ? (
                                    <span className="badge badge-sm badge-error">Conflict</span>
                                ) : null}
                            </div>
                            {eventPoint.description ? (
                                <p className="text-sm whitespace-pre-wrap mt-1">{eventPoint.description}</p>
                            ) : null}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderMoodDot = (props: DotProps): JSX.Element => {
        const { cx, cy, payload } = props as DotProps & { payload?: MoodDataPoint };
        const point = payload as MoodDataPoint | undefined;
        const hasConflict = Boolean(point?.isConflict);

        const fill = hasConflict ? "#ef4444" : "#6366f1";
        const stroke = hasConflict ? "#7f1d1d" : "#312e81";
        const radius = hasConflict ? 5 : 4;

        const safeCx = typeof cx === "number" ? cx : 0;
        const safeCy = typeof cy === "number" ? cy : 0;

        return (
            <circle cx={safeCx} cy={safeCy} r={radius} fill={fill} stroke={stroke} strokeWidth={hasConflict ? 2 : 1} />
        );
    };

    const renderMorningLineDot = (props: DotProps): JSX.Element => {
        const payload = (props as DotProps & { payload?: MoodDataPoint }).payload;
        if (!payload || !payload.isMorning) {
            return <g />;
        }
        return renderMoodDot(props);
    };

    const renderEveningLineDot = (props: DotProps): JSX.Element => {
        const payload = (props as DotProps & { payload?: MoodDataPoint }).payload;
        if (!payload || payload.isMorning) {
            return <g />;
        }
        return renderMoodDot(props);
    };

    return (
        <div
            className={twm(
                `w-full ${CHART_HEIGHT_CLASS} bg-base-100 text-base-content border border-base-300 rounded-box p-4 pb-16`,
                className
            )}
        >
            <h3 className="font-semibold mb-4">Mood over time</h3>
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={data} margin={{ top: 10, right: 16, bottom: 10, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                    <XAxis dataKey="dateLabel" interval="preserveStartEnd" stroke="currentColor" tickLine={false} />
                    <YAxis
                        yAxisId="mood"
                        stroke="currentColor"
                        tickLine={false}
                        allowDecimals={false}
                        domain={[0, 10]}
                        width={32}
                    />
                    {selectedConsumptionKeys.length ? (
                        <YAxis
                            yAxisId="consumption"
                            orientation="right"
                            stroke="currentColor"
                            tickLine={false}
                            allowDecimals
                            width={40}
                        />
                    ) : null}
                    <Tooltip content={renderTooltip} cursor={{ stroke: "#6366f1", strokeDasharray: "3 3" }} />
                    <Legend verticalAlign="top" height={36} wrapperStyle={{ paddingBottom: 8 }} />
                    {selectedEntries.map((entry) => (
                        <Bar
                            key={entry.key}
                            yAxisId="consumption"
                            dataKey={(point: MoodDataPoint) => point.consumption[entry.key] ?? 0}
                            name={entry.label}
                            fill={entry.color}
                            opacity={0.4}
                            barSize={14}
                        >
                            <LabelList
                                position="top"
                                className="text-xs"
                                formatter={(value: number) =>
                                    value && !Number.isNaN(value) ? value.toFixed(value % 1 === 0 ? 0 : 2) : ""
                                }
                            />
                        </Bar>
                    ))}
                    <Line
                        type="monotone"
                        dataKey={(point: MoodDataPoint) => (point.isMorning ? point.mood : undefined)}
                        name="Morning mood"
                        stroke="#22c55e"
                        strokeWidth={2}
                        yAxisId="mood"
                        dot={renderMorningLineDot}
                        activeDot={{ r: 6 }}
                        connectNulls
                    />
                    <Line
                        type="monotone"
                        dataKey={(point: MoodDataPoint) => (!point.isMorning ? point.mood : undefined)}
                        name="Evening mood"
                        stroke="#6366f1"
                        strokeWidth={2}
                        yAxisId="mood"
                        dot={renderEveningLineDot}
                        activeDot={{ r: 6 }}
                        connectNulls
                    />
                    <Line
                        type="monotone"
                        dataKey="movingAverage3"
                        name="3-day moving average"
                        stroke="#9ca3af"
                        strokeWidth={2}
                        yAxisId="mood"
                        dot={false}
                    />
                    <Line
                        type="monotone"
                        dataKey="trend"
                        name="Trend"
                        stroke="#fbbf24"
                        strokeWidth={2}
                        strokeDasharray="6 4"
                        yAxisId="mood"
                        dot={false}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}
