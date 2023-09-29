import { encountersMap } from "../../data/encounters";
import { useParams } from "react-router-dom";
import React, { Component, DetailedHTMLProps, ImgHTMLAttributes, useEffect, useState } from "react";
// required for MDX
import { Alert } from "react-daisyui";
import ReactPlayer from "react-player";
import BroadcastActor from "../screenContent/BroadcastActor";
import BroadcastAsset from "../screenContent/BroadcastAsset";
import BroadcastClock from "../screenContent/BroadcastClock";
import BroadcastEffect from "../screenContent/BroadcastEffect";
import OutcomeCard from "../gameComponents/OutcomeCard";
import Hand from "../layout/Hand";
import EncounterImage from "../EncounterImage";
import ComponentList from "../ComponentList";
import BroadcastPaper from "../screenContent/BroadcastPaper";
import BroadcastHeading from "../screenContent/BroadcastHeading";
import Pending from "../../../../components/Pending";
import Article from "../layout/Article";
import Columns from "../content/Columns";
import Spread from "../layout/Spread";
import { MDXProvider } from "@mdx-js/react";

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
            <Article>
                <MDXProvider
                    components={{
                        Alert,
                        List: ComponentList,
                        Columns,
                        Hand,
                        Outcome: OutcomeCard,
                        img: EncounterImage as any,
                        Heading: BroadcastHeading,
                        Player: ReactPlayer,
                        Spread,
                        Actor: BroadcastActor,
                        Asset: BroadcastAsset,
                        Effect: BroadcastEffect,
                        Clock: BroadcastClock,
                        Paper: BroadcastPaper,
                    }}
                >
                    {Encounter !== null && <Encounter key={path} />}
                </MDXProvider>
            </Article>
        </div>
    );
}
