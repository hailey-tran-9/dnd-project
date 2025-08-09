import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vite.dev/config/
export default defineConfig({
  build: {
    base: "https://hailey-tran-9.github.io/dnd-project/",
  },
  plugins: [
    reactRouter(),
    tailwindcss(),
    nodePolyfills({ include: ["buffer"] }),
  ],
});
