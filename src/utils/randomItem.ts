export const randomItem = <T extends any>(values: T[]) => {
    if (values.length === 0) {
        return null;
    }
    return values[Math.floor(Math.random() * values.length)];
};
export default randomItem;
