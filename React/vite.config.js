import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["pdfjs-dist"], // Exclude pdfjs-dist from optimization
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "pdfjs-worker": ["pdfjs-dist/build/pdf.worker.entry"],
        },
      },
    },
  },
});
