import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const config = ({ mode }) => {
  // load .env files
  const env = loadEnv(mode, process.cwd(), "");
  const backend = env.VITE_BASE_URL || "https://e-commerce-freelance-backend-production.up.railway.app/";

  return defineConfig({
    plugins: [react(), eslint(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    server: {
      proxy: {
        // Proxy /api (and /api/v1) to the backend to avoid CORS in dev
        "/api": {
          target: backend,
          changeOrigin: true,
          secure: true,
          // keep path as-is; backend expects /api/v1/...
          rewrite: (path) => path,
        },
      },
    },
  });
};

export default config;
