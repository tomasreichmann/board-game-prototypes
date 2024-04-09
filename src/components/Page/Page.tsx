import React from "react";
import { twMerge } from "tailwind-merge";
import { Navigation } from "../Navigation/Navigation";
// import "./Page.css";

export type PageProps = React.PropsWithChildren<{ className?: string; NavigationComponent?: React.ComponentType }>;

export default function Page({ className, NavigationComponent = Navigation, children }: PageProps) {
    return (
        <div className={className}>
            <NavigationComponent />
            <div className="flex-1 px-4 md:px-8 py-4 md:pb-8 flex flex-col">{children}</div>
        </div>
    );
}
