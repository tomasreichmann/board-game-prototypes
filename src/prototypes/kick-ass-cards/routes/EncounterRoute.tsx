import { encountersMap } from "../data/encounters";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
// required for MDX
import { Alert } from "react-daisyui";
import { ClockProps } from "../components/Clock";
import ReactPlayer from "react-player";
import { ActorCardProps } from "../components/gameComponents/ActorCard";
import { AssetCardProps } from "../components/gameComponents/AssetCard";
import { EffectCardProps } from "../components/gameComponents/EffectCard";
import BroadcastComponent from "../components/screenContent/BroadcastComponent";
import { ScreenContentTypeEnum } from "../services/broadcastScreen";
import { ImageProps } from "../components/Image";

const BroadcastImage = (props: ImageProps) => <BroadcastComponent type={ScreenContentTypeEnum.Image} props={props} />;
const BroadcastActorCard = (props: ActorCardProps) => (
    <BroadcastComponent type={ScreenContentTypeEnum.Actor} props={props} />
);
const BroadcastAssetCard = (props: AssetCardProps) => (
    <BroadcastComponent type={ScreenContentTypeEnum.Asset} props={props} />
);
const BroadcastEffectCard = (props: EffectCardProps) => (
    <BroadcastComponent type={ScreenContentTypeEnum.Effect} props={props} />
);
const BroadcastClock = (props: ClockProps) => <BroadcastComponent type={ScreenContentTypeEnum.Clock} props={props} />;

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
                        components={{
                            Alert,
                            img: BroadcastImage,
                            Player: ReactPlayer,
                            ActorCard: BroadcastActorCard,
                            AssetCard: BroadcastAssetCard,
                            EffectCard: BroadcastEffectCard,
                            Clock: BroadcastClock,
                        }}
                    />
                )}
            </article>
        </div>
    );
}
