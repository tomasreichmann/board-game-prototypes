import { useLocation, useRouteError } from "react-router-dom";
import Page from "../components/Page/Page";
import { routes } from "../routes";

export default function Route404() {
    const { pathname } = useLocation();

    return (
        <Page className="Route404 flex-1 h-svh flex flex-col box-border">
            <h1 className="text-xl font-bold mb-10">
                Sorry, can't find the page you are looking for
                <br />
                {pathname}
            </h1>
            <h2 className="text-3l font-bold">Try some of these:</h2>
            {routes
                .filter((route) => !route.hideFromNav && !route.path.includes(":"))
                .map((route) => (
                    <a key={route.path} href={route.path}>
                        {route.name}&ensp;({route.path})
                    </a>
                ))}
        </Page>
    );
}
