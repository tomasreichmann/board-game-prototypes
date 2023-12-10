export default function resolveValueOrGetter<T, P extends Array<any>>(
    valueOrGetter: T | ((...params: P) => T),
    params: P
) {
    if (typeof valueOrGetter === "function") {
        return (valueOrGetter as (...params: P) => T)(...params);
    }
    return valueOrGetter;
}
