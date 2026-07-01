import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    // Allow access through this environment's proxied preview hostname
    // (Vite otherwise rejects requests whose Host header isn't localhost).
    allowedHosts: true,
  },
});
