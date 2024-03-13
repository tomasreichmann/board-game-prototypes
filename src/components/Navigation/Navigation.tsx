import react, { HTMLAttributes } from "react";
import { Button } from "react-daisyui";
import { twMerge } from "tailwind-merge";
import { routes } from "../../routes";

export const Navigation = ({ className, style, ...restProps }: HTMLAttributes<HTMLDivElement>) => (
    <div className={twMerge("sticky top-0 left-0 z-50 pb-1 md:pb-5 print:hidden", className)} {...restProps}>
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
