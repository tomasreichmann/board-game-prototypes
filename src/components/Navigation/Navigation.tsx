import React, { HTMLAttributes } from "react";
import { Button } from "react-daisyui";
import { twMerge } from "tailwind-merge";
import { routes } from "../../routes";

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
            <div className="flex flex-row flex-wrap gap-4 items-center">
                {routes.map(({ name, path }) => (
                    <Button key={path} href={path} size="sm" color="primary">
                        {name}
                    </Button>
                ))}
            </div>
        </div>
    </div>
);
