import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    rollupOptions: {
      output: {
        // Large third-party libraries get their own long-lived chunks, so a content/app change
        // does not make returning visitors re-download React or the animation library.
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          motion: ["framer-motion"],
          i18n: ["i18next", "react-i18next"],
        },
      },
    },
  },
});
