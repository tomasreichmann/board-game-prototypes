// vite.config.ts
import { defineConfig } from "file:///C:/Projects/board-game-prototypes/node_modules/vite/dist/node/index.js";
import tsconfigPaths from "file:///C:/Projects/board-game-prototypes/node_modules/vite-tsconfig-paths/dist/index.js";
import react from "file:///C:/Projects/board-game-prototypes/node_modules/@vitejs/plugin-react/dist/index.mjs";
import svgr from "file:///C:/Projects/board-game-prototypes/node_modules/vite-plugin-svgr/dist/index.js";
import dsv from "file:///C:/Projects/board-game-prototypes/node_modules/@rollup/plugin-dsv/dist/es/index.js";
import mdx from "file:///C:/Projects/board-game-prototypes/node_modules/@mdx-js/rollup/index.js";
import remarkFrontmatter from "file:///C:/Projects/board-game-prototypes/node_modules/remark-frontmatter/index.js";
import remarkMdxFrontmatter from "file:///C:/Projects/board-game-prototypes/node_modules/remark-mdx-frontmatter/index.js";
import remarkUnwrapImages from "file:///C:/Projects/board-game-prototypes/node_modules/remark-unwrap-images/index.js";
import remarkImages from "file:///C:/Projects/board-game-prototypes/node_modules/remark-images/index.js";
import path from "path";
var __vite_injected_original_dirname = "C:\\Projects\\board-game-prototypes";
var vite_config_default = defineConfig(() => {
  return {
    define: {
      "process.env": {}
    },
    build: {
      commonjsOptions: {
        include: ["tailwind-config.cjs", "node_modules/**"]
      }
    },
    optimizeDeps: {
      include: ["tailwind-config"]
    },
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "./src"),
        "tailwind-config": path.resolve(__vite_injected_original_dirname, "./tailwind.config.cjs")
      }
    },
    plugins: [
      tsconfigPaths(),
      react(),
      svgr({
        include: "**/*.svg",
        svgrOptions: {
          exportType: "default",
          typescript: false,
          dimensions: false,
          replaceAttrValues: { "#000": "currentColor", "#000000": "currentColor" }
        }
      }),
      dsv(),
      mdx({
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkImages, remarkUnwrapImages],
        providerImportSource: "@mdx-js/react"
      })
    ]
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxQcm9qZWN0c1xcXFxib2FyZC1nYW1lLXByb3RvdHlwZXNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFByb2plY3RzXFxcXGJvYXJkLWdhbWUtcHJvdG90eXBlc1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovUHJvamVjdHMvYm9hcmQtZ2FtZS1wcm90b3R5cGVzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSBcInZpdGUtdHNjb25maWctcGF0aHNcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgc3ZnciBmcm9tIFwidml0ZS1wbHVnaW4tc3ZnclwiO1xyXG5pbXBvcnQgZHN2IGZyb20gXCJAcm9sbHVwL3BsdWdpbi1kc3ZcIjtcclxuaW1wb3J0IG1keCBmcm9tIFwiQG1keC1qcy9yb2xsdXBcIjtcclxuaW1wb3J0IHJlbWFya0Zyb250bWF0dGVyIGZyb20gXCJyZW1hcmstZnJvbnRtYXR0ZXJcIjtcclxuaW1wb3J0IHJlbWFya01keEZyb250bWF0dGVyIGZyb20gXCJyZW1hcmstbWR4LWZyb250bWF0dGVyXCI7XHJcbmltcG9ydCByZW1hcmtVbndyYXBJbWFnZXMgZnJvbSBcInJlbWFyay11bndyYXAtaW1hZ2VzXCI7XHJcbmltcG9ydCByZW1hcmtJbWFnZXMgZnJvbSBcInJlbWFyay1pbWFnZXNcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuXHJcbi8vIGltcG9ydCB7YmFiZWx9IGZyb20gJ0Byb2xsdXAvcGx1Z2luLWJhYmVsJ1xyXG4vKlxyXG4gYmFiZWwoe1xyXG4gICAgICAvLyBBbHNvIHJ1biBvbiB3aGF0IHVzZWQgdG8gYmUgYC5tZHhgIChidXQgaXMgbm93IEpTKTpcclxuICAgICAgZXh0ZW5zaW9uczogWycuanMnLCAnLmpzeCcsICcuY2pzJywgJy5tanMnLCAnLm1kJywgJy5tZHgnXSxcclxuICAgICAgLy8gT3RoZXIgb3B0aW9uc1x1MjAyNlxyXG4gICAgfSlcclxuKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoKSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGRlZmluZToge1xyXG4gICAgICAgICAgICBcInByb2Nlc3MuZW52XCI6IHt9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYnVpbGQ6IHtcclxuICAgICAgICAgICAgY29tbW9uanNPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBbXCJ0YWlsd2luZC1jb25maWcuY2pzXCIsIFwibm9kZV9tb2R1bGVzLyoqXCJdLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICAgICAgICAgIGluY2x1ZGU6IFtcInRhaWx3aW5kLWNvbmZpZ1wiXSxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcclxuICAgICAgICAgICAgICAgIFwidGFpbHdpbmQtY29uZmlnXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi90YWlsd2luZC5jb25maWcuY2pzXCIpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGx1Z2luczogW1xyXG4gICAgICAgICAgICB0c2NvbmZpZ1BhdGhzKCksXHJcbiAgICAgICAgICAgIHJlYWN0KCksXHJcbiAgICAgICAgICAgIHN2Z3Ioe1xyXG4gICAgICAgICAgICAgICAgaW5jbHVkZTogXCIqKi8qLnN2Z1wiLFxyXG4gICAgICAgICAgICAgICAgc3Znck9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICBleHBvcnRUeXBlOiBcImRlZmF1bHRcIixcclxuICAgICAgICAgICAgICAgICAgICB0eXBlc2NyaXB0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBkaW1lbnNpb25zOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICByZXBsYWNlQXR0clZhbHVlczogeyBcIiMwMDBcIjogXCJjdXJyZW50Q29sb3JcIiwgXCIjMDAwMDAwXCI6IFwiY3VycmVudENvbG9yXCIgfSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBkc3YoKSxcclxuICAgICAgICAgICAgbWR4KHtcclxuICAgICAgICAgICAgICAgIHJlbWFya1BsdWdpbnM6IFtyZW1hcmtGcm9udG1hdHRlciwgcmVtYXJrTWR4RnJvbnRtYXR0ZXIsIHJlbWFya0ltYWdlcywgcmVtYXJrVW53cmFwSW1hZ2VzXSxcclxuICAgICAgICAgICAgICAgIHByb3ZpZGVySW1wb3J0U291cmNlOiBcIkBtZHgtanMvcmVhY3RcIixcclxuICAgICAgICAgICAgfSkgYXMgYW55LFxyXG4gICAgICAgIF0sXHJcbiAgICB9O1xyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyUixTQUFTLG9CQUFvQjtBQUN4VCxPQUFPLG1CQUFtQjtBQUMxQixPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sU0FBUztBQUNoQixPQUFPLFNBQVM7QUFDaEIsT0FBTyx1QkFBdUI7QUFDOUIsT0FBTywwQkFBMEI7QUFDakMsT0FBTyx3QkFBd0I7QUFDL0IsT0FBTyxrQkFBa0I7QUFDekIsT0FBTyxVQUFVO0FBVmpCLElBQU0sbUNBQW1DO0FBcUJ6QyxJQUFPLHNCQUFRLGFBQWEsTUFBTTtBQUM5QixTQUFPO0FBQUEsSUFDSCxRQUFRO0FBQUEsTUFDSixlQUFlLENBQUM7QUFBQSxJQUNwQjtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0gsaUJBQWlCO0FBQUEsUUFDYixTQUFTLENBQUMsdUJBQXVCLGlCQUFpQjtBQUFBLE1BQ3REO0FBQUEsSUFDSjtBQUFBLElBQ0EsY0FBYztBQUFBLE1BQ1YsU0FBUyxDQUFDLGlCQUFpQjtBQUFBLElBQy9CO0FBQUEsSUFFQSxTQUFTO0FBQUEsTUFDTCxPQUFPO0FBQUEsUUFDSCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsUUFDcEMsbUJBQW1CLEtBQUssUUFBUSxrQ0FBVyx1QkFBdUI7QUFBQSxNQUN0RTtBQUFBLElBQ0o7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNMLGNBQWM7QUFBQSxNQUNkLE1BQU07QUFBQSxNQUNOLEtBQUs7QUFBQSxRQUNELFNBQVM7QUFBQSxRQUNULGFBQWE7QUFBQSxVQUNULFlBQVk7QUFBQSxVQUNaLFlBQVk7QUFBQSxVQUNaLFlBQVk7QUFBQSxVQUNaLG1CQUFtQixFQUFFLFFBQVEsZ0JBQWdCLFdBQVcsZUFBZTtBQUFBLFFBQzNFO0FBQUEsTUFDSixDQUFDO0FBQUEsTUFDRCxJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsUUFDQSxlQUFlLENBQUMsbUJBQW1CLHNCQUFzQixjQUFjLGtCQUFrQjtBQUFBLFFBQ3pGLHNCQUFzQjtBQUFBLE1BQzFCLENBQUM7QUFBQSxJQUNMO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
