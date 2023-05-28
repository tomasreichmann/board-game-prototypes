declare module "*.csv" {
    export default data as { [key: string] }[];
}
