import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: resolve("src/renderer"),
  resolve: {
    alias: {
      "@": resolve("src/renderer")
    }
  },
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: 43147,
    strictPort: true
  },
  build: {
    outDir: resolve("out/web"),
    emptyOutDir: true
  }
});
