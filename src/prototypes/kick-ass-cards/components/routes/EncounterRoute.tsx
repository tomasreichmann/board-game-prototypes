import { encountersMap } from "../../data/encounters";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ArticleWithTitle from "../layout/ArticleWithTitle";
import { MDXProvider } from "@mdx-js/react";
import { defaultMdxComponentMap } from "../content/MdxArticle";
import ErrorMessage from "../adventures/ErrorMessage";
import Pending from "@/components/form/Pending";

export default function EncounterRoute() {
    const [isPending, setIsPending] = useState(true);
    const [Encounter, setEncounter] = useState<React.ComponentType | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const { encounterSlug } = useParams<"encounterSlug">();
    const encounterDefinition = (encounterSlug && encountersMap[encounterSlug]) || {
        path: undefined,
        title: undefined,
    };
    const { path } = encounterDefinition;

    useEffect(() => {
        if (!path) {
            return;
        }
        setIsPending(true);
        setError(null);
        setEncounter(null);
        let isValid = true;
        const pathWithoutExtension = path.replace("/.mdx$/", "");
        import(`../../data/encounters/${pathWithoutExtension}.mdx`)
            .then((data) => {
                if (isValid) {
                    console.dir(data);
                    setEncounter(() => data.default);
                    setIsPending(false);
                }
            })
            .catch((error) => {
                console.error(`../../data/encounters/${path} Error:`, error);
                setError(error);
            });
        return () => {
            isValid = false;
        };
    }, [path]);

    if (!path) {
        return null;
    }

    return (
        <div className="w-full text-kac-iron p-4 bg-white container mx-auto">
            {isPending && <Pending />}
            {!isPending && !Encounter && <ErrorMessage heading="⚠ Error loading encounter" />}
            <ArticleWithTitle>
                <MDXProvider components={defaultMdxComponentMap}>
                    {Encounter !== null && <Encounter key={path} />}
                </MDXProvider>
            </ArticleWithTitle>
        </div>
    );
}
