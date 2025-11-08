import { Freesound, FreesoundRequestBuilder } from "freesound-api";

const freeSoundApiKey = import.meta.env.VITE_FREESOUND_API_KEY;

if (!freeSoundApiKey) {
    console.warn("Missing FREESOUND_API_KEY in .env.local");
}

// Initialize Freesound client
const freeSound = new Freesound(freeSoundApiKey);

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
export async function searchFreeSound(query: string, params: FreesoundSearchParams = {}) {
    if (!freeSoundApiKey) {
        throw new Error("Missing FREESOUND_API_KEY in .env.local");
    }

    const fields = (params.fields ?? "id,name,url,duration,previews,images").split(",");

    const request = new FreesoundRequestBuilder().withQuery(query);

    fields.forEach((field) => {
        request.includeField(field);
    });

    const page = params.page ?? 1;

    request.withPage(page);

    return freeSound.searchText(request);
}

export type FreesoundResponse = {
    /**
     * The total number of results matching the query.
     */
    count: number;
    /**
     * The URL for the previous page of results, or `null` if there is no previous page.
     */
    previous: string | null;
    /**
     * The URL for the next page of results, or `null` if there is no next page.
     */
    next: string | null;
    /**
     * An array of results matching the query.
     * Each item in the array contains data specific to the query results.
     */
    results: Sound[];
};

export interface Sound {
    /**
     * Sound ID on Freesound.
     */
    id: number;
    /**
     * The URl for this sound on the Freesound website.
     */
    url: string;
    /**
     * The name user gave to the sound.
     */
    name: string;
    /**
     * An array of tags the user gave to the sound.
     */
    tags: string[];
    /**
     * The description the user gave to the sound.
     */
    description: string;
    geotag: null;
    /**
     * The date when the sound was uploaded (e.g. “2014-04-16T20:07:11.145”).
     */
    created: string;
    /**
     * The license under which the sound is available to you.
     */
    license: string;
    /**
     * The type of sound (wav, aif, aiff, mp3, m4a or flac).
     */
    type: string;
    /**
     * The number of channels.
     */
    channels: number;
    /**
     * The size of the file in bytes.
     */
    filesize: number;
    /**
     * The bit rate of the sound in kbps.
     */
    bitrate: number;
    /**
     * The bit depth of the sound.
     */
    bitdepth: number;
    /**
     * The duration of the sound in seconds.
     */
    duration: number;
    /**
     * The samplerate of the sound.
     */
    samplerate: number;
    /**
     * The username of the uploader of the sound.
     */
    username: string;
    /**
     * If the sound is part of a pack, this URl points to that pack’s API resource.
     */
    pack: string;
    pack_name?: string;
    previews: {
        "preview-lq-ogg": string;
        "preview-lq-mp3": string;
        "preview-hq-ogg": string;
        "preview-hq-mp3": string;
    };
    images: {
        spectral_m: string;
        spectral_l: string;
        spectral_bw_l: string;
        waveform_bw_m: string;
        waveform_bw_l: string;
        waveform_l: string;
        waveform_m: string;
        spectral_bw_m: string;
    };
    /**
     * The number of times the sound was downloaded.
     */
    num_downloads: number;
    /**
     * The average rating of the sound.
     */
    avg_rating: number;
    /**
     * The number of times the sound was rated.
     */
    num_ratings: number;
    /**
     * The URl of a paginated list of the comments of the sound.
     */
    comments: string;
    num_comments: number;
    /**
     * URI pointing to the similarity resource (to get a list of similar sounds).
     */
    similar_sounds: string;
    analysis: string;
    analysis_frames: string;
    /**
     * URL pointing to the complete analysis results of the sound (see Analysis Descriptor Documentation).
     */
    analysis_stats: string;
    /**
     * Dictionary containing the results of the AudioCommons analysis for the given sound.
     */
    ac_analysis: {
        /**
         * Reliability of the tempo estimation in a range of [0, 1].
         */
        ac_tempo_confidence: number;
        /**
         * Reliability of the note name/midi/frequency estimation in a range of [0, 1].
         */
        ac_note_confidence: number;
        /**
         * Depth of the analyzed audio in a scale from [0-100]. A deep sound is one that conveys the sense of having been made far down below the surface of its source.
         */
        ac_depth: number;
        /**
         * MIDI value corresponding to the estimated note (makes more sense for ac_single_event sounds).
         */
        ac_note_midi: number;
        /**
         * Temporal centroid (sec.) of the audio signal. It is the point in time in a signal that is a temporal balancing point of the sound event energy.
         */
        ac_temporal_centroid: number;
        /**
         * Warmth of the analyzed sound in a scale from [0-100]. A warm sound is one that promotes a sensation analogous to that caused by a physical increase in temperature.
         */
        ac_warmth: number;
        /**
         * Whether audio file is loopable.
         */
        ac_loop: boolean;
        ac_hardness: number;
        /**
         * The integrated (overall) loudness (LUFS) measured using the EBU R128 standard.
         */
        ac_loudness: number;
        /**
         * Whether the signal is reverberated or not.
         */
        ac_reverb: boolean;
        /**
         * Roughness of the analyzed audio in a scale from [0-100]. A rough sound is one that has an uneven or irregular sonic texture.
         */
        ac_roughness: number;
        ac_log_attack_time: number;
        /**
         * Boominess of the analyzed sound in a scale from [0-100]. A boomy sound is one that conveys a sense of loudness, depth and resonance.
         */
        ac_boominess: number;
        /**
         * Frequency corresponding to the estimated note (makes more sense for ac_single_event sounds).
         */
        ac_note_frequency: number;
        /**
         * BPM value estimated by beat tracking algorithm.
         */
        ac_tempo: number;
        /**
         * Brightness of the analyzed audio in a scale from [0-100]. A bright sound is one that is clear/vibrant and/or contains significant high-pitched elements.
         */
        ac_brightness: number;
        /**
         * Sharpness of the analyzed sound in a scale from [0-100]. A sharp sound is one that suggests it might cut if it were to take on physical form.
         */
        ac_sharpness: number;
        /**
         * Reliability of the key estimation in a range of [0, 1].
         */
        ac_tonality_confidence: number;
        /**
         * Loudness range (dB, LU) measured using the EBU R128 standard.
         */
        ac_dynamic_range: number;
        ac_note_name: string;
        ac_tonality: string;
        /**
         * Whether the audio file contains one single audio event or more than one. This computation is based on the loudness of the signal and does not do any frequency analysis.
         */
        ac_single_event: boolean;
    };
}
