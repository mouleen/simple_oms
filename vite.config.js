import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    allowedHosts: "all",
    fs: {
      deny: [".git"], // la exluimos de vite
    },
    hmr: {
      overlay: false, // Quitamos los overlay de errores HMR
    },
  },
  build: {
    outDir: "dist",
  },
  optimizeDeps: {
    exclude: [".git"],
  },
});
