/**
 * Convert a base64 image string to a Blob and generate a URL for it.
 *
 * @param {string} base64Image - The base64 encoded image string
 * @return {string} The URL of the converted image Blob
 */
export default function getImageUrlFromBase64(base64Image: string): string {
    // Convert the base64 string to a Blob
    const byteCharacters = atob(base64Image);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/png" });

    // Generate a URL for the Blob
    const imageURL = URL.createObjectURL(blob);
    return imageURL;
}
