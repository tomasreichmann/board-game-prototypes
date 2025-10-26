import http from "node:http";
import { DMX, EnttecOpenUSBDMXDriver } from "dmx-ts";

const PORT = Number.parseInt(process.env.DMX_SERVER_PORT ?? "4300", 10);
const ALLOW_ORIGIN = process.env.DMX_ALLOWED_ORIGIN ?? "*";
const UNIVERSE_NAME = "enttec-open-usb";

const dmx = new DMX();
const driver = new EnttecOpenUSBDMXDriver("COM4", { dmxSpeed: 15 });
const currentUniverseState = {};

const isValidChannelMap = (value) => {
    if (value === null || typeof value !== "object" || Array.isArray(value)) {
        return false;
    }

    for (const [rawChannel, rawValue] of Object.entries(value)) {
        const channel = Number(rawChannel);
        const intensity = Number(rawValue);

        if (!Number.isInteger(channel) || channel < 1 || channel > 512) {
            return false;
        }

        if (!Number.isFinite(intensity) || intensity < 0 || intensity > 255) {
            return false;
        }
    }

    return true;
};

const normalizeChannelMap = (value) => {
    const normalized = {};

    for (const [rawChannel, rawValue] of Object.entries(value)) {
        const channel = Number(rawChannel);
        const intensity = Math.round(Number(rawValue));
        normalized[channel] = Math.min(255, Math.max(0, intensity));
    }

    return normalized;
};

const writeResponse = (res, statusCode, payload) => {
    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": ALLOW_ORIGIN,
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    };

    res.writeHead(statusCode, headers);
    res.end(JSON.stringify(payload));
};

const readRequestBody = async (req) => {
    const chunks = [];

    for await (const chunk of req) {
        chunks.push(chunk);
    }

    return Buffer.concat(chunks).toString("utf8");
};

const applyChannelMap = (channelMap) => {
    for (const [channel, intensity] of Object.entries(channelMap)) {
        currentUniverseState[channel] = intensity;
    }

    dmx.update(UNIVERSE_NAME, channelMap);
};

async function main() {
    try {
        await dmx.addUniverse(UNIVERSE_NAME, driver);
    } catch (error) {
        console.error("Failed to initialize DMX universe:", error);
        process.exit(1);
    }

    const server = http.createServer(async (req, res) => {
        if (req.method === "OPTIONS") {
            res.writeHead(204, {
                "Access-Control-Allow-Origin": ALLOW_ORIGIN,
                "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "600",
            });
            res.end();
            return;
        }

        if (req.method === "GET" && req.url === "/health") {
            writeResponse(res, 200, { status: "ok" });
            return;
        }

        if (req.method === "GET" && req.url === "/state") {
            writeResponse(res, 200, { channelMap: { ...currentUniverseState } });
            return;
        }

        if (req.method === "POST" && req.url === "/dmx") {
            try {
                const rawBody = await readRequestBody(req);

                if (!rawBody) {
                    writeResponse(res, 400, { error: "Request body is empty" });
                    return;
                }

                let payload;
                try {
                    payload = JSON.parse(rawBody);
                } catch (parseError) {
                    writeResponse(res, 400, { error: "Invalid JSON payload" });
                    return;
                }

                if (!isValidChannelMap(payload?.channelMap)) {
                    writeResponse(res, 400, {
                        error: "channelMap must be an object of channel:number -> intensity:number (0-255)",
                    });
                    return;
                }

                const normalized = normalizeChannelMap(payload.channelMap);
                applyChannelMap(normalized);
                writeResponse(res, 200, { channelMap: { ...currentUniverseState } });
            } catch (error) {
                console.error("Failed to process DMX update:", error);
                writeResponse(res, 500, { error: "Failed to update DMX channels" });
            }
            return;
        }

        writeResponse(res, 404, { error: "Not found" });
    });

    const shutdown = async (signal) => {
        console.log(`Received ${signal}, shutting down DMX server...`);
        server.close(() => {
            process.exit(0);
        });

        try {
            await dmx.close();
        } catch (error) {
            console.error("Error while closing DMX connection:", error);
        }
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));

    server.listen(PORT, () => {
        console.log(`DMX control server listening on port ${PORT}`);
    });
}

main().catch((error) => {
    console.error("Unexpected error while starting DMX server:", error);
    process.exit(1);
});
