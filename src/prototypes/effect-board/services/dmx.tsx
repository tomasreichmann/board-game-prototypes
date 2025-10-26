const DEFAULT_SERVER_URL = 'http://localhost:4300';

const getServerUrl = () => {
    const envUrl = import.meta.env?.VITE_DMX_SERVER_URL;
    if (typeof envUrl === 'string' && envUrl.length > 0) {
        return envUrl;
    }

    return DEFAULT_SERVER_URL;
};

export type ChannelMap = Record<number, number>;

export const updateDmx = async (channelMap: ChannelMap): Promise<void> => {
    const serverUrl = getServerUrl();
    const response = await fetch(`${serverUrl}/dmx`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ channelMap }),
    });

    if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        const message = payload?.error ?? `DMX server responded with status ${response.status}`;
        throw new Error(message);
    }
};
