import { camelCase } from "lodash";

export default function titleCase(string: string) {
    return string
        .split(" ")
        .map((fragment) => fragment[0].toUpperCase() + fragment.slice(1))
        .join(" ");
}
