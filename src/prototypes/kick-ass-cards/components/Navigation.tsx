import react, { HTMLAttributes } from "react";
import { Button } from "react-daisyui";
import { twMerge } from "tailwind-merge";
import { kickAssCardsNavigationSubRoutes, kickAssCardsPath, kickAssCardsSubRoutes } from "./routes/routes";
import Icon from "./Icon";

export const Navigation = ({ className, style, ...restProps }: HTMLAttributes<HTMLDivElement>) => (
    <div
        className={twMerge(
            "sticky top-0 left-0 z-50 py-1 md:py-5 px-2 md:px-10 bg-opacity-90 bg-blend-multiply print:hidden",
            className
        )}
        style={{
            background: "linear-gradient(to bottom, rgb(84 20 35 / var(--tw-bg-opacity)) 80%, transparent 100%)",
            ...style,
        }}
        {...restProps}
    >
        <div className="top-0 flex flex-row flex-wrap gap-x-4 gap-y-2 text-kac-bone">
            <h1 className="font-kacLogo text-3xl min-w-fit flex-1">
                <a
                    href={kickAssCardsPath}
                    className="text-inherit font-inherit inline-flex flex-row flex-wrap hover:text-kac-bone-light transition-colors"
                >
                    <Icon icon="kickAssCards" className="h-10" />
                    Kick Ass Cards
                </a>
            </h1>
            <div className="flex flex-row flex-wrap gap-4 items-center">
                {kickAssCardsNavigationSubRoutes.map(({ name, path }) => (
                    <Button key={path} href={path} size="xs" color="secondary">
                        {name}
                    </Button>
                ))}
                <Button href="/" size="xs" color="info">
                    Prototypes
                </Button>
            </div>
        </div>
    </div>
);
