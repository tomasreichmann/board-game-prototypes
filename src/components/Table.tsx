import { twMerge } from "tailwind-merge";

export type CellType = string | number | React.ReactNode;

export type GenericRowType = { [key: string | number]: CellType };

export type TableProps<Row extends GenericRowType> = {
    className?: string;
    rows: Row[];
    header?: ([keyof Row] | [keyof Row, CellType] | [keyof Row, CellType, number])[];
    footer?: Row;
    headerCellClassName?: string;
    bodyCellClassName?: string;
    footerCellClassName?: string;
    style?: React.CSSProperties;
    adapters?: Partial<{ [key in keyof Row]: (value: CellType) => CellType }>;
    children?: React.ReactNode;
};

export default function Table<Row extends GenericRowType>({
    className,
    rows,
    header = Object.keys(rows).map((key) => [key, key]),
    footer,
    headerCellClassName,
    bodyCellClassName,
    footerCellClassName,
    style,
    adapters = {},
    children,
}: TableProps<Row>) {
    return (
        <table className={twMerge("table-auto", className)} style={style}>
            <thead>
                <tr>
                    {header.map(([key, content = String(key), minWidth]) => (
                        <th
                            key={String(key)}
                            style={minWidth ? { minWidth } : undefined}
                            className={twMerge(
                                "border-b-2 border-jd-soil bg-jd-gold first:rounded-tl-md last:rounded-tr-md px-2 pt-1 text-left",
                                headerCellClassName
                            )}
                        >
                            {content}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="group">
                        {header.map(([key, _, minWidth]) => (
                            <td
                                key={String(key)}
                                style={minWidth ? { minWidth } : undefined}
                                className={twMerge(
                                    "bg-jd-paper px-2 group-even:bg-jd-paper-alt align-top max-h-4 overflow-y-auto",
                                    bodyCellClassName
                                )}
                            >
                                {adapters[key] ? (adapters[key] as (value: CellType) => CellType)(row[key]) : row[key]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
            {footer && (
                <tfoot>
                    <tr>
                        {header.map(([key]) => (
                            <th
                                key={String(key)}
                                className={twMerge(
                                    "border-b-2 border-jd-soil bg-jd-gold first:rounded-bl-md last:rounded-br-md px-2 pt-1 text-left",
                                    footerCellClassName
                                )}
                            >
                                {footer[key]}
                            </th>
                        ))}
                    </tr>
                </tfoot>
            )}
            {children}
        </table>
    );
}
