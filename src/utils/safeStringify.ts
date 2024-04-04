export default function safeStringify(data: any, ...restProps: any) {
    try {
        return JSON.stringify(data, ...restProps);
    } catch (error) {
        console.error("Error in trying to stringify", data, error);
        return "Error in trying to stringify";
    }
}
