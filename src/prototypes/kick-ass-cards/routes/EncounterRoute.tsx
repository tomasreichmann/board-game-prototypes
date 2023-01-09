import { encountersMap } from "../data/encounters";
import { Outlet, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
// required for MDX
import { Alert } from "react-daisyui";
import BroadcastImage from "../components/screenContent/BroadcastImage";
import Clock from "../components/Clock";
import ReactPlayer from "react-player";
import ActorCard from "../components/gameComponents/ActorCard";
import AssetCard from "../components/gameComponents/AssetCard";

export default function EncounterRoute() {
    const [isPending, setIsPending] = useState(true);
    const [Encounter, setEncounter] = useState<React.ComponentType<{
        components: { [key: string]: React.ComponentType<any> };
    }> | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const { encounterSlug } = useParams<"encounterSlug">();
    const encounterDefinition = (encounterSlug && encountersMap[encounterSlug]) || {
        path: undefined,
        title: undefined,
    };
    const { path, title } = encounterDefinition;

    useEffect(() => {
        if (!path) {
            return;
        }
        setIsPending(true);
        setError(null);
        setEncounter(null);
        let isValid = true;
        const pathWithoutExtension = path.replace("/.mdx$/", "");
        console.log(`../data/encounters/${pathWithoutExtension}.mdx`);
        import(`../data/encounters/${pathWithoutExtension}.mdx`)
            .then((data) => {
                if (isValid) {
                    console.dir(data);
                    setEncounter(() => data.default);
                    setIsPending(false);
                }
            })
            .catch((error) => {
                console.error(`../data/encounters/${path} Error:`, error);
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
        <div className="w-full text-kac-iron p-4 bg-white container">
            <article className="prose text-kac-iron max-w-none prose-headings:font-kacHeading prose-headings:text-kac-blood prose-a:text-kac-monster prose-strong:text-kac-iron-dark prose-blockquote:text-kac-iron-dark prose-em:text-kac-cloth prose-ul:[--tw-prose-bullets:rgb(123,0,29)]">
                {isPending && (
                    <h1>
                        {title}
                        <br />
                        ...loading
                    </h1>
                )}
                {Encounter !== null && (
                    <Encounter
                        key={path}
                        components={{ Alert, img: BroadcastImage, Player: ReactPlayer, Clock, ActorCard, AssetCard }}
                    />
                )}
            </article>
        </div>
    );
}
