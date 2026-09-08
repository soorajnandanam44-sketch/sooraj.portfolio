import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react-dom") || id.includes("/react/")) {
              return "vendor-react";
            }
            if (id.includes("gsap")) {
              return "vendor-gsap";
            }
            if (
              id.includes("@react-three") ||
              id.includes("@dimforge/rapier3d") ||
              id.includes("postprocessing")
            ) {
              return "vendor-physics";
            }
            if (id.includes("three")) {
              return "vendor-three";
            }
          }
        },
      },
    },
  },
});
