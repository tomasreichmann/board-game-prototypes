import { useMemo } from "react";
import { ReflectionEvent } from "@/components/Reflection/eventFilter";

type ConsumptionTotals = Record<string, Record<string, number>>;

interface ReflectionConsumptionTabProps {
    events: ReflectionEvent[];
}

const substanceDisplay = (value: string) =>
    value.length <= 3
        ? value.toUpperCase()
        : value.replace(/(^|[\s\-_/])(\w)/g, (match, boundary, char) => `${boundary}${char.toUpperCase()}`);

const unitDisplay = (value: string) =>
    value === "(unitless)"
        ? value
        : value.replace(/(^|[\s\-_/])(\w)/g, (match, boundary, char) => `${boundary}${char.toUpperCase()}`);

export default function ReflectionConsumptionTab({ events }: ReflectionConsumptionTabProps) {
    const { totals, substances, units } = useMemo(() => {
        const accumulator: ConsumptionTotals = {};
        const unitSet = new Set<string>();

        events.forEach((event) => {
            event.metadata.consumption?.forEach((item) => {
                if (item.amount === undefined || Number.isNaN(item.amount)) {
                    return;
                }

                const substance = item.substance;
                const unit = item.unit || "(unitless)";

                if (!accumulator[substance]) {
                    accumulator[substance] = {};
                }

                accumulator[substance][unit] = (accumulator[substance][unit] || 0) + item.amount;
                unitSet.add(unit);
            });
        });

        const sortedSubstances = Object.keys(accumulator).sort((a, b) => substanceDisplay(a).localeCompare(substanceDisplay(b)));
        const sortedUnits = Array.from(unitSet).sort((a, b) => unitDisplay(a).localeCompare(unitDisplay(b)));

        return {
            totals: accumulator,
            substances: sortedSubstances,
            units: sortedUnits,
        };
    }, [events]);

    if (!substances.length) {
        return (
            <div className="alert alert-info">
                <span>No consumption data available for the selected range.</span>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th>Substance</th>
                        {units.map((unit) => (
                            <th key={unit}>{unitDisplay(unit)}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {substances.map((substance) => (
                        <tr key={substance}>
                            <td className="font-medium">{substanceDisplay(substance)}</td>
                            {units.map((unit) => {
                                const value = totals[substance]?.[unit];
                                if (!value) {
                                    return <td key={unit}>-</td>;
                                }

                                const isInteger = Math.abs(value % 1) < Number.EPSILON;
                                return <td key={unit}>{isInteger ? value.toFixed(0) : value.toFixed(2)}</td>;
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
