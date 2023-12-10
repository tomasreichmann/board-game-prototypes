const randomUniqueItems = <T extends any>(array: T[], count: number) => {
    const options = [...array];
    if (options.length < count) {
        return array;
    }
    return Array(count)
        .fill(0)
        .map(() => {
            const index = Math.floor(Math.random() * options.length);
            const item = options[index];
            options.splice(index, 1);
            return item;
        });
};
export default randomUniqueItems;
