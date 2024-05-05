import React, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { routes } from "../../routes";
import Button from "../../prototypes/kick-ass-cards/components/content/Button";

export const Navigation = ({ className, style, ...restProps }: HTMLAttributes<HTMLDivElement>) => {
    return (
        <div
            className={twMerge(
                "sticky top-0 left-0 z-50 py-4 px-4 md:px-8 md:py-8 print:hidden bg-opacity-90 ",
                className
            )}
            style={{
                background: "linear-gradient(to bottom, rgb(50 73 123 / var(--tw-bg-opacity)) 80%, transparent 100%)",
                ...style,
            }}
            {...restProps}
        >
            <div className="top-0 flex flex-row flex-wrap">
                <div className="flex flex-row flex-wrap items-baseline -mx-1 pb-4 gap-2">
                    {routes.map(({ name, path }) => {
                        const isCurrentRoute = path === window.location.pathname;
                        const isHome = path === "/";
                        return (
                            <Button
                                key={path}
                                href={path}
                                variant="text"
                                className={twMerge(
                                    "text-sm font-kacBody font-bold px-1 py-0 leading-tight text-white hover:text-white hover:border-white hover:border-opacity-50",
                                    isHome && "text-lg tracking-tight leading-none",
                                    isCurrentRoute ? "underline" : "no-underline"
                                )}
                                color="info"
                            >
                                {name}
                            </Button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
