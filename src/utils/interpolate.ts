export default function interpolate(
    input: number,
    inputFrom: number,
    inputTo: number,
    outputFrom: number,
    outputTo: number
) {
    return outputFrom + ((outputTo - outputFrom) * (input - inputFrom)) / (inputTo - inputFrom);
}
