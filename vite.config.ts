import vue from "@vitejs/plugin-vue";
import { join } from "path";
import { defineConfig } from "vite";

const base = "./src";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      bootstrap: join(__dirname, "/node_modules/bootstrap"),
      assets: join(base, "/assets"),
      components: join(base, "/components"),
      services: join(base, "/services"),
    },
  },
});
