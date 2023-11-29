export default function interpolate(
    input: number,
    inputFrom: number,
    inputTo: number,
    outputFrom: number,
    outputTo: number
) {
    return outputFrom + (input - inputFrom) * ((outputTo - outputFrom) / (inputTo - inputFrom));
}
