declare module "*buildings.csv" {
    export default data as { [key: string] }[];
}

declare module "*clanChiefs.csv" {
    export default data as { [key: string] }[];
}

declare module "*components.csv" {
    export default data as { [key: string] }[];
}

declare module "*events.csv" {
    export default data as { [key: string] }[];
}

declare module "*prequelCards.csv" {
    export default data as {
        name: string;
        frontBottom: string;
        frontTop: string;
        backBottom: string;
        backTop: string;
    }[];
}
