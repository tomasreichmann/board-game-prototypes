import { twMerge } from "tailwind-merge";

export type AsideProps = React.PropsWithChildren<{
    className?: string;
    noMargin?: boolean;
}>;

export default function Aside({ className, noMargin, children }: AsideProps) {
    return (
        <div
            className={twMerge("md:grid md:gap-4 my-4", noMargin && "md:-my-4", className)}
            style={{ gridTemplateColumns: "1fr auto" }}
        >
            {children}
        </div>
    );
}
