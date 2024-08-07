import { twMerge } from "tailwind-merge";

export type ComponentListProps = React.PropsWithChildren<{ className?: string }>;

const ComponentList = ({ children, className }: ComponentListProps) => (
    <div className={twMerge("flex flex-row gap-4 flex-wrap my-4 perspective break-inside-avoid", className)}>
        {children}
    </div>
);

export default ComponentList;
