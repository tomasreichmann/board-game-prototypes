import clsx from "clsx";

export type ComponentListProps = React.PropsWithChildren<{ className?: string }>;

const ComponentList = ({ children, className }: ComponentListProps) => (
    <div className={clsx("flex flex-row gap-4 flex-wrap my-4", className)}>{children}</div>
);

export default ComponentList;
