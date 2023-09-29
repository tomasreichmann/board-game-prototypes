import { twMerge } from "tailwind-merge";

export type ColumnsProps = React.PropsWithChildren<{
    className?: string;
    noMargin?: boolean;
}>;

export default function Columns({ className, noMargin, children }: ColumnsProps) {
    return (
        <div
            className={twMerge("md:grid md:gap-4 my-4", noMargin && "md:-my-4", className)}
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
        >
            {children}
        </div>
    );
}
