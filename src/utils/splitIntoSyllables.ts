export default function splitIntoSyllables(word: string): string[] {
    // Define vowel characters
    const vowels = ["a", "e", "i", "o", "u"];

    // Initialize an array to store syllables
    const syllables: string[] = [];

    // Initialize a current syllable string
    let currentSyllable = "";

    // Iterate over each character in the word
    for (let i = 0; i < word.length; i++) {
        const char = word[i].toLowerCase();

        // If the character is a vowel, start a new syllable
        if (vowels.includes(char)) {
            // Add the current syllable to the syllables array
            if (currentSyllable.length > 0) {
                syllables.push(currentSyllable);
            }

            // Start a new syllable with the current vowel
            currentSyllable = char;
        } else {
            // If the character is a consonant, add it to the current syllable
            currentSyllable += char;
        }
    }

    // Add the last syllable to the syllables array
    if (currentSyllable.length > 0) {
        syllables.push(currentSyllable);
    }

    return syllables;
}
