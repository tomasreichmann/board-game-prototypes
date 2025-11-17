import { defaultMdxComponentMap } from "@/prototypes/kick-ass-cards/components/content/MdxArticle";

// Declare MDX-provided components as globals for editor/type-checker convenience.
// These names match keys from `defaultMdxComponentMap` in
// `src/prototypes/kick-ass-cards/components/content/MdxArticle.tsx`.
// This makes referencing components like `Actor` or `Asset` inside `.mdx` files
// not require an explicit import while keeping proper typing in the editor.

declare global {
    const a: (typeof defaultMdxComponentMap)["a"];
    const Alert: (typeof defaultMdxComponentMap)["Alert"];
    const Aside: (typeof defaultMdxComponentMap)["Aside"];
    const List: (typeof defaultMdxComponentMap)["List"];
    const p: (typeof defaultMdxComponentMap)["p"];
    const Button: (typeof defaultMdxComponentMap)["Button"];
    const li: (typeof defaultMdxComponentMap)["li"];
    const LinkList: (typeof defaultMdxComponentMap)["LinkList"];
    const Columns: (typeof defaultMdxComponentMap)["Columns"];
    const Hand: (typeof defaultMdxComponentMap)["Hand"];
    const Outcome: (typeof defaultMdxComponentMap)["Outcome"];
    const img: (typeof defaultMdxComponentMap)["img"];
    const Image: (typeof defaultMdxComponentMap)["Image"];
    const Heading: (typeof defaultMdxComponentMap)["Heading"];
    const Player: (typeof defaultMdxComponentMap)["Player"];
    const Spread: (typeof defaultMdxComponentMap)["Spread"];
    const Actor: (typeof defaultMdxComponentMap)["Actor"];
    const ActorCardWithTacticalOverlay: (typeof defaultMdxComponentMap)["ActorCardWithTacticalOverlay"];
    const Asset: (typeof defaultMdxComponentMap)["Asset"];
    const Effect: (typeof defaultMdxComponentMap)["Effect"];
    const Clock: (typeof defaultMdxComponentMap)["Clock"];
    const CounterCard: (typeof defaultMdxComponentMap)["CounterCard"];
    const StuntCard: (typeof defaultMdxComponentMap)["StuntCard"];
    const GenericCounterCard: (typeof defaultMdxComponentMap)["GenericCounterCard"];
    const Paper: (typeof defaultMdxComponentMap)["Paper"];
    const PaperMini: (typeof defaultMdxComponentMap)["PaperMini"];
    const LayeredCard: (typeof defaultMdxComponentMap)["LayeredCard"];
    const LayeredActorCard: (typeof defaultMdxComponentMap)["LayeredActorCard"];
    const LayeredAssetCard: (typeof defaultMdxComponentMap)["LayeredAssetCard"];
    const ComponentHelper: (typeof defaultMdxComponentMap)["ComponentHelper"];
    const Mdx: (typeof defaultMdxComponentMap)["Mdx"];
    const Text: (typeof defaultMdxComponentMap)["Text"];
    const Toggle: (typeof defaultMdxComponentMap)["Toggle"];
}

export {};
