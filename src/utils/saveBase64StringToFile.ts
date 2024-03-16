import { saveAs } from "file-saver";

/**
 * Saves a base64 PNG image to a file.
 *
 * @param {string} base64Image - The base64 encoded image data.
 * @param {string} fileName - The name of the file to save the image as.
 * @return {void} This function does not return a value.
 */
function saveBase64ImageToFile(base64Image: string, fileName: string) {
    // Remove the data URL prefix (e.g., 'data:image/png;base64,')
    const base64Data = base64Image.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");

    // Convert the base64 data to a Blob
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/png" });

    // Save the blob as a file
    saveAs(blob, fileName);
}

export default saveBase64ImageToFile;
