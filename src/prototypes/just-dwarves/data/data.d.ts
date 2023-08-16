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

declare module "*prequelInAPubCards.csv" {
    export default data as {
        slug: string;
        name: string;
        frontBottom: string;
        frontTop: string;
        backBottom: string;
        backTop: string;
        imageUri: string;
        count: number;
    }[];
}
