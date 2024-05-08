import { twMerge } from "tailwind-merge";
import ActorCard, { ActorCardProps, actorCardSchema } from "../gameComponents/ActorCard";
import AssetCard, { AssetCardProps, assetCardSchema } from "../gameComponents/AssetCard";
import Clock, { ClockProps } from "../Clock";
import Heading, { HeadingProps } from "../Heading";
import Text from "./Text";
import ComponentMetaType from "../generation/ComponentMetaType";
import { JSONSchemaType } from "ajv";
import clockJsonSchema from "../clockJsonSchema";

export type SceneProps = React.PropsWithChildren<
    {
        headingProps?: HeadingProps;
        className?: string;
    } & SceneType
>;

export type SceneType = {
    slug: string;
    title: string;
    flavorText?: string;
    scriptText?: string;
    actors?: ActorCardProps[];
    assets?: AssetCardProps[];
    clocks?: ClockProps[];
    // location: LocationProps;
    titleImageUri?: string;
    musicUri?: string;
    tags?: string[];
    mapUri?: string;
};

export default function Scene({
    className,
    headingProps,
    title,
    titleImageUri,
    flavorText,
    scriptText,
    actors,
    assets,
    clocks,
    children,
}: SceneProps) {
    /*scriptText && console.log(compileSync(scriptText));
    const mdxComponent = scriptText && compileSync(scriptText, { jsx: true, outputFormat: "function-body" });
    console.log("mdxComponent", mdxComponent);*/
    return (
        <section className={twMerge("Scene", className)}>
            <Heading {...headingProps} heading={title} imageUri={titleImageUri} />
            <div className="flex flex-col gap-4">
                <Text className="mt-4 italic font-serif text-kac-iron-light" variant="body">
                    {flavorText}
                </Text>
                {/* maybe using @mdx-js/mdx? {scriptText && <MdxArticle mdx={scriptText} />} */}
                {scriptText && (
                    <Text className="mt-4" variant="body">
                        {scriptText}{" "}
                    </Text>
                )}
                {actors && actors?.length > 0 && (
                    <div className="flex flex-col gap-4">
                        {actors.map((actor) => (
                            <ActorCard key={actor.slug} {...actor} />
                        ))}
                    </div>
                )}
                {assets && assets?.length > 0 && (
                    <div className="flex flex-col gap-4">
                        {assets.map((asset) => (
                            <AssetCard key={asset.slug} {...asset} />
                        ))}
                    </div>
                )}
                {clocks && clocks?.length > 0 && (
                    <div className="flex flex-col gap-4">
                        {clocks.map((clock) => (
                            <Clock key={clock.title} {...clock} />
                        ))}
                    </div>
                )}
            </div>
            {children}
        </section>
    );
}

// Define the SceneType schema based on the TypeScript type
const SceneTypeSchema = {
    type: "object",
    properties: {
        slug: { type: "string", title: "Slug" },
        title: { type: "string", title: "Title" },
        flavorText: { type: "string", nullable: true, title: "Flavor Text" },
        scriptText: { type: "string", nullable: true, title: "Script Text" },
        actors: {
            type: "array",
            title: "Actors",
            nullable: true,
            items: actorCardSchema,
        },
        assets: {
            type: "array",
            title: "Assets",
            nullable: true,
            items: assetCardSchema,
        },
        clocks: {
            type: "array",
            title: "Clocks",
            nullable: true,
            items: clockJsonSchema,
        },
        titleImageUri: { type: "string", nullable: true, title: "Title Image URI" },
        musicUri: { type: "string", nullable: true, title: "Music URI" },
        tags: {
            type: "array",
            title: "Tags",
            nullable: true,
            items: { type: "string", title: "Tag" },
        },
        mapUri: { type: "string", nullable: true, title: "Map URI" },
    },
    required: ["slug", "title"],
} as JSONSchemaType<SceneType>;
export const sceneMeta: ComponentMetaType<SceneType> = {
    Component: Scene,
    componentName: "Scene",
    schema: SceneTypeSchema,
    sampleProps: {
        slug: "noble-family-chase",
        title: "Chasing Away the Bandits",
        flavorText: "The noble family must reclaim their ancestral castle from the bandits.",
        actors: [
            {
                name: "Bohdan 'Złotoręki' Zelený",
                notes: "Highly competitive and envious of other blacksmiths. May try to sabotage their work or spread rumors.",
                occupation: "Skilled Blacksmith",
                size: "Bridge",
                threat: "May attempt to steal or damage equipment during repairs",
                toughness: 3,
                currentToughness: 3,
                imageUri: "/misc/blacksmith.png",
            },
        ],
        assets: [
            {
                icon: "/TOH/items/crossbow.png",
                title: "Masterwork Crossbow",
                effect: "Can attack any zone in line of sight.",
            },
        ],
        clocks: [
            {
                slug: "cart-chase",
                title: "Closing in on the cart",
                current: 8,
                total: 8,
                threat: "Cart gets away",
                reward: "Catch the cart",
            },
        ],
        titleImageUri: "castle-view.jpg",
        musicUri: "castle-theme.mp3",
        tags: ["Adventure", "Combat", "Noble Family"],
        mapUri: "/TOH/maps/crossroads.jpg",
    },
    description: "A part of a script that defines a single scene withing a larger story.",

    generationConfig: {
        props: {},
    },
};
