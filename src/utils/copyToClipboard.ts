/**
 * Copies the given text to the clipboard.
 *
 * @param {string} text - the text to be copied
 * @return {Promise<void>} a Promise that resolves when the text is successfully copied, or rejects with an error
 */
export default function copyToClipboard(text: string) {
    return navigator.clipboard
        .writeText(text)
        .then(() => {
            console.log("Text " + text + " copied to clipboard");
        })
        .catch((err) => {
            console.error("Error copying text: ", err, text);
        });
}
