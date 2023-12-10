export const randomNumber = (min: number = 0, max: number = 0, precision: number = 1) => {
    const preciseValue = Math.random() * (max - min + precision) + min;
    if (precision === 0) {
        return preciseValue;
    }
    return Math.max(Math.min(Math.floor(preciseValue / precision) * precision, max), min);
};
export default randomNumber;
