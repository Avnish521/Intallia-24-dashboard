import { defineConfig } from "vite";
import path from "path";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  base: "./",
  plugins: [svgr()], // Enable SVG imports as React components
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api": {
        target: "http://3.6.31.102",
        changeOrigin: true,
        // Use a robust rewrite for API proxy
        rewrite: (p) => p.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      // Use posix for cross-platform compatibility
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
