import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import dsv from "@rollup/plugin-dsv";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import path from "path";

// import {babel} from '@rollup/plugin-babel'
/*
 babel({
      // Also run on what used to be `.mdx` (but is now JS):
      extensions: ['.js', '.jsx', '.cjs', '.mjs', '.md', '.mdx'],
      // Other options…
    })
*/

export default defineConfig(() => {
    return {
        build: {
            commonjsOptions: {
                include: ["tailwind-config.cjs", "node_modules/**"],
            },
        },
        optimizeDeps: {
            include: ["tailwind-config"],
        },

        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
                "tailwind-config": path.resolve(__dirname, "./tailwind.config.cjs"),
            },
        },
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
            //mdx({ remarkPlugins: [[remarkFrontmatter, "toml"]] }),
            mdx({ remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter], providerImportSource: "@mdx-js/react" }),
        ],
    };
});
