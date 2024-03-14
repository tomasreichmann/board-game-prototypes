import { twMerge } from "tailwind-merge";

export type PendingProps = React.HTMLAttributes<HTMLSpanElement>;

export default function Pending({ className, ...restProps }: PendingProps) {
    return (
        <span
            className={twMerge(
                "inline-block h-6 w-6 m-1 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em]",
                className
            )}
            {...restProps}
        />
    );
}
