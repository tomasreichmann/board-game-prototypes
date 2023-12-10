import { useParams } from "react-router-dom";
import { H2 } from "../content/Text";
import { Navigation } from "../Navigation";
import SmartDoc from "../smartDocs/SmartDoc";
import { SmartDocPathContextProvider } from "../smartDocs/useSmartDoc";

export default function SmartDocRoute() {
    const { path } = useParams<"path">();

    return (
        <>
            <Navigation />
            <div className="print:m-0 w-full text-kac-iron px-2 py-5 md:px-10 bg-white">
                {path === undefined ? (
                    <H2 color="danger">Invalid Path</H2>
                ) : (
                    <SmartDocPathContextProvider>
                        <SmartDoc path={path} />
                    </SmartDocPathContextProvider>
                )}
            </div>
        </>
    );
}
