import { ClockProps } from "../../components/Clock";
import { ActorCardProps } from "../../components/gameComponents/ActorCard";
import { AssetCardProps } from "../../components/gameComponents/AssetCard";

export const defaultClockProps = {
    size: "54x86",
    className: "not-prose drop-shadow-md print:drop-shadow-none print:filter-none",
};
export const defaultActorProps = {
    size: "54x86",
    className: "not-prose drop-shadow-md print:drop-shadow-none print:filter-none",
    imagePosition: "center top",
    imageFit: "cover",
};
export const defaultEffectProps = {
    size: "54x86",
    className: "not-prose drop-shadow-md print:drop-shadow-none print:filter-none",
};
export const defaultAssetProps = {
    size: "54x86",
    className: "not-prose drop-shadow-md print:drop-shadow-none print:filter-none",
};
export const defaultMiniProps = {
    baseClassName: "pt-2 bg-kac-blood-dark text-white text-center",
    backBaseClassName: "pt-2 bg-kac-blood-dark text-white text-center",
    baseWidth: "0.5in",
    height: "2in",
    width: "1in",
};

export const postavy = {
    jakubNovy: {
        slug: "jakubNovy",
        imageUri: "/ML/postavy/jakubNovy.jpg",
        name: "Jakub Nový",
        occupation: "Kutnohorský Kupec",
        notes: "Mladý a ambiciózní",
        ...defaultActorProps,
    } as ActorCardProps,
};

export const hrozby = {
    zapadSlunce: {
        slug: "zapadSlunce",
        title: "Západ slunce",
        current: 4,
        total: 4,
        reward: "Včechno se dělá líp za světla",
        threat: "Ztmívá se a je třeba najít si střechu nad hlavou",
        ...defaultActorProps,
    } as ClockProps,
};

export const predmety = {
    mapaTunelu: {
        slug: "mapaTunelu",
        title: "Mapa tunelů",
        effect: "Mapa ilustruje změť tunelů kutnohorského stříbrného dolu",
        icon: "/ML/predmety/mapaTunelu.png",
        ...defaultAssetProps,
    } as AssetCardProps,
};
