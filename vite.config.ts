import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import dsv from "@rollup/plugin-dsv";
import mdPlugin from "vite-plugin-markdown";

export default defineConfig(() => {
    return {
        plugins: [
            react(),
            svgr({
                exportAsDefault: true,
                svgrOptions: {
                    typescript: false,
                    dimensions: false,
                    replaceAttrValues: { "#000": "currentColor", "#000000": "currentColor" },
                },
            }),
            dsv(),
            mdPlugin.default(),
        ],
    };
});
