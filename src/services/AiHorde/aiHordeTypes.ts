import { AnyRecord } from "../../utils/simpleTypes";

export enum ErrorMessagesEnum {
    "MissingPrompt" = "The generation prompt was not given",
    "CorruptPrompt" = "The prompts was rejected as unethical",
    "KudosValidationError" = "Something went wrong when transferring kudos. This is a base rc, so you should never typically see it.",
    "NoValidActions" = "Something went wrong when modifying an entity on the horde. This is a base rc, so you should never typically see it.",
    "InvalidSize" = "Requested image size is not a multiple of 64",
    "InvalidPromptSize" = "Prompt is too large",
    "TooManySteps" = "Too many steps requested for image generation",
    "Profanity" = "Profanity Detected. This is a base rc, so you should never typically see i",
    "ProfaneWorkerName" = "Profanity detected in worker name",
    "ProfaneBridgeAgent" = "Profanity detected in bridge agent",
    "ProfaneWorkerInfo" = "Profanity detected in worker info",
    "ProfaneUserName" = "Profanity detected in username",
    "ProfaneUserContact" = "Profanity detected in user contact details",
    "ProfaneAdminComment" = "Profanity detected in admin comment",
    "ProfaneTeamName" = "Profanity detected in team name",
    "ProfaneTeamInfo" = "Profanity detected in team info",
    "TooLong" = "Provided string was too long. This is a base rc, so you should never typically see it.",
    "TooLongWorkerName" = "The provided worker name is too long",
    "TooLongUserName" = "The provided username is too long",
    "NameAlreadyExists" = "The provided name already exists. This is a base rc, so you should never typically see it.",
    "WorkerNameAlreadyExists" = "The provided worker name already exists",
    "TeamNameAlreadyExists" = "The provided team name already exists",
    "PolymorphicNameConflict" = "The provided worker name already exists for a different worker type (e.g. Dreamer VS Scribe)",
    "ImageValidationFailed" = "Source image validation failed unexpectedly",
    "SourceImageResolutionExceeded" = "Source image resolution larger than the max allowed by the AI Horde",
    "SourceImageSizeExceeded" = "Source image file size larger than the max allowed by the AI Horde",
    "SourceImageUrlInvalid" = "Source image url does not contain an image",
    "SourceImageUnreadable" = "Source image could not be parsed",
    "InpaintingMissingMask" = "Missing mask or alpha channel for inpainting",
    "SourceMaskUnnecessary" = "Source mask sent without a source image",
    "UnsupportedSampler" = "Selected sampler unsupported with selected model",
    "UnsupportedModel" = "The required model name is unsupported with this payload. This is a base rc, so you should never typically see it.",
    "ControlNetUnsupported" = "ControlNet is unsupported in combination with this model",
    "ControlNetSourceMissing" = "Missing source image for ControlNet workflow",
    "ControlNetInvalidPayload" = "sent CN source and requested CN source at the same time",
    "SourceImageRequiredForModel" = "Source image is required for using this model",
    "UnexpectedModelName" = "Model name sent is not a Stable Diffusion checkpoint",
    "TooManyUpscalers" = "Tried to use more than 1 upscaler at a time",
    "ProcGenNotFound" = "The used generation for aesthetic ratings doesn't exist",
    "InvalidAestheticAttempt" = "Aesthetics rating attempt failed",
    "AestheticsNotCompleted" = "Attempted to rate non-completed request",
    "AestheticsNotPublic" = "Attempted to rate non-shared request",
    "AestheticsDuplicate" = "Sent duplicate images in an aesthetics set",
    "AestheticsMissing" = "Aesthetic ratings missing",
    "AestheticsSolo" = "Aesthetic ratings best-of contain a single image",
    "AestheticsConfused" = "The best image is not the one with the highest aesthetic rating",
    "AestheticsAlreadyExist" = "Aesthetic rating already submitted",
    "AestheticsServerRejected" = "Aesthetic server rejected submission",
    "AestheticsServerError" = "Aesthetic server returned error (provided)",
    "AestheticsServerDown" = "Aesthetic server is down",
    "AestheticsServerTimeout" = "Aesthetic server timed out during submission",
    "InvalidAPIKey" = "Invalid AI Horde API key provided",
    "WrongCredentials" = "Provided user does not own this worker",
    "NotAdmin" = "Request needs AI Horded admin credentials",
    "NotModerator" = "Request needs AI Horded moderator credentials",
    "NotOwner" = "Request needs worker owner credentials",
    "NotPrivileged" = "This user is not hardcoded to perform this operation",
    "AnonForbidden" = "Anonymous is not allowed to perform this operation",
    "AnonForbiddenWorker" = "Anonymous tried to run a worker",
    "AnonForbiddenUserMod" = "Anonymous tried to modify their user account",
    "NotTrusted" = "Untrusted users are not allowed to perform this operation",
    "UntrustedTeamCreation" = "Untrusted user tried to create a team",
    "UntrustedUnsafeIP" = "Untrusted user tried to use a VPN for a worker",
    "WorkerMaintenance" = "Worker has been put into maintenance and cannot pop new jobs",
    "WorkerFlaggedMaintenance" = "Worker owner has been flagged and worker has been put into permanent maintenance",
    "TooManySameIPs" = "Same IP attempted to spawn too many workers",
    "WorkerInviteOnly" = "AI Horde is in worker invite-only mode and worker owner needs to request permission",
    "UnsafeIP" = "Worker attempted to connect from VPN",
    "TimeoutIP" = "Operation rejected because user IP in timeout",
    "TooManyNewIPs" = "Too many workers from new IPs currently",
    "KudosUpfront" = "This request requires upfront kudos to accept",
    "SharedKeyEmpty" = "Shared Key used in the request does not have any more kudos",
    "InvalidJobID" = "Job not found when trying to submit. This probably means its request was delected for inactivity",
    "RequestNotFound" = "Request not found. This probably means it was delected for inactivity",
    "WorkerNotFound" = "Worker ID not found",
    "TeamNotFound" = "Team ID not found",
    "FilterNotFound" = "Regex filter not found",
    "UserNotFound" = "User not found",
    "DuplicateGen" = "Job has already been submitted",
    "AbortedGen" = "Request aborted because too many jobs have failed",
    "RequestExpired" = "Request expired",
    "TooManyPrompts" = "User has requested too many generations concurrently",
    "NoValidWorkers" = "No workers online which can pick up this request",
    "MaintenanceMode" = "Request aborted because horde is in maintenance mode",
    "TargetAccountFlagged" = "Action rejected because target user has been flagged for violating Horde ToS",
    "SourceAccountFlagged" = "Action rejected because source user has been flagged for violating Horde ToS",
    "FaultWhenKudosReceiving" = "Unexpected error when receiving kudos",
    "FaultWhenKudosSending" = "Unexpected error when sending kudos",
    "TooFastKudosTransfers" = "User tried to send kudos too fast after receiving them from the same user",
    "KudosTransferToAnon" = "User tried to transfer kudos to Anon",
    "KudosTransferToSelf" = "User tried to transfer kudos to themselves",
    "KudosTransferNotEnough" = "User tried to transfer more kudos than they have",
    "NegativeKudosTransfer" = "User tried to transfer negative kudos",
    "KudosTransferFromAnon" = "User tried to transfer kudos using the Anon API key",
    "InvalidAwardUsername" = "Tried to award kudos to non-existing user",
    "KudosAwardToAnon" = "Tried to award kudos to Anonymous user",
    "NotAllowedAwards" = "This user is not allowed to Award Kudos",
    "NoWorkerModSelected" = "No valid worker modification selected",
    "NoUserModSelected" = "No valid user modification selected",
    "NoHordeModSelected" = "No valid horde modification selected",
    "NoTeamModSelected" = "No valid team modification selected",
    "NoFilterModSelected" = "No valid regex filter modification selected",
    "NoSharedKeyModSelected" = "No valid shared key modification selected",
    "BadRequest" = "Generic HTTP 400 code. You should typically never see this",
    "Forbidden" = "Generic HTTP 401 code. You should typically never see this",
    "Locked" = "Generic HTTP code. You should typically never see this",
    "Unknown" = "Unknown rc code",
}

export enum ModelGenerationInputStableSamplersEnum {
    "lcm" = "lcm",
    "k_lms" = "k_lms",
    "k_heun" = "k_heun",
    "k_euler_a" = "k_euler_a",
    "k_euler" = "k_euler",
    "k_dpm_2" = "k_dpm_2",
    "k_dpm_2_a" = "k_dpm_2_a",
    "DDIM" = "DDIM",
    "PLMS" = "PLMS",
    "k_dpm_fast" = "k_dpm_fast",
    "k_dpm_adaptive" = "k_dpm_adaptive",
    "k_dpmpp_2s_a" = "k_dpmpp_2s_a",
    "k_dpmpp_2m" = "k_dpmpp_2m",
    "dpmsolver" = "dpmsolver",
    "k_dpmpp_sde" = "k_dpmpp_sde",
}

export enum SourceImageProcessingTypesEnum {
    "img2img" = "img2img",
    "inpainting" = "inpainting",
    "outpainting" = "outpainting",
}

export enum ModelGenerationInputPostProcessingTypesEnum {
    "GFPGAN" = "GFPGAN",
    "RealESRGAN_x4plus" = "RealESRGAN_x4plus",
    "RealESRGAN_x2plus" = "RealESRGAN_x2plus",
    "RealESRGAN_x4plus_anime_6B" = "RealESRGAN_x4plus_anime_6B",
    "NMKD_Siax" = "NMKD_Siax",
    "4x_AnimeSharp" = "4x_AnimeSharp",
    "strip_background" = "strip_background",
    "CodeFormers" = "CodeFormers",
}

export enum ModelInterrogationFormTypesEnum {
    "caption" = "caption",
    "interrogation" = "interrogation",
    "nsfw" = "nsfw",
    "GFPGAN" = "GFPGAN",
    "RealESRGAN_x4plus" = "RealESRGAN_x4plus",
    "RealESRGAN_x4plus_anime_6B" = "RealESRGAN_x4plus_anime_6B",
    "NMKD_Siax" = "NMKD_Siax",
    "4x_AnimeSharp" = "4x_AnimeSharp",
    "CodeFormers" = "CodeFormers",
    "strip_background" = "strip_background",
}

export enum HordeAsyncRequestStatesEnum {
    "waiting" = "waiting",
    "processing" = "processing",
    "done" = "done",
    "faulted" = "faulted",
    "partial" = "partial",
    "cancelled" = "cancelled",
}

export enum ModelGenerationInputControlTypesEnum {
    "canny" = "canny",
    "hed" = "hed",
    "depth" = "depth",
    "normal" = "normal",
    "openpose" = "openpose",
    "seg" = "seg",
    "scribble" = "scribble",
    "fakescribbles" = "fakescribbles",
    "hough" = "hough",
}

/**
 * @typedef {object} ModelPayloadLoraStable
 * @property {string} name - The exact name or CivitAI Model Page ID of the LoRa. If is_version is true, this should be the CivitAI version ID.
 * @property {number} [model=1] - The strength of the LoRa to apply to the SD model. Default: 1. Range: -5 to 5.
 * @property {number} [clip=1] - The strength of the LoRa to apply to the clip model. Default: 1. Range: -5 to 5.
 * @property {string} [inject_trigger] - If set, will try to discover a trigger for this LoRa which matches or is similar to this string and inject it into the prompt. If 'any' is specified it will pick the first trigger. Min Length: 1, Max Length: 30.
 * @property {boolean} [is_version=false] - If true, will consider the LoRa ID as a CivitAI version ID and search accordingly. Ensure the name is an integer. Default: false.
 */
export type ModelPayloadLoraStable = {
    name: string;
    model?: number;
    clip?: number;
    inject_trigger?: string;
    is_version?: boolean;
};

/**
 * @typedef {object} ModelPayloadTextualInversionStable
 * @property {string} name - The exact name or CivitAI ID of the Textual Inversion.
 * @property {string} [inject_ti] - If set, Will automatically add this TI filename to the prompt or negative prompt accordingly using the provided strength. If this is set to None, then the user will have to manually add the embed to the prompt themselves. Enum: ['prompt', 'negprompt']
 * @property {number} [strength=1] - The strength with which to apply the TI to the prompt. Only used when inject_ti is not None. Default: 1. Range: -5 to 5.
 */
export type ModelPayloadTextualInversionStable = {
    name: string;
    inject_ti?: "prompt" | "negprompt";
    strength?: number;
};

/**
 * Input for the stable model generation endpoint.
 */
export type ModelGenerationInputStableType = {
    /**
     * The number of steps the model should run for each image.
     *
     * @default 30
     * @minimum 1
     * @maximum 500
     */
    steps: number;
    /**
     * The amount of images to generate.
     * @default 1
     * @minimum 1
     * @maximum 20
     */
    n: number;
    sampler_name:
        | "DDIM"
        | "k_heun"
        | "k_dpmpp_2m"
        | "lcm"
        | "k_dpm_fast"
        | "k_dpm_2_a"
        | "k_dpmpp_2s_a"
        | "dpmsolver"
        | "k_euler"
        | "k_lms"
        | "k_dpm_2"
        | "k_dpm_adaptive"
        | "k_euler_a"
        | "k_dpmpp_sde";
    /** The scale of the configuration. */
    cfg_scale?: number;
    /** The strength of denoising. */
    denoising_strength?: number;
    /** The seed to use to generate this request. You can pass text as well as numbers. */
    seed?: string;
    /** The height of the image to generate. */
    height?: number;
    /** The width of the image to generate. */
    width?: number;
    /** The variation of the seed. */
    seed_variation?: number;
    /** The list of post-processors to apply to the image, in the order to be applied. */
    post_processing?: (
        | "GFPGAN"
        | "RealESRGAN_x4plus"
        | "RealESRGAN_x2plus"
        | "RealESRGAN_x4plus_anime_6B"
        | "NMKD_Siax"
        | "4x_AnimeSharp"
        | "CodeFormers"
        | "strip_background"
    )[];
    /** Set to True to enable karras noise scheduling tweaks. */
    karras?: boolean;
    /** Set to True to create images that stitch together seamlessly. */
    tiling?: boolean;
    /** Set to True to process the image at base resolution before upscaling and re-processing. */
    hires_fix?: boolean;
    /** The number of CLIP language processor layers to skip. */
    clip_skip?: number;
    /** The type of control. */
    control_type?: "canny" | "hed" | "depth" | "normal" | "openpose" | "seg" | "scribble" | "fakescribbles" | "hough";
    /** Set to True if the image submitted is a pre-generated control map for ControlNet use. */
    image_is_control?: boolean;
    /** Set to True if you want the ControlNet map returned instead of a generated image. */
    return_control_map?: boolean;
    /** The strength of face fixer. */
    facefixer_strength?: number;
    /** The list of Loras items. */
    loras?: ModelPayloadLoraStable[];
    /** The list of Textual Inversions items. */
    tis?: ModelPayloadTextualInversionStable[];
    /** The special payload. */
    special?: AnyRecord;
};

export type ExtraSourceImageType = {
    /**
     * The Base64-encoded webp to use for further processing.
     */
    image: string;

    /**
     * Optional field, determining the strength to use for the processing
     * @default 1
     */
    strength?: number;
};

export type GenerateAsyncOptionsType = {
    /**
     * The prompt which will be sent to Stable Diffusion to generate an image.
     * @minimum 1
     */
    prompt: string;
    /**
     * The params object.
     */
    params: ModelGenerationInputStableType;
    gathered?: boolean; // ??
    jobId?: string; // ??
    /**
     * Set to true if this request is NSFW.
     * This will skip workers which censor images.
     * @default false
     */
    nsfw?: boolean;
    /**
     * When true, only trusted workers will serve this request.
     * When False, Evaluating workers will also be used which can increase speed but adds more risk!
     * @default false
     */
    trusted_workers?: boolean;
    /**
     * When True, allows slower workers to pick up this request.
     * Disabling this incurs an extra kudos cost.
     * @default true
     */
    slow_workers?: boolean;
    /**
     * If the request is SFW, and the worker accidentally generates NSFW,
     * it will send back a censored image.
     * @default false
     */
    censor_nsfw?: boolean;
    /**
     * A list of maximum 5 worker IDs which are allowed to service this request.
     * If this is not provided, the request will be sent to any available
     * worker that satisfies the other conditions.
     */
    workers?: string[];
    /**
     * If true, the worker list will be treated as a blacklist instead of a
     * whitelist.
     *
     * @default false
     */
    worker_blacklist?: boolean;
    /**
     * List of models which are allowed to be used for this request.
     * If this is not provided, any model can be used.
     */
    models?: string[];
    /**
     * The Base64-encoded webp image to use for img2img.
     * If not provided, it is assumed that the model will not use any
     * source image.
     */
    source_image?: string;

    /**
     * Specifies how to process the source image, if provided.
     * Defaults to "img2img".
     */
    source_processing?: SourceImageProcessingTypesEnum;
    /**
     * If source_processing is set to "inpainting" or "outpainting", this parameter
     * can optionally be provided as the Base64-encoded webp mask of the areas to
     * inpaint. If this arg is not passed, the inpainting/outpainting mask has to be
     * embedded as alpha channel.
     */
    source_mask?: string;
    extra_source_images?: ExtraSourceImageType[];
    /**
     * If True, the image will be sent via cloudflare r2 download link.
     * @default true
     */
    r2?: boolean;

    /**
     * If True, The image will be shared with LAION for improving their dataset.
     * This will also reduce your kudos consumption by 2.
     * For anonymous users, this is always True.
     * @default false
     */
    shared?: boolean;

    /**
     * If enabled, suspicious prompts are sanitized through a string replacement
     * filter instead.
     * @default true
     */
    replacement_filter?: boolean;

    /**
     * When true, the endpoint will simply return the cost of the request in kudos
     * and exit.
     * @default false
     */
    dry_run?: boolean;

    /**
     * If using a service account as a proxy, provide this value to identify
     * the actual account from which this request is coming from.
     */
    proxied_account?: string;

    /**
     * When true and the request requires upfront kudos and the account does not
     * have enough The request will be downgraded in steps and resolution so that
     * it does not need upfront kudos.
     * @default false
     */
    disable_batching?: boolean;

    /**
     * When true and the request requires upfront kudos and the account does not
     * have enough The request will be downgraded in steps and resolution so that
     * it does not need upfront kudos.
     * @default false
     */
    allow_downgrade?: boolean;

    /**
     * Provide a URL where the AI Horde will send a POST call after each delivered
     * generation. The request will include the details of the job as well as the
     * request ID.
     * @example "https://haidra.net/00000000-0000-0000-0000-000000000000"
     * @minLength 10
     * @maxLength 1024
     */
    webhook?: string;
};

export type GenerationStablePresetOptionType = {
    label: string;
    preset: {
        models: GenerateAsyncOptionsType["models"];
        params: Partial<GenerateAsyncOptionsType["params"]>;
    };
};

export type GenerationAsyncResponse = {
    id: string;
    kudos: number;
    message: string;
    warnings?: {
        /*
         * @example 'NoAvailableWorker'
         */
        code: string;
        message: string;
    }[];
};

export type GenerationCheckResponse = {
    finished: number;
    processing: number;
    restarted: number;
    waiting: number;
    done: boolean;
    faulted: boolean;
    wait_time: number;
    queue_position: number;
    kudos: number;
    is_possible: boolean;
} & Partial<GenerationStatusResponse>;

export type GenerationType = {
    /**
     * The UUID of the worker which generated this image.
     */
    worker_id?: string;
    /**
     * The name of the worker which generated this image.
     */
    worker_name?: string;
    /**
     * The model which generated this image.
     */
    model?: string;
};

export type GenerationStatusResponse = {
    generations: {
        /**
         * Generated Image as a Base64-encoded .webp file
         */
        img: string;
        /**
         * Generation Seed
         */
        seed: string;
        /**
         * Generation ID
         */
        id: string;
        /**
         * When true this image has been censored by the worker's safety filter
         */
        censored: boolean;
        /**
         * Array of metadata objects
         */
        gen_metadata: {
            /**
             * Relevance of the metadata field, one of:
             *  - lora
             *  - ti
             *  - censorship
             *  - source_image
             *  - source_mask
             *  - extra_source_images
             *  - batch_index
             */
            type: "lora" | "ti" | "censorship" | "source_image" | "source_mask" | "extra_source_images" | "batch_index";
            /**
             * Value of the metadata field, one of:
             *  - download_failed
             *  - parse_failed
             *  - baseline_mismatch
             *  - csam
             *  - nsfw
             *  - see_ref
             */
            value: "download_failed" | "parse_failed" | "baseline_mismatch" | "csam" | "nsfw" | "see_ref";
            /**
             * Optionally a reference for the metadata (e.g. a lora ID)
             */
            ref?: string;
        }[];
    }[];
    /**
     * If True, These images have been shared with LAION.
     */
    shared: boolean;
};

export enum GenerationStatusEnum {
    created = "created",
    queued = "queued",
    processing = "processing",
    done = "done",
    collected = "collected",
    faulted = "faulted",
}

export type HistoryItemType = {
    id: string;
    status: GenerationStatusEnum;
    generationOptions: GenerateAsyncOptionsType;
    generation?: GenerationAsyncResponse;
    lastCheck?: GenerationCheckResponse;
    error?: Error & { rc?: keyof ErrorMessagesEnum };
    createdAt: number;
    updatedAt?: number;
    finishedAt?: number;
};
