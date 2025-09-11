import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    open: true,
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
  preview: {
    open: true,
  },
  build: {
    outDir: "dist",
  },
});
