import "./JustDwarvesPrototype.css";
import { Outlet } from "react-router-dom";
import { Button } from "react-daisyui";
import { PropsWithChildren } from "react";
import { RouteDefinition } from "../../routeTypes";
import Logo from "./just_dwarves_logo.svg";
import Icon from "../../components/Icon/Icon";
import InfoRoute from "./components/routes/InfoRoute";

export const justDwarvesName = "Just Dwarves";
export const justDwarvesPath = "/just-dwarves";
export const justDwarvesScreenStorageKey = "just-dwarves-screen";
export const justDwarvesPrintStorageKey = "just-dwarves-print";

export const justDwarvesSubRoutes: RouteDefinition[] = [
    {
        name: justDwarvesName,
        path: justDwarvesPath + "/",
        Component: InfoRoute,
    },
    /*{
        name: "Components",
        path: justDwarvesPath + "/components",
        Component: ComponentsRoute,
    },
    {
        name: "Encounters",
        path: justDwarvesPath + "/encounters",
        Component: EncountersRoute,
        children: [
            {
                name: "Encounter",
                path: justDwarvesPath + "/encounters/:encounterSlug",
                Component: EncounterRoute,
            },
        ],
    },
    {
        name: "Screen",
        path: justDwarvesPath + "/screen",
        Component: ScreenRoute,
    },
    {
        name: "Print",
        path: justDwarvesPath + "/print",
        Component: PrintRoute,
    },*/
];

export default function JustDwarves({ children }: PropsWithChildren) {
    return (
        <div
            className="h-screen print:h-auto relative flex flex-col items-stretch overflow-auto bg-jd-paper print:bg-white text-jd-iron font-jd-body"
            data-theme="JustDwarvesPrototype"
        >
            <div
                className="sticky top-0 left-0 z-50 py-1 md:py-5 px-2 md:px-10 bg-opacity-90 bg-blend-multiply print:hidden"
                style={{
                    background:
                        "linear-gradient(to bottom, rgb(226 223 216 / var(--tw-bg-opacity)) 80%, transparent 100%)",
                }}
            >
                <div className="top-0 flex flex-row flex-wrap gap-x-4 gap-y-2 text-jd-iron">
                    <h1 className="font-jd-heading text-4xl min-w-fit flex-1">
                        <a
                            href={justDwarvesPath}
                            className="text-inherit font-inherit inline-flex uppercase leading-none items-center flex-row flex-wrap hover:text-jd-soil transition-colors"
                        >
                            <Logo className="h-14" />
                            &ensp;
                            <span className="inline-flex flex-col">
                                <span>{justDwarvesName}</span>
                                <span className="font-jd-body leading-none font-bold text-xl tracking-wide uppercase">
                                    mine, trade, drink, repeat
                                </span>
                            </span>
                        </a>
                    </h1>
                    <div className="flex flex-row flex-wrap gap-4 items-center">
                        {justDwarvesSubRoutes.slice(1).map(({ name, path }) => (
                            <a
                                key={path}
                                href={path}
                                className="btn btn-sm bg-jd-gold text-jd-iron hover:bg-jd-gold-light border-jd-gold-darkest hover:text-jd-gold-darkest hover:border-jd-gold"
                            >
                                {name}
                            </a>
                        ))}
                        <a
                            href="/"
                            className="btn btn-sm bg-jd-gold text-jd-iron hover:bg-jd-gold-light border-jd-gold-darkest hover:text-jd-gold-darkest hover:border-jd-gold"
                        >
                            Prototypes
                        </a>
                    </div>
                </div>
            </div>
            <Outlet />
            {children}
        </div>
    );
}
