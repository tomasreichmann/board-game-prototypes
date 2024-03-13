import React from "react";
import { twMerge } from "tailwind-merge";
import { Navigation } from "../Navigation/Navigation";
// import "./Page.css";

export type PageProps = React.PropsWithChildren<{ className?: string; NavigationComponent?: React.ComponentType }>;

export default function Page({ className, NavigationComponent = Navigation, children }: PageProps) {
    return (
        <div className={twMerge("p-10", className)}>
            <NavigationComponent />
            {children}
        </div>
    );
}
