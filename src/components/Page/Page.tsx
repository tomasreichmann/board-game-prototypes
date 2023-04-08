import React from "react";
import { twMerge } from "tailwind-merge";
// import "./Page.css";

export type PageProps = React.PropsWithChildren<{ className?: string }>;

export default function Page({ className, children }: PageProps) {
    return <div className={twMerge("p-10", className)}>{children}</div>;
}
