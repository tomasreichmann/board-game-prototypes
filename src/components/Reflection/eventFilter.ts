import csvRaw from "./reflection_filtered.csv?raw";

export interface ConsumptionItem {
    substance: string;
    amount?: number;
    unit?: string;
}

export interface ReflectionEventMetadata {
    mood?: number;
    moodReason?: string;
    sleepHours?: number;
    isConflict?: boolean;
    conflictDescription?: string;
    consumption?: ConsumptionItem[];
    consumptionMap?: Record<string, number>;
}

export interface ReflectionEvent {
    summary: string;
    location: string;
    description: string;
    metadata: ReflectionEventMetadata;
    startRaw: string;
    endRaw: string;
    startDate: Date | null;
    endDate: Date | null;
}

export interface EventDateRange {
    start?: Date;
    end?: Date;
}

const substanceAliases: Record<string, string> = {
    alk: "alcohol",
    alcohol: "alcohol",
    alkohol: "alcohol",
    coke: "c",
    "2c": "2cb",
    "3mmc": "3m",
    "4mmc": "4m",
};

const unitAliases: Record<string, string> = {
    sip: "sips",
    drop: "drops",
    bump: "bumps",
    line: "lines",
    lines: "lines",
    drink: "drinks",
    glass: "drinks",
};

const normaliseSubstanceName = (name: string): string => {
    const trimmed = name.trim();
    const lower = trimmed.toLowerCase();
    return substanceAliases[lower] ?? lower;
};

const normaliseUnitName = (unit?: string): string | undefined => {
    if (!unit) {
        return undefined;
    }
    const trimmed = unit.trim();
    if (!trimmed) {
        return undefined;
    }
    const lower = trimmed.toLowerCase();
    return unitAliases[lower] ?? lower;
};

const unitCoversionMap: Record<string, { unit: string; multiplier: number }> = {
    sips: {
        unit: "glasses",
        multiplier: 0.25,
    },
    bumps: {
        unit: "lines",
        multiplier: 0.5,
    },
};

const convertUnits = (amount: number, unit: string): { amount: number; unit: string } => {
    if (unit in unitCoversionMap) {
        const conversion = unitCoversionMap[unit];
        return {
            amount: amount * conversion.multiplier,
            unit: conversion.unit,
        };
    }
    return {
        amount,
        unit,
    };
};

export const createConsumptionKey = (substance: string, unit?: string) => {
    const normalisedSubstance = normaliseSubstanceName(substance);
    const normalisedUnitValue = normaliseUnitName(unit);
    const normalisedUnit = normalisedUnitValue ?? "";
    return `${normalisedSubstance}__${normalisedUnit}`;
};

export interface ConsumptionComboSummary {
    key: string;
    substance: string;
    unit?: string;
}

const formatToken = (value: string): string =>
    value.replace(/(^|[\s\-_/])(\w)/g, (match, boundary, char) => `${boundary}${char.toUpperCase()}`);

export const formatConsumptionLabel = (combo: ConsumptionComboSummary): string => {
    const substanceLabel = combo.substance.length <= 3 ? combo.substance.toUpperCase() : formatToken(combo.substance);
    return combo.unit ? `${substanceLabel} (${formatToken(combo.unit)})` : substanceLabel;
};

const parseCsv = (input: string): string[][] => {
    const rows: string[][] = [];
    let row: string[] = [];
    let field = "";
    let inQuotes = false;

    for (let index = 0; index < input.length; index += 1) {
        const char = input[index];

        if (char === "\r") {
            continue;
        }

        if (char === '"') {
            const peek = input[index + 1];
            if (inQuotes && peek === '"') {
                field += '"';
                index += 1;
            } else {
                inQuotes = !inQuotes;
            }
            continue;
        }

        if (char === "," && !inQuotes) {
            row.push(field);
            field = "";
            continue;
        }

        if (char === "\n" && !inQuotes) {
            row.push(field);
            rows.push(row);
            row = [];
            field = "";
            continue;
        }

        field += char;
    }

    if (field.length > 0 || row.length > 0) {
        row.push(field);
        rows.push(row);
    }

    return rows;
};

const normaliseDateString = (value: string): string => {
    if (!value) {
        return value;
    }

    if (value.includes("T")) {
        return value;
    }

    if (value.length === 10) {
        return `${value}T00:00:00`;
    }

    const firstSpaceIndex = value.indexOf(" ");
    if (firstSpaceIndex === -1) {
        return value;
    }

    return value.replace(" ", "T");
};

const parseDate = (value: string): Date | null => {
    if (!value) {
        return null;
    }

    const date = new Date(normaliseDateString(value));
    return Number.isNaN(date.valueOf()) ? null : date;
};

interface MetadataParserContext {
    raw: string;
    lines: string[];
    metadata: ReflectionEventMetadata;
}

type MetadataParser = (context: MetadataParserContext) => void;

const createMoodParser = (): MetadataParser => {
    const moodRegex = /^(?:track\s+)?mood\s*:\s*([^\s]+)?(?:\s+(.*))?$/i;

    return ({ lines, metadata }) => {
        for (const line of lines) {
            const normalised = line.replace(/\u00a0/g, " ").trim();
            const match = moodRegex.exec(normalised);
            if (!match) {
                continue;
            }

            const moodValue = match[1];
            const moodReason = match[2]?.trim();

            const parsedMood = moodValue ? Number.parseInt(moodValue, 10) : Number.NaN;
            if (!Number.isNaN(parsedMood)) {
                metadata.mood = parsedMood;
            }

            if (moodReason) {
                metadata.moodReason = moodReason;
            }

            break;
        }
    };
};

const createConflictParser = (): MetadataParser => {
    const conflictRegex = /^conflicts?\s*:\s*(.*)$/i;

    return ({ lines, metadata }) => {
        for (const line of lines) {
            const match = conflictRegex.exec(line.replace(/\u00a0/g, " ").trim());
            if (!match) {
                continue;
            }

            const rawValue = match[1] ?? "";
            const value = rawValue.trim();
            const hasConflict = value.length > 0 && value !== "-";

            metadata.isConflict = hasConflict;
            if (hasConflict) {
                metadata.conflictDescription = value;
            }

            break;
        }
    };
};

const createSleepParser = (): MetadataParser => {
    const sleepRegex = /^sleep?\s*:\s*(.*)h?$/i;

    return ({ lines, metadata }) => {
        for (const line of lines) {
            const match = sleepRegex.exec(line.replace(/\u00a0/g, " ").trim());
            if (!match) {
                continue;
            }

            const rawValue = match[1] ?? "";
            const value = rawValue.trim();
            metadata.sleepHours = parseFloat(value);

            break;
        }
    };
};

const createConsumptionParser = (): MetadataParser => {
    const consumptionRegex = /^consumption\s*:\s*(.*)$/i;

    return ({ lines, metadata }) => {
        for (const line of lines) {
            const match = consumptionRegex.exec(line.replace(/\u00a0/g, " ").trim());
            if (!match) {
                continue;
            }

            const rawValue = match[1]?.trim() ?? "";
            if (!rawValue || rawValue === "-") {
                metadata.consumption = [];
                break;
            }

            const items: ConsumptionItem[] = [];
            const consumptionMap: Record<string, number> = {};
            const chunks = rawValue
                .split(",")
                .map((chunk) => chunk.trim())
                .filter((chunk) => chunk.length > 0);

            chunks.forEach((chunk) => {
                const match = chunk.match(/^(\S+)\s*(.*)$/);
                if (!match) {
                    return;
                }

                const substanceToken = match[1];
                const remainder = match[2]?.trim() ?? "";

                const canonicalSubstance = normaliseSubstanceName(substanceToken);

                let amount: number | undefined;
                let unit: string | undefined;

                if (remainder) {
                    const fractionMatch = remainder.match(/^(-?[0-9]+)\s*\/\s*([0-9]+)(.*)$/);
                    if (fractionMatch) {
                        const numerator = Number.parseInt(fractionMatch[1], 10);
                        const denominator = Number.parseInt(fractionMatch[2], 10);
                        if (!Number.isNaN(numerator) && !Number.isNaN(denominator) && denominator !== 0) {
                            amount = Number.parseFloat((numerator / denominator).toFixed(4));
                        }
                        const remainderAfterFraction = fractionMatch[3]?.trim() ?? "";
                        if (remainderAfterFraction && remainderAfterFraction !== "-") {
                            unit = normaliseUnitName(remainderAfterFraction);
                        }
                    } else {
                        const amountMatch = remainder.match(/^(-?[0-9]+(?:\.[0-9]+)?)\s*(.*)$/);
                        if (amountMatch) {
                            const parsedAmount = Number.parseFloat(amountMatch[1]);
                            if (!Number.isNaN(parsedAmount)) {
                                amount = parsedAmount;
                            }
                            const rawUnit = amountMatch[2]?.trim() || undefined;
                            if (rawUnit && rawUnit !== "-") {
                                unit = normaliseUnitName(rawUnit);
                            }
                        }
                    }
                }

                const consumptionItem: ConsumptionItem = {
                    substance: canonicalSubstance,
                    amount,
                    unit,
                };
                items.push(consumptionItem);

                if (amount !== undefined) {
                    const normalizedUnit = normaliseUnitName(unit);
                    const { amount: convertedAmount, unit: convertedUnit } = normalizedUnit
                        ? convertUnits(amount, normalizedUnit)
                        : { amount, unit: normalizedUnit };
                    const key = createConsumptionKey(canonicalSubstance, convertedUnit);
                    consumptionMap[key] = (consumptionMap[key] ?? 0) + convertedAmount;
                }
            });

            metadata.consumption = items;
            metadata.consumptionMap = Object.keys(consumptionMap).length ? consumptionMap : undefined;
            break;
        }
    };
};

const metadataParsers: MetadataParser[] = [
    createMoodParser(),
    createConflictParser(),
    createSleepParser(),
    createConsumptionParser(),
];

const parseDescriptionMetadata = (description: string): ReflectionEventMetadata => {
    if (!description) {
        return {};
    }

    const normalised = description.replace(/\r/g, "").replace(/\u00a0/g, " ");
    const lines = normalised
        .split(/\n+/)
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

    const metadata: ReflectionEventMetadata = {};
    const context: MetadataParserContext = {
        raw: description,
        lines,
        metadata,
    };

    metadataParsers.forEach((parser) => parser(context));

    return metadata;
};

const buildEvents = (): ReflectionEvent[] => {
    const rows = parseCsv(csvRaw.trim());
    if (rows.length === 0) {
        return [];
    }

    const header = rows[0];
    const dataRows = rows.slice(1).filter((columns) => columns.some((column) => column.trim().length > 0));

    const summaryIndex = header.indexOf("Summary");
    const locationIndex = header.indexOf("Location");
    const descriptionIndex = header.indexOf("Description");
    const startIndex = header.indexOf("Start Date/Time");
    const endIndex = header.indexOf("End Date/Time");

    return dataRows
        .map((columns) => {
            const startRaw = columns[startIndex] || "";
            const endRaw = columns[endIndex] || "";

            return {
                summary: columns[summaryIndex] || "",
                location: columns[locationIndex] || "",
                description: columns[descriptionIndex] || "",
                metadata: parseDescriptionMetadata(columns[descriptionIndex] || ""),
                startRaw,
                endRaw,
                startDate: parseDate(startRaw),
                endDate: parseDate(endRaw),
            } as ReflectionEvent;
        })
        .sort((a, b) => {
            const aTime = a.startDate ? a.startDate.getTime() : 0;
            const bTime = b.startDate ? b.startDate.getTime() : 0;
            return aTime - bTime;
        });
};

const reflectionEvents = buildEvents();

const isWithinRange = (event: ReflectionEvent, range: EventDateRange): boolean => {
    const eventStart = event.startDate?.getTime();
    if (range.start) {
        const startTime = range.start.getTime();
        if (eventStart === undefined || eventStart < startTime) {
            return false;
        }
    }

    if (range.end) {
        const endTime = range.end.getTime();
        if (eventStart === undefined || eventStart > endTime) {
            return false;
        }
    }

    return true;
};

export const getReflectionEvents = (): ReflectionEvent[] => [...reflectionEvents];

export const filterReflectionEvents = (range: EventDateRange = {}): ReflectionEvent[] => {
    if (!range.start && !range.end) {
        return getReflectionEvents();
    }

    return reflectionEvents.filter((event) => isWithinRange(event, range));
};

export const getConsumptionCombos = (events: ReflectionEvent[]): ConsumptionComboSummary[] => {
    const map = new Map<string, ConsumptionComboSummary>();

    events.forEach((event) => {
        event.metadata.consumption?.forEach((item) => {
            if (item.amount === undefined || Number.isNaN(item.amount)) {
                return;
            }
            const normalizedUnit = normaliseUnitName(item.unit);
            const convertedUnit =
                normalizedUnit && normalizedUnit in unitCoversionMap
                    ? unitCoversionMap[normalizedUnit].unit
                    : normalizedUnit;
            const key = createConsumptionKey(item.substance, normaliseUnitName(convertedUnit));
            if (!map.has(key)) {
                map.set(key, {
                    key,
                    substance: item.substance,
                    unit: convertedUnit,
                });
            }
        });
    });

    return Array.from(map.values()).sort((a, b) => {
        const labelA = `${a.substance}${a.unit ? ` (${a.unit})` : ""}`.toLowerCase();
        const labelB = `${b.substance}${b.unit ? ` (${b.unit})` : ""}`.toLowerCase();
        return labelA.localeCompare(labelB);
    });
};
