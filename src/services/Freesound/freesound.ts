import FreeSound from "freesound-client";

const freeSoundApiKey = import.meta.env.VITE_FREESOUND_API_KEY;

if (!freeSoundApiKey) {
    console.warn("Missing FREESOUND_API_KEY in .env.local");
}

// Initialize Freesound client
const freeSound = new FreeSound();
freeSound.setToken(freeSoundApiKey);

/**
 * Simplified Freesound search service using freesound-client.
 */

export interface FreesoundSearchParams {
    filter?: string;
    sort?: string;
    page?: number;
    pageSize?: number;
    fields?: string;
}

/**
 * Search sounds on Freesound.org by text query.
 * @param query Text search term
 * @param params Additional Freesound API parameters (optional)
 * @returns A Promise with the Freesound API search results
 */
export async function search(query: string, params: FreesoundSearchParams = {}) {
    if (!freeSoundApiKey) {
        throw new Error("Missing FREESOUND_API_KEY in .env.local");
    }
    return freeSound.textSearch(query, {
        ...params,
        sort: params.sort || "score",
        page: params.page ?? 1,
        fields: params.fields || "id,name,url,duration,previews,images",
    });
}

/**
 * Fetch detailed information about a sound by its ID.
 */
export async function getSound(id: number) {
    if (!freeSoundApiKey) {
        throw new Error("Missing FREESOUND_API_KEY in .env.local");
    }
    return freeSound.getSound(id);
}

export default { search, getSound };
