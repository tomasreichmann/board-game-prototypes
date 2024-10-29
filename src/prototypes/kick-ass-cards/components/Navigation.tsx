import react, { HTMLAttributes } from "react";
import { Button } from "react-daisyui";
import { twMerge } from "tailwind-merge";
import { mightyDecksNavigationSubRoutes, mightyDecksPath, mightyDecksSubRoutes } from "./routes/routes";
import Icon from "./Icon";
import { H1 } from "./content/Text";

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
            <H1 className="min-w-fit flex-1 text-kac-bone">
                <a
                    href={mightyDecksPath}
                    className="text-inherit font-inherit font-bold inline-flex flex-row flex-wrap hover:text-kac-bone-light transition-colors"
                >
                    Mighty Decks
                </a>
            </H1>
            <div className="flex flex-row flex-wrap gap-4 items-center">
                {mightyDecksNavigationSubRoutes.map(({ name, path }) => (
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
