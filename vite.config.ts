import vue from "@vitejs/plugin-vue";
import { join, resolve } from "path";
import { defineConfig } from "vite";

const base = resolve("./src");

export default defineConfig({
  plugins: [vue()],

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "src/variables.scss" as *;',
      },
    },
  },

  resolve: {
    alias: {
      bootstrap: join(__dirname, "/node_modules/bootstrap"),
      "~": join(base, "/"),
    },
  },
});
