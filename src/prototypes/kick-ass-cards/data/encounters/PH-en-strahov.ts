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

export const characters = {
    jan: {
        slug: "jan",
        imageUri: "/KAC/encounters/hand_of_strahov/jan.png",
        name: "Abbot Jan IV. Haukap",
        occupation: "Abbot of Strahov Monastery",
        notes: "Determined to maintain control despite the theft",
        ...defaultActorProps,
    } as ActorCardProps,

    lukas: {
        slug: "lukas",
        imageUri: "/KAC/encounters/hand_of_strahov/lukas.png",
        name: "Brother Lukáš",
        occupation: "Premonstrate Monk",
        notes: "Ambitious and manipulative, secretly orchestrating the sale of the relic",
        ...defaultActorProps,
    } as ActorCardProps,

    anezka: {
        slug: "anezka",
        imageUri: "/KAC/encounters/hand_of_strahov/anezka.png",
        name: "Sister Anežka",
        occupation: "Benedictine Nun",
        notes: "Fearful of her loyalty being questioned",
        ...defaultActorProps,
    } as ActorCardProps,

    vaclav: {
        slug: "vaclav",
        imageUri: "/KAC/encounters/hand_of_strahov/vaclav.png",
        name: "Brother Václav",
        occupation: "Elderly Premonstrate Monk",
        notes: "Dedicated to protecting the monastery's relics, hiding the real Hand of Saint Norbert",
        ...defaultActorProps,
    } as ActorCardProps,

    janek: {
        slug: "janek",
        imageUri: "/KAC/encounters/hand_of_strahov/janek.png",
        name: "Brother Janek",
        occupation: "Premonstrate Monk, Builder",
        notes: "Oversees the physical upkeep and construction projects within the monastery",
        ...defaultActorProps,
    } as ActorCardProps,

    marie: {
        slug: "marie",
        imageUri: "/KAC/encounters/hand_of_strahov/marie.png",
        name: "Sister Marie",
        occupation: "Premonstrate Nun",
        notes: "Strict and disciplined, protective of her son, Novice Tomáš, at all costs",
        ...defaultActorProps,
    } as ActorCardProps,

    tereza: {
        slug: "tereza",
        imageUri: "/KAC/encounters/hand_of_strahov/tereza.png",
        name: "Sister Tereza",
        occupation: "Premonstrate Nun",
        notes: "Resourceful, involved in a side business selling herbs, and unknowingly entangled in the relic scheme",
        ...defaultActorProps,
    } as ActorCardProps,

    tomas: {
        slug: "tomas",
        imageUri: "/KAC/encounters/hand_of_strahov/tomas.png",
        name: "Novice Tomáš",
        occupation: "Young Premonstrate Monk",
        notes: "Caught between loyalty and love, hiding the relic to protect himself and Sister Tereza",
        ...defaultActorProps,
    } as ActorCardProps,

    karel: {
        slug: "karel",
        imageUri: "/KAC/encounters/hand_of_strahov/karel.png",
        name: "Brother Karel",
        occupation: "Premonstrate Monk, Librarian",
        notes: "Unwittingly caught up in the intrigue, has a drinking problem",
        ...defaultActorProps,
    } as ActorCardProps,

    hilarius: {
        slug: "hilarius",
        imageUri: "/KAC/encounters/hand_of_strahov/hilarius.png",
        name: "Hilarius of Litoměřice",
        occupation: "Catholic Administrator of Prague",
        notes: "Initiated the investigation",
        ...defaultActorProps,
    } as ActorCardProps,

    johana: {
        slug: "johana",
        imageUri: "/KAC/encounters/hand_of_strahov/johana.png",
        name: "Johana z Rožmitálu",
        occupation: "Queen Consort of Bohemia",
        notes: "Sent to ensure loyalty to the crown",
        ...defaultActorProps,
    } as ActorCardProps,

    katerina: {
        slug: "katerina",
        imageUri: "/KAC/encounters/hand_of_strahov/katerina.png",
        name: "Kateřina z Vrby",
        occupation: "Noblewoman",
        notes: "Battle-hardened, fierce and willing to do whatever it takes to solve the case",
        ...defaultActorProps,
    } as ActorCardProps,

    magdalena: {
        slug: "magdalena",
        imageUri: "/KAC/encounters/hand_of_strahov/magdalena.png",
        name: "Sister Magdalena of Blatná",
        occupation: "Nun and Relic Expert",
        notes: "Knowledge is crucial to uncovering the truth",
        ...defaultActorProps,
    } as ActorCardProps,

    vladimir: {
        slug: "vladimir",
        imageUri: "/KAC/encounters/hand_of_strahov/vladimir.png",
        name: "Vladimír of Komárov",
        occupation: "Veteran Knight",
        notes: "Assigned to protect the investigation team and ensure justice",
        ...defaultActorProps,
    } as ActorCardProps,

    jakub: {
        slug: "jakub",
        imageUri: "/KAC/encounters/hand_of_strahov/jakub.png",
        name: "Brother Jakub of Olomouc",
        occupation: "Young Monk",
        notes: "Eager to prove himself during the investigation",
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
