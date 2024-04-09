import React, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { routes } from "../../routes";
import Button from "../../prototypes/kick-ass-cards/components/content/Button";

export const Navigation = ({ className, style, ...restProps }: HTMLAttributes<HTMLDivElement>) => (
    <div
        className={twMerge(
            "sticky top-0 left-0 z-50 pb-1 pt-4 px-4 md:px-8 md:pb-5 print:hidden bg-opacity-90 ",
            className
        )}
        style={{
            background: "linear-gradient(to bottom, rgb(255 255 255 / var(--tw-bg-opacity)) 80%, transparent 100%)",
            ...style,
        }}
        {...restProps}
    >
        <div className="top-0 flex flex-row flex-wrap gap-x-4 gap-y-2">
            <div className="flex flex-row flex-wrap gap-x-4 gap-y-2 items-center">
                {routes.map(({ name, path }) => (
                    <Button key={path} href={path} className="text-sm font-kacBody font-bold px-3 py-1" color="info">
                        {name}
                    </Button>
                ))}
            </div>
        </div>
    </div>
);
