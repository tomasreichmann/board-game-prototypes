export default function deepCopy<T>(obj: T): T {
    if (typeof obj !== "object" || obj === null) {
        return obj;
    }

    const copy: any = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            copy[key] = deepCopy(obj[key]);
        }
    }

    return copy;
}
