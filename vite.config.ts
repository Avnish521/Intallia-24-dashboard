import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  base: "./",
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
