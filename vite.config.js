import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";

export default defineConfig({
  plugins: [eslintPlugin({ cache: false })],
  server: {
    port: 3000,
  },
  build: {
    minify: true,
    manifest: true,
    entryFileNames: "index.js",
    rollupOptions: {
      input: "./src/main.js",
      output: {
        format: "umd",
        file: "bundle.js",
      },
    },
  },
});
