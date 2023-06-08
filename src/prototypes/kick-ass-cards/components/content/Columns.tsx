import { twMerge } from "tailwind-merge";

export type ColumnsProps = React.PropsWithChildren<{
    className?: string;
}>;

export default function Columns({ className, children }: ColumnsProps) {
    return (
        <div
            className={twMerge("grid gap-4 my-4", className)}
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}
        >
            {children}
        </div>
    );
}
