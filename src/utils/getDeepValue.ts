/**
 * Retrieves a nested value from an object or array based on a selector string.
 *
 * @param {Data} data - The data object from which to retrieve the value.
 * @param {string} selector - dot separated list of property names or array indexes specifying the path to the desired value.
 * @returns {any} - The value retrieved from the data object.
 */
export default function getDeepValue<Data>(data: Data, selector: string): unknown {
    let value: any = data;
    if (selector === "") {
        return data;
    }
    selector.split(".").forEach((property) => {
        if (Array.isArray(value) && !isNaN(Number(property))) {
            const index = Number(property);
            value = value[index];
        } else if (typeof value === "object" && value !== null && property in value) {
            value = value[property];
        } else {
            value = undefined;
        }
    });

    return value;
}
