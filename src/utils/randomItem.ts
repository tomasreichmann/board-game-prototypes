export const randomItem = <T>(values: T[]) => {
    if (values.length === 0) {
        return null;
    }
    return values[Math.floor(Math.random() * values.length)];
};
export default randomItem;
