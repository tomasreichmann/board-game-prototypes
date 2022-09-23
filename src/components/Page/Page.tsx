import React from "react";
import clsx from "clsx";
// import "./Page.css";

export type PageProps = React.PropsWithChildren<{ className?: string }>;

export default function Page({ className, children }: PageProps) {
    return <div className={clsx("p-10", className)}>{children}</div>;
}
