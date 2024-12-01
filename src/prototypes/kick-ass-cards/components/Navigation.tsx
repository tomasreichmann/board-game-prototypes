import react, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { mightyDecksNavigationSubRoutes, mightyDecksPath, mightyDecksSubRoutes } from "./routes/routes";
import Icon from "./Icon";
import { H1 } from "./content/Text";
import Button from "./controls/Button";

export const Navigation = ({ className, style, ...restProps }: HTMLAttributes<HTMLDivElement>) => (
    <div
        className={twMerge(
            "sticky top-0 left-0 z-50 py-3 md:py-5 px-2 md:px-10 bg-opacity-90 bg-blend-multiply print:hidden",
            className
        )}
        style={{
            background: "linear-gradient(to bottom, rgb(84 20 35 / var(--tw-bg-opacity)) 80%, transparent 100%)",
            ...style,
        }}
        {...restProps}
    >
        <div className="top-0 flex flex-row flex-wrap gap-x-4 gap-y-2 items-center justify-end text-kac-bone">
            <H1 className="min-w-fit flex-1 text-kac-bone">
                <a
                    href={mightyDecksPath}
                    className="text-inherit font-inherit font-bold hover:text-kac-bone-light transition-colors"
                >
                    <img src="/KAC/mighty_decks_logo.png" alt="Mighty Decks" className="h-16 -my-5" />
                </a>
            </H1>
            {mightyDecksNavigationSubRoutes.map(({ name, path }) => (
                <Button key={path} href={path} size="sm" color="secondary">
                    {name}
                </Button>
            ))}
            <Button href="/" size="sm" color="info">
                Prototypes
            </Button>
        </div>
    </div>
);
